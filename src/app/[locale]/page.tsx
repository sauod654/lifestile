'use client';

import {useTranslations, useLocale} from 'next-intl';
import {Link, usePathname} from '@/i18n/routing';

export default function HomePage() {
  const t = useTranslations('Index');
  const locale = useLocale();
  const pathname = usePathname();
  const isRTL = locale === 'ar';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-primary/20 overflow-x-hidden">
      {/* Dynamic Background Mesh */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-teal-200/30 blur-[120px] rounded-full"></div>
      </div>

      {/* Navigation Header */}
      <header className="relative z-10 max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined font-bold">clinical_notes</span>
          </div>
          <span className="text-2xl font-black tracking-tighter text-teal-950 font-headline">LIFESTILE</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center bg-white/50 backdrop-blur-md rounded-full p-1 border border-slate-200 shadow-sm">
            <Link href="/" locale="ar" className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all ${locale === 'ar' ? 'bg-primary text-white shadow-md' : 'text-slate-500 hover:text-primary'}`}>العربية</Link>
            <Link href="/" locale="en" className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all ${locale === 'en' ? 'bg-primary text-white shadow-md' : 'text-slate-500 hover:text-primary'}`}>ENGLISH</Link>
          </div>
          <button className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-32">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Clinical Atelier v1.0
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-teal-950 font-headline leading-[1.1] tracking-tight">
            {t('title')}
          </h1>
          <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
          <div className="pt-6">
            <button className="bg-teal-950 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-teal-900 transition-all clinical-shadow group">
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
          <Link href="/medical-login" className="group bg-white/70 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white shadow-2xl shadow-slate-200/50 hover:shadow-primary/20 hover:-translate-y-2 transition-all duration-500">
            <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
              <span className="material-symbols-outlined text-4xl">medical_services</span>
            </div>
            <h3 className="text-2xl font-bold text-teal-950 mb-4 font-headline">{t('medical_portal')}</h3>
            <p className="text-slate-500 font-medium leading-relaxed mb-8">
              {t('medical_desc')}
            </p>
            <div className={`flex items-center gap-2 text-primary font-bold text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span>Explore Portal</span>
              <span className="material-symbols-outlined text-lg">north_east</span>
            </div>
          </Link>

          {/* Supplier Portal */}
          <Link href="/supplier-login" className="group bg-white/70 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white shadow-2xl shadow-slate-200/50 hover:shadow-teal-400/20 hover:-translate-y-2 transition-all duration-500">
            <div className="w-16 h-16 bg-teal-100 rounded-3xl flex items-center justify-center text-teal-600 mb-8 group-hover:scale-110 group-hover:bg-teal-600 group-hover:text-white transition-all duration-500">
              <span className="material-symbols-outlined text-4xl">local_shipping</span>
            </div>
            <h3 className="text-2xl font-bold text-teal-950 mb-4 font-headline">{t('supplier_portal')}</h3>
            <p className="text-slate-500 font-medium leading-relaxed mb-8">
              {t('supplier_desc')}
            </p>
            <div className={`flex items-center gap-2 text-teal-600 font-bold text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span>Access Inventory</span>
              <span className="material-symbols-outlined text-lg">north_east</span>
            </div>
          </Link>

          {/* Employee Portal */}
          <Link href="/employee-login" className="group bg-white/70 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white shadow-2xl shadow-slate-200/50 hover:shadow-indigo-400/20 hover:-translate-y-2 transition-all duration-500">
            <div className="w-16 h-16 bg-indigo-100 rounded-3xl flex items-center justify-center text-indigo-600 mb-8 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
              <span className="material-symbols-outlined text-4xl">badge</span>
            </div>
            <h3 className="text-2xl font-bold text-teal-950 mb-4 font-headline">{t('employee_portal')}</h3>
            <p className="text-slate-500 font-medium leading-relaxed mb-8">
              {t('employee_desc')}
            </p>
            <div className={`flex items-center gap-2 text-indigo-600 font-bold text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span>Internal Tools</span>
              <span className="material-symbols-outlined text-lg">north_east</span>
            </div>
          </Link>
        </div>

        {/* Social Proof */}
        <div className="mt-32 pt-12 border-t border-slate-200 text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mb-12">
            {t('trusted_by')}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-10 opacity-30 grayscale contrast-125">
            <div className="text-2xl font-black tracking-tighter">EDITORIAL.TRUST</div>
            <div className="text-2xl font-bold">CLINICAL.LAB</div>
            <div className="text-2xl font-black italic">nexus</div>
            <div className="text-2xl font-serif italic">Atelier</div>
            <div className="text-2xl font-mono">SUPPLY_LOGIC</div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-12 text-center text-slate-400 text-sm font-medium">
        <div className="flex justify-center gap-8 mb-4">
          <a className="hover:text-primary transition-colors cursor-pointer">Privacy</a>
          <a className="hover:text-primary transition-colors cursor-pointer">Terms</a>
          <a className="hover:text-primary transition-colors cursor-pointer">Security</a>
        </div>
        <p>&copy; 2024 Lifestile Unified Healthcare. Built with precision.</p>
      </footer>
    </div>
  );
}
