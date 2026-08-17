import React, { useEffect, useMemo, useState } from 'react';
import { Check, Hash, Mail, Phone, ShieldCheck, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { BANK_DETAILS, CRYPTO_DETAILS, ProductSlug } from '../constants/payment';
import {
  confirmBankPayment,
  getManualPaymentOrder,
  isValidPhoneInput,
  isValidTxHashInput,
  requestPaymentOtp,
  saveManualPaymentOrder,
  submitCryptoPayment,
  verifyPaymentOtp,
  type ManualPaymentOrder,
} from '../lib/manualPaymentApi';

type ManualPaymentCheckoutProps = {
  productSlug: ProductSlug;
  productLabel: string;
  productPrice: string;
  method: 'bank' | 'crypto';
};

type Step = 'contact' | 'verify' | 'bank_ready' | 'crypto_pay' | 'crypto_tx' | 'done';

function CopyField({ label, value }: { label: string; value: string }) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value.replace(/\s/g, ''));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="rounded-sm border border-[#38bdf8]/30 bg-[#0A0A0B]/80 p-4">
      <p className="text-[10px] uppercase tracking-widest text-[#38bdf8]/70 mb-2">{label}</p>
      <div className="flex items-start justify-between gap-3">
        <p className="font-mono text-sm text-white break-all leading-relaxed">{value}</p>
        <button
          type="button"
          onClick={handleCopy}
          className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-[#38bdf8]/40 text-[#38bdf8] text-[10px] font-bold uppercase tracking-wider hover:bg-[#38bdf8]/10 transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : null}
          <span>{copied ? t.payment.copied : t.payment.copy}</span>
        </button>
      </div>
    </div>
  );
}

export const ManualPaymentCheckout: React.FC<ManualPaymentCheckoutProps> = ({
  productSlug,
  productLabel,
  productPrice,
  method,
}) => {
  const { t } = useLanguage();
  const copy = t.payment.manualCheckout;

  const [step, setStep] = useState<Step>('contact');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [txHash, setTxHash] = useState('');
  const [order, setOrder] = useState<ManualPaymentOrder | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const [honeypot, setHoneypot] = useState('');

  const inputClass =
    'w-full rounded-sm border border-white/10 bg-[#0A0A0B] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#38bdf8]/50 focus:outline-none focus:ring-1 focus:ring-[#38bdf8]/30 transition-colors';

  const resetForMethod = useMemo(
    () => ({ productSlug, method }),
    [productSlug, method],
  );

  useEffect(() => {
    setStep('contact');
    setCode('');
    setTxHash('');
    setError('');
    setOrder(null);
  }, [resetForMethod]);

  useEffect(() => {
    const saved = getManualPaymentOrder();
    if (!saved) return;
    if (saved.productSlug !== productSlug || saved.paymentMethod !== method) return;

    setFirstName(saved.firstName);
    setLastName(saved.lastName);
    setEmail(saved.email);
    setPhone(saved.phone);
    setOrder(saved);

    if (saved.paymentMethod === 'bank') {
      if (
        saved.status === 'pending_review' ||
        saved.status === 'paid' ||
        saved.status === 'fulfilled'
      ) {
        setStep('done');
        return;
      }
      setStep('bank_ready');
      return;
    }

    if (saved.status === 'pending_review' || saved.status === 'paid' || saved.status === 'fulfilled') {
      setStep('done');
      return;
    }

    setStep(saved.status === 'awaiting_crypto_tx' ? 'crypto_pay' : 'crypto_tx');
  }, [productSlug, method]);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = window.setTimeout(() => setResendCooldown((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [resendCooldown]);

  const handleRequestCode = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (honeypot.trim()) return;

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim()) {
      setError(copy.requiredFields);
      return;
    }

    if (!isValidPhoneInput(phone)) {
      setError(copy.invalidPhone);
      return;
    }

    setLoading(true);
    try {
      await requestPaymentOtp({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        productSlug,
        paymentMethod: method,
      });
      setStep('verify');
      setCode('');
      setResendCooldown(60);
    } catch (err) {
      setError(err instanceof Error ? err.message : copy.requestError);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (!code.trim() || code.trim().length !== 6) {
      setError(copy.invalidCode);
      return;
    }

    setLoading(true);
    try {
      const result = await verifyPaymentOtp({
        email: email.trim().toLowerCase(),
        code: code.trim(),
      });

      saveManualPaymentOrder(result.order);
      setOrder(result.order);
      setStep(method === 'bank' ? 'bank_ready' : 'crypto_pay');
    } catch (err) {
      setError(err instanceof Error ? err.message : copy.verifyError);
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (resendCooldown > 0) return;
    setError('');
    setLoading(true);
    try {
      await requestPaymentOtp({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        productSlug,
        paymentMethod: method,
      });
      setCode('');
      setResendCooldown(60);
    } catch (err) {
      setError(err instanceof Error ? err.message : copy.requestError);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmBank = async () => {
    setError('');

    if (!order) {
      setError(copy.verifyError);
      return;
    }

    setLoading(true);
    try {
      await confirmBankPayment({
        orderCode: order.orderCode,
        email: order.email,
      });

      const updatedOrder = { ...order, status: 'pending_review' };
      saveManualPaymentOrder(updatedOrder);
      setOrder(updatedOrder);
      setStep('done');
    } catch (err) {
      setError(err instanceof Error ? err.message : copy.submitBankError);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitTx = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (!order) {
      setError(copy.verifyError);
      return;
    }

    const normalizedHash = txHash.trim();
    if (!isValidTxHashInput(normalizedHash)) {
      setError(copy.invalidTxHash);
      return;
    }

    setLoading(true);
    try {
      await submitCryptoPayment({
        orderCode: order.orderCode,
        email: order.email,
        txHash: normalizedHash,
      });

      const updatedOrder = { ...order, status: 'pending_review' };
      saveManualPaymentOrder(updatedOrder);
      setOrder(updatedOrder);
      setStep('done');
    } catch (err) {
      setError(err instanceof Error ? err.message : copy.submitTxError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-sm border border-[#38bdf8]/25 bg-[#38bdf8]/5 p-5 sm:p-6 space-y-5">
      <div>
        <h3 className="text-sm font-bold text-white">{copy.sectionTitle}</h3>
        <p className="mt-2 text-sm text-white/60 leading-relaxed">{copy.sectionSubtitle}</p>
      </div>

      {(step === 'contact' || step === 'verify') && (
        <form onSubmit={step === 'contact' ? handleRequestCode : handleVerifyCode} className="space-y-4">
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
          />

          {step === 'contact' ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="mb-2 block text-[10px] uppercase tracking-widest text-white/45">
                    {copy.firstNameLabel}
                  </span>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
                      className={`${inputClass} pl-10`}
                      placeholder={copy.firstNamePlaceholder}
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="mb-2 block text-[10px] uppercase tracking-widest text-white/45">
                    {copy.lastNameLabel}
                  </span>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(event) => setLastName(event.target.value)}
                      className={`${inputClass} pl-10`}
                      placeholder={copy.lastNamePlaceholder}
                    />
                  </div>
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-[10px] uppercase tracking-widest text-white/45">
                  {copy.emailLabel}
                </span>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className={`${inputClass} pl-10`}
                    placeholder={copy.emailPlaceholder}
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-2 block text-[10px] uppercase tracking-widest text-white/45">
                  {copy.phoneLabel}
                </span>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    className={`${inputClass} pl-10`}
                    placeholder={copy.phonePlaceholder}
                  />
                </div>
              </label>
            </>
          ) : (
            <>
              <p className="text-sm text-white/65">{copy.codeSent.replace('{email}', email)}</p>
              <label className="block">
                <span className="mb-2 block text-[10px] uppercase tracking-widest text-white/45">
                  {copy.codeLabel}
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  required
                  value={code}
                  onChange={(event) => setCode(event.target.value.replace(/\D/g, '').slice(0, 6))}
                  className={`${inputClass} tracking-[0.35em] text-center text-lg`}
                  placeholder={copy.codePlaceholder}
                />
              </label>
            </>
          )}

          {error ? <p className="text-sm text-red-400">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 text-xs font-bold uppercase tracking-widest text-black bg-[#38bdf8] hover:bg-[#5cc8ff] rounded-sm transition-colors disabled:opacity-60"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>
              {loading
                ? step === 'contact'
                  ? copy.sendingCode
                  : copy.verifying
                : step === 'contact'
                  ? copy.sendCodeButton
                  : copy.verifyButton}
            </span>
          </button>

          {step === 'verify' ? (
            <button
              type="button"
              disabled={loading || resendCooldown > 0}
              onClick={() => {
                void handleResendCode();
              }}
              className="w-full text-xs text-white/50 hover:text-[#38bdf8] transition-colors disabled:opacity-40"
            >
              {resendCooldown > 0
                ? copy.resendCooldown.replace('{seconds}', String(resendCooldown))
                : copy.resendCode}
            </button>
          ) : null}
        </form>
      )}

      {step === 'bank_ready' && order ? (
        <div className="space-y-4">
          <CopyField label={copy.orderCodeLabel} value={order.orderCode} />
          <p className="text-sm text-white/70 leading-relaxed">
            {copy.bankOrderHint.replace('{code}', order.orderCode).replace('{product}', productLabel)}
          </p>
          <CopyField label={t.payment.accountHolder} value={BANK_DETAILS.accountHolder} />
          <CopyField label={t.payment.ibanTry} value={BANK_DETAILS.ibanTry} />
          <CopyField label={t.payment.ibanUsd} value={BANK_DETAILS.ibanUsd} />
          <div className="rounded-sm border border-emerald-500/25 bg-emerald-500/10 p-4 text-sm text-emerald-100/90 leading-relaxed">
            {copy.bankPendingMessage.replace('{price}', productPrice)}
          </div>
          {error ? <p className="text-sm text-red-400">{error}</p> : null}
          <button
            type="button"
            disabled={loading}
            onClick={() => {
              void handleConfirmBank();
            }}
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 text-xs font-bold uppercase tracking-widest text-black bg-[#38bdf8] hover:bg-[#5cc8ff] rounded-sm transition-colors disabled:opacity-60"
          >
            {loading ? copy.submittingBank : copy.confirmBankButton}
          </button>
        </div>
      ) : null}

      {step === 'crypto_pay' && order ? (
        <div className="space-y-4">
          <CopyField label={copy.orderCodeLabel} value={order.orderCode} />
          <CopyField
            label={`${CRYPTO_DETAILS.currency} (${CRYPTO_DETAILS.network})`}
            value={CRYPTO_DETAILS.address}
          />
          <p className="text-sm text-white/70 leading-relaxed">
            {copy.cryptoPayHint.replace('{price}', productPrice).replace('{code}', order.orderCode)}
          </p>
          <button
            type="button"
            onClick={() => setStep('crypto_tx')}
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 text-xs font-bold uppercase tracking-widest text-black bg-[#38bdf8] hover:bg-[#5cc8ff] rounded-sm transition-colors"
          >
            {copy.continueToTxButton}
          </button>
        </div>
      ) : null}

      {step === 'crypto_tx' && order ? (
        <form onSubmit={handleSubmitTx} className="space-y-4">
          <CopyField label={copy.orderCodeLabel} value={order.orderCode} />
          <label className="block">
            <span className="mb-2 block text-[10px] uppercase tracking-widest text-white/45">
              {copy.txHashLabel}
            </span>
            <div className="relative">
              <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                required
                value={txHash}
                onChange={(event) => setTxHash(event.target.value.trim())}
                className={`${inputClass} pl-10 font-mono`}
                placeholder={copy.txHashPlaceholder}
              />
            </div>
          </label>
          <p className="text-xs text-white/45 leading-relaxed">{copy.txHashHint}</p>
          {error ? <p className="text-sm text-red-400">{error}</p> : null}
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 text-xs font-bold uppercase tracking-widest text-black bg-[#38bdf8] hover:bg-[#5cc8ff] rounded-sm transition-colors disabled:opacity-60"
          >
            {loading ? copy.submittingTx : copy.submitTxButton}
          </button>
        </form>
      ) : null}

      {step === 'done' ? (
        <div className="rounded-sm border border-emerald-500/25 bg-emerald-500/10 p-4 text-sm text-emerald-100/90 leading-relaxed">
          {method === 'bank' ? copy.bankDoneMessage : copy.cryptoDoneMessage}
        </div>
      ) : null}
    </div>
  );
};
