import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  Building2,
  Check,
  Copy,
  ExternalLink,
  Globe,
  Link2,
  Wallet,
} from 'lucide-react';
import { NogviaLogo } from './NogviaLogo';
import { PRODUCTS, PURCHASE_LINK_PROPS, SUPPORT_EMAIL } from '../constants/data';
import {
  BANK_DETAILS,
  CRYPTO_DETAILS,
  ETSY_PRODUCT_URLS,
  LEMON_SQUEEZY_URLS,
  PaymentMethod,
  ProductSlug,
  parseProductSlugFromPath,
  parseProductSlugFromSearch,
} from '../constants/payment';
import { useLanguage } from '../context/LanguageContext';

const PRODUCT_META: Record<
  ProductSlug,
  { key: 'hostKit' | 'guestGuide' | 'finance'; labelKey: 'hostKit' | 'guestGuide' | 'finance' }
> = {
  'host-kit': { key: 'hostKit', labelKey: 'hostKit' },
  'guest-guide': { key: 'guestGuide', labelKey: 'guestGuide' },
  finance: { key: 'finance', labelKey: 'finance' },
};

function CopyField({ label, value }: { label: string; value: string }) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value.replace(/\s/g, ''));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }, [value]);

  return (
    <div className="rounded-sm border border-white/10 bg-[#0A0A0B]/80 p-4">
      <p className="text-[10px] uppercase tracking-widest text-white/45 mb-2">{label}</p>
      <div className="flex items-start justify-between gap-3">
        <p className="font-mono text-sm text-white break-all leading-relaxed">{value}</p>
        <button
          type="button"
          onClick={handleCopy}
          className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-[#38bdf8]/40 text-[#38bdf8] text-[10px] font-bold uppercase tracking-wider hover:bg-[#38bdf8]/10 transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? t.payment.copied : t.payment.copy}</span>
        </button>
      </div>
    </div>
  );
}

function MethodToggle({
  active,
  label,
  icon,
  onClick,
}: {
  active: boolean;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-between gap-3 w-full px-4 py-4 rounded-sm border text-left transition-all ${
        active
          ? 'border-[#38bdf8]/60 bg-[#38bdf8]/10 shadow-[0_0_24px_-8px_rgba(56,189,248,0.45)]'
          : 'border-white/10 bg-[#0F0F10] hover:border-white/20'
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <span className={`shrink-0 ${active ? 'text-[#38bdf8]' : 'text-white/50'}`}>{icon}</span>
        <span className={`text-sm font-semibold truncate ${active ? 'text-white' : 'text-white/75'}`}>
          {label}
        </span>
      </div>
      <span
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
          active ? 'bg-[#38bdf8]' : 'bg-white/15'
        }`}
        aria-hidden
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
            active ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </span>
    </button>
  );
}

export const PaymentPage: React.FC = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const [method, setMethod] = useState<PaymentMethod>('bank');
  const [note, setNote] = useState('');
  const [routeTick, setRouteTick] = useState(0);

  useEffect(() => {
    const onPopState = () => setRouteTick((value) => value + 1);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const initialSlug = useMemo(() => {
    void routeTick;
    return (
      parseProductSlugFromPath(window.location.pathname) ??
      parseProductSlugFromSearch(window.location.search) ??
      'host-kit'
    );
  }, [routeTick]);

  const [productSlug, setProductSlug] = useState<ProductSlug>(initialSlug);

  useEffect(() => {
    setProductSlug(initialSlug);
  }, [initialSlug]);

  const productMeta = PRODUCT_META[productSlug];
  const product = PRODUCTS[productMeta.key];
  const productLabel = t.payment.products[productMeta.labelKey];

  const selectProduct = (slug: ProductSlug) => {
    setProductSlug(slug);
    const nextPath = `/checkout/${slug}`;
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, '', nextPath);
      setRouteTick((value) => value + 1);
    }
  };

  const methods: Array<{ id: PaymentMethod; label: string; icon: React.ReactNode }> = [
    { id: 'bank', label: t.payment.methods.bank, icon: <Building2 className="w-5 h-5" /> },
    { id: 'crypto', label: t.payment.methods.crypto, icon: <Wallet className="w-5 h-5" /> },
    { id: 'link', label: t.payment.methods.link, icon: <Link2 className="w-5 h-5" /> },
  ];

  const etsyUrl = ETSY_PRODUCT_URLS[productSlug];
  const lemonUrl = LEMON_SQUEEZY_URLS[productSlug];

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#E0E0E0] font-sans antialiased">
      <header className="border-b border-white/10 bg-[#0A0A0B]/95 backdrop-blur-md">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-2">
            <NogviaLogo size="sm" />
          </a>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#0F0F10] border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-wider"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === 'tr' ? 'TR | EN' : 'EN | TR'}</span>
            </button>
            <a
              href="/"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-white/10 text-xs text-white/70 hover:text-white hover:border-white/25 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t.payment.backHome}</span>
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <div className="text-center mb-10">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#38bdf8] font-bold mb-3">
            {t.payment.kicker}
          </p>
          <h1 className="text-3xl sm:text-4xl font-serif-luxury font-light text-white tracking-tight">
            {t.payment.title}{' '}
            <span className="text-[#38bdf8] font-bold">{t.payment.titleAccent}</span>
          </h1>
          <p className="mt-4 text-white/55 leading-relaxed">{t.payment.subtitle}</p>
        </div>

        <section className="mb-8">
          <div className="flex items-baseline justify-between gap-4 mb-4">
            <h2 className="text-sm font-bold text-white">{t.payment.productLabel}</h2>
            <span className="text-xs text-white/45">{t.payment.productHint}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {(Object.keys(PRODUCT_META) as ProductSlug[]).map((slug) => {
              const meta = PRODUCT_META[slug];
              const item = PRODUCTS[meta.key];
              const active = productSlug === slug;
              return (
                <button
                  key={slug}
                  type="button"
                  onClick={() => selectProduct(slug)}
                  className={`rounded-sm border p-4 text-left transition-all ${
                    active
                      ? 'border-[#D4AF37]/60 bg-[#D4AF37]/10'
                      : 'border-white/10 bg-[#0F0F10] hover:border-white/20'
                  }`}
                >
                  <p className="text-sm font-semibold text-white">{t.payment.products[meta.labelKey]}</p>
                  <p className="mt-1 text-lg font-serif-luxury text-[#D4AF37]">{item.price}</p>
                </button>
              );
            })}
          </div>
        </section>

        <section className="rounded-sm border border-white/10 bg-[#121a22] p-5 sm:p-6 shadow-2xl">
          <div className="mb-6">
            <h2 className="text-sm font-bold text-white">{t.payment.methodLabel}</h2>
            <p className="text-xs text-white/45 mt-1">{t.payment.methodHint}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            {methods.map((item) => (
              <div key={item.id}>
                <MethodToggle
                  active={method === item.id}
                  label={item.label}
                  icon={item.icon}
                  onClick={() => setMethod(item.id)}
                />
              </div>
            ))}
          </div>

          <div className="rounded-sm border border-white/10 bg-[#0A0A0B]/60 p-5 sm:p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/40">{t.payment.selectedProduct}</p>
                <p className="text-lg font-semibold text-white mt-1">{productLabel}</p>
              </div>
              <p className="text-2xl font-serif-luxury text-[#D4AF37]">{product.price}</p>
            </div>

            {method === 'bank' && (
              <div className="space-y-4">
                <p className="text-sm text-white/65 leading-relaxed">{t.payment.bankIntro}</p>
                <div className="rounded-sm border border-sky-500/30 bg-sky-500/10 p-4 text-sm text-sky-100/90 leading-relaxed">
                  {t.payment.bankTlNote}
                </div>
                <div className="rounded-sm border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-100/90 leading-relaxed">
                  {t.payment.bankCurrencyWarning}
                </div>
                <CopyField label={t.payment.accountHolder} value={BANK_DETAILS.accountHolder} />
                <CopyField label={t.payment.ibanTry} value={BANK_DETAILS.ibanTry} />
                <CopyField label={t.payment.ibanUsd} value={BANK_DETAILS.ibanUsd} />
                <div className="rounded-sm border border-[#D4AF37]/25 bg-[#D4AF37]/5 p-4 text-sm text-white/70 leading-relaxed">
                  {t.payment.bankNote.replace('{product}', productLabel)}
                </div>
              </div>
            )}

            {method === 'crypto' && (
              <div className="space-y-4">
                <p className="text-sm text-white/65 leading-relaxed">{t.payment.cryptoIntro}</p>
                <CopyField
                  label={`${CRYPTO_DETAILS.currency} (${CRYPTO_DETAILS.network})`}
                  value={CRYPTO_DETAILS.address}
                />
                <div className="rounded-sm border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-100/90 leading-relaxed">
                  {t.payment.cryptoWarning}
                </div>
              </div>
            )}

            {method === 'link' && (
              <div className="space-y-4">
                <p className="text-sm text-white/65 leading-relaxed">{t.payment.linkIntro}</p>
                <a
                  href={etsyUrl}
                  {...PURCHASE_LINK_PROPS}
                  className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-sm bg-[#F1641E] hover:bg-[#ff7a35] text-white text-xs font-bold uppercase tracking-widest transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{t.payment.etsyCta} — {product.price}</span>
                </a>
                <a
                  href={lemonUrl}
                  {...PURCHASE_LINK_PROPS}
                  className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-sm bg-[#38bdf8] hover:bg-[#5cc8ff] text-black text-xs font-bold uppercase tracking-widest transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{t.payment.lemonCta} — {product.price}</span>
                </a>
                <p className="text-xs text-white/45 leading-relaxed">{t.payment.linkNote}</p>
                <div className="rounded-sm border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-100/90 leading-relaxed">
                  {t.payment.linkPriceWarning}
                </div>
              </div>
            )}

            {(method === 'bank' || method === 'crypto') && (
              <div className="space-y-3 pt-2">
                <label className="block">
                  <span className="text-[10px] uppercase tracking-widest text-white/45">{t.payment.noteLabel}</span>
                  <textarea
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    rows={3}
                    placeholder={t.payment.notePlaceholder}
                    className="mt-2 w-full rounded-sm border border-white/10 bg-[#0F0F10] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#38bdf8]/50 resize-y"
                  />
                </label>
                <p className="text-xs text-white/45 leading-relaxed">{t.payment.noteHint}</p>
                <a
                  href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
                    `${t.payment.emailSubject} — ${productLabel}`,
                  )}&body=${encodeURIComponent(note)}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-sm border border-white/15 text-white text-xs font-bold uppercase tracking-widest hover:border-[#38bdf8]/50 hover:text-[#38bdf8] transition-colors"
                >
                  {t.payment.notifySupport}
                </a>
              </div>
            )}
          </div>
        </section>

        <p className="mt-6 text-center text-xs text-white/35 leading-relaxed">{t.payment.footerNote}</p>
      </main>
    </div>
  );
};
