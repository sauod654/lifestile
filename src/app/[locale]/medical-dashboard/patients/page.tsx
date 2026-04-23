'use client';

import {useTranslations, useLocale} from 'next-intl';
import {Link} from '@/i18n/routing';

export default function PatientDirectoryPage() {
  const t = useTranslations('PatientDirectory');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Sidebar - Reuse from Medical Dashboard */}
      <aside className="h-screen w-64 fixed left-0 top-0 bg-slate-50 dark:bg-slate-950 flex flex-col p-6 space-y-4 font-headline text-sm hidden md:flex z-50 border-e border-outline-variant/10">
        <div className="mb-8">
          <h1 className="text-lg font-extrabold text-cyan-900 dark:text-cyan-100">Clinical Nexus</h1>
          <p className="text-xs text-slate-500 font-medium tracking-wide">Medical Portal</p>
        </div>
        <nav className="flex-1 space-y-1">
          <Link href="/medical-dashboard" className="flex items-center space-x-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer">
            <span className="material-symbols-outlined">dashboard</span>
            <span>Dashboard</span>
          </Link>
          <Link href="/medical-dashboard/patients" className="flex items-center space-x-3 px-4 py-3 bg-cyan-50 dark:bg-cyan-900/30 text-cyan-900 dark:text-cyan-200 font-semibold rounded-lg cursor-pointer transition-transform duration-200">
            <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>assignment_ind</span>
            <span>{t('title')}</span>
          </Link>
          {/* Other nav items... */}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="md:ml-64 min-h-screen p-8 flex-1">
        {/* Header */}
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-primary tracking-tight mb-2">{t('title')}</h1>
            <p className="text-lg text-secondary">{t('subtitle')}</p>
          </div>
          <button className="editorial-gradient text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 shadow-lg shadow-primary/20 hover:brightness-110 transition-all">
            <span className="material-symbols-outlined">person_add</span>
            {t('add_patient')}
          </button>
        </header>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-800 rounded-xl border border-outline-variant/10 shadow-sm">
            <span className="material-symbols-outlined text-secondary">search</span>
            <input className="bg-transparent border-none focus:ring-0 text-sm w-full" placeholder={t('search_placeholder')} type="text"/>
          </div>
          <button className="px-6 py-3 bg-white dark:bg-slate-800 text-primary font-bold text-sm rounded-xl border border-outline-variant/10 shadow-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">filter_list</span>
            {t('filter_risk')}
          </button>
          <button className="px-6 py-3 bg-surface-container-high text-secondary font-bold text-sm rounded-xl border border-outline-variant/10 shadow-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">download</span>
            {t('export_list')}
          </button>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-slate-800 rounded-[2rem] p-8 border border-outline-variant/10 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] uppercase font-black text-outline tracking-widest border-b border-outline-variant/5">
                  <th className="pb-4">{t('col_id')}</th>
                  <th className="pb-4">{t('col_name')}</th>
                  <th className="pb-4">{t('col_vitals')}</th>
                  <th className="pb-4">{t('col_compliance')}</th>
                  <th className="pb-4">{t('col_last_seen')}</th>
                  <th className="pb-4 text-right">{t('col_actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/5 font-medium">
                {/* Patient Row 1 */}
                <tr className="group hover:bg-slate-50/50 transition-colors">
                  <td className="py-6 text-xs text-secondary font-mono tracking-tighter">PAT-2023-001</td>
                  <td className="py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-white font-bold text-xs">SK</div>
                      <div>
                        <p className="font-headline font-bold text-primary">Sarah Khalid</p>
                        <p className="text-[10px] text-secondary">32, Female</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-6">
                    <div className="flex gap-4">
                      <div className="text-center">
                        <p className="text-[10px] text-outline font-bold uppercase">{t('bp')}</p>
                        <p className="text-sm font-bold text-primary">118/76</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] text-outline font-bold uppercase">{t('glucose')}</p>
                        <p className="text-sm font-bold text-primary">94</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-6">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-700 uppercase">Compliant</span>
                      <div className="w-12 h-1 bg-emerald-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{width: '95%'}}></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-6 text-sm text-secondary">Oct 24, 2023</td>
                  <td className="py-6 text-right">
                    <button className="px-4 py-2 bg-slate-50 hover:bg-primary hover:text-white text-secondary font-bold text-xs rounded-lg transition-all">
                      {t('view_profile')}
                    </button>
                  </td>
                </tr>
                {/* Patient Row 2 */}
                <tr className="group hover:bg-slate-50/50 transition-colors">
                  <td className="py-6 text-xs text-secondary font-mono tracking-tighter">PAT-2023-082</td>
                  <td className="py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-error-container/20 flex items-center justify-center text-error font-bold text-xs">AJ</div>
                      <div>
                        <p className="font-headline font-bold text-primary">Ahmed Jameel</p>
                        <p className="text-[10px] text-secondary">45, Male</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-6">
                    <div className="flex gap-4">
                      <div className="text-center">
                        <p className="text-[10px] text-outline font-bold uppercase">{t('bp')}</p>
                        <p className="text-sm font-bold text-error">142/92</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] text-outline font-bold uppercase">{t('glucose')}</p>
                        <p className="text-sm font-bold text-primary">105</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-6">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-[10px] font-black bg-error-container text-on-error-container uppercase">High Risk</span>
                      <div className="w-12 h-1 bg-error-container rounded-full overflow-hidden">
                        <div className="h-full bg-error" style={{width: '42%'}}></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-6 text-sm text-secondary">Oct 22, 2023</td>
                  <td className="py-6 text-right">
                    <button className="px-4 py-2 bg-slate-50 hover:bg-primary hover:text-white text-secondary font-bold text-xs rounded-lg transition-all">
                      {t('view_profile')}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
