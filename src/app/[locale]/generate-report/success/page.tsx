'use client';

import { useTranslations, useLocale } from 'next-intl';
import DashboardLayout from '@/components/DashboardLayout';
import { Link } from '@/i18n/routing';

export default function ReportSuccessPage() {
  const t = useTranslations('ReportSuccess');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  return (
    <DashboardLayout role="employee">
      <main className="w-full max-w-2xl mx-auto flex flex-col gap-8 min-h-[calc(100vh-100px)] justify-center py-12 px-6">
        {/* Header Section */}
        <header className="flex flex-col items-center text-center space-y-6">
          <div className="w-24 h-24 bg-surface-container-highest rounded-full flex items-center justify-center mb-2 shadow-[0_12px_24px_-8px_rgba(0,31,40,0.06)] relative overflow-hidden">
            <div className="absolute inset-0 bg-primary opacity-10"></div>
            <span className="material-symbols-outlined text-5xl text-primary" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
          </div>
          <h1 className="font-headline text-5xl font-black tracking-tighter uppercase text-primary">{t('title')}</h1>
          <div className={`bg-surface-container-low px-5 py-3 rounded-2xl flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <span className="text-secondary font-black text-xs uppercase tracking-widest">{t('id')}</span>
            <span className="font-mono text-primary font-bold tracking-wider text-sm">MED-RPT-8820A</span>
          </div>
        </header>

        {/* Main Actions Card */}
        <section className="bg-surface-container-lowest rounded-[2rem] p-10 shadow-[0_24px_48px_-12px_rgba(0,31,40,0.08)] flex flex-col gap-8 border border-outline-variant/10">
          {/* Download Section */}
          <div className="space-y-6">
            <h2 className={`font-headline text-2xl font-black text-primary uppercase tracking-tight ${isRtl ? 'text-right' : 'text-left'}`}>{t('download_options')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* PDF Button */}
              <button className={`flex items-center gap-4 p-5 bg-surface-container-low rounded-2xl hover:bg-surface-container-high transition-colors group text-left ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
                <div className="w-14 h-14 bg-error-container rounded-xl flex items-center justify-center text-on-error-container flex-shrink-0">
                  <span className="material-symbols-outlined text-3xl" style={{fontVariationSettings: "'FILL' 1"}}>picture_as_pdf</span>
                </div>
                <div className="flex-1">
                  <p className="font-black text-primary uppercase tracking-tight">{t('pdf')}</p>
                  <p className="text-[10px] font-bold text-secondary mt-1 uppercase tracking-widest">{t('pdf_sub')}</p>
                </div>
                <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">download</span>
              </button>
              
              {/* CSV Button */}
              <button className={`flex items-center gap-4 p-5 bg-surface-container-low rounded-2xl hover:bg-surface-container-high transition-colors group text-left ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
                <div className="w-14 h-14 bg-tertiary-container rounded-xl flex items-center justify-center text-on-tertiary-container flex-shrink-0">
                  <span className="material-symbols-outlined text-3xl" style={{fontVariationSettings: "'FILL' 1"}}>table_chart</span>
                </div>
                <div className="flex-1">
                  <p className="font-black text-primary uppercase tracking-tight">{t('csv')}</p>
                  <p className="text-[10px] font-bold text-secondary mt-1 uppercase tracking-widest">{t('csv_sub')}</p>
                </div>
                <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">download</span>
              </button>
            </div>
          </div>

          <div className="h-px bg-outline-variant/20 w-full my-2"></div>

          {/* Share Section */}
          <div className="space-y-6">
            <h2 className={`font-headline text-2xl font-black text-primary uppercase tracking-tight ${isRtl ? 'text-right' : 'text-left'}`}>{t('share')}</h2>
            <div className="flex flex-col gap-3">
              <button className={`flex items-center justify-between p-5 bg-surface-container-low rounded-2xl hover:bg-surface-container-high transition-colors w-full group ${isRtl ? 'flex-row-reverse' : ''}`}>
                <div className={`flex items-center gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-primary">
                    <span className="material-symbols-outlined">share</span>
                  </div>
                  <span className="font-black text-primary uppercase tracking-tight">{t('secure')}</span>
                </div>
                <span className={`material-symbols-outlined text-outline group-hover:text-primary transition-colors ${isRtl ? 'rotate-180' : ''}`}>chevron_right</span>
              </button>
              <button className={`flex items-center justify-between p-5 bg-surface-container-low rounded-2xl hover:bg-surface-container-high transition-colors w-full group ${isRtl ? 'flex-row-reverse' : ''}`}>
                <div className={`flex items-center gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-primary">
                    <span className="material-symbols-outlined">mail</span>
                  </div>
                  <span className="font-black text-primary uppercase tracking-tight">{t('email')}</span>
                </div>
                <span className={`material-symbols-outlined text-outline group-hover:text-primary transition-colors ${isRtl ? 'rotate-180' : ''}`}>chevron_right</span>
              </button>
            </div>
          </div>
        </section>

        {/* Footer Actions & Security Notice */}
        <footer className="flex flex-col items-center gap-8 mt-4">
          <div className={`flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-sm border border-outline-variant/10 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <span className="material-symbols-outlined text-primary text-lg" style={{fontVariationSettings: "'FILL' 1"}}>lock</span>
            <span className="font-black text-[10px] uppercase tracking-widest text-secondary">{t('hipaa')}</span>
          </div>
          <Link 
            href="/employee-dashboard"
            className={`inline-flex items-center justify-center gap-2 px-8 py-4 bg-surface-container-highest text-primary font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-surface-dim transition-colors ${isRtl ? 'flex-row-reverse' : ''}`}
          >
            <span className={`material-symbols-outlined text-sm ${isRtl ? 'rotate-180' : ''}`}>arrow_back</span>
            {t('back')}
          </Link>
        </footer>
      </main>
    </DashboardLayout>
  );
}
