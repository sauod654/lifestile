'use client';

import {useTranslations, useLocale} from 'next-intl';
import {useState} from 'react';
import DashboardLayout from '@/components/DashboardLayout';

export default function MedicalLeadershipPage() {
  const t = useTranslations('MedicalLeadership');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const [activeTab, setActiveTab] = useState('approvals');

  return (
    <DashboardLayout role="medical">
      <div className="space-y-12">
        {/* Leadership Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-primary tracking-tight mb-2">{t('title')}</h1>
            <p className="text-lg text-secondary max-w-2xl leading-relaxed">{t('subtitle')}</p>
          </div>
          <div className="flex gap-4">
            <button className="bg-surface-container-low px-8 py-3 rounded-xl font-bold text-secondary border border-outline-variant/10 hover:bg-surface-container-high transition-all">
              {t('analytics')}
            </button>
            <button className="bg-primary text-white px-8 py-3 rounded-xl font-black shadow-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">assignment_turned_in</span>
              <span>{t('new_review')}</span>
            </button>
          </div>
        </header>

        {/* Navigation Tabs */}
        <div className="flex gap-2 p-1.5 bg-surface-container-low w-fit rounded-2xl border border-outline-variant/10">
          {[
            { id: 'approvals', label: t('pending_approvals'), icon: 'rule' },
            { id: 'performance', label: t('staff_performance'), icon: 'clinical_notes' },
            { id: 'standards', label: t('clinical_standards'), icon: 'verified' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.id ? 'bg-white text-primary shadow-sm' : 'text-outline hover:bg-surface-container-high'
              }`}
            >
              <span className="material-symbols-outlined text-lg">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: t('plans_today'), value: '48', trend: '+12%', icon: 'article', color: 'text-primary' },
            { label: t('pending'), value: '14', trend: '-2', icon: 'pending', color: 'text-amber-600' },
            { label: t('avg_time'), value: '2.4h', trend: 'Optimal', icon: 'timer', color: 'text-emerald-600' },
            { label: 'Risk Flags', value: '03', trend: 'Critical', icon: 'warning', color: 'text-error' },
          ].map((metric, idx) => (
            <div key={idx} className="bg-surface-container-lowest p-6 rounded-[2rem] border border-outline-variant/10 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start mb-6">
                <span className={`material-symbols-outlined ${metric.color} bg-surface-container-low p-2 rounded-lg`}>{metric.icon}</span>
                <span className={`text-[10px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-full ${
                  metric.trend.includes('+') || metric.trend === 'Optimal' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                }`}>{metric.trend}</span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-1">{metric.label}</p>
                <p className="text-3xl font-black text-primary tracking-tighter">{metric.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Approval Queue Section */}
        <section className="bg-surface-container-lowest rounded-[2.5rem] p-10 border border-outline-variant/10 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-2xl font-extrabold text-primary">{t('approval_inbox')}</h3>
            <div className="flex gap-2">
              <span className="px-4 py-2 bg-primary/5 text-primary text-xs font-bold rounded-lg border border-primary/10">Filtered: High Risk</span>
            </div>
          </div>

          <div className="space-y-6">
            {[
              { id: '8829', patient: 'Khalid Salman', age: '42', risk: 'Medium', doc: 'Dr. Fatima R.', type: 'Nutrition Plan V2', time: '2h ago' },
              { id: '1240', patient: 'Laila Ahmed', age: '29', risk: 'Stable', doc: 'Dr. Sarah M.', type: 'Post-Op Recovery', time: '4h ago' },
            ].map((item, idx) => (
              <div key={idx} className="bg-surface-container-low/40 rounded-[2rem] p-8 border border-transparent hover:border-outline-variant/10 transition-all">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-surface-container-high flex flex-col items-center justify-center border border-outline-variant/10">
                      <p className="text-[10px] font-bold text-outline uppercase">ID</p>
                      <p className="font-black text-primary">{item.id}</p>
                    </div>
                    <div>
                      <h4 className="text-2xl font-extrabold text-primary tracking-tight mb-1">{item.patient}</h4>
                      <div className="flex gap-4 text-xs font-bold text-outline uppercase tracking-widest">
                        <span>{t('age')}: {item.age}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-outline/20 self-center"></span>
                        <span>{t('risk')}: <span className={item.risk === 'Medium' ? 'text-amber-600' : 'text-emerald-600'}>{item.risk}</span></span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 lg:max-w-xs">
                    <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-1">{t('review_plan')}</p>
                    <p className="font-bold text-primary">{item.type}</p>
                    <p className="text-xs text-secondary italic">Submitted by {item.doc} • {item.time}</p>
                  </div>

                  <div className="flex gap-3 w-full lg:w-auto">
                    <button className="flex-1 lg:flex-none px-6 py-3.5 bg-surface-container-highest text-primary font-bold rounded-xl hover:bg-white transition-all shadow-sm">
                      {t('request_mods')}
                    </button>
                    <button className="flex-1 lg:flex-none px-8 py-3.5 bg-primary text-white font-black rounded-xl shadow-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-sm">verified_user</span>
                      {t('approve_finalize')}
                    </button>
                  </div>
                </div>

                {/* Sub-details Expansion (Sample) */}
                <div className="mt-8 pt-8 border-t border-outline-variant/10 grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/5">
                    <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-2">{t('vitals_summary')}</p>
                    <p className="text-sm font-bold text-primary">BP: 132/88 | HR: 84 | BMI: 28.5</p>
                  </div>
                  <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/5">
                    <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-2">Primary Diagnosis</p>
                    <p className="text-sm font-bold text-primary">Hypertension II • Metabolic Syndrome</p>
                  </div>
                  <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/5">
                    <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-2">Staff Adherence</p>
                    <p className="text-sm font-bold text-emerald-600">92% Compliance Rating</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Global Security Disclaimer */}
        <footer className="flex flex-col md:flex-row justify-between items-center gap-6 px-4">
          <div className="flex items-center gap-3 text-outline">
            <span className="material-symbols-outlined">security</span>
            <p className="text-xs font-bold uppercase tracking-widest">{t('protocol_secured')}: Editorial Trust AES-256</p>
          </div>
          <div className="flex gap-8 text-xs font-bold text-primary uppercase tracking-widest">
            <a href="#" className="hover:underline">Audit Logs</a>
            <a href="#" className="hover:underline">Staff Directory</a>
            <a href="#" className="hover:underline">Global Standards</a>
          </div>
        </footer>
      </div>
    </DashboardLayout>
  );
}
