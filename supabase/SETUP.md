# Supabase Lite Download Setup

## 1) Create project
- https://supabase.com → New project
- Save your **Project URL** and **anon public key** (Settings → API)

## 2) Run SQL migration
- Dashboard → SQL → New query
- Paste and run: `supabase/migrations/001_lite_download.sql`

## 3) Edge Function secrets
Set these in Supabase Dashboard → Edge Functions → Secrets:
- `RESEND_API_KEY` — from https://resend.com
- `RESEND_FROM` — e.g. `nogvia <info@nogvia.com>` (domain verified in Resend)

`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are injected automatically for Edge Functions.

## 4) Deploy functions (from repo root)
```bash
cd nogvia_webpage
npx supabase login
npx supabase link --project-ref YOUR_PROJECT_REF
npx supabase functions deploy request-otp --no-verify-jwt
npx supabase functions deploy verify-otp --no-verify-jwt
```

## 5) Website env (Hostinger / local `.env.local`)
```
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

Use the **publishable** key only (safe for frontend). Never put `sb_secret_` in `VITE_*` vars.

Legacy `anon` JWT keys still work as `VITE_SUPABASE_ANON_KEY` if your project uses them.

## 6) View leads
Supabase Dashboard → Table Editor → `lite_download_leads`

Columns: `first_name`, `last_name`, `email`, `verified_at`, `created_at`

Export anytime as CSV from Table Editor.
