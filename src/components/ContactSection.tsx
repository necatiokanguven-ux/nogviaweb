import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SUPPORT_EMAIL, WEB3FORMS_ENDPOINT } from '../constants/data';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? '';

export const ContactSection: React.FC = () => {
  const { t } = useLanguage();
  const [status, setStatus] = useState<FormStatus>('idle');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('general');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const subjectLabels: Record<string, string> = {
    general: t.contact.subjectGeneral,
    order: t.contact.subjectOrder,
    technical: t.contact.subjectTechnical,
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (honeypot.trim()) {
      setStatus('success');
      return;
    }

    if (!ACCESS_KEY) {
      window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subjectLabels[subject] ?? 'Contact')}&body=${encodeURIComponent(message)}`;
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          name,
          email,
          subject: `[nogvia.com] ${subjectLabels[subject] ?? subject}`,
          message,
          from_name: 'nogvia.com Contact',
          botcheck: '',
        }),
      });

      const result = (await response.json()) as { success?: boolean };

      if (!response.ok || !result.success) {
        setStatus('error');
        return;
      }

      setStatus('success');
      setName('');
      setEmail('');
      setSubject('general');
      setMessage('');
    } catch {
      setStatus('error');
    }
  };

  const inputClass =
    'w-full rounded-sm border border-white/10 bg-[#0F0F10] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#D4AF37]/50 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/30 transition-colors';

  return (
    <section id="contact" className="py-20 md:py-32 bg-[#050506] relative border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-sm bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest mb-4">
            <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{t.contact.kicker}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-light text-white tracking-tight">
            {t.contact.title} <span className="text-[#D4AF37] font-bold">{t.contact.titleAccent}</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/60">{t.contact.subtitle}</p>
          <p className="mt-3 text-sm text-white/40">{t.contact.replyNote}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
          <form
            onSubmit={handleSubmit}
            className="bg-[#0F0F10] border border-white/10 rounded-sm p-6 sm:p-8 space-y-5"
            noValidate
          >
            <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
              <label htmlFor="company">Company</label>
              <input
                id="company"
                name="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(event) => setHoneypot(event.target.value)}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-wider text-white/50 mb-2">
                  {t.contact.nameLabel}
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  maxLength={120}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder={t.contact.namePlaceholder}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-wider text-white/50 mb-2">
                  {t.contact.emailLabel}
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  maxLength={254}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder={t.contact.emailPlaceholder}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-subject" className="block text-xs font-bold uppercase tracking-wider text-white/50 mb-2">
                {t.contact.subjectLabel}
              </label>
              <select
                id="contact-subject"
                name="subject"
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                className={inputClass}
              >
                <option value="general">{t.contact.subjectGeneral}</option>
                <option value="order">{t.contact.subjectOrder}</option>
                <option value="technical">{t.contact.subjectTechnical}</option>
              </select>
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-wider text-white/50 mb-2">
                {t.contact.messageLabel}
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                maxLength={2000}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder={t.contact.messagePlaceholder}
                className={`${inputClass} resize-y min-h-[140px]`}
              />
            </div>

            {status === 'success' && (
              <div className="flex items-start gap-3 rounded-sm border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">{t.contact.successTitle}</p>
                  <p className="text-emerald-100/80 mt-1">{t.contact.successBody}</p>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="flex items-start gap-3 rounded-sm border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">{t.contact.errorTitle}</p>
                  <p className="text-red-100/80 mt-1">{t.contact.errorBody}</p>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-black bg-[#D4AF37] hover:bg-white rounded-sm shadow-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              <span>{status === 'submitting' ? t.contact.submitting : t.contact.submit}</span>
            </button>

            <p className="text-xs text-white/35 leading-relaxed">{t.contact.privacyNote}</p>
          </form>

          <aside className="flex flex-col gap-4">
            <div className="bg-[#0F0F10] border border-white/10 rounded-sm p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-white/50 mb-3">Email</p>
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="text-[#D4AF37] font-semibold hover:underline break-all"
              >
                {SUPPORT_EMAIL}
              </a>
              <p className="mt-4 text-sm text-white/50 leading-relaxed">{t.contact.mailtoHint}</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
