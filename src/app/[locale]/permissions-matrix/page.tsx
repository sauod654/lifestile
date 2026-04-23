'use client';

import {useTranslations, useLocale} from 'next-intl';
import DashboardLayout from '@/components/DashboardLayout';

export default function PermissionsMatrixPage() {
  const t = useTranslations('AdminDashboard');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const permissions = [
    'Clinical Data View',
    'Clinical Data Edit',
    'Financial Records Access',
    'Supplier Management',
    'Staff Provisioning',
    'Audit Log Export',
    'Global System Settings'
  ];

  const roles = [
    { name: 'Admin', color: 'bg-primary', access: [true, true, true, true, true, true, true] },
    { name: 'Medical Lead', color: 'bg-tertiary', access: [true, true, false, false, true, true, false] },
    { name: 'Practitioner', color: 'bg-primary-container', access: [true, true, false, false, false, false, false] },
    { name: 'Supplier', color: 'bg-secondary', access: [false, false, true, true, false, false, false] },
    { name: 'Employee', color: 'bg-surface-container-high', access: [true, false, false, false, false, false, false] },
  ];

  return (
    <DashboardLayout role="admin">
      <div className="space-y-12">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-primary tracking-tight mb-2">{t('nav_permissions')}</h1>
            <p className="text-lg text-secondary max-w-2xl leading-relaxed">Define and enforce the role-based access control matrix across all platform modules.</p>
          </div>
          <button className="bg-primary text-white px-8 py-3.5 rounded-xl font-black shadow-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center gap-2">
            <span className="material-symbols-outlined">add_moderator</span>
            <span>Create New Role</span>
          </button>
        </header>

        {/* Permissions Table Section */}
        <section className="bg-surface-container-lowest rounded-[2.5rem] p-10 border border-outline-variant/10 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr>
                  <th className="pb-10 text-left px-4 w-1/3">
                    <p className="text-[10px] font-black text-outline uppercase tracking-widest mb-1">Matrix Structure</p>
                    <p className="text-2xl font-extrabold text-primary">Capabilities / Roles</p>
                  </th>
                  {roles.map((role, idx) => (
                    <th key={idx} className="pb-10 px-4 text-center">
                      <div className={`w-32 mx-auto py-3 rounded-2xl ${role.color} ${role.name === 'Employee' ? 'text-primary' : 'text-white'} shadow-sm`}>
                        <p className="text-xs font-black uppercase tracking-tighter">{role.name}</p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {permissions.map((perm, pIdx) => (
                  <tr key={pIdx} className="group hover:bg-surface-container-low/40 transition-all">
                    <td className="py-8 px-4">
                      <p className="text-lg font-bold text-primary tracking-tight">{perm}</p>
                      <p className="text-xs text-secondary font-medium">Standard clinical operating procedure</p>
                    </td>
                    {roles.map((role, rIdx) => (
                      <td key={rIdx} className="py-8 px-4 text-center">
                        <div className="flex justify-center">
                          {role.access[pIdx] ? (
                            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                              <span className="material-symbols-outlined text-xl" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-surface-container-low text-outline/30 flex items-center justify-center">
                              <span className="material-symbols-outlined text-xl">block</span>
                            </div>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Matrix Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-surface-container-low rounded-[2rem] p-8 border border-outline-variant/10">
            <h3 className="text-xl font-bold text-primary mb-6">{t('quick_permissions')}</h3>
            <p className="text-sm text-secondary mb-8 leading-relaxed">
              Updates to the matrix are effective immediately for all active sessions. Security logs will capture all modification events for auditing.
            </p>
            <div className="flex gap-4">
              <button className="flex-1 py-4 bg-primary text-white font-black rounded-xl shadow-lg hover:brightness-110 active:scale-[0.98] transition-all">
                {t('update_permissions')}
              </button>
              <button className="flex-1 py-4 bg-surface-container-highest text-primary font-bold rounded-xl hover:bg-white transition-all shadow-sm">
                Reset Defaults
              </button>
            </div>
          </div>
          
          <div className="bg-secondary-container/30 rounded-[2rem] p-8 border border-secondary/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-secondary">security</span>
                <h3 className="text-xl font-bold text-primary">Compliance Verification</h3>
              </div>
              <p className="text-sm text-on-secondary-container/80 leading-relaxed italic">
                "The current permissions matrix aligns with HIPAA Tier 2 requirements and SOC2 Type II internal controls for medical data access management."
              </p>
            </div>
            <div className="mt-8 flex items-center gap-2 text-secondary">
              <span className="material-symbols-outlined text-sm">verified_user</span>
              <p className="text-[10px] font-bold uppercase tracking-widest">Certified on Oct 12, 2023</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
