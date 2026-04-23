'use client';

import {useTranslations, useLocale} from 'next-intl';
import {useState, useEffect} from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { getAllPatients } from '@/utils/clinical';

export default function PatientRecordsPage() {
  const t = useTranslations('PatientDirectory');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPatients() {
      try {
        const data = await getAllPatients();
        setPatients(data);
      } catch (err) {
        console.error('Error fetching patients:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchPatients();
  }, []);

  return (
    <DashboardLayout role="medical">
      <div className="space-y-12">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-primary tracking-tight mb-2">{t('title')}</h1>
            <p className="text-lg text-secondary max-w-2xl leading-relaxed">{t('subtitle')}</p>
          </div>
          <button className="bg-primary text-white px-8 py-3.5 rounded-xl font-black shadow-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center gap-2">
            <span className="material-symbols-outlined">person_add</span>
            <span>{t('add_patient')}</span>
          </button>
        </header>

        {/* Search & Filters */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline">search</span>
            <input 
              className="w-full bg-surface-container-low border-none rounded-[1.5rem] py-5 pl-14 pr-6 focus:ring-2 focus:ring-primary/20 transition-all text-sm font-bold shadow-sm" 
              placeholder={t('search_placeholder')} 
              type="text"
            />
          </div>
          <div className="flex gap-3">
            <button className="bg-surface-container-low px-6 py-5 rounded-[1.5rem] font-bold text-secondary border border-outline-variant/10 hover:bg-surface-container-high transition-all flex items-center gap-2 shadow-sm">
              <span className="material-symbols-outlined">filter_list</span>
              {t('filter_risk')}
            </button>
            <button className="bg-surface-container-low px-6 py-5 rounded-[1.5rem] font-bold text-secondary border border-outline-variant/10 hover:bg-surface-container-high transition-all flex items-center gap-2 shadow-sm">
              <span className="material-symbols-outlined">ios_share</span>
              {t('export_list')}
            </button>
          </div>
        </div>

        {/* Records Table */}
        <section className="bg-surface-container-lowest rounded-[2.5rem] p-10 border border-outline-variant/10 shadow-sm overflow-x-auto">
          {loading ? (
            <div className="flex justify-center py-20 animate-pulse text-primary font-bold">Loading records...</div>
          ) : (
            <table className="w-full min-w-[1000px]">
              <thead>
                <tr className="border-b border-outline-variant/10">
                  <th className="pb-6 text-[10px] font-black text-outline uppercase tracking-widest text-left px-4">{t('col_id')}</th>
                  <th className="pb-6 text-[10px] font-black text-outline uppercase tracking-widest text-left px-4">{t('col_name')}</th>
                  <th className="pb-6 text-[10px] font-black text-outline uppercase tracking-widest text-center px-4">{t('col_vitals')}</th>
                  <th className="pb-6 text-[10px] font-black text-outline uppercase tracking-widest text-center px-4">{t('col_compliance')}</th>
                  <th className="pb-6 text-[10px] font-black text-outline uppercase tracking-widest text-right px-4">{t('col_last_seen')}</th>
                  <th className="pb-6 text-[10px] font-black text-outline uppercase tracking-widest text-right px-4">{t('col_actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/5">
                {patients.map((patient, idx) => (
                  <tr key={idx} className="group hover:bg-surface-container-low/40 transition-all cursor-pointer">
                    <td className="py-6 px-4">
                      <p className="font-bold text-primary">{patient.employee_id_label}</p>
                      <p className="text-[10px] font-bold text-outline uppercase tracking-widest">{patient.medical_unit}</p>
                    </td>
                    <td className="py-6 px-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-surface-container-high overflow-hidden border border-outline-variant/10">
                          <img src={patient.profiles?.avatar_url || `https://i.pravatar.cc/150?u=${patient.id}`} alt="avatar" className="w-full h-full object-cover" />
                        </div>
                        <p className="font-extrabold text-primary text-lg tracking-tight">{patient.profiles?.full_name}</p>
                      </div>
                    </td>
                    <td className="py-6 px-4 text-center">
                      <p className="font-bold text-primary">--/--</p>
                      <div className="flex justify-center gap-1 mt-1">
                        <span className="w-1 h-1 rounded-full bg-outline/20"></span>
                        <span className="w-1 h-1 rounded-full bg-outline/20"></span>
                        <span className="w-1 h-1 rounded-full bg-outline/20"></span>
                      </div>
                    </td>
                    <td className="py-6 px-4 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className={`px-4 py-1 rounded-full text-[10px] font-black tracking-tighter ${
                          patient.compliance_score > 80 ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                          {patient.compliance_score}% {t('col_compliance')}
                        </span>
                      </div>
                    </td>
                    <td className="py-6 px-4 text-right">
                      <p className="font-bold text-primary">{new Date(patient.last_seen).toLocaleDateString()}</p>
                      <p className="text-[10px] font-bold text-outline uppercase tracking-widest">{patient.risk_level} Risk</p>
                    </td>
                    <td className="py-6 px-4 text-right">
                      <button className="bg-surface-container-high text-primary font-bold px-6 py-2.5 rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm">
                        {t('view_profile')}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {/* Summary Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 px-4">
          <p className="text-sm font-bold text-outline uppercase tracking-widest">Showing {patients.length} patients</p>
          <div className="flex gap-2">
            {[1, 2, 3, '...', 42].map((p, i) => (
              <button key={i} className={`w-10 h-10 rounded-xl font-bold transition-all ${
                p === 1 ? 'bg-primary text-white shadow-lg' : 'bg-surface-container-low text-secondary hover:bg-surface-container-high'
              }`}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
