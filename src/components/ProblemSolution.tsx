import React from 'react';
import { PRODUCTS, BRAND_INFO } from '../constants/data';
import { useLanguage } from '../context/LanguageContext';
import { Check, X, DollarSign, WifiOff, FileSpreadsheet, ShoppingBag } from 'lucide-react';

export const ProblemSolution: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="comparison" className="py-20 md:py-28 bg-[#0F0F10] relative border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-sm bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest mb-4">
            <DollarSign className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{t.problemSolution.kicker}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-light text-white tracking-tight">
            {t.problemSolution.title} <span className="text-[#D4AF37] font-bold">{t.problemSolution.titleAccent}</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/60">
            {t.problemSolution.subtitle}
          </p>
        </div>

        {/* 3 Core Pain Point Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#141416] border border-white/10 rounded-sm p-6 relative overflow-hidden group hover:border-[#D4AF37]/50 transition-colors">
            <div className="p-3 bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] rounded-sm w-fit mb-4">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif-luxury text-white">{t.problemSolution.cards[0].title}</h3>
            <p className="mt-2 text-xs text-white/60 leading-relaxed">
              {t.problemSolution.cards[0].desc}
            </p>
          </div>

          <div className="bg-[#141416] border border-white/10 rounded-sm p-6 relative overflow-hidden group hover:border-sky-500/40 transition-colors">
            <div className="p-3 bg-sky-500/10 border border-sky-500/20 text-sky-400 rounded-sm w-fit mb-4">
              <WifiOff className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif-luxury text-white">{t.problemSolution.cards[1].title}</h3>
            <p className="mt-2 text-xs text-white/60 leading-relaxed">
              {t.problemSolution.cards[1].desc}
            </p>
          </div>

          <div className="bg-[#141416] border border-white/10 rounded-sm p-6 relative overflow-hidden group hover:border-emerald-500/40 transition-colors">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-sm w-fit mb-4">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif-luxury text-white">{t.problemSolution.cards[2].title}</h3>
            <p className="mt-2 text-xs text-white/60 leading-relaxed">
              {t.problemSolution.cards[2].desc}
            </p>
          </div>
        </div>

        {/* High Contrast Comparison Table */}
        <div className="mt-16 bg-[#0A0A0B] rounded-sm border border-white/10 overflow-hidden shadow-2xl">
          <div className="p-6 sm:p-8 bg-[#141416] border-b border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-serif-luxury text-white">{t.problemSolution.tableTitle}</h3>
              <p className="text-xs text-white/50 mt-1">{t.problemSolution.subtitle}</p>
            </div>
            <a
              href={PRODUCTS.hostKit.checkoutUrl}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-black bg-[#D4AF37] hover:bg-white rounded-sm transition-colors shrink-0"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{t.nav.buyKit} — {BRAND_INFO.price}</span>
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-[#0F0F10] text-white/50 font-mono text-[11px] uppercase tracking-wider">
                  <th className="py-4 px-6 font-semibold">{t.problemSolution.colFeature}</th>
                  <th className="py-4 px-6 font-semibold text-white/40">{t.problemSolution.colSaas}</th>
                  <th className="py-4 px-6 font-semibold text-[#D4AF37] bg-[#D4AF37]/10 border-x border-[#D4AF37]/20">{t.problemSolution.colNogvia}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {t.comparisonData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 font-semibold text-white/80">
                      {row.feature}
                    </td>
                    <td className="py-4 px-6 text-white/40">
                      <div className="flex items-center gap-2">
                        <X className="w-4 h-4 text-red-400 shrink-0" />
                        <span>{row.saas}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-bold text-white bg-[#D4AF37]/5 border-x border-[#D4AF37]/20">
                      <div className="flex items-center gap-2 text-[#D4AF37]">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{row.nogvia}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

