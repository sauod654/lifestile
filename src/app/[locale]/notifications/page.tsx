'use client';

import { useTranslations, useLocale } from 'next-intl';
import DashboardLayout from '@/components/DashboardLayout';

export default function NotificationsPage() {
  const t = useTranslations('Notifications');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  return (
    <DashboardLayout role="employee">
      <main className="flex-grow pb-32 px-5 max-w-4xl mx-auto w-full">
        {/* Editorial Header Section */}
        <section className="mb-12 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
            <div className="text-start">
              <span className="text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-2 block">{t('subtitle')}</span>
              <h1 className="text-6xl font-black text-primary tracking-tighter leading-none font-headline uppercase">{t('title')}</h1>
            </div>
            <button className="text-primary font-bold text-xs py-3 px-6 bg-primary/5 rounded-2xl hover:bg-primary/10 transition-colors uppercase tracking-widest">
              {t('mark_all_read')}
            </button>
          </div>
          
          {/* Filter Chips */}
          <div className={`flex flex-wrap gap-3 pb-2 scrollbar-hide ${isRtl ? 'flex-row-reverse' : ''}`}>
            <button className="px-8 py-3 rounded-full text-xs font-black bg-primary text-white shadow-lg shadow-primary/20 uppercase tracking-widest">
              {t('filters.all')}
            </button>
            {['health', 'system', 'rewards'].map((filter) => (
              <button key={filter} className="px-8 py-3 rounded-full text-xs font-bold bg-surface-container-low text-secondary hover:bg-surface-container-high transition-all uppercase tracking-widest">
                {t(`filters.${filter}`)}
              </button>
            ))}
          </div>
        </section>

        {/* Notification List */}
        <div className="space-y-10">
          {/* Category: Health Alerts */}
          <div className="space-y-6">
            <h2 className={`text-[10px] font-black text-outline uppercase tracking-[0.3em] px-1 ${isRtl ? 'text-right' : 'text-left'}`}>
              {t('categories.health')}
            </h2>
            <div className="space-y-4">
              {/* Urgent Alert */}
              <div className="bg-surface-container-lowest p-6 rounded-[2.5rem] shadow-[0_8px_48px_rgba(0,31,40,0.04)] flex gap-6 items-start relative overflow-hidden group border border-outline-variant/10">
                <div className={`absolute top-0 bottom-0 w-1.5 bg-error ${isRtl ? 'right-0' : 'left-0'}`}></div>
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-error-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-error-container text-3xl" style={{fontVariationSettings: "'FILL' 1"}}>monitor_heart</span>
                </div>
                <div className="flex-grow text-start">
                  <div className={`flex justify-between items-start mb-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <h3 className="font-black text-primary text-xl tracking-tight">{t('items.critical_vitals')}</h3>
                    <span className="text-[10px] text-outline font-black uppercase tracking-widest">2m ago</span>
                  </div>
                  <p className="text-secondary font-medium leading-relaxed">{t('items.critical_desc')}</p>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-6 rounded-[2.5rem] shadow-[0_8px_48px_rgba(0,31,40,0.04)] flex gap-6 items-start border border-outline-variant/10">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-primary-container/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-3xl">vaccines</span>
                </div>
                <div className="flex-grow text-start">
                  <div className={`flex justify-between items-start mb-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <h3 className="font-black text-primary text-xl tracking-tight">{t('items.supply')}</h3>
                    <span className="text-[10px] text-outline font-black uppercase tracking-widest">1h ago</span>
                  </div>
                  <p className="text-secondary font-medium leading-relaxed">{t('items.supply_desc')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Category: System Updates */}
          <div className="space-y-6">
            <h2 className={`text-[10px] font-black text-outline uppercase tracking-[0.3em] px-1 ${isRtl ? 'text-right' : 'text-left'}`}>
              {t('categories.system')}
            </h2>
            <div className="space-y-4">
              <div className="bg-surface-container-high/40 backdrop-blur-md p-6 rounded-[2.5rem] flex gap-6 items-start border border-white/20">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-surface-container-lowest flex items-center justify-center text-secondary shadow-sm">
                  <span className="material-symbols-outlined text-3xl">terminal</span>
                </div>
                <div className="flex-grow text-start">
                  <div className={`flex justify-between items-start mb-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <h3 className="font-black text-primary text-xl tracking-tight">{t('items.maintenance')}</h3>
                    <span className="text-[10px] text-outline font-black uppercase tracking-widest">3h ago</span>
                  </div>
                  <p className="text-secondary font-medium leading-relaxed">{t('items.maintenance_desc')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Category: Rewards */}
          <div className="space-y-6">
            <h2 className={`text-[10px] font-black text-outline uppercase tracking-[0.3em] px-1 ${isRtl ? 'text-right' : 'text-left'}`}>
              {t('categories.rewards')}
            </h2>
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-tertiary to-primary-container p-8 rounded-[3rem] shadow-xl shadow-tertiary/20 flex gap-6 items-start group relative overflow-hidden">
                <div className="w-16 h-16 shrink-0 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-4xl" style={{fontVariationSettings: "'FILL' 1"}}>stars</span>
                </div>
                <div className="flex-grow text-start relative z-10">
                  <div className={`flex justify-between items-start mb-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <h3 className="font-black text-white text-2xl tracking-tighter">{t('items.elite')}</h3>
                    <span className="text-[10px] text-white/60 font-black uppercase tracking-widest">{isRtl ? 'أمس' : 'Yesterday'}</span>
                  </div>
                  <p className="text-white/80 font-medium leading-relaxed text-lg">{t('items.elite_desc')}</p>
                  <button className={`mt-6 inline-flex items-center gap-2 text-xs font-black text-tertiary-fixed px-6 py-3 bg-white/10 hover:bg-white/20 transition-all rounded-full uppercase tracking-widest ${isRtl ? 'flex-row-reverse' : ''}`}>
                    {t('items.claim')}
                    <span className={`material-symbols-outlined text-lg ${isRtl ? 'rotate-180' : ''}`}>arrow_forward</span>
                  </button>
                </div>
                {/* Decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}
