'use client';

import { useTranslations, useLocale } from 'next-intl';
import DashboardLayout from '@/components/DashboardLayout';

export default function UserManagementPage() {
  const t = useTranslations('UserManagement');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <DashboardLayout role="admin">
      {/* Section Header */}
      <section className={`grid grid-cols-12 gap-8 items-end ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className={`col-span-12 lg:col-span-7 ${isRTL ? 'text-right' : 'text-left'}`}>
          <p className="text-primary font-bold uppercase tracking-[0.2em] text-xs mb-2">{t('subtitle')}</p>
          <h2 className="font-headline text-5xl font-extrabold tracking-tight text-on-background">{t('title')}</h2>
          <p className="text-secondary mt-4 max-w-xl text-lg leading-relaxed">{t('desc')}</p>
        </div>
        <div className={`col-span-12 lg:col-span-5 flex ${isRTL ? 'justify-start' : 'justify-end'} gap-3`}>
          <div className={`bg-surface-container-low p-4 rounded-2xl flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={isRTL ? 'text-left' : 'text-right'}>
              <p className="text-xs font-semibold text-secondary">{t('active_users')}</p>
              <p className="text-2xl font-headline font-extrabold text-primary">1,284</p>
            </div>
            <div className="h-10 w-[1px] bg-outline-variant"></div>
            <div className={isRTL ? 'text-left' : 'text-right'}>
              <p className="text-xs font-semibold text-secondary">{t('new_today')}</p>
              <p className="text-2xl font-headline font-extrabold text-tertiary">+12</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Content */}
      <div className="grid grid-cols-12 gap-6">
        {/* Main User Table Card */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-[2rem] shadow-sm p-8 overflow-hidden relative">
          <div className={`flex justify-between items-center mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="flex gap-2 p-1 bg-surface-container-low rounded-xl">
              <button className="px-4 py-2 bg-tertiary-container text-on-tertiary-container rounded-lg text-sm font-bold transition-all">{t('all_users')}</button>
              <button className="px-4 py-2 text-secondary hover:bg-surface-container-high rounded-lg text-sm font-medium transition-all">{t('medical')}</button>
              <button className="px-4 py-2 text-secondary hover:bg-surface-container-high rounded-lg text-sm font-medium transition-all">{t('suppliers')}</button>
            </div>
            <button className={`flex items-center gap-2 text-sm font-bold text-primary group ${isRTL ? 'flex-row-reverse' : ''}`}>
              {t('export_options')}
              <span className={`material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`}>arrow_forward</span>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className={`w-full ${isRTL ? 'text-right' : 'text-left'}`}>
              <thead className="border-b border-surface-container-high">
                <tr>
                  <th className="pb-4 font-headline font-bold text-secondary text-sm">{t('col_user')}</th>
                  <th className="pb-4 font-headline font-bold text-secondary text-sm">{t('col_classification')}</th>
                  <th className="pb-4 font-headline font-bold text-secondary text-sm">{t('col_status')}</th>
                  <th className="pb-4 font-headline font-bold text-secondary text-sm">{t('col_access')}</th>
                  <th className={`pb-4 ${isRTL ? 'text-left' : 'text-right'} font-headline font-bold text-secondary text-sm`}>{t('col_actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-low">
                <tr className="group hover:bg-surface-container-low/50 transition-colors">
                  <td className="py-5">
                    <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center font-bold text-on-secondary-container">JS</div>
                      <div>
                        <p className="font-bold text-on-surface">Julian Sterling</p>
                        <p className="text-xs text-secondary">j.sterling@clinical.com</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-5">
                    <span className="px-3 py-1 bg-primary-container/10 text-primary-container text-[11px] font-bold uppercase rounded-full">Medical Team</span>
                  </td>
                  <td className="py-5">
                    <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                      <span className="text-sm font-medium">Active</span>
                    </div>
                  </td>
                  <td className="py-5 text-sm font-medium text-secondary">Lead Surgeon</td>
                  <td className={`py-5 ${isRTL ? 'text-left' : 'text-right'}`}>
                    <div className={`flex ${isRTL ? 'justify-start' : 'justify-end'} gap-2 opacity-0 group-hover:opacity-100 transition-opacity`}>
                      <button className="p-2 hover:bg-white rounded-lg text-secondary hover:text-primary transition-all"><span className="material-symbols-outlined text-xl">edit</span></button>
                      <button className="p-2 hover:bg-white rounded-lg text-secondary hover:text-error transition-all"><span className="material-symbols-outlined text-xl">delete</span></button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Audit Trail Side */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-[#151a1a] text-white rounded-[2rem] p-8 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className={`font-headline text-2xl font-bold mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>{t('recent_activity')}</h3>
              <div className="space-y-6">
                <div className={`flex gap-4 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                  <div className="w-1 h-10 bg-primary rounded-full mt-1"></div>
                  <div>
                    <p className="text-xs text-[#8ba3a3] font-medium mb-1">09:42 AM · TODAY</p>
                    <p className="text-sm leading-tight"><span className="font-bold text-white">Julian Sterling</span> updated surgical supply request #4421</p>
                  </div>
                </div>
              </div>
              <button className={`mt-10 w-full py-4 border border-[#252f2f] rounded-xl text-sm font-bold hover:bg-[#252f2f] transition-all flex items-center justify-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                {t('view_logs')}
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </button>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl -mr-10 -mt-10"></div>
          </div>

          <div className="bg-surface-container-high rounded-[2rem] p-8">
            <h3 className={`font-headline text-xl font-bold text-primary mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>{t('quick_provisioning')}</h3>
            <form className="space-y-4">
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <label className="block text-[11px] font-bold text-secondary uppercase tracking-wider mb-2">{t('identity')}</label>
                <input className={`w-full bg-white border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary-container text-sm ${isRTL ? 'text-right' : ''}`} placeholder="Full Name" type="text"/>
              </div>
              <button className="w-full py-4 bg-gradient-to-br from-primary to-primary-container text-white font-bold rounded-xl shadow-lg mt-4 active:scale-95 transition-all">{t('authorize')}</button>
            </form>
          </div>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="col-span-12 space-y-6 mt-12">
        <div className={`flex justify-between items-end ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}>
          <div>
            <h3 className="font-headline text-3xl font-extrabold text-on-background">{t('audit_trace')}</h3>
            <p className="text-secondary text-sm mt-2">{t('audit_desc')}</p>
          </div>
        </div>
        <div className="bg-white rounded-[2.5rem] shadow-sm overflow-hidden p-2">
          <table className={`w-full ${isRTL ? 'text-right' : 'text-left'}`}>
            <thead className="bg-surface-container-low">
              <tr className={isRTL ? 'flex-row-reverse' : ''}>
                <th className={`px-8 py-5 font-headline font-bold text-primary text-xs uppercase tracking-widest ${isRTL ? 'rounded-tr-[2rem]' : 'rounded-tl-[2rem]'}`}>Temporal Marker</th>
                <th className="px-6 py-5 font-headline font-bold text-primary text-xs uppercase tracking-widest">Authorized User</th>
                <th className="px-6 py-5 font-headline font-bold text-primary text-xs uppercase tracking-widest">Action Vector</th>
                <th className="px-8 py-5 font-headline font-bold text-primary text-xs uppercase tracking-widest whitespace-nowrap">Interface / IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-low">
              <tr className="hover:bg-surface-container-low/30 transition-colors">
                <td className="px-8 py-6">
                  <p className="text-xs font-bold text-on-surface">Oct 24, 2023</p>
                  <p className="text-[10px] text-secondary">08:14:22 GMT+3</p>
                </td>
                <td className="px-6 py-6 font-bold text-sm">Elena Vance</td>
                <td className="px-6 py-6"><span className="text-[10px] font-extrabold bg-blue-50 text-blue-700 px-2 py-1 rounded">USER_ACCESS_GRANT</span></td>
                <td className="px-8 py-6 text-[10px] font-mono text-secondary">192.168.1.44</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
