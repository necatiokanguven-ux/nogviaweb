import React, { useEffect, useState } from 'react';
import { Download, Mail, ShieldCheck, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useLiteDownload } from '../context/LiteDownloadContext';
import {
  getVerifiedLiteSession,
  requestLiteOtp,
  verifyLiteOtp,
} from '../lib/liteDownloadApi';

type Step = 'form' | 'verify' | 'ready';

type LiteDownloadFormProps = {
  variant?: 'inline' | 'modal';
  onClose?: () => void;
};

export const LiteDownloadForm: React.FC<LiteDownloadFormProps> = ({
  variant = 'inline',
  onClose,
}) => {
  const { t } = useLanguage();
  const copy = t.liteDownload;
  const { triggerDownload, saveLead } = useLiteDownload();

  const [step, setStep] = useState<Step>('form');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  const inputClass =
    'w-full rounded-sm border border-white/10 bg-[#0A0A0B] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition-colors';

  useEffect(() => {
    const verified = getVerifiedLiteSession();
    if (verified) {
      setFirstName(verified.firstName);
      setLastName(verified.lastName);
      setEmail(verified.email);
      setStep('ready');
    }
  }, []);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = window.setTimeout(() => setResendCooldown((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [resendCooldown]);

  const handleRequestCode = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (honeypot.trim()) return;

    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      setError(copy.requiredFields);
      return;
    }

    if (!consent) {
      setError(copy.consentRequired);
      return;
    }

    setLoading(true);
    try {
      await requestLiteOtp({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
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
      const result = await verifyLiteOtp({
        email: email.trim().toLowerCase(),
        code: code.trim(),
      });

      if (!result.lead) {
        throw new Error(copy.verifyError);
      }

      await saveLead(result.lead);
      setStep('ready');
    } catch (err) {
      setError(err instanceof Error ? err.message : copy.verifyError);
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setError('');
    setLoading(true);
    try {
      await requestLiteOtp({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
      });
      setCode('');
      setResendCooldown(60);
    } catch (err) {
      setError(err instanceof Error ? err.message : copy.requestError);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    triggerDownload();
    if (variant === 'modal') onClose?.();
  };

  const containerClass =
    variant === 'modal'
      ? 'bg-[#0F0F10] border border-white/10 rounded-sm p-6 sm:p-8'
      : 'rounded-sm border border-emerald-500/25 bg-emerald-500/5 p-5 sm:p-6';

  return (
    <div className={containerClass}>
      <div className="text-left mb-6">
        <h3 className="text-lg font-serif-luxury text-white">{copy.formTitle}</h3>
        <p className="mt-2 text-sm text-white/60 leading-relaxed">{copy.formSubtitle}</p>
      </div>

      {step === 'form' ? (
        <form onSubmit={handleRequestCode} className="space-y-4 text-left">
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/50">
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
              <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/50">
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
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/50">
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

          <label className="flex items-start gap-3 text-sm text-white/60">
            <input
              type="checkbox"
              checked={consent}
              onChange={(event) => setConsent(event.target.checked)}
              className="mt-1"
            />
            <span>{copy.consentLabel}</span>
          </label>

          {error ? <p className="text-sm text-red-400">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 text-xs font-bold uppercase tracking-widest text-black bg-emerald-400 hover:bg-emerald-300 rounded-sm transition-colors disabled:opacity-60"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{loading ? copy.sendingCode : copy.sendCodeButton}</span>
          </button>
        </form>
      ) : null}

      {step === 'verify' ? (
        <form onSubmit={handleVerifyCode} className="space-y-4 text-left">
          <p className="text-sm text-white/65">{copy.codeSent.replace('{email}', email)}</p>

          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/50">
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

          {error ? <p className="text-sm text-red-400">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 text-xs font-bold uppercase tracking-widest text-black bg-emerald-400 hover:bg-emerald-300 rounded-sm transition-colors disabled:opacity-60"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{loading ? copy.verifying : copy.verifyButton}</span>
          </button>

          <button
            type="button"
            disabled={loading || resendCooldown > 0}
            onClick={() => {
              if (resendCooldown > 0) return;
              void handleResendCode();
            }}
            className="w-full text-xs text-white/50 hover:text-emerald-300 transition-colors disabled:opacity-40"
          >
            {resendCooldown > 0
              ? copy.resendCooldown.replace('{seconds}', String(resendCooldown))
              : copy.resendCode}
          </button>
        </form>
      ) : null}

      {step === 'ready' ? (
        <div className="space-y-4 text-left">
          <p className="text-sm text-emerald-300">{copy.downloadReady}</p>
          <button
            type="button"
            onClick={handleDownload}
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 text-xs font-bold uppercase tracking-widest text-black bg-[#D4AF37] hover:bg-white rounded-sm transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>{copy.startDownload}</span>
          </button>
        </div>
      ) : null}
    </div>
  );
};
