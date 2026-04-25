'use client';

import { useTranslations, useLocale } from 'next-intl';
import DashboardLayout from '@/components/DashboardLayout';
import { Link } from '@/i18n/routing';

export default function SupportPage() {
  const t = useTranslations('SupportFAQs');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  return (
    <DashboardLayout role="employee">
      <main className="flex-1 min-h-screen flex flex-col relative z-10">
        <div className="flex-1 p-6 md:p-12 lg:p-16 max-w-7xl mx-auto w-full space-y-12">
          {/* Page Header */}
          <div className={`space-y-2 ${isRtl ? 'text-right' : 'text-left'}`}>
            <h2 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight uppercase">{t('title')}</h2>
            <p className="font-body text-secondary text-lg max-w-2xl opacity-80">{t('desc')}</p>
          </div>

          {/* Emergency & Quick Actions Grid */}
          <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 ${isRtl ? 'text-right' : 'text-left'}`}>
            {/* Emergency Call Card */}
            <div className={`lg:col-span-2 bg-error-container rounded-[2rem] p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden group ${isRtl ? 'sm:flex-row-reverse' : ''}`}>
              <div className={`absolute -top-12 w-64 h-64 bg-error opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity duration-500 ${isRtl ? '-left-12 -ml-20' : '-right-12 -mr-20'}`}></div>
              <div className="space-y-4 relative z-10 flex-1">
                <div className={`inline-flex items-center gap-2 bg-on-error-container/10 px-3 py-1 rounded-full text-on-error-container text-xs font-black uppercase tracking-widest ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>emergency</span>
                  {t('critical')}
                </div>
                <h3 className="font-headline text-2xl font-black tracking-tighter uppercase text-on-error-container">{t('emergency_title')}</h3>
                <p className="font-medium text-on-error-container/80 max-w-md">{t('emergency_desc')}</p>
              </div>
              <button onClick={() => alert(isRtl ? 'جاري الاتصال...' : 'Dialing...')} className={`relative z-10 flex-shrink-0 bg-error text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-3 hover:bg-error/90 transition-all shadow-xl shadow-error/20 active:scale-95 duration-200 ${isRtl ? 'flex-row-reverse' : ''}`}>
                <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>phone_in_talk</span>
                {t('dial')}
              </button>
            </div>

            {/* Secondary Quick Action */}
            <div className="bg-surface-container-lowest rounded-[2rem] p-8 flex flex-col justify-between relative overflow-hidden group hover:bg-surface-container-low transition-colors duration-300 shadow-[0_24px_48px_-12px_rgba(0,31,40,0.08)]">
              <div className="space-y-4 relative z-10">
                <div className="w-16 h-16 bg-primary-container/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-3xl" style={{fontVariationSettings: "'FILL' 1"}}>support_agent</span>
                </div>
                <h3 className="font-headline text-2xl font-black tracking-tighter uppercase text-primary">{t('standard_title')}</h3>
                <p className="font-medium text-secondary text-sm leading-relaxed">{t('standard_desc')}</p>
              </div>
              <Link href="/support/ticket" className={`mt-8 w-full bg-surface-container-highest text-primary px-4 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-surface-dim transition-colors flex items-center justify-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                {t('open_ticket')}
                <span className={`material-symbols-outlined text-sm ${isRtl ? 'rotate-180' : ''}`}>arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* FAQs Section */}
          <div className="space-y-8 pt-8">
            <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 ${isRtl ? 'sm:flex-row-reverse text-right' : 'text-left'}`}>
              <div className="space-y-2">
                <h3 className="font-headline text-3xl font-black tracking-tighter uppercase text-primary">{t('knowledge_title')}</h3>
                <p className="font-medium text-secondary">{t('knowledge_desc')}</p>
              </div>
              <div className="relative w-full sm:w-80">
                <span className={`material-symbols-outlined absolute top-1/2 -translate-y-1/2 text-outline ${isRtl ? 'right-4' : 'left-4'}`}>search</span>
                <input 
                  type="text" 
                  placeholder={t('search')}
                  className={`w-full bg-surface-container-high border-none rounded-2xl py-3.5 font-bold text-primary placeholder:text-outline focus:ring-2 focus:ring-primary/20 transition-all ${isRtl ? 'pr-12 pl-4' : 'pl-12 pr-4'}`}
                />
              </div>
            </div>

            {/* FAQ Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Security */}
              <div className={`bg-surface-container-lowest rounded-[2rem] p-8 hover:bg-surface-container-low transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl border border-outline-variant/10 ${isRtl ? 'text-right' : 'text-left'}`}>
                <div className={`flex items-center gap-4 mb-6 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <div className="w-12 h-12 rounded-2xl bg-secondary-container text-on-secondary-container flex items-center justify-center">
                    <span className="material-symbols-outlined">security</span>
                  </div>
                  <h4 className="font-headline font-black text-xl text-primary">{t('sec_title')}</h4>
                </div>
                <ul className="space-y-4 font-medium text-secondary text-sm">
                  {[1, 2, 3].map(i => (
                    <li key={i} className={`hover:text-primary transition-colors flex items-start gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <span className="material-symbols-outlined text-[16px] mt-0.5 opacity-50">article</span>
                      {t(`sec_${i}` as any)}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Health Logs */}
              <div className={`bg-surface-container-lowest rounded-[2rem] p-8 hover:bg-surface-container-low transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl border border-outline-variant/10 ${isRtl ? 'text-right' : 'text-left'}`}>
                <div className={`flex items-center gap-4 mb-6 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <div className="w-12 h-12 rounded-2xl bg-tertiary-container text-on-tertiary-container flex items-center justify-center">
                    <span className="material-symbols-outlined">monitor_heart</span>
                  </div>
                  <h4 className="font-headline font-black text-xl text-primary">{t('health_title')}</h4>
                </div>
                <ul className="space-y-4 font-medium text-secondary text-sm">
                  {[1, 2, 3].map(i => (
                    <li key={i} className={`hover:text-primary transition-colors flex items-start gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <span className="material-symbols-outlined text-[16px] mt-0.5 opacity-50">article</span>
                      {t(`health_${i}` as any)}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Reports */}
              <div className={`bg-surface-container-lowest rounded-[2rem] p-8 hover:bg-surface-container-low transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl border border-outline-variant/10 ${isRtl ? 'text-right' : 'text-left'}`}>
                <div className={`flex items-center gap-4 mb-6 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <div className="w-12 h-12 rounded-2xl bg-primary-container text-on-primary-container flex items-center justify-center">
                    <span className="material-symbols-outlined">analytics</span>
                  </div>
                  <h4 className="font-headline font-black text-xl text-primary">{t('rep_title')}</h4>
                </div>
                <ul className="space-y-4 font-medium text-secondary text-sm">
                  {[1, 2, 3].map(i => (
                    <li key={i} className={`hover:text-primary transition-colors flex items-start gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <span className="material-symbols-outlined text-[16px] mt-0.5 opacity-50">article</span>
                      {t(`rep_${i}` as any)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-center mt-12 gap-4">
              <button className={`bg-surface-container-highest text-primary px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-surface-dim transition-colors flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                {t('view_all')}
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </button>
              <Link href="/support/chat" className={`primary-gradient-glow text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                <span className="material-symbols-outlined text-sm">chat_bubble</span>
                {t('support_chat_btn')}
              </Link>
            </div>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}
