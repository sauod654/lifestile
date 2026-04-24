'use client';

import Sidebar from './Sidebar';
import TopNav from './TopNav';
import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import { useRouter } from '@/i18n/routing';
import { supabase } from '@/lib/supabase';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: 'admin' | 'medical' | 'employee' | 'supplier';
}

export default function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const locale = useLocale();
  const router = useRouter();
  const isRTL = locale === 'ar';
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        // Use a more specific login page based on context or just a general one
        router.push('/employee-login');
      } else {
        setUserName(session.user.user_metadata?.full_name || '');
        setLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="animate-spin text-primary">
          <span className="material-symbols-outlined text-5xl">sync</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface text-on-surface min-h-screen font-body">
      <Sidebar role={role} />
      <TopNav role={role} userName={userName} />
      <main className={`${isRTL ? 'lg:mr-64 lg:ml-0' : 'lg:ml-64 lg:mr-0'} pt-16 min-h-screen`}>
        <div className="p-8 max-w-[1600px] mx-auto space-y-8">
          {children}
        </div>
      </main>
    </div>
  );
}
