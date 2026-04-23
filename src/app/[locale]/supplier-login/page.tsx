'use client';

import {useTranslations, useLocale} from 'next-intl';
import {Link, usePathname, useRouter} from '@/i18n/routing';

export default function SupplierLoginPage() {
  const t = useTranslations('SupplierLogin');
  const tCommon = useTranslations('Common');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="bg-surface font-body text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed min-h-screen flex flex-col">
      {/* TopAppBar Navigation */}
      <nav className="flex justify-between items-center w-full px-8 py-6 bg-slate-50 dark:bg-slate-950">
        <div className="text-xl font-bold text-teal-950 dark:text-teal-100 font-headline tracking-tight">{tCommon('header_title')}</div>
        <div className="flex items-center gap-4">
          {/* Language Switcher */}
          <div className="flex items-center glass-utility rounded-full p-1">
            <Link
              href={pathname}
              locale="en"
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all hover:bg-slate-200/50 ${
                locale === 'en'
                  ? 'bg-white shadow-sm text-primary'
                  : 'text-secondary hover:text-primary'
              }`}
            >
              {tCommon('lang_en')}
            </Link>
            <Link
              href={pathname}
              locale="ar"
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all hover:bg-slate-200/50 ${
                locale === 'ar'
                  ? 'bg-white shadow-sm text-primary'
                  : 'text-secondary hover:text-primary'
              }`}
            >
              {tCommon('lang_ar')}
            </Link>
          </div>
          <button className="glass-utility p-1.5 rounded-full transition-all hover:bg-slate-200/50">
            <span className="material-symbols-outlined">help_outline</span>
          </button>
        </div>
      </nav>

      <main className="flex-grow grid grid-cols-1 md:grid-cols-12 min-h-0">
        {/* Left Branding & Context Side */}
        <section className="hidden md:flex md:col-span-7 bg-surface-container-low flex-col justify-between p-16 relative overflow-hidden">
          <div className="z-10">
            <div className="flex items-center gap-3 mb-8">
              <span className="bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded text-xs font-bold tracking-widest">{t('portal_label')}</span>
            </div>
            <h1 className="font-headline font-extrabold text-7xl text-primary leading-tight tracking-tighter mb-6 rtl:leading-snug" dangerouslySetInnerHTML={{__html: t.raw('hero_title')}}>
            </h1>
            <p className="max-w-md text-secondary text-lg leading-relaxed font-body">
              {t('hero_desc')}
            </p>
          </div>
          {/* Industrial Context Image */}
          <div className="absolute inset-y-0 right-0 ltr:right-0 rtl:left-0 w-3/4 h-full opacity-20 pointer-events-none">
            <img alt="Supply Chain Context" className="w-full h-full object-cover grayscale brightness-50" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDckE927iaAQyK4HHIEEwZBrQb9ZZya6g6pUXxdRAlIoNlQF_MlOgofKn8B7SyUdqB5O5pe2OcyMyMZUIWyhx2ymt70aExtkOxWy9mxmh2tWk6S-NEeHnrawU1eQA6TJt3nUhH1xns5geOYV4EhHb4dy2x14oYUPzqdCutrLG2KOinBoedqsMgISXRW_JlOatxrttCGf2nhc3WAmcKfJ7omkvUMderlMdD9mfwDPMIhb52J2ru5-vjU7g2a2DT9Ek-pwxyZsv1w27s"/>
          </div>
          <div className="z-10 flex gap-12 border-t border-outline-variant/20 pt-8 mt-auto">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-outline mb-2">{t('network_status')}</div>
              <div className="flex items-center gap-2 font-medium text-primary">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
                {t('operational')}
              </div>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-outline mb-2">{t('active_shipments')}</div>
              <div className="font-medium text-primary">{t('shipments_count')}</div>
            </div>
          </div>
        </section>

        {/* Right Side: Login Form Canvas */}
        <section className="col-span-1 md:col-span-5 flex items-center justify-center p-6 md:p-12 bg-surface">
          <div className="w-full max-w-md">
            {/* Portal Switcher Chips */}
            <div className="flex gap-2 mb-12">
              <Link href="/medical-login" className="flex-1 py-3 text-center rounded-xl font-medium text-sm transition-all bg-surface-container-low text-secondary hover:bg-surface-container-high">{t('portal_medical_tab')}</Link>
              <Link href="/supplier-login" className="flex-1 py-3 text-center rounded-xl font-medium text-sm transition-all bg-tertiary-container text-on-tertiary-container ring-2 ring-tertiary-fixed-dim/20">{t('portal_supplier_tab')}</Link>
              <Link href="/employee-login" className="flex-1 py-3 text-center rounded-xl font-medium text-sm transition-all bg-surface-container-low text-secondary hover:bg-surface-container-high">{t('portal_employee_tab')}</Link>
            </div>

            <div className="bg-surface-container-lowest p-8 md:p-10 rounded-2xl cloud-shadow">
              <header className="mb-10">
                <h2 className="font-headline font-bold text-3xl text-on-surface mb-2">{t('sign_in_title')}</h2>
                <p className="text-on-surface-variant text-sm font-body">{t('sign_in_desc')}</p>
              </header>
              <form 
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  router.push('/supplier-dashboard');
                }}
              >
                {/* Input Group */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-outline uppercase tracking-wider ltr:pl-1 rtl:pr-1" htmlFor="supplier-id">{t('supplier_id_label')}</label>
                  <input className="w-full h-14 bg-surface-container-high border-0 rounded-lg px-4 font-medium transition-all focus:ring-0 focus:bg-surface-container-lowest focus:shadow-[0_0_0_2px_#18667e] placeholder:text-outline-variant" id="supplier-id" placeholder={t('supplier_id_placeholder')} type="text"/>
                </div>

                {/* Input Group */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-outline uppercase tracking-wider ltr:pl-1 rtl:pr-1" htmlFor="password">{t('password_label')}</label>
                    <a className="text-xs font-medium text-tertiary hover:text-tertiary-container transition-colors" href="#">{t('forgot_access')}</a>
                  </div>
                  <div className="relative group">
                    <input className="w-full h-14 bg-surface-container-high border-0 rounded-lg px-4 font-medium transition-all focus:ring-0 focus:bg-surface-container-lowest focus:shadow-[0_0_0_2px_#18667e] placeholder:text-outline-variant" id="password" placeholder="••••••••" type="password"/>
                    <button className="absolute ltr:right-4 rtl:left-4 top-1/2 -translate-y-1/2 text-outline-variant hover:text-primary transition-colors" type="button">
                      <span className="material-symbols-outlined text-xl">visibility_off</span>
                    </button>
                  </div>
                </div>

                {/* Options */}
                <div className="flex items-center">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input className="peer appearance-none w-5 h-5 bg-surface-container-high rounded border-0 transition-all checked:bg-primary" type="checkbox"/>
                      <span className="material-symbols-outlined absolute text-white text-sm scale-0 peer-checked:scale-100 transition-transform">check</span>
                    </div>
                    <span className="text-sm font-medium text-secondary group-hover:text-primary transition-colors">{t('stay_auth')}</span>
                  </label>
                </div>

                {/* Login Button */}
                <button className="w-full h-14 primary-gradient-cta text-on-primary font-bold rounded-lg tracking-wide hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group" type="submit">
                  <span>{t('authorize_btn')}</span>
                  <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform rtl:rotate-180">arrow_forward</span>
                </button>
              </form>
            </div>

            <div className="mt-10 text-center">
              <p className="text-sm text-secondary">
                {t('new_partner')} <a className="text-primary font-bold hover:underline decoration-2 underline-offset-4" href="#">{t('apply_credentials')}</a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row justify-between items-center w-full px-12 py-8 max-w-7xl mx-auto font-inter text-sm body-md">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="text-lg font-semibold text-teal-900 dark:text-teal-100 font-headline">{tCommon('header_title')}</div>
          <p className="text-slate-500 dark:text-slate-400 opacity-80 hover:opacity-100 transition-all">{tCommon('copyright')}</p>
        </div>
        <div className="flex gap-6 mt-6 md:mt-0">
          <a className="text-slate-500 hover:text-teal-600 transition-all opacity-80 hover:opacity-100" href="#">{tCommon('privacy_policy')}</a>
          <a className="text-slate-500 hover:text-teal-600 transition-all opacity-80 hover:opacity-100" href="#">{tCommon('terms')}</a>
          <a className="text-slate-500 hover:text-teal-600 transition-all opacity-80 hover:opacity-100" href="#">{tCommon('security')}</a>
        </div>
      </footer>
    </div>
  );
}
