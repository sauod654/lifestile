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

  useEffect(() => {
    // Temporarily disabled for demo purposes
    /*
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
      } else {
        setLoading(false);
      }
    };
    checkAuth();
    */
    setLoading(false);
  }, [locale, router]);

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
      <TopNav />
      <main className={`${isRTL ? 'lg:mr-64 lg:ml-0' : 'lg:ml-64 lg:mr-0'} pt-16 min-h-screen`}>
        <div className="p-8 max-w-[1600px] mx-auto space-y-8">
          {children}
        </div>
      </main>
    </div>
  );
}
