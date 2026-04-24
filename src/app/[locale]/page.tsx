'use client';

import {useTranslations, useLocale} from 'next-intl';
import {Link, usePathname} from '@/i18n/routing';

export default function HomePage() {
  const t = useTranslations('Index');
  const locale = useLocale();
  const pathname = usePathname();
  const isRTL = locale === 'ar';

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body selection:bg-primary/20 overflow-x-hidden">
      {/* Dynamic Background Mesh */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-tertiary-fixed/20 blur-[120px] rounded-full"></div>
      </div>

      {/* Navigation Header */}
      <header className="relative z-10 max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 signature-gradient rounded-xl flex items-center justify-center text-white shadow-lg">
            <span className="material-symbols-outlined font-bold">clinical_notes</span>
          </div>
          <span className="text-2xl font-black tracking-tighter text-primary font-headline uppercase">LIFESTILE</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center bg-surface-container-low/50 backdrop-blur-md rounded-full p-1 border-none shadow-sm">
            <Link href="/" locale="ar" className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all ${locale === 'ar' ? 'signature-gradient text-white shadow-md' : 'text-secondary hover:text-primary'}`}>العربية</Link>
            <Link href="/" locale="en" className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all ${locale === 'en' ? 'signature-gradient text-white shadow-md' : 'text-secondary hover:text-primary'}`}>ENGLISH</Link>
          </div>
          <button className="md:hidden p-2 text-secondary hover:bg-surface-container-high rounded-lg">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-32">
        <div className="text-center max-w-3xl mx-auto mb-24 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Clinical Atelier v1.0
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-primary font-headline leading-[1.1] tracking-tight">
            {t('title')}
          </h1>
          <p className="text-xl text-secondary font-medium leading-relaxed max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
          <div className="pt-8">
            <button className="primary-gradient-glow text-white px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-all group">
              {t('get_started')}
              <span className={`material-symbols-outlined align-middle ${isRTL ? 'mr-2' : 'ml-2'} group-hover:translate-x-1 transition-transform`}>
                {isRTL ? 'arrow_back' : 'arrow_forward'}
              </span>
            </button>
          </div>
        </div>

        {/* Portal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Medical Portal */}
          <Link href="/medical-login" className="group bg-surface-container-low p-10 rounded-[3rem] border-none cloud-shadow hover:-translate-y-2 transition-all duration-500">
            <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center text-primary mb-10 group-hover:scale-110 group-hover:signature-gradient group-hover:text-white transition-all duration-500">
              <span className="material-symbols-outlined text-4xl">medical_services</span>
            </div>
            <h3 className="text-3xl font-black text-primary mb-4 font-headline">{t('medical_portal')}</h3>
            <p className="text-secondary font-medium leading-relaxed mb-10 text-lg">
              {t('medical_desc')}
            </p>
            <div className={`flex items-center gap-2 text-primary font-black text-sm uppercase tracking-wider ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span>Explore Portal</span>
              <span className="material-symbols-outlined text-lg">north_east</span>
            </div>
          </Link>

          {/* Supplier Portal */}
          <Link href="/supplier-login" className="group bg-surface-container-low p-10 rounded-[3rem] border-none cloud-shadow hover:-translate-y-2 transition-all duration-500">
            <div className="w-20 h-20 bg-tertiary/10 rounded-[2rem] flex items-center justify-center text-tertiary mb-10 group-hover:scale-110 group-hover:bg-tertiary group-hover:text-white transition-all duration-500">
              <span className="material-symbols-outlined text-4xl">local_shipping</span>
            </div>
            <h3 className="text-3xl font-black text-primary mb-4 font-headline">{t('supplier_portal')}</h3>
            <p className="text-secondary font-medium leading-relaxed mb-10 text-lg">
              {t('supplier_desc')}
            </p>
            <div className={`flex items-center gap-2 text-tertiary font-black text-sm uppercase tracking-wider ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span>Access Inventory</span>
              <span className="material-symbols-outlined text-lg">north_east</span>
            </div>
          </Link>

          {/* Employee Portal */}
          <Link href="/employee-login" className="group bg-surface-container-low p-10 rounded-[3rem] border-none cloud-shadow hover:-translate-y-2 transition-all duration-500">
            <div className="w-20 h-20 bg-secondary/10 rounded-[2rem] flex items-center justify-center text-secondary mb-10 group-hover:scale-110 group-hover:bg-secondary group-hover:text-white transition-all duration-500">
              <span className="material-symbols-outlined text-4xl">badge</span>
            </div>
            <h3 className="text-3xl font-black text-primary mb-4 font-headline">{t('employee_portal')}</h3>
            <p className="text-secondary font-medium leading-relaxed mb-10 text-lg">
              {t('employee_desc')}
            </p>
            <div className={`flex items-center gap-2 text-secondary font-black text-sm uppercase tracking-wider ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span>Internal Tools</span>
              <span className="material-symbols-outlined text-lg">north_east</span>
            </div>
          </Link>
        </div>

        {/* Social Proof */}
        <div className="mt-40 pt-16 border-t border-surface-container-high text-center">
          <p className="text-[10px] font-black text-outline uppercase tracking-[0.4em] mb-12">
            {t('trusted_by')}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-20 gap-y-12 opacity-20 grayscale contrast-150">
            <div className="text-3xl font-black tracking-tighter text-primary">EDITORIAL.TRUST</div>
            <div className="text-3xl font-bold text-primary">CLINICAL.LAB</div>
            <div className="text-3xl font-black italic text-primary">nexus</div>
            <div className="text-3xl font-serif italic text-primary">Atelier</div>
            <div className="text-3xl font-mono text-primary">SUPPLY_LOGIC</div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-16 text-center text-secondary text-sm font-medium bg-surface-container-lowest/50">
        <div className="flex justify-center gap-12 mb-6">
          <a className="hover:text-primary transition-colors cursor-pointer uppercase tracking-widest text-[10px] font-black">Privacy</a>
          <a className="hover:text-primary transition-colors cursor-pointer uppercase tracking-widest text-[10px] font-black">Terms</a>
          <a className="hover:text-primary transition-colors cursor-pointer uppercase tracking-widest text-[10px] font-black">Security</a>
        </div>
        <p className="text-outline uppercase tracking-tight font-bold">&copy; 2024 Lifestile Unified Healthcare. Built with precision.</p>
      </footer>
    </div>
  );
}
