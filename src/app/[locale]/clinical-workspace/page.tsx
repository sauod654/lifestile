'use client';

import {useTranslations, useLocale} from 'next-intl';
import {useState, useEffect} from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { searchPatients, submitVitalSigns } from '@/utils/clinical';

export default function ClinicalWorkspacePage() {
  const t = useTranslations('ClinicalWorkspace');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  
  const [activeTab, setActiveTab] = useState('patient_workspace');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [vitals, setVitals] = useState({
    bp: '',
    hr: '',
    o2: '',
    notes: ''
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (searchQuery.length > 2) {
      const timer = setTimeout(async () => {
        try {
          const results = await searchPatients(searchQuery);
          setSearchResults(results);
        } catch (err) {
          console.error('Search error:', err);
        }
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSaveVitals = async () => {
    if (!selectedPatient || !vitals.hr || !vitals.o2) {
      alert('Select a patient and fill required vitals.');
      return;
    }
    setIsSaving(true);
    try {
      const [sys, dia] = vitals.bp.split('/').map(n => parseInt(n.trim()));
      await submitVitalSigns({
        patient_id: selectedPatient.id,
        bp_sys: sys || null,
        bp_dia: dia || null,
        heart_rate: parseInt(vitals.hr),
        o2_sat: parseInt(vitals.o2),
        notes: vitals.notes
      });
      alert('Vitals saved successfully');
      setVitals({ bp: '', hr: '', o2: '', notes: '' });
    } catch (err) {
      console.error('Save vitals error:', err);
      alert('Failed to save vitals.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DashboardLayout role="medical">
      <div className="flex flex-col lg:flex-row gap-8 min-h-[calc(100vh-160px)]">
        
        {/* Left Sidebar - Clinical Navigation */}
        <aside className="lg:w-72 flex flex-col gap-6">
          <div className="bg-surface-container-low rounded-[2rem] p-6 border border-outline-variant/10 shadow-sm">
            <h2 className="text-xl font-bold text-primary mb-6 px-2">{t('title')}</h2>
            <nav className="space-y-2">
              {[
                { id: 'patient_workspace', icon: 'person_search', label: t('patient_workspace') },
                { id: 'vital_logs', icon: 'monitor_heart', label: t('vital_logs') },
                { id: 'nutrition_studio', icon: 'nutrition', label: t('nutrition_studio') },
                { id: 'workflow_inbox', icon: 'inbox', label: t('workflow_inbox'), badge: '4' },
                { id: 'archives', icon: 'inventory_2', label: t('archives') },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all ${
                    activeTab === item.id 
                    ? 'bg-primary text-white shadow-lg' 
                    : 'text-secondary hover:bg-surface-container-high'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-xl">{item.icon}</span>
                    <span className="text-sm font-bold">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                      activeTab === item.id ? 'bg-white text-primary' : 'bg-primary-container text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* New Patient Entry CTA */}
          <button className="w-full bg-tertiary text-white font-black py-5 rounded-2xl shadow-xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">person_add</span>
            <span>{t('new_patient_entry')}</span>
          </button>
        </aside>

        {/* Main Workspace Area */}
        <main className="flex-1 space-y-8">
          
          {/* Active Patient Bar */}
          <div className="bg-surface-container-lowest rounded-[2rem] p-8 shadow-sm border border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-6 w-full md:w-auto">
              <div className="w-20 h-20 rounded-2xl bg-primary-fixed text-primary flex items-center justify-center text-3xl font-black shadow-inner">
                {selectedPatient ? selectedPatient.profiles?.full_name?.substring(0, 2).toUpperCase() : '??'}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase">
                    {selectedPatient ? t('active_patient') : 'No Patient Selected'}
                  </span>
                  {selectedPatient && <span className="text-xs font-bold text-outline">#{selectedPatient.employee_id_label}</span>}
                </div>
                <h3 className="text-3xl font-extrabold text-primary tracking-tight">
                  {selectedPatient ? selectedPatient.profiles?.full_name : 'Please Search Patient'}
                </h3>
                {selectedPatient && <p className="text-sm text-secondary font-medium">{t('referral_source')}: Dr. Sarah Mansour</p>}
              </div>
            </div>
            
            <div className="flex-1 max-w-md w-full relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline">search</span>
              <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface-container-low border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 transition-all text-sm font-bold" 
                placeholder={t('search_id')} 
                type="text"
              />
              {searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-outline-variant/10 z-50 overflow-hidden">
                  {searchResults.map((res) => (
                    <button 
                      key={res.id}
                      onClick={() => {
                        setSelectedPatient(res);
                        setSearchQuery('');
                        setSearchResults([]);
                      }}
                      className="w-full flex items-center gap-4 p-4 hover:bg-surface-container-low transition-all border-b border-outline-variant/5 last:border-none"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary-fixed text-primary flex items-center justify-center font-bold">
                        {res.profiles?.full_name?.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-bold text-primary">{res.profiles?.full_name}</p>
                        <p className="text-[10px] text-outline font-bold">#{res.employee_id_label}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Dynamic Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Vitals Entry Panel */}
            <section className="lg:col-span-4 bg-surface-container-low rounded-[2rem] p-8 border border-outline-variant/10 flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <h4 className="text-xl font-bold text-primary">{t('vitals_entry_title')}</h4>
                <span className="material-symbols-outlined text-outline/30">vital_signs</span>
              </div>
              
              <div className="space-y-6 flex-1">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-outline uppercase tracking-widest px-1">BP (SYS/DIA)</label>
                    <input 
                      value={vitals.bp}
                      onChange={(e) => setVitals({...vitals, bp: e.target.value})}
                      className="w-full bg-surface-container-lowest border-none rounded-xl py-4 px-4 font-black text-primary text-center" 
                      placeholder="120/80" 
                      type="text"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-outline uppercase tracking-widest px-1">Heart Rate</label>
                    <input 
                      value={vitals.hr}
                      onChange={(e) => setVitals({...vitals, hr: e.target.value})}
                      className="w-full bg-surface-container-lowest border-none rounded-xl py-4 px-4 font-black text-primary text-center" 
                      placeholder="72" 
                      type="number"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-outline uppercase tracking-widest px-1">O2 Saturation %</label>
                  <input 
                    value={vitals.o2}
                    onChange={(e) => setVitals({...vitals, o2: e.target.value})}
                    className="w-full bg-surface-container-lowest border-none rounded-xl py-4 px-4 font-black text-primary text-center" 
                    placeholder="98" 
                    type="number"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-outline uppercase tracking-widest px-1">Notes</label>
                  <textarea 
                    value={vitals.notes}
                    onChange={(e) => setVitals({...vitals, notes: e.target.value})}
                    className="w-full bg-surface-container-lowest border-none rounded-xl py-4 px-4 text-sm min-h-[100px] resize-none" 
                    placeholder="Clinical observation..."
                  ></textarea>
                </div>
              </div>

              <button 
                onClick={handleSaveVitals}
                disabled={isSaving || !selectedPatient}
                className="w-full mt-8 bg-primary text-white font-black py-4 rounded-xl shadow-lg hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : t('save_vitals')}
              </button>
            </section>

            {/* Nutrition Studio / Plan Builder */}
            <section className="lg:col-span-8 bg-surface-container-lowest rounded-[2rem] p-8 border border-outline-variant/10 shadow-sm overflow-hidden relative">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h4 className="text-2xl font-extrabold text-primary mb-1">{t('nutrition_plan_manager')}</h4>
                  <p className="text-sm text-secondary">{t('weekly_plan_desc')}</p>
                </div>
                <button className="bg-primary-container text-white px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 hover:brightness-110 transition-all shadow-sm">
                  <span className="material-symbols-outlined text-sm">add</span>
                  {t('add_meal')}
                </button>
              </div>

              <div className="space-y-3 mb-10">
                {[
                  { meal: 'Breakfast • إفطار', calories: '450', goal: 'Weight Loss', status: 'Approved' },
                  { meal: 'Lunch • غداء', calories: '650', goal: 'Muscle Gain', status: 'Pending Review' },
                  { meal: 'Snack • وجبة خفيفة', calories: '120', goal: 'Fiber Focus', status: 'Approved' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-5 bg-surface-container-low/40 rounded-2xl border border-transparent hover:border-outline-variant/10 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-primary-fixed transition-all">
                        <span className="material-symbols-outlined">restaurant</span>
                      </div>
                      <div>
                        <p className="font-bold text-primary">{item.meal}</p>
                        <p className="text-[10px] text-outline uppercase font-bold tracking-widest">{item.goal}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-right">
                        <p className="font-black text-primary">{item.calories} <span className="text-[10px] font-normal text-outline">kcal</span></p>
                      </div>
                      <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${
                        item.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {item.status}
                      </span>
                      <button className="w-8 h-8 rounded-lg text-outline hover:bg-surface-container-high flex items-center justify-center transition-all">
                        <span className="material-symbols-outlined text-lg">more_vert</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Approval Disclaimer */}
              <div className="bg-secondary-container/30 p-6 rounded-[1.5rem] border border-secondary/10 flex items-start gap-4">
                <span className="material-symbols-outlined text-secondary">info</span>
                <div>
                  <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">{t('insight')}</p>
                  <p className="text-sm text-on-secondary-container/80 leading-relaxed italic">
                    {t('approval_note')}
                  </p>
                </div>
              </div>

              <div className="mt-10 flex justify-end gap-4">
                <button className="px-8 py-4 text-sm font-bold text-secondary bg-surface-container-high rounded-xl hover:bg-surface-container-highest transition-all">
                  Draft Save
                </button>
                <button className="px-8 py-4 text-sm font-black text-white bg-primary rounded-xl shadow-lg hover:brightness-110 active:scale-[0.98] transition-all">
                  {t('submit_review')}
                </button>
              </div>
            </section>
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
}
