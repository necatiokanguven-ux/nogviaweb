import React from 'react';
import { PRODUCTS } from '../constants/data';
import { MEDIA } from '../constants/media';
import { useLanguage } from '../context/LanguageContext';
import { Check, ShoppingBag, Sparkles, ShieldCheck, Download } from 'lucide-react';

const productMedia = {
  guestGuide: MEDIA.productGuestGuide,
  finance: MEDIA.productFinance,
  hostKit: MEDIA.productHostKit,
} as const;

export const ProductsPricingSection: React.FC = () => {
  const { t } = useLanguage();

  const paidCards = [
    {
      key: 'guestGuide' as const,
      product: PRODUCTS.guestGuide,
      title: t.pricing.guestGuideTitle,
      subtitle: t.pricing.guestGuideSub,
      features: t.pricing.guestGuideFeatures,
      badge: null,
    },
    {
      key: 'finance' as const,
      product: PRODUCTS.finance,
      title: t.pricing.financeTitle,
      subtitle: t.pricing.financeSub,
      features: t.pricing.financeFeatures,
      badge: null,
    },
    {
      key: 'hostKit' as const,
      product: PRODUCTS.hostKit,
      title: t.pricing.hostKitTitle,
      subtitle: t.pricing.hostKitSub,
      features: t.pricing.hostKitFeatures,
      badge: t.pricing.bestValue,
    },
  ];

  return (
    <section id="pricing" className="py-20 md:py-32 bg-[#0A0A0B] relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>{t.pricing.kicker}</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif-luxury font-light text-white tracking-tight leading-tight">
            {t.pricing.title}{' '}
            <span className="text-[#D4AF37] font-bold">{t.pricing.titleAccent}</span>
          </h2>
          <p className="mt-6 text-lg text-white/60 leading-relaxed">{t.pricing.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <article className="flex flex-col bg-[#0F0F10] border border-emerald-500/40 rounded-sm overflow-hidden shadow-2xl shadow-emerald-500/5">
            <div className="relative bg-[#141416] border-b border-white/10 px-4 pt-4 pb-3 sm:px-5 sm:pt-5">
              <span className="absolute top-3 right-3 z-10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-emerald-500 text-black rounded-sm shadow-md">
                {t.pricing.liteBadge}
              </span>
              <img
                src={MEDIA.productHostKit}
                alt={t.pricing.liteTitle}
                className="w-full h-44 sm:h-52 object-contain object-center"
              />
            </div>

            <div className="flex flex-col flex-1 p-6">
              <h3 className="text-xl font-serif-luxury text-white">{t.pricing.liteTitle}</h3>
              <p className="mt-2 text-sm text-white/55 leading-relaxed">{t.pricing.liteSub}</p>

              <div className="mt-5 flex items-end gap-3">
                <span className="text-4xl font-serif-luxury text-emerald-400">$0</span>
                <span className="text-[10px] uppercase tracking-wider text-emerald-400/80 font-bold pb-1 ml-auto">
                  {t.pricing.freeLabel}
                </span>
              </div>

              <ul className="mt-6 space-y-2.5 text-sm text-white/70 flex-1">
                {t.pricing.liteFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#try-lite"
                className="mt-8 w-full flex items-center justify-center gap-2 py-3.5 px-6 text-xs font-bold uppercase tracking-widest text-black bg-emerald-400 hover:bg-emerald-300 rounded-sm transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>{t.pricing.liteButton}</span>
              </a>
            </div>
          </article>

          {paidCards.map((card) => (
            <article
              key={card.key}
              className={`flex flex-col bg-[#0F0F10] border rounded-sm overflow-hidden shadow-2xl ${
                card.badge ? 'border-[#D4AF37]/60 glow-gold' : 'border-white/10'
              }`}
            >
              <div className="relative bg-[#141416] border-b border-white/10 px-4 pt-4 pb-3 sm:px-5 sm:pt-5">
                {card.badge && (
                  <span className="absolute top-3 right-3 z-10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-[#D4AF37] text-black rounded-sm shadow-md">
                    {card.badge}
                  </span>
                )}
                <img
                  src={productMedia[card.key]}
                  alt={card.title}
                  className="w-full h-44 sm:h-52 object-contain object-center"
                />
              </div>

              <div className="flex flex-col flex-1 p-6">
                <h3 className="text-xl font-serif-luxury text-white">{card.title}</h3>
                <p className="mt-2 text-sm text-white/55 leading-relaxed">{card.subtitle}</p>

                <div className="mt-5 flex items-end gap-3">
                  <span className="text-4xl font-serif-luxury text-white">{card.product.price}</span>
                  {card.product.compareAt && (
                    <span className="text-sm text-white/40 line-through pb-1">{card.product.compareAt}</span>
                  )}
                  <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-bold pb-1 ml-auto">
                    {t.pricing.oneTime}
                  </span>
                </div>

                <ul className="mt-6 space-y-2.5 text-sm text-white/70 flex-1">
                  {card.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={card.product.checkoutUrl}
                  className="mt-8 w-full flex items-center justify-center gap-2 py-3.5 px-6 text-xs font-bold uppercase tracking-widest text-black bg-[#D4AF37] hover:bg-white rounded-sm transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{t.pricing.buyButton} — {card.product.price}</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-white/40">
          <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
          <span>{t.pricing.guarantee}</span>
        </div>
      </div>
    </section>
  );
};
