import React from 'react';
import { ETSY_BUY_URL, BRAND_INFO } from '../constants/data';
import { useLanguage } from '../context/LanguageContext';
import { ShoppingBag, ShieldCheck, Check, Sparkles } from 'lucide-react';

export const PricingCtaSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 md:py-32 bg-[#0A0A0B] relative overflow-hidden border-t border-white/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Glow Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-6">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span>{t.cta.kicker}</span>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif-luxury font-light text-white tracking-tight leading-tight">
          {t.cta.title} <br className="hidden sm:inline" />
          <span className="text-[#D4AF37] font-bold">{t.cta.titleAccent}</span>
        </h2>

        <p className="mt-6 text-lg sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
          {t.cta.subtitle}
        </p>

        {/* Pricing Card Banner */}
        <div className="mt-12 max-w-2xl mx-auto bg-[#0F0F10] border border-[#D4AF37]/60 rounded-sm p-8 shadow-2xl relative glow-gold">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div className="text-left">
              <div className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] font-bold">
                {t.cta.cardTag}
              </div>
              <h3 className="text-2xl font-serif-luxury text-white mt-1">{t.cta.cardTitle}</h3>
              <p className="text-xs text-white/50 mt-1">
                {t.cta.cardSub}
              </p>
            </div>

            <div className="text-center sm:text-right">
              <div className="text-4xl font-serif-luxury font-light text-white">{BRAND_INFO.price}</div>
              <div className="text-xs text-white/40 line-through font-semibold">
                Regular {t.brand.originalPrice}
              </div>
              <div className="text-[11px] text-[#D4AF37] font-bold mt-0.5 uppercase tracking-wider">{t.cta.oneTimeText}</div>
            </div>
          </div>

          <div className="py-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left text-xs sm:text-sm text-white/70">
            {t.cta.checklist.map((inc, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{inc}</span>
              </div>
            ))}
          </div>

          <a
            href={ETSY_BUY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-3 py-4 px-8 text-sm font-bold uppercase tracking-widest text-black bg-[#D4AF37] hover:bg-white rounded-sm shadow-2xl transition-all"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>{t.cta.buyButton}</span>
          </a>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-white/40">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <span>{t.cta.guarantee}</span>
          </div>
        </div>
      </div>
    </section>
  );
};


