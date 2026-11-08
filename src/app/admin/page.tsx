import type { Metadata } from "next";
import { listRequests, setStatus, listPurchases } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

// Open with /admin?key=YOUR_ADMIN_KEY (set ADMIN_KEY in Vercel).
export default async function Admin({ searchParams }: { searchParams: Promise<{ key?: string }> }) {
  const { key } = await searchParams;
  if (!process.env.ADMIN_KEY || key !== process.env.ADMIN_KEY) {
    return <main className="dl"><h1>Not <em>found.</em></h1></main>;
  }
  const [rows, buys] = await Promise.all([listRequests(), listPurchases()]);
  const paid = buys.filter((b) => b.status === "paid");
  const revenue = paid.reduce((t, b) => t + (b.amount ?? 0), 0) / 100;
  const pending = rows.filter((r) => r.status !== "sent");
  async function mark(fd: FormData) {
    "use server";
    if (fd.get("key") !== process.env.ADMIN_KEY) return;
    await setStatus(String(fd.get("email")), String(fd.get("status")));
    revalidatePath("/admin");
  }
  return (
    <main className="wrap" style={{ padding: "50px 28px 100px" }}>
      <span className="mono muted">Sales</span>
      <h1 style={{ fontFamily: "var(--serif)", fontWeight: 400, fontSize: 52, margin: "8px 0 18px" }}>{paid.length} buyers · ${revenue.toLocaleString("en-US")}</h1>
      <div className="table-wrap" style={{ marginBottom: 60 }}><table className="compare"><tbody>
        <tr><th>Email</th><th>Paid</th><th>Amount</th><th>Status</th></tr>
        {buys.length === 0 && <tr><td colSpan={4} className="muted">No sales yet.</td></tr>}
        {buys.map((b) => (
          <tr key={b.stripe_session_id}>
            <td>{b.email}</td>
            <td>{new Date(b.created_at).toLocaleString("en-GB", { timeZone: "Europe/Amsterdam" })}</td>
            <td>{b.amount != null ? `${(b.amount / 100).toFixed(2)} ${(b.currency ?? "").toUpperCase()}` : "—"}</td>
            <td className={b.status === "paid" ? "us" : ""}>{b.status}</td>
          </tr>
        ))}
      </tbody></table></div>
      {rows.length > 0 && <>
      <span className="mono muted">Library requests</span>
      <h1 style={{ fontFamily: "var(--serif)", fontWeight: 400, fontSize: 52, margin: "8px 0 6px" }}>{pending.length} to send · {rows.length} total</h1>
      <p className="muted" style={{ marginBottom: 20 }}>Pending emails (copy into Bcc): <code style={{ userSelect: "all" }}>{pending.map((r) => r.email).join(", ") || "—"}</code></p>
      <div className="table-wrap"><table className="compare"><tbody>
        <tr><th>Email</th><th>Requested</th><th>Status</th><th></th></tr>
        {rows.map((r) => (
          <tr key={r.email}>
            <td>{r.email}</td>
            <td>{new Date(r.created_at).toLocaleString("en-GB", { timeZone: "Europe/Amsterdam" })}</td>
            <td className={r.status === "sent" ? "us" : ""}>{r.status}</td>
            <td>
              <form action={mark}><input type="hidden" name="key" value={key} /><input type="hidden" name="email" value={r.email} />
                <input type="hidden" name="status" value={r.status === "sent" ? "pending" : "sent"} />
                <button className="btn btn-line btn-sm">{r.status === "sent" ? "Undo" : "Mark sent"}</button></form>
            </td>
          </tr>
        ))}
      </tbody></table></div>
      </>}
    </main>
  );
}
