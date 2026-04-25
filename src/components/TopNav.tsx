'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useState } from 'react';

interface TopNavProps {
  role?: 'admin' | 'medical' | 'employee' | 'supplier';
  userName?: string;
}

export default function TopNav({ role = 'medical', userName }: TopNavProps) {
  const t = useTranslations('TopNav');
  const tEmployee = useTranslations('EmployeeDashboard');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const pathname = usePathname();
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    // Basic logout simulation
    router.push('/employee-login');
  };

  const getProfileInfo = () => {
    if (role === 'employee') {
      return {
        name: userName || (locale === 'ar' ? 'أحمد محمد' : 'Ahmed Mohammed'),
        title: locale === 'ar' ? 'موظف ميداني' : 'Field Employee',
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDyxM5WAfL8pMV2Ty6SR6LvMom9ilx_OaqqzVvbJPeHVF-rY-k4Whlc7ZEbnHtuFgP_UqzOcHTJ55D21cwlo4oxHdtpmFKya88cM6dHuVbcmiRa_NpEUZoEarkwnRU_lxX058FE57W8tMIF58Pse47Ek5xguIPtl-YoslaC1gDQrspTzC8WyOz-Xs19C3zqMNIRt7nEPJ95HILeJcu9GBAc_Te4j7dYPhU40qfPfwcMR4QZZqae-iSosUhyzz_jttxJ9bufSAoV8T0"
      };
    }
    return {
      name: "Dr. Aris Thorne",
      title: "General Manager",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCc008GjEildupII0_X-OV9snRyLvmt6XhO63y_cnIImg0PtgVPKqdD6-yfb_xNOz441geRm6n8KI04Pza99ANTvMpRgagLHL7JMRQwhQIAjYk2jqJh15qTSmCjbpBz6C27yyhXGX5OKGMoRt_ezLie4rDcKArK34zNDAbRiogdr9eolH6AbV6f_15oPpEWEYW6s0NemRNIQew8sWK7h7Ps1Sk-6JY2pdRgWSoJ8g_nn3Af9c_yIookNdPUaW6JYdX0fiOhDVjRUVw"
    };
  };

  const profile = getProfileInfo();

  return (
    <header className={`fixed top-0 left-0 right-0 ${isRTL ? 'lg:mr-64 lg:ml-0' : 'lg:ml-64 lg:mr-0'} h-16 bg-surface/80 dark:bg-slate-950/80 backdrop-blur-xl z-30 flex justify-between items-center px-8 py-3 border-b border-outline-variant/10`}>
      <div className={`flex items-center gap-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <span className="text-xl font-black tracking-tighter text-primary font-headline uppercase">LifeStyle</span>
        <div className="hidden md:flex relative">
          <span className={`material-symbols-outlined absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-outline text-sm`}>search</span>
          <input
            className={`bg-surface-container-high border-none rounded-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-1.5 text-sm w-64 focus:ring-2 focus:ring-primary/20 placeholder:text-outline text-on-surface outline-none`}
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
            className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${locale === 'ar' ? 'bg-primary text-white shadow-sm' : 'text-secondary hover:text-primary'}`}
          >
            AR
          </Link>
          <Link 
            href={pathname} 
            locale="en" 
            className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${locale === 'en' ? 'bg-primary text-white shadow-sm' : 'text-secondary hover:text-primary'}`}
          >
            EN
          </Link>
        </div>

        <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="flex items-center gap-1 relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-secondary hover:bg-surface-container-high rounded-full transition-colors relative"
            >
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-surface"></span>
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className={`absolute top-12 ${isRTL ? 'left-0' : 'right-0'} w-80 bg-white rounded-3xl shadow-2xl border border-outline-variant/10 p-6 z-50 animate-fade-in`}>
                <h4 className="text-sm font-black text-primary uppercase tracking-widest mb-4 border-b border-outline-variant/5 pb-2">
                  {isRTL ? 'التنبيهات الأخيرة' : 'Recent Notifications'}
                </h4>
                <div className="space-y-4">
                  <div className="flex gap-3 items-start p-3 bg-surface-container-low rounded-xl">
                    <div className="w-2 h-2 bg-primary rounded-full mt-1.5 shrink-0"></div>
                    <div className="text-start">
                      <p className="text-xs font-bold text-primary">{isRTL ? 'تم تأكيد موعدك بنجاح' : 'Appointment Confirmed'}</p>
                      <p className="text-[10px] text-secondary">With Dr. Sarah Mansour • 2m ago</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start p-3 hover:bg-surface-container-low rounded-xl transition-colors">
                    <div className="w-2 h-2 bg-slate-300 rounded-full mt-1.5 shrink-0"></div>
                    <div className="text-start">
                      <p className="text-xs font-bold text-slate-700">{isRTL ? 'تذكير: شرب الماء' : 'Hydration Reminder'}</p>
                      <p className="text-[10px] text-secondary">Stay hydrated for peak energy • 1h ago</p>
                    </div>
                  </div>
                </div>
                <Link 
                  href="/notifications"
                  className="w-full mt-4 py-2 text-[10px] font-black text-primary uppercase tracking-[0.2em] hover:underline block text-center"
                >
                  {isRTL ? 'عرض جميع التنبيهات' : 'View All Notifications'}
                </Link>
              </div>
            )}

            <button 
              onClick={handleLogout}
              title={tEmployee('logout')}
              className="p-2 text-error hover:bg-error/10 rounded-full transition-colors"
            >
              <span className="material-symbols-outlined">logout</span>
            </button>
          </div>
          
          <div className="h-8 w-px bg-outline-variant/30 mx-1"></div>
          
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={`hidden lg:block ${isRTL ? 'text-right' : 'text-left'}`}>
              <p className="text-xs font-black text-primary uppercase tracking-tighter">{profile.name}</p>
              <p className="text-[10px] text-outline font-bold uppercase tracking-widest">{profile.title}</p>
            </div>
            <img
              alt="User profile"
              className="w-9 h-9 rounded-xl object-cover ring-2 ring-primary/5 border border-outline-variant/20 p-0.5"
              src={profile.avatar}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
