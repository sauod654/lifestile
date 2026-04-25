'use client';

import { useTranslations, useLocale } from 'next-intl';
import DashboardLayout from '@/components/DashboardLayout';

export default function VitalsHistoryPage() {
  const t = useTranslations('VitalsHistory');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  return (
    <DashboardLayout role="employee">
      <main className="pb-32 px-5 max-w-5xl mx-auto w-full">
        {/* Hero Summary Section */}
        <section className="mb-12 mt-8 text-start">
          <div className="mb-4">
            <span className="font-black text-[10px] uppercase tracking-[0.3em] text-secondary">{t('latest_assessment')}</span>
          </div>
          <div className={`flex items-baseline gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <h2 className="font-headline text-7xl font-black tracking-tighter text-primary leading-none">120/80</h2>
            <span className="font-headline text-2xl text-secondary font-black opacity-40 uppercase">mmHg</span>
          </div>
          <p className={`mt-4 font-body text-lg text-secondary font-bold flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]"></span>
            {t('optimal_range')}
          </p>
        </section>

        {/* Metric Switcher Chips */}
        <section className={`flex gap-4 overflow-x-auto no-scrollbar mb-12 ${isRtl ? 'flex-row-reverse' : ''}`}>
          <button className="flex-none px-10 py-4 bg-primary text-white rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/20 transition-all">
            {t('metrics.bp')}
          </button>
          <button className="flex-none px-10 py-4 bg-surface-container-low text-secondary rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-surface-container-high transition-colors">
            {t('metrics.sugar')}
          </button>
          <button className="flex-none px-10 py-4 bg-surface-container-low text-secondary rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-surface-container-high transition-colors">
            {t('metrics.bmi')}
          </button>
        </section>

        {/* Bento Grid for Chart and Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Editorial Chart Section */}
          <section className="lg:col-span-8 bg-surface-container-lowest rounded-[3.5rem] p-12 shadow-[0_32px_64px_-12px_rgba(0,31,40,0.06)] border border-outline-variant/10 relative overflow-hidden group">
            <div className={`flex justify-between items-end mb-12 relative z-10 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <div className="text-start">
                <h3 className="font-headline text-3xl font-black text-primary tracking-tighter uppercase">{t('weekly_trend')}</h3>
                <p className="font-body text-xs text-outline font-black uppercase tracking-widest mt-1">{t('last_7_points')}</p>
              </div>
              <div className={`flex items-center gap-2 text-primary bg-primary/5 px-4 py-2 rounded-full ${isRtl ? 'flex-row-reverse' : ''}`}>
                <span className="material-symbols-outlined text-xl" style={{fontVariationSettings: "'FILL' 1"}}>trending_down</span>
                <span className="font-black text-sm">-2.4%</span>
              </div>
            </div>

            {/* Stylized Bar Chart */}
            <div className="flex items-end justify-between h-64 gap-6 px-4 relative z-10">
              {[60, 75, 85, 65, 90, 70, 55].map((h, i) => (
                <div key={i} className="flex flex-col items-center gap-4 flex-1 group">
                  <div className="w-full bg-surface-container-low rounded-t-2xl relative overflow-hidden transition-all group-hover:bg-primary/10 cursor-pointer" style={{height: `${h}%`}}>
                    <div className={`absolute bottom-0 left-0 right-0 signature-gradient h-1/2 transition-opacity ${i === 2 ? 'opacity-100' : 'opacity-20 group-hover:opacity-40'}`}></div>
                  </div>
                  <span className={`font-black text-[10px] uppercase tracking-widest ${i === 2 ? 'text-primary' : 'text-outline'}`}>
                    {isRtl ? ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'][i] : ['S', 'M', 'T', 'W', 'T', 'F', 'S'][i]}
                  </span>
                </div>
              ))}
            </div>
            {/* Decoration */}
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors"></div>
          </section>

          {/* Log Section */}
          <section className="lg:col-span-4 flex flex-col">
            <div className={`flex justify-between items-center mb-8 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <h3 className="font-headline text-2xl font-black text-primary tracking-tighter uppercase">{t('log_title')}</h3>
              <button className="text-[10px] font-black text-primary hover:underline uppercase tracking-widest">{t('view_all')}</button>
            </div>
            
            <div className="space-y-4 flex-1">
              {[
                { val: '120/80', unit: 'mmHg', type: 'morning', time: 'today', active: true },
                { val: '118/79', unit: 'mmHg', type: 'evening', time: 'yesterday', active: false },
                { val: '122/82', unit: 'mmHg', type: 'clinical', time: 'Oct 24', active: false }
              ].map((log, idx) => (
                <div key={idx} className={`rounded-[2.5rem] p-6 flex items-center justify-between transition-all active:scale-[0.97] cursor-pointer group ${log.active ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'bg-surface-container-low text-primary hover:bg-surface-container-high'} ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex items-center gap-5 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${log.active ? 'bg-white/20' : 'bg-white shadow-sm'}`}>
                      <span className="material-symbols-outlined text-2xl">
                        {log.type === 'clinical' ? 'event_note' : log.type === 'evening' ? 'history' : 'monitor_heart'}
                      </span>
                    </div>
                    <div className="text-start">
                      <p className="font-black text-xl tracking-tight leading-none mb-1">{log.val} <span className="text-[10px] opacity-60">{log.unit}</span></p>
                      <p className={`font-bold text-[10px] uppercase tracking-widest opacity-60`}>
                        {t(`checkups.${log.type}`)} • {log.time === 'today' || log.time === 'yesterday' ? t(log.time) : log.time}
                      </p>
                    </div>
                  </div>
                  <span className={`material-symbols-outlined text-xl transition-transform ${isRtl ? 'group-hover:-translate-x-2 rotate-180' : 'group-hover:translate-x-2'}`}>chevron_right</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </DashboardLayout>
  );
}
