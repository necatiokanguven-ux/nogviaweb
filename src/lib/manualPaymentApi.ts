import { SUPABASE_ANON_KEY, SUPABASE_URL } from './liteDownloadApi';
import type { PaymentMethod, ProductSlug } from '../constants/payment';

export type ManualPaymentOrder = {
  id: string;
  orderCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  productSlug: ProductSlug;
  paymentMethod: PaymentMethod;
  amountUsd: number;
  status: string;
};

export type RequestPaymentOtpPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  productSlug: ProductSlug;
  paymentMethod: Exclude<PaymentMethod, 'link'>;
};

export type VerifyPaymentOtpPayload = {
  email: string;
  code: string;
};

export type SubmitCryptoPaymentPayload = {
  orderCode: string;
  email: string;
  txHash: string;
};

const MANUAL_PAYMENT_SESSION_KEY = 'nogvia-manual-payment-order-v1';

function supabaseHeaders() {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    apikey: SUPABASE_ANON_KEY,
  };
}

async function postJson<T>(path: string, body: unknown): Promise<T> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error('Payment verification is temporarily unavailable.');
  }

  const response = await fetch(`${SUPABASE_URL}/functions/v1${path}`, {
    method: 'POST',
    headers: supabaseHeaders(),
    body: JSON.stringify(body),
  });

  const raw = await response.text();
  const contentType = response.headers.get('content-type') ?? '';

  if (!contentType.includes('application/json')) {
    throw new Error('Payment verification is temporarily unavailable.');
  }

  let result: T & { message?: string; error?: string };
  try {
    result = JSON.parse(raw) as T & { message?: string; error?: string };
  } catch {
    throw new Error('Payment verification is temporarily unavailable.');
  }

  if (!response.ok) {
    throw new Error(result.message || result.error || 'Request failed');
  }

  return result;
}

export async function requestPaymentOtp(payload: RequestPaymentOtpPayload) {
  return postJson<{ success: boolean; message: string }>('/request-payment-otp', payload);
}

export async function verifyPaymentOtp(payload: VerifyPaymentOtpPayload) {
  return postJson<{ success: boolean; message: string; order: ManualPaymentOrder }>(
    '/verify-payment-otp',
    payload,
  );
}

export async function submitCryptoPayment(payload: SubmitCryptoPaymentPayload) {
  return postJson<{ success: boolean; message: string }>('/submit-crypto-payment', payload);
}

export function saveManualPaymentOrder(order: ManualPaymentOrder) {
  sessionStorage.setItem(MANUAL_PAYMENT_SESSION_KEY, JSON.stringify(order));
}

export function getManualPaymentOrder(): ManualPaymentOrder | null {
  try {
    const raw = sessionStorage.getItem(MANUAL_PAYMENT_SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ManualPaymentOrder;
  } catch {
    return null;
  }
}

export function clearManualPaymentOrder() {
  sessionStorage.removeItem(MANUAL_PAYMENT_SESSION_KEY);
}

export function isValidTxHashInput(value: string) {
  return /^[a-fA-F0-9]{64}$/.test(value.trim());
}

export function isValidPhoneInput(value: string) {
  const digits = value.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 15;
}
