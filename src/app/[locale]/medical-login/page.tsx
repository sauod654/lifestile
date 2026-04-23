'use client';

import {useTranslations, useLocale} from 'next-intl';
import {Link, usePathname} from '@/i18n/routing';

export default function MedicalLoginPage() {
  const t = useTranslations('MedicalLogin');
  const tCommon = useTranslations('Common');
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="bg-surface font-body text-on-surface antialiased min-h-screen flex flex-col">
      {/* TopAppBar */}
      <header className="bg-slate-50 dark:bg-slate-950 flex justify-between items-center w-full px-8 py-4 docked full-width top-0 tonal-shift bg-slate-100 dark:bg-slate-900 z-50">
        <div className="text-xl font-bold text-teal-950 dark:text-teal-100 font-headline tracking-tight">{tCommon('header_title')}</div>
        <div className="flex items-center gap-6">
          {/* Language Switcher */}
          <div className="flex items-center bg-surface-container-low rounded-full p-1 border border-outline-variant/30">
            <Link
              href={pathname}
              locale="en"
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                locale === 'en'
                  ? 'bg-primary text-on-primary'
                  : 'text-on-surface-variant hover:bg-surface-variant/50'
              }`}
            >
              {tCommon('lang_en')}
            </Link>
            <Link
              href={pathname}
              locale="ar"
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 font-headline ${
                locale === 'ar'
                  ? 'bg-primary text-on-primary'
                  : 'text-on-surface-variant hover:bg-surface-variant/50'
              }`}
            >
              {tCommon('lang_ar')}
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-on-primary-fixed-variant hover:bg-slate-200/50 p-2 rounded-full transition-colors cursor-pointer">help_outline</span>
          </div>
        </div>
      </header>

      {/* Main Content: Login Shell */}
      <main className="flex-grow flex flex-col md:flex-row items-stretch overflow-hidden">
        {/* Left Section: Branding & Identity */}
        <section className="hidden md:flex w-1/2 bg-surface-container-low flex-col justify-center px-16 relative">
          <div className="max-w-xl">
            <div className="mb-8 inline-flex items-center gap-3 px-4 py-2 bg-tertiary-container text-on-tertiary-container rounded-full text-xs font-semibold tracking-wider uppercase">
              <span className="material-symbols-outlined text-sm">medical_services</span>
              <span>{t('portal_medical')}</span>
            </div>
            <h1 className="text-6xl font-headline font-extrabold text-primary mb-6 leading-tight tracking-tighter" dangerouslySetInnerHTML={{__html: t.raw('hero_title')}}>
            </h1>
            <p className="text-lg text-secondary leading-relaxed max-w-md">
              {t('hero_desc')}
            </p>
          </div>
          {/* Absolute Decorative Element (Asymmetry) */}
          <div className="absolute bottom-24 ltr:right-0 rtl:left-0 w-64 h-64 opacity-10">
            <img alt="laboratory equipment" className="w-full h-full object-cover ltr:rounded-l-full rtl:rounded-r-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0gc81nd8YZCBi0Ay9BTG6orUOYDiVNl_LWJimfY3gCCEVx-7zFVD5clyMkBM6oCynJLaKBmqhK7EJtEm4EmJIDgaJ-I1vu0ukyrHvyNNdHaYNp95RG4HpT2O-Jmxkc20DnEF9wxOie6wh6dFYZQNMGVX5s0eM9nUV24nruVGCaU4Y0FruMdXilVeIDXqUddn5IUOC61KTDM7N-Ks1xSFeC5J_TqTwwJOgrjPVEscBUkSOphrafrgnUXdOBynigQyFci3Go3AxXh0"/>
          </div>
        </section>

        {/* Right Section: Login Interaction */}
        <section className="flex-grow flex items-center justify-center p-6 md:p-12 bg-surface">
          <div className="w-full max-w-[480px]">
            {/* Portal Selection */}
            <div className="flex gap-3 mb-12">
              <Link href="/medical-login" className="flex-1 px-4 py-3 bg-tertiary-container text-on-tertiary-container rounded-lg flex flex-col gap-1 cursor-default border-none">
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-80">{t('portal_label')}</span>
                <span className="font-headline font-semibold">{t('portal_medical_tab')}</span>
              </Link>
              <Link href="/supplier-login" className="flex-1 px-4 py-3 bg-surface-container-low text-secondary hover:bg-surface-container-high transition-colors rounded-lg flex flex-col gap-1 cursor-pointer">
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-60">{t('portal_label')}</span>
                <span className="font-headline font-semibold">{t('portal_supplier_tab')}</span>
              </Link>
              <Link href="/employee-login" className="flex-1 px-4 py-3 bg-surface-container-low text-secondary hover:bg-surface-container-high transition-colors rounded-lg flex flex-col gap-1 cursor-pointer">
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-60">{t('portal_label')}</span>
                <span className="font-headline font-semibold">{t('portal_employee_tab')}</span>
              </Link>
            </div>

            {/* Login Card */}
            <div className="bg-surface-container-lowest p-10 cloud-shadow rounded-xl">
              <div className="mb-10">
                <h2 className="text-2xl font-headline font-bold text-on-surface mb-2">{t('welcome_back')}</h2>
                <p className="text-secondary body-md">{t('login_desc')}</p>
              </div>

              <form className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-secondary ltr:ml-1 rtl:mr-1" htmlFor="email">{t('email_label')}</label>
                  <div className="relative">
                    <input className="w-full px-4 py-4 bg-surface-container-high border-none rounded-lg focus:ring-2 focus:ring-surface-tint focus:bg-surface-container-lowest transition-all placeholder:text-outline outline-none rtl:text-right" id="email" placeholder={t('email_placeholder')} type="email"/>
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center ltr:ml-1 rtl:mr-1">
                    <label className="block text-sm font-medium text-secondary" htmlFor="password">{t('password_label')}</label>
                    <a className="text-xs font-semibold text-tertiary-container hover:underline" href="#">{t('forgot_password')}</a>
                  </div>
                  <div className="relative">
                    <input className="w-full px-4 py-4 bg-surface-container-high border-none rounded-lg focus:ring-2 focus:ring-surface-tint focus:bg-surface-container-lowest transition-all placeholder:text-outline outline-none rtl:text-right" id="password" placeholder="••••••••" type="password"/>
                  </div>
                </div>

                {/* Options */}
                <div className="flex items-center gap-3 ltr:ml-1 rtl:mr-1">
                  <input className="w-4 h-4 rounded border-none bg-surface-container-high text-primary focus:ring-surface-tint" id="remember" type="checkbox"/>
                  <label className="text-sm text-secondary select-none" htmlFor="remember">{t('remember_me')}</label>
                </div>

                {/* Submit */}
                <button className="w-full primary-gradient text-on-primary py-4 rounded-lg font-headline font-bold text-lg hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-primary/20" type="submit">
                  {t('login_btn')}
                </button>
              </form>

              <div className="mt-10 pt-8 border-t border-surface-container text-center">
                <p className="text-xs text-outline leading-relaxed uppercase tracking-widest">{t('secure_auth')}</p>
              </div>
            </div>

            {/* Supportive Content */}
            <div className="mt-8 flex justify-center items-center gap-8 text-secondary/60">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">verified_user</span>
                <span className="text-xs font-medium">{t('soc2')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">lock</span>
                <span className="text-xs font-medium">{t('hipaa')}</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 dark:bg-slate-950 text-teal-900 dark:text-teal-400 font-inter text-sm body-md full-width bottom-0 tonal-shift-top px-12 flat">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-12 py-8 max-w-7xl mx-auto">
          <div className="text-lg font-semibold text-teal-900 dark:text-teal-100 opacity-80 hover:opacity-100 transition-all">{tCommon('footer_title')}</div>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a className="text-slate-500 hover:text-teal-600 transition-all" href="#">{tCommon('privacy_policy')}</a>
            <a className="text-slate-500 hover:text-teal-600 transition-all" href="#">{tCommon('terms')}</a>
            <a className="text-slate-500 hover:text-teal-600 transition-all" href="#">{tCommon('security')}</a>
          </div>
          <div className="mt-4 md:mt-0 text-slate-500">
            {tCommon('copyright')}
          </div>
        </div>
      </footer>
    </div>
  );
}
