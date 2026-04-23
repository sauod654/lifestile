'use client';

import {useTranslations, useLocale} from 'next-intl';
import {Link, usePathname, useRouter} from '@/i18n/routing';

export default function EmployeeLoginPage() {
  const t = useTranslations('EmployeeLogin');
  const tCommon = useTranslations('Common');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="bg-surface font-body text-on-surface overflow-x-hidden transition-all duration-300 min-h-screen flex flex-col">
      {/* TopAppBar */}
      <header className="bg-slate-50 dark:bg-slate-950 flex justify-between items-center w-full px-8 py-4 docked full-width top-0 no-border tonal-shift bg-slate-100 dark:bg-slate-900 flat">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-teal-950 dark:text-teal-100 font-headline tracking-tight">{tCommon('header_title')}</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-8 items-center">
            <Link href="/medical-login" className="text-slate-500 dark:text-slate-400 font-inter text-sm cursor-pointer hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors px-2 py-1 rounded">
              {t('nav_medical')}
            </Link>
            <Link href="/supplier-login" className="text-slate-500 dark:text-slate-400 font-inter text-sm cursor-pointer hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors px-2 py-1 rounded">
              {t('nav_supplier')}
            </Link>
            <span className="text-teal-900 dark:text-teal-400 font-semibold font-inter text-sm cursor-pointer px-2 py-1">
              {t('nav_employee')}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative inline-flex bg-surface-container-high rounded-full p-1">
              <Link
                href={pathname}
                locale="en"
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
                  locale === 'en'
                    ? 'bg-white shadow-sm text-primary'
                    : 'text-secondary hover:text-primary'
                }`}
              >
                EN
              </Link>
              <Link
                href={pathname}
                locale="ar"
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
                  locale === 'ar'
                    ? 'bg-white shadow-sm text-primary'
                    : 'text-secondary hover:text-primary'
                }`}
              >
                AR
              </Link>
            </div>
            <button className="p-2 rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors">
              <span className="material-symbols-outlined text-slate-500">help_outline</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col md:flex-row">
        {/* Editorial Side Branding */}
        <section className="hidden md:flex md:w-1/2 lg:w-3/5 bg-surface-container-low flex-col justify-center px-12 lg:px-24 relative overflow-hidden">
          <div className="relative z-10">
            <span className="label-md font-medium text-tertiary-container bg-tertiary-fixed/30 px-3 py-1 rounded-full mb-6 inline-block">
              {t('portal_label')}
            </span>
            <h1 className="text-6xl text-primary font-headline font-extrabold tracking-tighter leading-none mb-6" dangerouslySetInnerHTML={{__html: t.raw('hero_title')}}>
            </h1>
            <p className="body-md text-secondary max-w-md mb-12">
              {t('hero_desc')}
            </p>
            {/* Community Metric Bento Chips */}
            <div className="grid grid-cols-2 gap-4 max-w-md">
              <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10">
                <span className="material-symbols-outlined text-primary mb-2">groups</span>
                <div className="font-headline font-bold text-2xl">4.2k</div>
                <div className="text-secondary text-sm">{t('active_members')}</div>
              </div>
              <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10">
                <span className="material-symbols-outlined text-primary mb-2">task_alt</span>
                <div className="font-headline font-bold text-2xl">98%</div>
                <div className="text-secondary text-sm">{t('target_velocity')}</div>
              </div>
            </div>
          </div>
          {/* Abstract Background Visual */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl"></div>
          <div className="absolute -left-10 top-20 w-64 h-64 bg-tertiary-container/5 rounded-full blur-2xl"></div>
        </section>

        {/* Login Canvas */}
        <section className="flex-1 bg-surface flex items-center justify-center p-6 md:p-12 lg:p-24">
          <div className="w-full max-w-md bg-surface-container-lowest p-8 md:p-12 rounded-xl cloud-shadow">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2 rtl:flex-row-reverse">
                <div className="w-10 h-10 rounded-lg signature-gradient flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-white" style={{fontVariationSettings: "'FILL' 1"}}>badge</span>
                </div>
                <h2 className="text-2xl font-headline font-bold text-on-surface">{t('sign_in_title')}</h2>
              </div>
              <p className="body-md text-secondary">{t('sign_in_desc')}</p>
            </div>

            <form 
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                router.push('/employee-dashboard');
              }}
            >
              <div className="space-y-2">
                <label className="text-sm font-medium text-on-surface-variant block" htmlFor="employee-id">{t('employee_id_label')}</label>
                <input className="w-full px-4 py-3 bg-surface-container-high rounded-lg border-none focus:ring-2 focus:ring-surface-tint focus:bg-surface-container-lowest transition-all placeholder:text-outline outline-none text-start" id="employee-id" placeholder={t('employee_id_placeholder')} type="text"/>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-on-surface-variant block" htmlFor="password">{t('password_label')}</label>
                  <a className="text-sm font-medium text-tertiary hover:underline" href="#">{t('forgot_password')}</a>
                </div>
                <div className="relative">
                  <input className="w-full px-4 py-3 bg-surface-container-high rounded-lg border-none focus:ring-2 focus:ring-surface-tint focus:bg-surface-container-lowest transition-all placeholder:text-outline outline-none text-start" id="password" placeholder="••••••••" type="password"/>
                  <button className="absolute ltr:right-3 rtl:left-3 top-1/2 -translate-y-1/2 text-outline" type="button">
                    <span className="material-symbols-outlined text-sm">visibility</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-surface-tint" id="remember" type="checkbox"/>
                <label className="text-sm text-on-surface-variant cursor-pointer select-none" htmlFor="remember">{t('remember_me')}</label>
              </div>

              <button className="w-full py-4 signature-gradient text-white font-semibold rounded-lg shadow-lg hover:shadow-primary/20 hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2" type="submit">
                <span>{t('login_btn')}</span>
                <span className="material-symbols-outlined text-lg rtl:rotate-180">login</span>
              </button>
            </form>

            <div className="mt-12 pt-8 border-t-0 bg-surface-container-low p-4 rounded-lg flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <img alt="User avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyxM5WAfL8pMV2Ty6SR6LvMom9ilx_OaqqzVvbJPeHVF-rY-k4Whlc7ZEbnHtuFgP_UqzOcHTJ55D21cwlo4oxHdtpmFKya88cM6dHuVbcmiRa_NpEUZoEarkwnRU_lxX058FE57W8tMIF58Pse47Ek5xguIPtl-YoslaC1gDQrspTzC8WyOz-Xs19C3zqMNIRt7nEPJ95HILeJcu9GBAc_Te4j7dYPhU40qfPfwcMR4QZZqae-iSosUhyzz_jttxJ9bufSAoV8T0"/>
              </div>
              <div>
                <p className="text-xs text-secondary font-medium uppercase tracking-wider">{t('spotlight_title')}</p>
                <p className="text-sm text-on-surface italic">{t('spotlight_quote')}</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 dark:bg-slate-950 border-t-0 tonal-shift-top">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-12 py-8 max-w-7xl mx-auto font-inter text-sm body-md opacity-80">
          <div className="mb-4 md:mb-0">
            <span className="text-lg font-semibold text-teal-900 dark:text-teal-100">{tCommon('header_title')}</span>
          </div>
          <div className="flex gap-8 text-slate-500 hover:text-teal-600 transition-all">
            <a className="hover:text-teal-700 dark:hover:text-teal-300" href="#">{tCommon('privacy_policy')}</a>
            <a className="hover:text-teal-700 dark:hover:text-teal-300" href="#">{tCommon('terms')}</a>
            <a className="hover:text-teal-700 dark:hover:text-teal-300" href="#">{tCommon('security')}</a>
          </div>
          <div className="mt-4 md:mt-0 text-slate-500">
            {tCommon('copyright')}
          </div>
        </div>
      </footer>
    </div>
  );
}
