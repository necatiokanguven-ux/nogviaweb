export const SUPABASE_URL =
  typeof import.meta.env.VITE_SUPABASE_URL === 'string'
    ? import.meta.env.VITE_SUPABASE_URL.replace(/\/+$/, '')
    : '';

export const SUPABASE_ANON_KEY =
  (typeof import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY === 'string' &&
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY.length > 0
    ? import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
    : typeof import.meta.env.VITE_SUPABASE_ANON_KEY === 'string'
      ? import.meta.env.VITE_SUPABASE_ANON_KEY
      : '');

const CLOUDFLARE_API_BASE = 'https://nogvia.com/api/lite';

const CUSTOM_API_BASE =
  typeof import.meta.env.VITE_LITE_OTP_API_URL === 'string' &&
  import.meta.env.VITE_LITE_OTP_API_URL.length > 0
    ? import.meta.env.VITE_LITE_OTP_API_URL.replace(/\/+$/, '')
    : '';

export const LITE_VERIFIED_SESSION_KEY = 'nogvia-lite-download-verified-v1';

export interface LiteLead {
  firstName: string;
  lastName: string;
  email: string;
}

export interface RequestOtpPayload {
  firstName: string;
  lastName: string;
  email: string;
}

export interface VerifyOtpPayload {
  email: string;
  code: string;
}

function resolveApiConfig() {
  if (SUPABASE_URL && SUPABASE_ANON_KEY) {
    return {
      base: `${SUPABASE_URL}/functions/v1`,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        apikey: SUPABASE_ANON_KEY,
      },
      requestPath: '/request-otp',
      verifyPath: '/verify-otp',
    };
  }

  const base = CUSTOM_API_BASE || CLOUDFLARE_API_BASE;
  return {
    base,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    requestPath: '/request-otp',
    verifyPath: '/verify-otp',
  };
}

async function postJson<T>(path: string, body: unknown): Promise<T> {
  const config = resolveApiConfig();
  const response = await fetch(`${config.base}${path}`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(body),
  });

  const result = (await response.json()) as T & { message?: string; error?: string };

  if (!response.ok) {
    throw new Error(result.message || result.error || 'Request failed');
  }

  return result;
}

export async function requestLiteOtp(payload: RequestOtpPayload) {
  const config = resolveApiConfig();
  return postJson<{ success: boolean; message: string }>(config.requestPath, payload);
}

export async function verifyLiteOtp(payload: VerifyOtpPayload) {
  const config = resolveApiConfig();
  return postJson<{ success: boolean; message: string; lead?: LiteLead }>(config.verifyPath, payload);
}

export function getVerifiedLiteSession(): LiteLead | null {
  try {
    const raw = sessionStorage.getItem(LITE_VERIFIED_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as LiteLead & { verifiedAt?: number };
    if (!parsed.email || !parsed.firstName || !parsed.lastName) return null;
    return {
      firstName: parsed.firstName,
      lastName: parsed.lastName,
      email: parsed.email,
    };
  } catch {
    return null;
  }
}

export function setVerifiedLiteSession(lead: LiteLead) {
  sessionStorage.setItem(
    LITE_VERIFIED_SESSION_KEY,
    JSON.stringify({ ...lead, verifiedAt: Date.now() }),
  );
}

export function clearVerifiedLiteSession() {
  sessionStorage.removeItem(LITE_VERIFIED_SESSION_KEY);
}

export function isSupabaseLiteDownloadConfigured() {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}
