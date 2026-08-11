import React, { useState } from 'react';
import { PRODUCTS, PURCHASE_LINK_PROPS } from '../constants/data';
import { useLanguage } from '../context/LanguageContext';
import { ChevronDown, HelpCircle, ShoppingBag } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { t } = useLanguage();

  const categories = [
    { id: 'all', label: t.faq.allCat },
    { id: 'pricing', label: t.faq.priceCat },
    { id: 'installation', label: t.faq.instCat },
    { id: 'guest-guide', label: t.faq.guideCat },
    { id: 'finance', label: t.faq.finCat },
  ];

  const filteredFaqs =
    selectedCategory === 'all'
      ? t.faqData
      : t.faqData.filter((faq) => faq.category === selectedCategory);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 md:py-32 bg-[#0A0A0B] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-sm bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{t.faq.kicker}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-light text-white tracking-tight">
            {t.faq.title} <span className="text-[#D4AF37] font-bold">{t.faq.titleAccent}</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/60">
            {t.faq.subtitle}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setOpenIndex(0);
              }}
              className={`px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#D4AF37] text-black shadow-md'
                  : 'bg-[#0F0F10] text-white/60 hover:text-white border border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#0F0F10] border border-white/10 rounded-sm overflow-hidden transition-all duration-200 hover:border-white/20"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                >
                  <span className="text-base sm:text-lg font-serif-luxury text-white pr-4">
                    {faq.question}
                  </span>
                  <div
                    className={`p-2 rounded-sm bg-[#141416] border border-white/10 text-white/60 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#D4AF37] bg-[#D4AF37]/10 border-[#D4AF37]/30' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-sm sm:text-base text-white/70 border-t border-white/10 pt-4 leading-relaxed animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* FAQ Bottom Call to Action */}
        <div className="mt-14 p-8 bg-[#0F0F10] rounded-sm border border-white/10 text-center space-y-4 shadow-xl">
          <h3 className="text-xl font-serif-luxury text-white">{t.faq.ctaTitle}</h3>
          <p className="text-xs sm:text-sm text-white/60 max-w-md mx-auto">
            {t.faq.ctaSub}
          </p>
          <a
            href={PRODUCTS.hostKit.checkoutUrl}
            {...PURCHASE_LINK_PROPS}
            className="inline-flex items-center gap-2 px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-black bg-[#D4AF37] hover:bg-white rounded-sm shadow-lg transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{t.faq.buyButton}</span>
          </a>
        </div>
      </div>
    </section>
  );
};


