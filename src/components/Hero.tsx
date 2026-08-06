import React from 'react';
import { ETSY_BUY_URL } from '../constants/data';
import { MEDIA } from '../constants/media';
import { useLanguage } from '../context/LanguageContext';
import {
  ShoppingBag,
  Sparkles,
  HardDrive,
  Zap,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative pt-28 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-radial-glow">
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left Column: Hero Copy */}
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs uppercase tracking-[0.2em] font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{t.hero.kicker}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif-luxury font-light text-white leading-[1.1] tracking-tight mb-6">
              {t.hero.title}{' '}
              <span className="not-italic font-bold text-[#D4AF37]">
                {t.hero.titleAccent}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-white/60 font-normal leading-relaxed max-w-xl">
              {t.hero.subtitle}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={ETSY_BUY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 text-xs font-bold uppercase tracking-widest text-black bg-[#D4AF37] hover:bg-white rounded-sm shadow-2xl transition-all transform hover:-translate-y-1 active:translate-y-0 shadow-[#D4AF37]/20 focus:outline-none"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{t.hero.ctaPrimary}</span>
              </a>

              <a
                href="#guest-guide"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 text-xs font-semibold uppercase tracking-widest text-white/80 bg-[#0F0F10] hover:bg-white/10 border border-white/10 rounded-sm transition-colors"
              >
                <span>{t.hero.ctaSecondary}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
              </a>
            </div>

            <div className="mt-10 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-2 text-xs text-white/70 bg-[#0F0F10] p-3 rounded-sm border border-white/5">
                <Zap className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{t.hero.badge1}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/70 bg-[#0F0F10] p-3 rounded-sm border border-white/5">
                <HardDrive className="w-4 h-4 text-sky-400 shrink-0" />
                <span>{t.hero.badge2}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/70 bg-[#0F0F10] p-3 rounded-sm border border-white/5">
                <ShieldAlert className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t.hero.badge3}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Image */}
          <div className="flex justify-center lg:justify-end">
            <img
              src={MEDIA.hostKitHero}
              alt="nogvia Host Kit"
              className="w-full max-w-xl rounded-sm border border-white/10 shadow-2xl glow-gold object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
