'use client';

import {useTranslations, useLocale} from 'next-intl';
import {useState, useEffect} from 'react';
import {Link} from '@/i18n/routing';
import DashboardLayout from '@/components/DashboardLayout';
import { submitVitalSigns, getGlobalHydrationAverage } from '@/utils/clinical';

export default function MedicalDashboardPage() {
  const t = useTranslations('MedicalDashboard');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const [globalHydration, setGlobalHydration] = useState(2.4);
  const [bpm, setBpm] = useState('');
  const [o2, setO2] = useState('');
  const [patientId, setPatientId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchGlobalStats() {
      try {
        const avg = await getGlobalHydrationAverage();
        if (avg > 0) setGlobalHydration(avg);
      } catch (err) {
        console.error('Error fetching global hydration:', err);
      }
    }
    fetchGlobalStats();
  }, []);

  const handleUpdateVitals = async () => {
    if (!patientId || !bpm || !o2) {
      alert('Please fill in all fields');
      return;
    }
    setIsSubmitting(true);
    try {
      await submitVitalSigns({
        patient_id: '00000000-0000-0000-0000-000000000000', // Mocking patient lookup
        heart_rate: parseInt(bpm),
        o2_sat: parseInt(o2),
        notes: 'Quick entry from dashboard'
      });
      alert('Vitals updated successfully!');
      setBpm('');
      setO2('');
    } catch (err) {
      console.error('Error updating vitals:', err);
      alert('Error updating vitals. Check console.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout role="medical">
      <div className="space-y-12">
        {/* Header Section */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-primary tracking-tight mb-2">{t('hero_title')}</h1>
            <p className="text-lg text-secondary max-w-2xl leading-relaxed">{t('hero_desc')}</p>
          </div>
          <div className="flex gap-3">
            <div className="px-6 py-3 rounded-xl bg-tertiary-container text-on-tertiary-container flex items-center space-x-3 shadow-sm">
              <span className="material-symbols-outlined">clinical_notes</span>
              <div>
                <p className="text-xs uppercase font-bold tracking-widest opacity-80">{t('system_health')}</p>
                <p className="font-headline font-bold">{t('compliant')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Hero / Cases Overview - New Design */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 bg-surface-container-low rounded-[2rem] p-8 relative overflow-hidden flex flex-col justify-between min-h-[320px] border border-outline-variant/10">
            <div className="relative z-10">
              <h2 className="text-4xl font-extrabold tracking-tight text-primary mb-3">{t('morning_rounds')}</h2>
              <p className="text-secondary max-w-md text-lg">{t('rounds_desc')}</p>
            </div>
            <div className="flex flex-wrap gap-4 relative z-10 mt-8">
              <div className="bg-surface-container-lowest p-6 rounded-2xl flex-1 min-w-[200px] shadow-sm border border-outline-variant/5">
                <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-1">{t('referred_cases')}</p>
                <p className="text-4xl font-black text-primary tracking-tighter">12</p>
                <div className="mt-4 flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-surface-container-high border-2 border-surface-container-lowest shadow-sm overflow-hidden">
                      <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="avatar" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full bg-primary-container text-white text-[10px] flex items-center justify-center border-2 border-surface-container-lowest shadow-sm">+9</div>
                </div>
              </div>
              <div className="bg-surface-container-lowest p-6 rounded-2xl flex-1 min-w-[200px] shadow-sm border border-outline-variant/5">
                <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-1">{t('new_admissions')}</p>
                <p className="text-4xl font-black text-tertiary tracking-tighter">04</p>
                <span className="inline-block mt-4 px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-bold rounded-full uppercase tracking-wider">URGENT</span>
              </div>
            </div>
            {/* Decorative Background Element */}
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none">
              <span className="material-symbols-outlined text-[300px] absolute -right-20 -top-10 text-primary rotate-12">clinical_notes</span>
            </div>
          </div>

          {/* Quick Vitals Entry */}
          <div className="lg:col-span-4 bg-surface-container-lowest rounded-[2rem] p-8 shadow-sm border border-outline-variant/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-primary">{t('quick_vitals')}</h3>
                <span className="material-symbols-outlined text-outline/40">monitor_heart</span>
              </div>
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-outline uppercase tracking-widest block px-1">{t('search_placeholder')}</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-lg">search</span>
                    <input 
                      value={patientId}
                      onChange={(e) => setPatientId(e.target.value)}
                      className="w-full bg-surface-container-low border-none rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 transition-all text-sm" 
                      placeholder="EMP-882..." 
                      type="text"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-outline uppercase tracking-widest block px-1">BPM</label>
                    <input 
                      value={bpm}
                      onChange={(e) => setBpm(e.target.value)}
                      className="w-full bg-surface-container-low border-none rounded-xl py-4 px-4 focus:ring-2 focus:ring-primary/20 transition-all text-sm font-bold" 
                      placeholder="72" 
                      type="number"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-outline uppercase tracking-widest block px-1">O2 %</label>
                    <input 
                      value={o2}
                      onChange={(e) => setO2(e.target.value)}
                      className="w-full bg-surface-container-low border-none rounded-xl py-4 px-4 focus:ring-2 focus:ring-primary/20 transition-all text-sm font-bold" 
                      placeholder="98" 
                      type="number"
                    />
                  </div>
                </div>
              </div>
            </div>
            <button 
              onClick={handleUpdateVitals}
              disabled={isSubmitting}
              className="w-full mt-8 bg-primary text-white font-bold py-4 rounded-xl shadow-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span className={`material-symbols-outlined text-xl ${isSubmitting ? 'animate-spin' : ''}`}>
                {isSubmitting ? 'sync' : 'save'}
              </span>
              <span>{isSubmitting ? 'Saving...' : t('update_vitals')}</span>
            </button>
          </div>
        </section>

        {/* Section 2: Health Plan & Hydration */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-primary tracking-tight">{t('plan_builder')}</h2>
              <div className="flex gap-2">
                <button className="px-4 py-1.5 text-[10px] font-bold text-primary bg-primary-fixed rounded-full uppercase tracking-wider">{t('staff_only')}</button>
                <button className="px-4 py-1.5 text-[10px] font-bold text-secondary bg-surface-container-high rounded-full uppercase tracking-wider">{t('print_pdf')}</button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-surface-container-low rounded-[1.5rem] p-6 flex flex-col justify-between border border-outline-variant/10">
                <div>
                  <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-4">Mon - Wed</p>
                  <h4 className="font-bold text-xl text-primary leading-tight mb-3">Phase 1: Stabilization</h4>
                  <p className="text-sm text-secondary leading-relaxed">Controlled electrolyte monitoring and initial mobility assessments across Ward B.</p>
                </div>
                <div className="mt-8 flex items-center justify-between">
                  <span className="text-[10px] font-bold bg-surface-container-lowest px-3 py-1.5 rounded-full text-outline shadow-sm uppercase tracking-tighter">88% ADHERENCE</span>
                  <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                </div>
              </div>
              <div className="bg-secondary-container rounded-[1.5rem] p-6 flex flex-col justify-between border border-outline-variant/5">
                <div>
                  <p className="text-[10px] font-bold text-on-secondary-container uppercase tracking-widest mb-4">Thu - Sun</p>
                  <h4 className="font-bold text-xl text-primary leading-tight mb-3">Phase 2: Recovery</h4>
                  <p className="text-sm text-on-secondary-container/80 leading-relaxed">Progressive loading and pharmacological tapering schedules for high-risk patients.</p>
                </div>
                <div className="mt-8 flex items-center justify-between">
                  <span className="text-[10px] font-bold bg-surface-container-lowest px-3 py-1.5 rounded-full text-outline shadow-sm uppercase tracking-tighter">PENDING DATA</span>
                  <span className="material-symbols-outlined text-on-secondary-container">pending</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hydration Protocol Widget */}
          <div className="lg:col-span-4 bg-tertiary text-white rounded-[2rem] p-8 relative overflow-hidden flex flex-col justify-between border border-outline-variant/10 shadow-xl">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-tertiary-fixed">water_drop</span>
                <h3 className="font-bold text-2xl">{t('hydration_protocol')}</h3>
              </div>
              <p className="text-sm text-on-tertiary-container/80 leading-relaxed">{t('hydration_desc')}</p>
            </div>
            <div className="relative z-10 mt-12">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-6xl font-black tracking-tighter text-tertiary-fixed">{globalHydration.toFixed(1)}</span>
                <span className="text-xl font-bold opacity-60">Liters/day</span>
              </div>
              <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
                <div 
                  className="bg-tertiary-fixed h-full transition-all duration-1000" 
                  style={{ width: `${Math.min((globalHydration / 3.2) * 100, 100)}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-3 text-[10px] font-bold uppercase tracking-widest opacity-60">
                <span>{t('current_avg')}</span>
                <span>{t('target_val')}: 3.2L</span>
              </div>
            </div>
            <div className="relative z-10 mt-10 flex justify-between items-center">
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">language</span>
                <span className="text-[10px] font-bold uppercase tracking-wider">AR / EN</span>
              </div>
              <button className="bg-white text-tertiary w-12 h-12 rounded-xl shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all">
                <span className="material-symbols-outlined">add</span>
              </button>
            </div>
            {/* Decorative Grain/Gradient */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{backgroundImage: 'radial-gradient(circle at 100% 0%, white, transparent)'}}></div>
          </div>
        </section>

        {/* Section 3: Health Requests & Referrals */}
        <section className="bg-surface-container-lowest rounded-[2.5rem] p-10 border border-outline-variant/10 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-3xl font-extrabold text-primary mb-2 tracking-tight">{t('requests_title')}</h3>
              <p className="text-secondary text-lg font-medium">{t('requests_subtitle')}</p>
            </div>
            <button className="text-sm font-bold text-primary-container flex items-center gap-2 hover:underline bg-surface-container-low px-6 py-3 rounded-full transition-all">
              <span>{t('view_all')}</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </div>
          
          <div className="space-y-4">
            {/* Table Header */}
            <div className="grid grid-cols-12 px-6 pb-4 text-[10px] font-black text-outline uppercase tracking-widest border-b border-outline-variant/10">
              <div className="col-span-5">Employee / Patient</div>
              <div className="col-span-3 text-center">Status</div>
              <div className="col-span-4 text-right">Requested Date</div>
            </div>
            {/* Rows */}
            {[
              { name: 'Sarah Khalid', id: 'SK', dept: 'Cardiology Referral', status: 'New • جديد', date: 'Oct 24, 10:30 AM', color: 'bg-primary-container', statusColor: 'bg-error-container text-on-error-container' },
              { name: 'Ahmed Jameel', id: 'AJ', dept: 'Vital Checkup', status: 'Referred • محال', date: 'Oct 23, 04:15 PM', color: 'bg-secondary-fixed', statusColor: 'bg-tertiary-fixed text-on-tertiary-fixed' }
            ].map((row, idx) => (
              <div key={idx} className="grid grid-cols-12 px-6 py-6 items-center bg-surface-container-low/40 rounded-[1.5rem] group hover:bg-surface-container-low transition-all cursor-pointer border border-transparent hover:border-outline-variant/10">
                <div className="col-span-5 flex items-center gap-5">
                  <div className={`w-14 h-14 rounded-2xl ${row.color} flex items-center justify-center text-white font-bold text-lg shadow-sm`}>{row.id}</div>
                  <div>
                    <p className="text-xl font-bold text-primary tracking-tight">{row.name}</p>
                    <p className="text-xs text-secondary font-medium mt-0.5">{row.dept}</p>
                  </div>
                </div>
                <div className="col-span-3 flex justify-center">
                  <span className={`px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${row.statusColor} shadow-sm`}>{row.status}</span>
                </div>
                <div className="col-span-4 text-right">
                  <p className="text-sm font-bold text-primary">{row.date}</p>
                  <p className="text-[10px] text-outline uppercase font-bold mt-1 tracking-widest">Urgent Priority</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Contextual FAB */}
      <button className="fixed bottom-10 right-10 w-16 h-16 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 border-4 border-surface-container-lowest">
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>
    </DashboardLayout>
  );
}
