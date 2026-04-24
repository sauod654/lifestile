'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';

export default function EmployeeLoginPage() {
  const t = useTranslations('EmployeeLogin');
  const tCommon = useTranslations('Common');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
    } else {
      router.push('/employee-dashboard');
    }
  };

  return (
    <div className="bg-surface font-body text-on-surface overflow-x-hidden transition-all duration-300 min-h-screen flex flex-col">
      {/* ... existing header ... */}
      <header className="bg-surface-container-high flex justify-between items-center w-full px-8 py-5 border-none shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg signature-gradient flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-lg" style={{fontVariationSettings: "'FILL' 1"}}>clinical_notes</span>
          </div>
          <span className="text-xl font-black text-primary font-headline tracking-tighter uppercase">LifeStyle</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-8 items-center">
            <Link href="/medical-login" className="text-secondary font-bold text-xs uppercase tracking-widest hover:text-primary transition-colors">
              {t('nav_medical')}
            </Link>
            <Link href="/supplier-login" className="text-secondary font-bold text-xs uppercase tracking-widest hover:text-primary transition-colors">
              {t('nav_supplier')}
            </Link>
            <span className="text-primary font-black text-xs uppercase tracking-widest border-b-2 border-primary pb-1">
              {t('nav_employee')}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative inline-flex bg-surface-container-lowest rounded-full p-1 shadow-inner">
              <Link
                href={pathname}
                locale="en"
                className={`px-4 py-1.5 text-[10px] font-black rounded-full transition-all ${
                  locale === 'en'
                    ? 'bg-primary text-white shadow-md'
                    : 'text-secondary hover:text-primary'
                }`}
              >
                EN
              </Link>
              <Link
                href={pathname}
                locale="ar"
                className={`px-4 py-1.5 text-[10px] font-black rounded-full transition-all ${
                  locale === 'ar'
                    ? 'bg-primary text-white shadow-md'
                    : 'text-secondary hover:text-primary'
                }`}
              >
                AR
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col md:flex-row">
        {/* ... existing branding ... */}
        <section className="hidden md:flex md:w-1/2 lg:w-3/5 bg-surface-container-low flex-col justify-center px-12 lg:px-24 relative overflow-hidden">
          <div className="relative z-10">
            <span className="text-[10px] font-black text-tertiary bg-tertiary/10 px-4 py-2 rounded-full mb-8 inline-block uppercase tracking-[0.2em]">
              {t('portal_label')}
            </span>
            <h1 className="text-7xl text-primary font-headline font-black tracking-tighter leading-[0.9] mb-8 uppercase" dangerouslySetInnerHTML={{__html: t.raw('hero_title')}}>
            </h1>
            <p className="text-xl text-secondary max-w-md mb-16 font-medium leading-relaxed opacity-80">
              {t('hero_desc')}
            </p>
            <div className="grid grid-cols-2 gap-6 max-w-lg">
              <div className="bg-surface-container-lowest p-8 rounded-[2rem] clinical-shadow group hover:scale-105 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:signature-gradient group-hover:text-white transition-all">
                  <span className="material-symbols-outlined text-2xl">groups</span>
                </div>
                <div className="font-headline font-black text-4xl text-primary tracking-tighter">4.2k</div>
                <div className="text-outline text-[10px] font-black uppercase tracking-[0.2em] mt-2">{t('active_members')}</div>
              </div>
              <div className="bg-surface-container-lowest p-8 rounded-[2rem] clinical-shadow group hover:scale-105 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-tertiary/10 flex items-center justify-center text-tertiary mb-4 group-hover:bg-tertiary group-hover:text-white transition-all">
                  <span className="material-symbols-outlined text-2xl">task_alt</span>
                </div>
                <div className="font-headline font-black text-4xl text-primary tracking-tighter">98%</div>
                <div className="text-outline text-[10px] font-black uppercase tracking-[0.2em] mt-2">{t('target_velocity')}</div>
              </div>
            </div>
          </div>
          <div className="absolute -right-20 -bottom-20 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]"></div>
          <div className="absolute -left-10 top-20 w-80 h-80 bg-tertiary/5 rounded-full blur-[100px]"></div>
        </section>

        <section className="flex-1 bg-surface flex items-center justify-center p-6 md:p-12 lg:p-24 relative">
          <div className="w-full max-w-md bg-surface-container-lowest p-10 md:p-14 rounded-[3.5rem] clinical-shadow relative z-10">
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-3 rtl:flex-row-reverse">
                <div className="w-14 h-14 rounded-2xl signature-gradient flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20">
                  <span className="material-symbols-outlined text-white text-3xl" style={{fontVariationSettings: "'FILL' 1"}}>badge</span>
                </div>
                <div>
                  <h2 className="text-3xl font-headline font-black text-primary tracking-tighter uppercase leading-none">{t('sign_in_title')}</h2>
                  <p className="text-[10px] font-black text-outline uppercase tracking-[0.2em] mt-2">LifeStyle V1.0</p>
                </div>
              </div>
              <p className="text-secondary font-medium mt-6 leading-relaxed opacity-70">{t('sign_in_desc')}</p>
            </div>

            <form className="space-y-6" onSubmit={handleLogin}>
              {error && (
                <div className="p-4 bg-error-container text-on-error-container rounded-2xl text-xs font-bold animate-shake">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-on-surface-variant block" htmlFor="employee-email">{t('employee_id_label')}</label>
                <input 
                  className="w-full px-4 py-3 bg-surface-container-high rounded-lg border-none focus:ring-2 focus:ring-surface-tint focus:bg-surface-container-lowest transition-all placeholder:text-outline outline-none text-start" 
                  id="employee-email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('employee_id_placeholder')} 
                  type="email"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-on-surface-variant block" htmlFor="password">{t('password_label')}</label>
                  <a className="text-sm font-medium text-tertiary hover:underline" href="#">{t('forgot_password')}</a>
                </div>
                <div className="relative">
                  <input 
                    className="w-full px-4 py-3 bg-surface-container-high rounded-lg border-none focus:ring-2 focus:ring-surface-tint focus:bg-surface-container-lowest transition-all placeholder:text-outline outline-none text-start" 
                    id="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" 
                    type="password"
                    required
                  />
                  <button className="absolute ltr:right-3 rtl:left-3 top-1/2 -translate-y-1/2 text-outline" type="button">
                    <span className="material-symbols-outlined text-sm">visibility</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-surface-tint" id="remember" type="checkbox"/>
                <label className="text-sm text-on-surface-variant cursor-pointer select-none" htmlFor="remember">{t('remember_me')}</label>
              </div>

              <button 
                className="w-full py-4 signature-gradient text-white font-semibold rounded-lg shadow-lg hover:shadow-primary/20 hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mb-6 disabled:opacity-50" 
                type="submit"
                disabled={loading}
              >
                <span>{loading ? t('authenticating') : t('login_btn')}</span>
                <span className="material-symbols-outlined text-lg rtl:rotate-180">login</span>
              </button>

              <div className="text-center pt-4 border-t border-outline-variant/10">
                <p className="text-sm text-secondary mb-2">{t('no_account')}</p>
                <Link href="/employee-signup" className="text-primary font-bold hover:underline inline-flex items-center gap-1">
                  <span>{t('create_account_btn')}</span>
                  <span className="material-symbols-outlined text-sm">arrow_outward</span>
                </Link>
              </div>
            </form>

            <div className="mt-10 pt-6 border-t-0 bg-surface-container-low p-5 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-white">
                <img alt="User avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyxM5WAfL8pMV2Ty6SR6LvMom9ilx_OaqqzVvbJPeHVF-rY-k4Whlc7ZEbnHtuFgP_UqzOcHTJ55D21cwlo4oxHdtpmFKya88cM6dHuVbcmiRa_NpEUZoEarkwnRU_lxX058FE57W8tMIF58Pse47Ek5xguIPtl-YoslaC1gDQrspTzC8WyOz-Xs19C3zqMNIRt7nEPJ95HILeJcu9GBAc_Te4j7dYPhU40qfPfwcMR4QZZqae-iSosUhyzz_jttxJ9bufSAoV8T0"/>
              </div>
              <div>
                <p className="text-[10px] font-black text-secondary uppercase tracking-[0.2em] mb-1">{t('spotlight_title')}</p>
                <p className="text-sm text-on-surface italic font-medium leading-tight">"{t('spotlight_quote')}"</p>
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
