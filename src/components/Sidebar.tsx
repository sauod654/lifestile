'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { useMemo } from 'react';

interface SidebarProps {
  role: 'admin' | 'medical' | 'employee' | 'supplier';
}

export default function Sidebar({ role }: SidebarProps) {
  const t = useTranslations('Sidebar');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const pathname = usePathname();

  const menuItems = useMemo(() => {
    const roles: Record<string, any[]> = {
      admin: [
        { id: 'overview', label: t('admin_overview'), icon: 'dashboard', href: '/admin-dashboard' },
        { id: 'users', label: t('admin_users'), icon: 'group', href: '/user-directory' },
        { id: 'permissions', label: t('admin_permissions') || 'Permissions Matrix', icon: 'security', href: '/permissions-matrix' },
        { id: 'analytics', label: t('medical_analytics'), icon: 'insights', href: '/ai-insights' },
        { id: 'audit', label: t('admin_audit'), icon: 'receipt_long', href: '/user-management' },
      ],
      medical: [
        { id: 'dashboard', label: t('medical_dashboard'), icon: 'dashboard', href: '/medical-dashboard' },
        { id: 'workspace', label: t('clinical_workspace') || 'Clinical Workspace', icon: 'clinical_notes', href: '/clinical-workspace' },
        { id: 'leadership', label: t('medical_leadership') || 'Medical Leadership', icon: 'verified_user', href: '/medical-leadership' },
        { id: 'patients', label: t('medical_patients'), icon: 'groups', href: '/patient-records' },
        { id: 'analytics', label: t('medical_analytics'), icon: 'insights', href: '/ai-insights' },
      ],
      employee: [
        { id: 'overview', label: t('employee_overview') || 'Wellness Overview', icon: 'dashboard', href: '/employee-dashboard' },
        { id: 'booking', label: t('book_appointment') || 'Book Appointment', icon: 'event_available', href: '/book-appointment' },
        { id: 'vitals', label: t('medical_vitals') || 'Health Vitals', icon: 'monitor_heart', href: '/employee-dashboard#vitals' },
      ],
      supplier: [
        { id: 'dashboard', label: t('supplier_dashboard') || 'Inventory Hub', icon: 'dashboard', href: '/supplier-dashboard' },
        { id: 'orders', label: t('supplier_orders') || 'Orders', icon: 'local_shipping', href: '/supplier-dashboard' },
      ]
    };

    return roles[role] || [];
  }, [role, t]);

  return (
    <aside className={`h-screen w-64 fixed ${isRTL ? 'right-0' : 'left-0'} top-0 z-40 hidden lg:flex flex-col bg-surface-container-low dark:bg-slate-900 border-none`}>
      <div className="flex flex-col h-full p-6 space-y-6">
        {/* Logo Section */}
        <div className={`flex items-center gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center text-on-primary">
            <span className="material-symbols-outlined">clinical_notes</span>
          </div>
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <h1 className="text-lg font-black text-primary leading-none font-headline">LifeStyle</h1>
            <p className="text-[10px] text-secondary font-bold tracking-widest uppercase">{t(`${role}_subtitle`)}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href as any}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                  isActive 
                    ? 'bg-primary/10 text-primary font-bold translate-x-1' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-surface-container-high hover:translate-x-1'
                } ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <span className={`material-symbols-outlined ${isActive ? 'fill-1' : ''}`}>{item.icon}</span>
                <span className="font-manrope text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-outline-variant/10 space-y-4">
          <button className="w-full bg-primary text-on-primary py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-primary-container transition-all active:scale-95">
            {t('generate_report')}
          </button>
          <div className="space-y-1">
             <Link href="/settings" className={`flex items-center gap-3 px-4 py-2 text-slate-500 hover:text-primary transition-colors text-xs font-medium ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="material-symbols-outlined text-sm">settings</span>
              {t('settings')}
            </Link>
            <button className={`w-full flex items-center gap-3 px-4 py-2 text-slate-500 hover:text-error transition-colors text-xs font-medium ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="material-symbols-outlined text-sm">logout</span>
              {t('logout')}
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
