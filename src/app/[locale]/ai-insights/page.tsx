'use client';

import { useTranslations, useLocale } from 'next-intl';
import DashboardLayout from '@/components/DashboardLayout';

export default function AIInsightsPage() {
  const t = useTranslations('AIInsights');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <DashboardLayout role="medical">
      {/* Page Header */}
      <div className={`flex justify-between items-end ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className={isRTL ? 'text-right' : 'text-left'}>
          <span className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-2 block">{t('subtitle')}</span>
          <h2 className="font-headline text-4xl font-extrabold text-on-background tracking-tight">{t('title')}</h2>
        </div>
        <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span className="flex items-center gap-1.5 px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed rounded-full text-xs font-semibold">
            <span className="material-symbols-outlined text-sm fill-1">fiber_manual_record</span>
            {t('live_system')}
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 bg-surface-container-high rounded-full text-xs font-medium">
            {t('last_updated')}: 2m ago
          </span>
        </div>
      </div>

      {/* Main Bento Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Prediction Trends */}
        <section className="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-3xl p-8 clinical-shadow relative overflow-hidden min-h-[400px]">
          <div className={`flex justify-between items-start mb-10 ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}>
            <div>
              <h3 className="font-headline text-xl font-bold text-on-surface">{t('prediction_trends')}</h3>
              <p className="text-sm text-outline mt-1">{t('prediction_desc')}</p>
            </div>
            <div className="flex bg-surface-container-low p-1 rounded-xl" dir="ltr">
              <button className="px-4 py-1.5 bg-white rounded-lg text-xs font-bold shadow-sm">Probability</button>
              <button className="px-4 py-1.5 text-xs text-outline font-bold">Severity</button>
            </div>
          </div>
          
          {/* Chart Visual */}
          <div className="relative h-64 w-full flex items-end gap-1 px-4" dir="ltr">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-5">
              {[1, 2, 3, 4].map((i) => <div key={i} className="w-full border-t border-on-surface"></div>)}
            </div>
            <div className="flex-1 h-[40%] bg-surface-container-high rounded-t-lg transition-all hover:bg-primary-fixed-dim"></div>
            <div className="flex-1 h-[45%] bg-surface-container-high rounded-t-lg transition-all hover:bg-primary-fixed-dim"></div>
            <div className="flex-1 h-[55%] bg-surface-container-high rounded-t-lg transition-all hover:bg-primary-fixed-dim"></div>
            <div className="flex-1 h-[65%] bg-surface-container-high rounded-t-lg transition-all hover:bg-primary-fixed-dim"></div>
            <div className="flex-1 h-[60%] bg-surface-container-high rounded-t-lg transition-all hover:bg-primary-fixed-dim"></div>
            <div className="flex-1 h-[75%] bg-primary rounded-t-lg relative group">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-on-surface text-white text-[10px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">Today</div>
            </div>
            <div className="flex-1 h-[70%] bg-primary-container/40 border-t-2 border-dashed border-primary-container rounded-t-lg"></div>
            <div className="flex-1 h-[65%] bg-primary-container/30 border-t-2 border-dashed border-primary-container rounded-t-lg"></div>
            <div className="flex-1 h-[58%] bg-primary-container/20 border-t-2 border-dashed border-primary-container rounded-t-lg"></div>
          </div>

          <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-outline-variant/10">
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <p className="text-[10px] uppercase font-bold text-outline">{t('confidence_score')}</p>
              <p className="text-2xl font-headline font-extrabold text-primary">94.2%</p>
              <p className="text-xs text-tertiary-container font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">trending_up</span> +2.1% from baseline
              </p>
            </div>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <p className="text-[10px] uppercase font-bold text-outline">{t('risk_vector')}</p>
              <p className="text-2xl font-headline font-extrabold text-primary">{isRTL ? 'القلب والأوعية' : 'Cardio-Vascular'}</p>
              <p className="text-xs text-outline font-medium">Primary concern: Hypertension</p>
            </div>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <p className="text-[10px] uppercase font-bold text-outline">{t('forecast_horizon')}</p>
              <p className="text-2xl font-headline font-extrabold text-primary">{isRTL ? '6 أشهر' : '6 Months'}</p>
              <p className="text-xs text-outline font-medium">Model: Atelier-V3 Neural</p>
            </div>
          </div>
        </section>

        {/* Priority Interventions */}
        <section className="col-span-12 lg:col-span-4 bg-primary-container text-white rounded-3xl p-8 clinical-shadow flex flex-col justify-between overflow-hidden relative">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
          <div>
            <div className={`flex items-center gap-2 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="material-symbols-outlined text-primary-fixed-dim fill-1">auto_awesome</span>
              <h3 className="font-headline text-lg font-bold">{t('interventions')}</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-white/10 p-4 rounded-2xl hover:bg-white/15 transition-colors cursor-pointer group">
                <div className={`flex justify-between items-start mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="text-[10px] bg-error-container text-on-error-container px-2 py-0.5 rounded-full font-bold">URGENT</span>
                  <span className={`material-symbols-outlined text-white/40 group-hover:text-white transition-colors ${isRTL ? 'rotate-180' : ''}`}>arrow_forward</span>
                </div>
                <p className={`text-sm font-semibold ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'فحص القلب الفوري' : 'Immediate Cardiac Screening'}</p>
              </div>
            </div>
          </div>
          <button className={`mt-8 w-full py-4 bg-white text-primary rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all ${isRTL ? 'flex-row-reverse' : ''}`}>
            {t('execute_all')}
            <span className="material-symbols-outlined text-sm fill-1">play_arrow</span>
          </button>
        </section>

        {/* Risk Stratification Table */}
        <section className="col-span-12 lg:col-span-7 bg-surface-container-lowest rounded-3xl p-8 clinical-shadow">
          <div className={`flex justify-between items-center mb-8 ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}>
            <h3 className="font-headline text-xl font-bold text-on-surface">{t('risk_stratification')}</h3>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-surface-container-low text-xs font-medium rounded-lg border border-outline-variant/10">High Risk (12)</span>
            </div>
          </div>
          <div className="overflow-hidden">
            <table className={`w-full ${isRTL ? 'text-right' : 'text-left'}`}>
              <thead>
                <tr className="text-[10px] uppercase tracking-widest text-outline border-b border-outline-variant/10">
                  <th className="pb-4 font-bold">Patient / ID</th>
                  <th className="pb-4 font-bold text-center">{t('ai_score')}</th>
                  <th className="pb-4 font-bold">{t('primary_reason')}</th>
                  <th className={`pb-4 font-bold ${isRTL ? 'text-left' : 'text-right'}`}>{t('col_actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/5">
                <tr className="group hover:bg-surface-container-low/40 transition-colors">
                  <td className="py-4">
                    <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className="w-10 h-10 bg-error-container/30 text-error rounded-xl flex items-center justify-center font-bold text-xs">MA</div>
                      <div>
                        <p className="text-sm font-bold text-on-surface">Mariam Al-Sayed</p>
                        <p className="text-[10px] text-outline">ID: #8829-X</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex flex-col items-center">
                      <span className="text-sm font-extrabold text-error">92</span>
                      <div className="w-12 h-1 bg-surface-container-high rounded-full overflow-hidden mt-1">
                        <div className="h-full bg-error w-[92%]"></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-xs font-medium text-on-surface-variant">Rapid HbA1c elevation + sedentary spikes</td>
                  <td className={`py-4 ${isRTL ? 'text-left' : 'text-right'}`}>
                    <button className="text-[10px] font-bold text-primary hover:underline">SCHEDULE ASAP</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Projections */}
        <section className="col-span-12 lg:col-span-5 grid grid-rows-2 gap-6">
           <div className="bg-surface-container-lowest rounded-3xl p-6 clinical-shadow flex flex-col justify-between">
            <div className={`flex justify-between items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <h4 className="text-sm font-bold text-on-surface">{t('projection_bp')}</h4>
                <p className="text-[10px] text-outline">Mean arterial forecast for High-Risk cohort</p>
              </div>
              <span className="material-symbols-outlined text-error">show_chart</span>
            </div>
            <div className="flex items-end gap-1 h-20 px-2" dir="ltr">
              {[40, 45, 50, 75, 85, 90].map((h, i) => (
                <div key={i} className={`flex-1 rounded-t-sm ${i < 3 ? 'bg-outline-variant/20' : i < 5 ? 'bg-error/40' : 'bg-error'}`} style={{ height: `${h}%` }}></div>
              ))}
            </div>
          </div>
          <div className="bg-surface-container-lowest rounded-3xl p-6 clinical-shadow flex flex-col justify-between">
            <div className={`flex justify-between items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <h4 className="text-sm font-bold text-on-surface">{t('projection_hr')}</h4>
                <p className="text-[10px] text-outline">Global population recovery average</p>
              </div>
              <span className="material-symbols-outlined text-tertiary">favorite</span>
            </div>
            <div className="flex items-end gap-1 h-20 px-2" dir="ltr">
              {[80, 75, 70, 65, 60, 55].map((h, i) => (
                <div key={i} className={`flex-1 rounded-t-sm ${i < 3 ? 'bg-outline-variant/20' : i < 5 ? 'bg-tertiary/40' : 'bg-tertiary'}`} style={{ height: `${h}%` }}></div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
