import React from 'react';
import { PRODUCTS, PURCHASE_LINK_PROPS } from '../constants/data';
import { MEDIA } from '../constants/media';
import { useLanguage } from '../context/LanguageContext';
import {
  Laptop,
  CheckCircle2,
  HardDrive,
  ShoppingBag,
  Sparkles,
  Shield,
} from 'lucide-react';

export const HostKitBundle: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="features" className="py-20 md:py-28 bg-[#0F0F10] relative border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Bundle Overview */}
          <div className="lg:col-span-7 text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-sm bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{t.bundle.kicker}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif-luxury font-light text-white tracking-tight leading-tight">
              {t.bundle.title} <br className="hidden sm:inline" />
              <span className="text-[#D4AF37] font-bold">{t.bundle.titleAccent}</span>
            </h2>

            <p className="text-base sm:text-lg text-white/60 leading-relaxed">
              {t.bundle.subtitle}
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3 bg-[#0A0A0B] p-4 rounded-sm border border-white/10">
                <div className="p-2.5 bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] rounded-sm shrink-0">
                  <Laptop className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-serif-luxury text-white">{t.bundle.f1Title}</h4>
                  <p className="text-xs sm:text-sm text-white/50 mt-1">
                    {t.bundle.f1Desc}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-[#0A0A0B] p-4 rounded-sm border border-white/10">
                <div className="p-2.5 bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] rounded-sm shrink-0">
                  <HardDrive className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-serif-luxury text-white">{t.bundle.f2Title}</h4>
                  <p className="text-xs sm:text-sm text-white/50 mt-1">
                    {t.bundle.f2Desc}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick 3-step setup guide */}
            <div className="pt-4 border-t border-white/10">
              <div className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">
                {t.bundle.processTitle}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-[#141416] p-3 rounded-sm border border-white/10 text-xs text-white/70">
                  <span className="text-[#D4AF37] font-bold block mb-1">{t.bundle.step1Title}</span>
                  {t.bundle.step1Desc}
                </div>
                <div className="bg-[#141416] p-3 rounded-sm border border-white/10 text-xs text-white/70">
                  <span className="text-[#D4AF37] font-bold block mb-1">{t.bundle.step2Title}</span>
                  {t.bundle.step2Desc}
                </div>
                <div className="bg-[#141416] p-3 rounded-sm border border-white/10 text-xs text-white/70">
                  <span className="text-[#D4AF37] font-bold block mb-1">{t.bundle.step3Title}</span>
                  {t.bundle.step3Desc}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing Badge Card */}
          <div className="lg:col-span-5 bg-[#0A0A0B] border border-white/10 rounded-sm p-8 text-center relative overflow-hidden shadow-2xl glow-gold">
            <img
              src={MEDIA.productHostKit}
              alt="nogvia Host Kit bundle"
              className="w-full rounded-sm border border-white/10 mb-6 object-cover"
            />

            {/* Top Badge */}
            <div className="inline-block bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-sm mb-6">
              {t.bundle.licenseTag}
            </div>

            <div className="text-5xl sm:text-6xl font-serif-luxury font-light text-white tracking-tight">
              {PRODUCTS.hostKit.price}
            </div>
            <div className="text-sm text-white/40 mt-1 line-through font-semibold">
              Regular Price {PRODUCTS.hostKit.compareAt}
            </div>
            <p className="text-xs text-[#D4AF37] font-bold mt-2 uppercase tracking-wider">
              {t.brand.discountText}
            </p>

            {/* Inclusions checklist */}
            <div className="mt-8 pt-6 border-t border-white/10 text-left space-y-3 text-xs sm:text-sm text-white/70">
              {t.bundle.checklist.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <a
              href={PRODUCTS.hostKit.checkoutUrl}
              {...PURCHASE_LINK_PROPS}
              className="mt-8 w-full flex items-center justify-center gap-2 py-4 px-6 font-bold uppercase tracking-widest text-black bg-[#D4AF37] hover:bg-white rounded-sm shadow-xl transition-all"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>{t.bundle.buyButton}</span>
            </a>

            <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-white/40">
              <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{t.bundle.guarantee}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


