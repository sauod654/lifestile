'use client';

import {useTranslations, useLocale} from 'next-intl';
import {Link, usePathname, useRouter} from '@/i18n/routing';

export default function EmployeeSignupPage() {
  const t = useTranslations('EmployeeSignup');
  const tLogin = useTranslations('EmployeeLogin');
  const tCommon = useTranslations('Common');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="bg-surface font-body text-on-surface overflow-x-hidden transition-all duration-300 min-h-screen flex flex-col">
      {/* TopAppBar */}
      <header className="bg-surface-container-high flex justify-between items-center w-full px-8 py-5 border-none shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg signature-gradient flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-lg" style={{fontVariationSettings: "'FILL' 1"}}>clinical_notes</span>
          </div>
          <span className="text-xl font-black text-primary font-headline tracking-tighter uppercase">{tCommon('header_title')}</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-8 items-center">
            <Link href="/medical-login" className="text-secondary font-bold text-xs uppercase tracking-widest hover:text-primary transition-colors">
              {tLogin('nav_medical')}
            </Link>
            <Link href="/supplier-login" className="text-secondary font-bold text-xs uppercase tracking-widest hover:text-primary transition-colors">
              {tLogin('nav_supplier')}
            </Link>
            <Link href="/employee-login" className="text-primary font-black text-xs uppercase tracking-widest border-b-2 border-primary pb-1">
              {tLogin('nav_employee')}
            </Link>
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
        {/* Branding Side */}
        <section className="hidden md:flex md:w-1/2 lg:w-3/5 bg-surface-container-low flex-col justify-center px-12 lg:px-24 relative overflow-hidden">
          <div className="relative z-10">
            <span className="text-[10px] font-black text-tertiary bg-tertiary/10 px-4 py-2 rounded-full mb-8 inline-block uppercase tracking-[0.2em]">
              {tLogin('portal_label')}
            </span>
            <h1 className="text-7xl text-primary font-headline font-black tracking-tighter leading-[0.9] mb-8 uppercase">
              {t('title')}
            </h1>
            <p className="text-xl text-secondary max-w-md mb-16 font-medium leading-relaxed opacity-80">
              {t('desc')}
            </p>
            
            <div className="grid grid-cols-2 gap-6 max-w-lg">
              <div className="bg-surface-container-lowest p-8 rounded-[2rem] clinical-shadow">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <span className="material-symbols-outlined text-2xl">verified_user</span>
                </div>
                <div className="font-headline font-black text-2xl text-primary tracking-tighter leading-tight">Verified Community</div>
                <div className="text-outline text-[10px] font-black uppercase tracking-[0.2em] mt-2">SOC2 & HIPAA Compliant</div>
              </div>
              <div className="bg-surface-container-lowest p-8 rounded-[2rem] clinical-shadow">
                <div className="w-12 h-12 rounded-2xl bg-tertiary/10 flex items-center justify-center text-tertiary mb-4">
                  <span className="material-symbols-outlined text-2xl">health_metrics</span>
                </div>
                <div className="font-headline font-black text-2xl text-primary tracking-tighter leading-tight">Interactive Metrics</div>
                <div className="text-outline text-[10px] font-black uppercase tracking-[0.2em] mt-2">Real-time tracking</div>
              </div>
            </div>
          </div>
          <div className="absolute -right-20 -bottom-20 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]"></div>
          <div className="absolute -left-10 top-20 w-80 h-80 bg-tertiary/5 rounded-full blur-[100px]"></div>
        </section>

        {/* Signup Form Canvas */}
        <section className="flex-1 bg-surface flex items-center justify-center p-6 md:p-12 lg:p-16 relative">
          <div className="w-full max-w-md bg-surface-container-lowest p-10 md:p-12 rounded-[3rem] clinical-shadow relative z-10">
            <div className="mb-10">
              <div className="flex items-center gap-4 mb-3 rtl:flex-row-reverse">
                <div className="w-14 h-14 rounded-2xl signature-gradient flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20">
                  <span className="material-symbols-outlined text-white text-3xl" style={{fontVariationSettings: "'FILL' 1"}}>person_add</span>
                </div>
                <div>
                  <h2 className="text-3xl font-headline font-black text-primary tracking-tighter uppercase leading-none">{t('title')}</h2>
                  <p className="text-[10px] font-black text-outline uppercase tracking-[0.2em] mt-2">Clinical Atelier V1.0</p>
                </div>
              </div>
            </div>

            <form 
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                router.push('/employee-dashboard');
              }}
            >
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-outline uppercase tracking-[0.2em] block" htmlFor="full-name">{t('full_name_label')}</label>
                <input 
                  className="w-full px-6 py-4 bg-surface-container-high rounded-2xl border-none focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all placeholder:text-outline outline-none text-start font-medium" 
                  id="full-name" 
                  placeholder={t('full_name_placeholder')} 
                  type="text"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-outline uppercase tracking-[0.2em] block" htmlFor="email">{t('email_label')}</label>
                <input 
                  className="w-full px-6 py-4 bg-surface-container-high rounded-2xl border-none focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all placeholder:text-outline outline-none text-start font-medium" 
                  id="email" 
                  placeholder={t('email_placeholder')} 
                  type="email"
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-outline uppercase tracking-[0.2em] block" htmlFor="password">{t('password_label')}</label>
                <input 
                  className="w-full px-6 py-4 bg-surface-container-high rounded-2xl border-none focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all placeholder:text-outline outline-none text-start font-medium" 
                  id="password" 
                  placeholder="••••••••" 
                  type="password"
                  required
                />
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-outline uppercase tracking-[0.2em] block" htmlFor="confirm-password">{t('confirm_password_label')}</label>
                <input 
                  className="w-full px-6 py-4 bg-surface-container-high rounded-2xl border-none focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all placeholder:text-outline outline-none text-start font-medium" 
                  id="confirm-password" 
                  placeholder="••••••••" 
                  type="password"
                  required
                />
              </div>

              <button className="w-full py-5 signature-gradient text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-3 mt-8" type="submit">
                <span>{t('signup_btn')}</span>
                <span className="material-symbols-outlined text-xl rtl:rotate-180">arrow_forward</span>
              </button>

              <div className="text-center pt-6 border-t border-outline-variant/10">
                <p className="text-sm text-secondary mb-2 font-medium">{t('already_have_account')}</p>
                <Link href="/employee-login" className="text-primary font-black uppercase tracking-widest text-xs hover:underline inline-flex items-center gap-1">
                  <span>{t('login_link')}</span>
                  <span className="material-symbols-outlined text-sm">login</span>
                </Link>
              </div>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-high border-none">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-12 py-10 max-w-7xl mx-auto text-[10px] font-black uppercase tracking-[0.2em] text-outline">
          <div className="mb-4 md:mb-0 flex items-center gap-2">
             <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center">
               <span className="material-symbols-outlined text-primary text-xs" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
             </div>
            <span className="text-primary">{tCommon('header_title')} SYSTEMS</span>
          </div>
          <div className="flex gap-8">
            <a className="hover:text-primary transition-all" href="#">{tCommon('privacy_policy')}</a>
            <a className="hover:text-primary transition-all" href="#">{tCommon('terms')}</a>
            <a className="hover:text-primary transition-all" href="#">{tCommon('security')}</a>
          </div>
          <div className="mt-4 md:mt-0">
            {tCommon('copyright')}
          </div>
        </div>
      </footer>
    </div>
  );
}
