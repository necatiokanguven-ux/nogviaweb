# Requires: supabase login (once), Resend API key
# Usage:
#   cd nogvia_webpage
#   npx supabase login
#   powershell -ExecutionPolicy Bypass -File scripts/setup-supabase.ps1

$ErrorActionPreference = "Stop"
$ProjectRef = "elrfdqlkitczdhfyrlui"

Write-Host "Linking Supabase project $ProjectRef..."
npx supabase link --project-ref $ProjectRef

Write-Host "Pushing database migration..."
npx supabase db push

if (-not $env:RESEND_API_KEY) {
  $env:RESEND_API_KEY = Read-Host "Enter RESEND_API_KEY"
}

if (-not $env:RESEND_FROM) {
  $env:RESEND_FROM = Read-Host "Enter RESEND_FROM (e.g. nogvia <info@nogvia.com>)"
}

Write-Host "Setting Edge Function secrets..."
npx supabase secrets set "RESEND_API_KEY=$($env:RESEND_API_KEY)" "RESEND_FROM=$($env:RESEND_FROM)"

Write-Host "Deploying Edge Functions..."
npx supabase functions deploy request-otp --no-verify-jwt
npx supabase functions deploy verify-otp --no-verify-jwt

Write-Host "Done. Add Hostinger env vars:"
Write-Host "  VITE_SUPABASE_URL=https://$ProjectRef.supabase.co"
Write-Host "  VITE_SUPABASE_PUBLISHABLE_KEY=<your publishable key>"
