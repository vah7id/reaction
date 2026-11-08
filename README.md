# UGCLibrary (Next.js)

Landing site for UGCLibrary: AI UGC reaction clips. The site previews 8 characters and sells the full
library for a one-time Stripe payment. Buyers log in with Google or an email link (Supabase) and download
from their account.

## Run locally
```bash
npm install
cp .env.example .env.local   # fill in what you have
npm run dev                  # http://localhost:3000
```
With no keys at all, the buy button skips login and payment and opens a demo download page.

## How buying works
1. **Get the library** → `/api/checkout`.
2. Not logged in → `/login` (Continue with Google, or "Email me a login link"). Then back to checkout.
3. Stripe Checkout (email prefilled, linked to the account).
4. Paid → `/download` saves the purchase and sends the buyer to **`/account`** with the download button.
   The Stripe webhook saves the purchase too, so it is never lost if the buyer closes the tab.
5. **`/account`**: log in any time to download again. `/api/download` checks the purchase before
   handing out the file. A refund in Stripe removes access.

Sales list: **`/admin?key=YOUR_ADMIN_KEY`**.

## Setup (about 20 minutes)

### 1. Supabase
1. Create a project at supabase.com (pick an EU region).
2. **Project Settings → API**: copy the Project URL → `NEXT_PUBLIC_SUPABASE_URL`, the anon public key →
   `NEXT_PUBLIC_SUPABASE_ANON_KEY`, the service_role key → `SUPABASE_SERVICE_ROLE_KEY` (optional).
3. **Connect → Transaction pooler**: copy the connection string (with your DB password) → `DATABASE_URL`.
   Tables are created automatically (or run `supabase/schema.sql` in the SQL Editor).
4. **Authentication → URL Configuration**: Site URL `https://ugclibrary.com`, and add
   `https://ugclibrary.com/auth/callback` and `http://localhost:3000/auth/callback` to Redirect URLs.
5. **Authentication → Sign In / Providers → Google**: turn it on and paste a Google Client ID + Secret
   (Google Cloud Console → APIs & Services → Credentials → OAuth client ID → Web application,
   authorized redirect URI = the callback URL Supabase shows on that screen).
6. **Email**: Supabase's built-in mailer is only for testing (a few emails per hour). Before launch set
   **Authentication → Emails → SMTP** with your email provider (e.g. Resend), sender `login@ugclibrary.com`.

### 1b. The pack (Cloudflare R2)
The zip lives in the private R2 bucket `ugclibrary` as `ugclibrary.zip`. Set `R2_ACCOUNT_ID`,
`R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET` (and `R2_OBJECT_KEY` if the file name changes).
Buyers get a link that expires after 1 hour. To replace the pack, upload a new zip with the same name:
```bash
aws s3 cp ugclibrary.zip s3://ugclibrary/ugclibrary.zip \
  --endpoint-url https://R2_ACCOUNT_ID.r2.cloudflarestorage.com --profile r2
```

### 2. Stripe
1. **Developers → API keys** → `STRIPE_SECRET_KEY` (test key first).
2. **Developers → Webhooks → Add endpoint** `https://ugclibrary.com/api/stripe/webhook`, events
   `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `charge.refunded`
   → copy the signing secret → `STRIPE_WEBHOOK_SECRET`.
3. Test locally: `stripe listen --forward-to localhost:3000/api/stripe/webhook`.

### 3. Vercel
1. Import this folder (Root Directory = this folder if it sits inside a bigger repo).
2. Add every variable from `.env.example` under Settings → Environment Variables, plus `ADMIN_KEY`.
3. Deploy, add your domain, then buy once with card `4242 4242 4242 4242`.
4. Switch Stripe to live keys and a live webhook, redeploy.

## Editing
- **Price, spots left, refund days, support email:** `src/config.ts`
- **Preview clips (8 characters):** `src/data/library.json` + files in `public/media/`
  (compressed 540p previews and thumbnails; the originals are not in the site).
- **Pages:** `src/app/*/page.tsx` — home, characters, 5 SEO landing pages, login, account, download, admin.
- **Login / accounts:** `src/lib/supabase/*`, `src/app/login`, `src/app/auth/*`, `src/proxy.ts`
- **Payments:** `src/lib/stripe.ts`, `src/app/api/checkout`, `src/app/api/stripe/webhook`, `src/app/api/download`
- **Styles:** `src/app/globals.css`
- Old `.html` URLs redirect to the new paths (see `next.config.ts`).
