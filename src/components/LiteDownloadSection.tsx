import React, { useState } from 'react';
import { PRODUCTS, WEB_DEMO_URLS, DEMO_LINK_PROPS } from '../constants/data';
import { useLanguage } from '../context/LanguageContext';
import { DesktopOnlyNotice } from './DesktopOnlyNotice';
import { LiteDownloadForm } from './LiteDownloadForm';
import {
  ChevronDown,
  HardDrive,
  Info,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  Lock,
  Monitor,
  ExternalLink,
} from 'lucide-react';

export const LiteDownloadSection: React.FC = () => {
  const { t } = useLanguage();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const copy = t.liteDownload;

  return (
    <section id="try-lite" className="py-20 md:py-28 bg-[#0F0F10] relative border-y border-white/10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>{copy.kicker}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-light text-white tracking-tight">
            {copy.title}{' '}
            <span className="text-[#D4AF37] font-bold">{copy.titleAccent}</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/60 leading-relaxed">{copy.subtitle}</p>
        </div>

        <DesktopOnlyNotice className="mb-8" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 text-xs text-white/65">
          <div className="flex items-center gap-2 bg-[#0A0A0B] border border-white/10 rounded-sm p-3">
            <HardDrive className="w-4 h-4 text-sky-400 shrink-0" />
            <span>{copy.trustOffline}</span>
          </div>
          <div className="flex items-center gap-2 bg-[#0A0A0B] border border-white/10 rounded-sm p-3">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{copy.trustNoAccount}</span>
          </div>
          <div className="flex items-center gap-2 bg-[#0A0A0B] border border-white/10 rounded-sm p-3">
            <ArrowUpRight className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span>{copy.trustUpgrade}</span>
          </div>
        </div>

        <div className="rounded-sm border border-emerald-500/25 bg-emerald-500/5 p-5 sm:p-6 mb-8 text-left">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-white">{copy.limitedTitle}</h3>
              <ul className="mt-3 space-y-2 text-sm text-white/60 list-disc pl-5">
                {copy.limitedFeatures.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-sm border border-[#D4AF37]/25 bg-[#D4AF37]/5 p-5 sm:p-6 mb-8">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
            <div className="text-left min-w-0">
              <h3 className="text-sm font-semibold text-white">{copy.windowsNoteTitle}</h3>
              <p className="mt-2 text-sm text-white/65 leading-relaxed">{copy.windowsNoteSummary}</p>
              <button
                type="button"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#D4AF37] hover:text-white transition-colors"
                onClick={() => setDetailsOpen((open) => !open)}
                aria-expanded={detailsOpen}
              >
                <span>{detailsOpen ? copy.hideDetails : copy.showDetails}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${detailsOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {detailsOpen ? (
                <ul className="mt-4 space-y-2 text-sm text-white/60 list-disc pl-5">
                  {copy.windowsNoteDetails.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ul>
              ) : null}
              <p className="mt-4 text-xs text-white/50 leading-relaxed">{copy.macNote}</p>
              <p className="mt-2 text-xs text-white/45 leading-relaxed">{copy.requirementsNote}</p>
            </div>
          </div>
        </div>

        <div className="rounded-sm border border-sky-500/25 bg-sky-500/5 p-5 sm:p-6 mb-8 text-left">
          <div className="flex items-start gap-3">
            <Monitor className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-white">{copy.browserDemoTitle}</h3>
              <p className="mt-2 text-sm text-white/65 leading-relaxed">{copy.browserDemoSubtitle}</p>
              <p className="mt-2 text-xs text-white/50 leading-relaxed">{copy.browserDemoNote}</p>
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <a
                  href={WEB_DEMO_URLS.guestGuide}
                  {...DEMO_LINK_PROPS}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-widest text-black bg-sky-400 hover:bg-white rounded-sm transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{copy.tryGuestGuideDemo}</span>
                </a>
                <a
                  href={WEB_DEMO_URLS.finance}
                  {...DEMO_LINK_PROPS}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-widest text-white bg-white/10 hover:bg-white/20 border border-white/15 rounded-sm transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{copy.tryFinanceDemo}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <LiteDownloadForm />

        <div className="flex flex-col items-center gap-4 mt-8">
          <a
            href={PRODUCTS.hostKit.checkoutUrl}
            className="text-sm text-white/50 hover:text-[#D4AF37] transition-colors"
          >
            {copy.buyFullLink}
          </a>
        </div>
      </div>
    </section>
  );
};
