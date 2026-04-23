'use client';

import {useTranslations, useLocale} from 'next-intl';
import DashboardLayout from '@/components/DashboardLayout';

export default function UserDirectoryPage() {
  const t = useTranslations('UserManagement');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  return (
    <DashboardLayout role="admin">
      <div className="space-y-12">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-primary tracking-tight mb-2">{t('title')}</h1>
            <p className="text-lg text-secondary max-w-2xl leading-relaxed">{t('desc')}</p>
          </div>
          <button className="bg-primary text-white px-8 py-3.5 rounded-xl font-black shadow-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center gap-2">
            <span className="material-symbols-outlined">person_add</span>
            <span>{t('quick_provisioning')}</span>
          </button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: t('active_users'), value: '1,482', trend: '+12', icon: 'group', color: 'text-primary' },
            { label: t('medical'), value: '42', trend: 'Online', icon: 'medical_services', color: 'text-tertiary' },
            { label: t('suppliers'), value: '28', trend: 'Active', icon: 'local_shipping', color: 'text-secondary' },
            { label: 'System Load', value: '22%', trend: 'Stable', icon: 'analytics', color: 'text-emerald-600' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-surface-container-lowest p-6 rounded-[2rem] border border-outline-variant/10 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start mb-6">
                <span className={`material-symbols-outlined ${stat.color} bg-surface-container-low p-2 rounded-lg`}>{stat.icon}</span>
                <span className="text-[10px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">{stat.trend}</span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-3xl font-black text-primary tracking-tighter">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* User Directory Table */}
        <section className="bg-surface-container-lowest rounded-[2.5rem] p-10 border border-outline-variant/10 shadow-sm overflow-hidden relative">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
            <div className="flex-1 w-full relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline">search</span>
              <input 
                className="w-full bg-surface-container-low border-none rounded-2xl py-4 pl-14 pr-6 focus:ring-2 focus:ring-primary/20 transition-all text-sm font-bold" 
                placeholder="Search name, ID, or email..." 
                type="text"
              />
            </div>
            <div className="flex gap-3">
              <button className="bg-surface-container-low px-6 py-4 rounded-2xl font-bold text-secondary border border-outline-variant/10 hover:bg-surface-container-high transition-all flex items-center gap-2">
                <span className="material-symbols-outlined">filter_alt</span>
                {t('all_users')}
              </button>
              <button className="bg-surface-container-low px-6 py-4 rounded-2xl font-bold text-secondary border border-outline-variant/10 hover:bg-surface-container-high transition-all flex items-center gap-2">
                <span className="material-symbols-outlined">download</span>
                {t('export_options')}
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-outline-variant/10 text-left">
                  <th className="pb-6 text-[10px] font-black text-outline uppercase tracking-widest px-4">{t('col_user')}</th>
                  <th className="pb-6 text-[10px] font-black text-outline uppercase tracking-widest px-4">{t('col_classification')}</th>
                  <th className="pb-6 text-[10px] font-black text-outline uppercase tracking-widest px-4 text-center">{t('col_status')}</th>
                  <th className="pb-6 text-[10px] font-black text-outline uppercase tracking-widest px-4">{t('col_access')}</th>
                  <th className="pb-6 text-[10px] font-black text-outline uppercase tracking-widest px-4 text-right">{t('col_actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/5">
                {[
                  { name: 'Dr. Sarah Mansour', email: 's.mansour@lifestile.com', class: 'Medical • Head', status: 'Online', access: 'Tier 1 • Admin', img: '42' },
                  { name: 'Ahmed Abdullah', email: 'ahmed.a@lifestile.com', class: 'Employee • Clinical', status: 'Active', access: 'Tier 3 • Restricted', img: '33' },
                  { name: 'Supplies Co.', email: 'logistics@supplies.co', class: 'Supplier • Verified', status: 'Offline', access: 'Tier 2 • Partner', img: '22' },
                  { name: 'Admin Root', email: 'root@lifestile.com', class: 'Admin • Core', status: 'Online', access: 'Tier 1 • Full Access', img: '11' },
                ].map((user, idx) => (
                  <tr key={idx} className="group hover:bg-surface-container-low/40 transition-all cursor-pointer">
                    <td className="py-6 px-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-surface-container-high overflow-hidden border border-outline-variant/10 group-hover:scale-105 transition-transform">
                          <img src={`https://i.pravatar.cc/150?u=${user.img}`} alt={user.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-extrabold text-primary tracking-tight">{user.name}</p>
                          <p className="text-xs text-secondary font-medium">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-6 px-4">
                      <span className="text-sm font-bold text-primary">{user.class}</span>
                    </td>
                    <td className="py-6 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${user.status === 'Online' ? 'bg-emerald-500 animate-pulse' : user.status === 'Active' ? 'bg-primary' : 'bg-outline/30'}`}></span>
                        <span className="text-xs font-bold text-primary">{user.status}</span>
                      </div>
                    </td>
                    <td className="py-6 px-4">
                      <p className="text-xs font-black text-primary uppercase tracking-tighter bg-surface-container-low px-3 py-1 rounded-full w-fit">
                        {user.access}
                      </p>
                    </td>
                    <td className="py-6 px-4 text-right">
                      <button className="bg-surface-container-high text-primary font-bold px-6 py-2.5 rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm">
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Audit Log Peek */}
        <section className="bg-surface-container-low rounded-[2rem] p-8 border border-outline-variant/10">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-bold text-primary">{t('audit_trace')}</h3>
              <p className="text-xs text-secondary">{t('audit_desc')}</p>
            </div>
            <button className="text-primary font-bold text-sm flex items-center gap-2 hover:underline">
              {t('view_logs')}
              <span className="material-symbols-outlined text-sm">open_in_new</span>
            </button>
          </div>
          
          <div className="space-y-4">
            {[
              { log: 'User Dr. Sarah Mansour updated Vital Logs for EMP-2024-088', time: '12 mins ago', type: 'Clinical' },
              { log: 'System Admin assigned Tier 2 access to Supplies Co.', time: '1h ago', type: 'Security' },
            ].map((entry, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/5 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${entry.type === 'Clinical' ? 'bg-primary' : 'bg-tertiary'}`}></div>
                  <p className="text-sm font-bold text-primary">{entry.log}</p>
                </div>
                <p className="text-[10px] font-bold text-outline uppercase tracking-widest">{entry.time}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
