'use client';

import { supabase } from '@/lib/supabase';
import { useTranslations, useLocale } from 'next-intl';
import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

export default function SettingsPage() {
  const t = useTranslations('Sidebar');
  const tCommon = useTranslations('Common');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setFullName(session.user.user_metadata?.full_name || '');
      }
      
      // Load dark mode preference
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        setIsDarkMode(true);
        document.documentElement.classList.add('dark');
      }
    };
    fetchProfile();
  }, []);

  const handleToggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.updateUser({
      data: { full_name: fullName }
    });

    if (error) {
      setMessage({ type: 'error', text: isRtl ? 'حدث خطأ أثناء التحديث' : 'Error updating profile' });
    } else {
      setMessage({ type: 'success', text: isRtl ? 'تم تحديث البيانات بنجاح' : 'Profile updated successfully' });
    }
    setLoading(false);
  };

  return (
    <DashboardLayout role="employee">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="text-start">
          <h1 className="text-4xl font-black text-primary tracking-tight mb-2 font-headline uppercase">{t('settings')}</h1>
          <p className="text-lg text-secondary font-medium">{tCommon('manage_settings')}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Profile Section */}
          <div className="md:col-span-7 bg-surface-container-lowest rounded-[2.5rem] p-10 clinical-shadow border border-outline-variant/10">
            <h3 className="text-xl font-bold text-primary mb-8 text-start">{isRtl ? 'بيانات الحساب' : 'Account Information'}</h3>
            
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="space-y-2 text-start">
                <label className="text-xs font-black text-outline uppercase tracking-widest px-1">{isRtl ? 'الاسم الكامل' : 'Full Name'}</label>
                <input 
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={isRtl ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                  className="w-full bg-surface-container-low border border-outline-variant/20 rounded-2xl p-5 text-primary font-bold focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none"
                />
              </div>

              {message && (
                <div className={`p-4 rounded-xl text-sm font-bold ${message.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-error/10 text-error'}`}>
                  {message.text}
                </div>
              )}

              <button 
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-primary text-white font-black rounded-2xl shadow-xl hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {loading ? (isRtl ? 'جاري الحفظ...' : 'SAVING...') : (isRtl ? 'حفظ التغييرات' : 'SAVE CHANGES')}
              </button>
            </form>
          </div>

          {/* Preferences Section */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-surface-container-low rounded-[2.5rem] p-8 clinical-shadow border border-outline-variant/5">
              <h3 className="text-lg font-bold text-primary mb-6 text-start">{isRtl ? 'التفضيلات' : 'Preferences'}</h3>
              
              <div className={`flex items-center justify-between p-4 rounded-2xl hover:bg-white transition-all group ${isRtl ? 'flex-row-reverse' : ''}`}>
                <div className="flex items-center gap-4 text-start">
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                    <span className="material-symbols-outlined">{isDarkMode ? 'dark_mode' : 'light_mode'}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-primary">{tCommon('dark_mode')}</p>
                    <p className="text-[10px] text-secondary">{tCommon('dark_mode_desc')}</p>
                  </div>
                </div>
                <button 
                  onClick={handleToggleDarkMode}
                  className={`w-14 h-8 rounded-full transition-all relative ${isDarkMode ? 'bg-primary' : 'bg-outline-variant/30'}`}
                >
                  <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all shadow-md ${isDarkMode ? (isRtl ? 'left-1' : 'right-1') : (isRtl ? 'right-1' : 'left-1')}`}></div>
                </button>
              </div>
            </div>

            <div className="bg-primary/5 rounded-[2.5rem] p-8 border border-primary/10">
              <div className="flex items-start gap-4 text-start">
                <span className="material-symbols-outlined text-primary">security</span>
                <div>
                  <h4 className="font-bold text-primary text-sm">{isRtl ? 'الأمان' : 'Security'}</h4>
                  <p className="text-xs text-secondary mt-1 leading-relaxed">{isRtl ? 'بياناتك مشفرة ومحمية وفق أعلى المعايير العالمية.' : 'Your data is encrypted and protected according to the highest global standards.'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
