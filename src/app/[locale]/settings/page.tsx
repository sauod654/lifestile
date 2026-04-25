'use client';

import { useTranslations, useLocale } from 'next-intl';
import DashboardLayout from '@/components/DashboardLayout';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function SettingsPage() {
  const t = useTranslations('TopNav');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const [user, setUser] = useState<any>(null);
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        setFullName(session.user.user_metadata?.full_name || '');
      }
    };
    fetchUser();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    const { error } = await supabase.auth.updateUser({
      data: { full_name: fullName }
    });
    setLoading(false);
    if (error) {
      alert(error.message);
    } else {
      alert(isRTL ? 'تم حفظ الإعدادات بنجاح' : 'Settings saved successfully');
    }
  };

  return (
    <DashboardLayout role="employee">
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        <header className="text-start">
          <h1 className="text-4xl font-black text-primary tracking-tight mb-2">
            {isRTL ? 'إعدادات الحساب' : 'Account Settings'}
          </h1>
          <p className="text-secondary font-medium">Manage your personal information and preferences.</p>
        </header>

        <div className="bg-surface-container-lowest rounded-[2.5rem] p-10 clinical-shadow border border-outline-variant/10">
          <div className="space-y-8">
            <section className="space-y-4">
              <h3 className="text-xl font-bold text-primary text-start border-b border-outline-variant/10 pb-2">
                {isRTL ? 'المعلومات الشخصية' : 'Personal Information'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 text-start">
                  <label className="text-xs font-bold text-outline uppercase tracking-widest">{isRTL ? 'الاسم الكامل' : 'Full Name'}</label>
                  <input 
                    type="text" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 outline-none font-medium"
                    placeholder="Ahmed Mohammed"
                  />
                </div>
                <div className="space-y-2 text-start opacity-60">
                  <label className="text-xs font-bold text-outline uppercase tracking-widest">{isRTL ? 'البريد الإلكتروني' : 'Email Address'}</label>
                  <input 
                    type="email" 
                    disabled
                    value={user?.email || ''}
                    className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 outline-none font-medium cursor-not-allowed"
                  />
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-bold text-primary text-start border-b border-outline-variant/10 pb-2">
                {isRTL ? 'تفضيلات النظام' : 'System Preferences'}
              </h3>
              <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl">
                <div className="text-start">
                  <p className="font-bold text-primary">{isRTL ? 'الوضع الليلي' : 'Dark Mode'}</p>
                  <p className="text-xs text-secondary">{isRTL ? 'تغيير مظهر النظام للوضع الليلي' : 'Switch between light and dark themes'}</p>
                </div>
                <div className="w-12 h-6 bg-slate-300 rounded-full relative cursor-not-allowed opacity-50">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
            </section>

            <div className="pt-6 flex justify-end">
              <button 
                onClick={handleSave}
                disabled={loading}
                className="px-10 py-4 bg-primary text-white font-black rounded-xl shadow-lg hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {loading ? '...' : (isRTL ? 'حفظ التغييرات' : 'Save Changes')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
