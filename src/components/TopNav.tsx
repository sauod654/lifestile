'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';

export default function TopNav() {
  const t = useTranslations('TopNav');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const pathname = usePathname();

  return (
    <header className={`fixed top-0 left-0 right-0 ${isRTL ? 'lg:mr-64 lg:ml-0' : 'lg:ml-64 lg:mr-0'} h-16 bg-surface/80 dark:bg-slate-950/80 backdrop-blur-xl z-30 flex justify-between items-center px-8 py-3 border-b border-outline-variant/10`}>
      <div className={`flex items-center gap-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <span className="text-xl font-bold tracking-tighter text-primary font-headline">Clinical Atelier</span>
        <div className="hidden md:flex relative">
          <span className={`material-symbols-outlined absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-outline text-sm`}>search</span>
          <input
            className={`bg-surface-container-high border-none rounded-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-1.5 text-sm w-64 focus:ring-2 focus:ring-primary/20 placeholder:text-outline text-on-surface`}
            placeholder={t('search_placeholder')}
            type="text"
          />
        </div>
      </div>

      <div className={`flex items-center gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
        {/* Language Switcher */}
        <div className="flex items-center bg-surface-container-low rounded-full p-1" dir="ltr">
          <Link 
            href={pathname} 
            locale="ar" 
            className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${locale === 'ar' ? 'bg-white text-primary shadow-sm' : 'text-secondary hover:text-primary'}`}
          >
            AR
          </Link>
          <Link 
            href={pathname} 
            locale="en" 
            className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${locale === 'en' ? 'bg-white text-primary shadow-sm' : 'text-secondary hover:text-primary'}`}
          >
            EN
          </Link>
        </div>

        <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="flex items-center gap-2">
            <button className="p-2 text-secondary hover:bg-surface-container-high rounded-full transition-colors relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-surface"></span>
            </button>
            <button className="p-2 text-secondary hover:bg-surface-container-high rounded-full transition-colors">
              <span className="material-symbols-outlined">settings</span>
            </button>
          </div>
          
          <div className="h-8 w-px bg-outline-variant/30 mx-1"></div>
          
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={`hidden lg:block ${isRTL ? 'text-right' : 'text-left'}`}>
              <p className="text-xs font-bold text-primary">Dr. Aris Thorne</p>
              <p className="text-[10px] text-secondary uppercase tracking-tighter">General Manager</p>
            </div>
            <img
              alt="Administrator profile"
              className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/10 border border-outline-variant/20 p-0.5"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCc008GjEildupII0_X-OV9snRyLvmt6XhO63y_cnIImg0PtgVPKqdD6-yfb_xNOz441geRm6n8KI04Pza99ANTvMpRgagLHL7JMRQwhQIAjYk2jqJh15qTSmCjbpBz6C27yyhXGX5OKGMoRt_ezLie4rDcKArK34zNDAbRiogdr9eolH6AbV6f_15oPpEWEYW6s0NemRNIQew8sWK7h7Ps1Sk-6JY2pdRgWSoJ8g_nn3Af9c_yIookNdPUaW6JYdX0fiOhDVjRUVw"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
