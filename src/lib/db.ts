import { Pool } from "pg";
import fs from "node:fs/promises";
import path from "node:path";

export type LibraryRequest = { email: string; name: string | null; provider: string; created_at: string; status: string };

let pool: Pool | null = null;
let ready: Promise<void> | null = null;

function db() {
  if (!process.env.DATABASE_URL) return null;
  if (!pool) {
    pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 3, ssl: /localhost|127\.0\.0\.1/.test(process.env.DATABASE_URL) ? false : { rejectUnauthorized: false } });
    ready = pool.query(`create table if not exists library_requests (
      email text primary key,
      name text,
      provider text not null default 'email',
      status text not null default 'pending',
      created_at timestamptz not null default now()
    )`).then(() => {});
  }
  return pool;
}

// Local fallback for `npm run dev` without a database (not used on Vercel).
const FILE = path.join(process.cwd(), ".data", "requests.json");
async function readFile(): Promise<LibraryRequest[]> { try { return JSON.parse(await fs.readFile(FILE, "utf8")); } catch { return []; } }

/** Save a request. Returns the stored row (existing row if the email already asked). */
export async function saveRequest(email: string, name: string | null, provider: string): Promise<{ row: LibraryRequest; isNew: boolean }> {
  const p = db();
  if (p) {
    await ready;
    const ins = await p.query(
      `insert into library_requests (email, name, provider) values ($1, $2, $3) on conflict (email) do nothing returning *`,
      [email, name, provider]);
    if (ins.rows[0]) return { row: ins.rows[0], isNew: true };
    const ex = await p.query(`select * from library_requests where email = $1`, [email]);
    return { row: ex.rows[0], isNew: false };
  }
  if (process.env.VERCEL) throw new Error("DATABASE_URL is not set");
  const all = await readFile();
  const found = all.find((r) => r.email === email);
  if (found) return { row: found, isNew: false };
  const row = { email, name, provider, status: "pending", created_at: new Date().toISOString() };
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify([...all, row], null, 1));
  return { row, isNew: true };
}

export async function listRequests(): Promise<LibraryRequest[]> {
  const p = db();
  if (p) { await ready; return (await p.query(`select * from library_requests order by created_at desc`)).rows; }
  return (await readFile()).reverse();
}

export async function setStatus(email: string, status: string) {
  const p = db();
  if (p) { await ready; await p.query(`update library_requests set status = $2 where email = $1`, [email, status]); return; }
  const all = await readFile(); const r = all.find((x) => x.email === email); if (r) r.status = status;
  await fs.writeFile(FILE, JSON.stringify(all, null, 1));
}

// ---------- Purchases (Stripe) ----------
export type Purchase = { stripe_session_id: string; user_id: string | null; email: string; amount: number | null; currency: string | null; payment_intent: string | null; status: string; created_at: string };

let purchasesReady: Promise<void> | null = null;
function pdb() {
  const p = db();
  if (!p) return null;
  purchasesReady ??= (ready ?? Promise.resolve()).then(() => p.query(`create table if not exists purchases (
      stripe_session_id text primary key,
      user_id text,
      email text not null,
      amount integer,
      currency text,
      payment_intent text,
      status text not null default 'paid',
      created_at timestamptz not null default now()
    )`)).then(() => {}).catch((e) => { purchasesReady = null; throw e; }); // don't cache a failed connection
  return p;
}
const PFILE = path.join(process.cwd(), ".data", "purchases.json");
async function readP(): Promise<Purchase[]> { try { return JSON.parse(await fs.readFile(PFILE, "utf8")); } catch { return []; } }
async function writeP(all: Purchase[]) { await fs.mkdir(path.dirname(PFILE), { recursive: true }); await fs.writeFile(PFILE, JSON.stringify(all, null, 1)); }

/** Idempotent: the webhook and the success page can both call this for the same session. */
export async function recordPurchase(x: { sessionId: string; userId: string | null; email: string; amount: number | null; currency: string | null; paymentIntent: string | null }) {
  const email = x.email.toLowerCase();
  const p = pdb();
  if (p) {
    await purchasesReady;
    await p.query(
      `insert into purchases (stripe_session_id, user_id, email, amount, currency, payment_intent) values ($1,$2,$3,$4,$5,$6)
       on conflict (stripe_session_id) do update set user_id = coalesce(purchases.user_id, excluded.user_id), payment_intent = coalesce(purchases.payment_intent, excluded.payment_intent)`,
      [x.sessionId, x.userId, email, x.amount, x.currency, x.paymentIntent]);
    return;
  }
  if (process.env.VERCEL) throw new Error("DATABASE_URL is not set");
  const all = await readP();
  if (!all.some((r) => r.stripe_session_id === x.sessionId))
    all.push({ stripe_session_id: x.sessionId, user_id: x.userId, email, amount: x.amount, currency: x.currency, payment_intent: x.paymentIntent, status: "paid", created_at: new Date().toISOString() });
  await writeP(all);
}

/** Does this account own the library? Matches the account id or the email used at checkout. */
export async function ownsLibrary(userId: string, email: string): Promise<boolean> {
  const p = pdb();
  if (p) {
    try {
      await purchasesReady;
      const r = await p.query(`select 1 from purchases where status = 'paid' and (user_id = $1 or email = $2) limit 1`, [userId, email.toLowerCase()]);
      if (r.rowCount! > 0) return true;
    } catch (e) {
      // Database down or misconfigured: Stripe is the source of truth for payments, so ask it instead.
      console.error("[db] purchase lookup failed, checking Stripe instead:", e instanceof Error ? e.message : e);
    }
    // Not in the database (e.g. paid while the database or webhook was down): check Stripe and save it if found.
    const { paidInStripe } = await import("./stripe");
    return paidInStripe(userId, email);
  }
  return (await readP()).some((r) => r.status === "paid" && (r.user_id === userId || r.email === email.toLowerCase()));
}

export async function markRefunded(paymentIntent: string) {
  const p = pdb();
  if (p) { await purchasesReady; await p.query(`update purchases set status = 'refunded' where payment_intent = $1`, [paymentIntent]); return; }
  const all = await readP(); all.forEach((r) => { if (r.payment_intent === paymentIntent) r.status = "refunded"; }); await writeP(all);
}

export async function listPurchases(): Promise<Purchase[]> {
  const p = pdb();
  if (p) { await purchasesReady; return (await p.query(`select * from purchases order by created_at desc`)).rows; }
  return (await readP()).reverse();
}
