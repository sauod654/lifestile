'use client';

import {useTranslations, useLocale} from 'next-intl';
import {useState, useEffect} from 'react';
import {Link} from '@/i18n/routing';
import DashboardLayout from '@/components/DashboardLayout';
import { getHydrationLevel, logWaterIntake } from '@/utils/clinical';

// Mock current user ID for demonstration until auth is fully implemented
const MOCK_USER_ID = '00000000-0000-0000-0000-000000000000';

export default function EmployeeDashboardPage() {
  const t = useTranslations('EmployeeDashboard');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const [waterAmount, setWaterAmount] = useState(1.8); // Liters
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchHydration() {
      try {
        const totalMl = await getHydrationLevel(MOCK_USER_ID);
        setWaterAmount(totalMl / 1000); // Convert to Liters
      } catch (err) {
        console.error('Error fetching hydration:', err);
      }
    }
    fetchHydration();
  }, []);

  const handleAddWater = async () => {
    setLoading(true);
    try {
      await logWaterIntake(MOCK_USER_ID, 250);
      setWaterAmount(prev => prev + 0.25);
    } catch (err) {
      console.error('Error logging water:', err);
    } finally {
      setLoading(false);
    }
  };

  const targetLiters = 3;
  const percentage = Math.min((waterAmount / targetLiters) * 100, 100);

  return (
    <DashboardLayout role="employee">
      <div className="space-y-12">
        {/* Welcome Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-primary tracking-tight mb-2">
              {t('greeting')} <span className="font-normal text-secondary">Ahmed</span>
            </h1>
            <p className="text-lg text-secondary max-w-2xl leading-relaxed">{t('greeting_subtitle')}</p>
          </div>
          <div className="bg-surface-container-low px-6 py-3 rounded-2xl border border-outline-variant/10 shadow-sm">
            <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-1">{t('today')}</p>
            <p className="font-headline font-bold text-primary">24 Oct, 2023</p>
          </div>
        </header>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Activity / Health Rings */}
          <div className="lg:col-span-8 bg-surface-container-lowest rounded-[2.5rem] p-10 shadow-sm border border-outline-variant/10 flex flex-col justify-between min-h-[400px]">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-extrabold text-primary tracking-tight mb-2">{t('exercise_rings')}</h2>
                <p className="text-secondary font-medium">Daily activity and movement goals</p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-black text-tertiary">85%</p>
                <p className="text-[10px] font-bold text-outline uppercase tracking-widest">Global Goal</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-12 mt-8">
              {/* SVG Rings */}
              <div className="relative w-56 h-56 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="112" cy="112" r="90" fill="transparent" stroke="currentColor" strokeWidth="18" className="text-primary/10" />
                  <circle cx="112" cy="112" r="90" fill="transparent" stroke="currentColor" strokeWidth="18" strokeDasharray="565.48" strokeDashoffset="141.37" className="text-primary" strokeLinecap="round" />
                  
                  <circle cx="112" cy="112" r="68" fill="transparent" stroke="currentColor" strokeWidth="18" className="text-tertiary/10" />
                  <circle cx="112" cy="112" r="68" fill="transparent" stroke="currentColor" strokeWidth="18" strokeDasharray="427.25" strokeDashoffset="106.81" className="text-tertiary" strokeLinecap="round" />
                  
                  <circle cx="112" cy="112" r="46" fill="transparent" stroke="currentColor" strokeWidth="18" className="text-secondary/10" />
                  <circle cx="112" cy="112" r="46" fill="transparent" stroke="currentColor" strokeWidth="18" strokeDasharray="289.02" strokeDashoffset="144.51" className="text-secondary" strokeLinecap="round" />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="material-symbols-outlined text-4xl text-primary" style={{fontVariationSettings: "'FILL' 1"}}>bolt</span>
                </div>
              </div>

              <div className="flex-1 space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-primary">Movement</span>
                    <span>450 / 600 kcal</span>
                  </div>
                  <div className="w-full bg-primary/10 h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-3/4 rounded-full"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-tertiary">Exercise</span>
                    <span>22 / 30 min</span>
                  </div>
                  <div className="w-full bg-tertiary/10 h-2 rounded-full overflow-hidden">
                    <div className="bg-tertiary h-full w-2/3 rounded-full"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-secondary">Stand</span>
                    <span>6 / 12 hr</span>
                  </div>
                  <div className="w-full bg-secondary/10 h-2 rounded-full overflow-hidden">
                    <div className="bg-secondary h-full w-1/2 rounded-full"></div>
                  </div>
                </div>
                <p className="text-xs text-secondary font-medium pt-4 border-t border-outline-variant/10 italic">
                  "Only 8 {t('min_remaining')}"
                </p>
              </div>
            </div>
          </div>

          {/* Water Tracker - Interactive Design */}
          <div className="lg:col-span-4 bg-tertiary text-white rounded-[2.5rem] p-10 flex flex-col justify-between border border-outline-variant/10 shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl font-extrabold mb-1">{t('hydration_tracker')}</h2>
              <p className="text-sm opacity-60 mb-8">{t('daily_target')}: 3L</p>
              
              <div className="relative w-full aspect-[2/3] max-w-[140px] mx-auto mb-8">
                {/* Bottle Shape */}
                <div className="absolute inset-0 border-4 border-white/30 rounded-[2rem] overflow-hidden backdrop-blur-sm">
                  {/* Water Level Animation */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-white/40 transition-all duration-1000 ease-in-out"
                    style={{ height: `${percentage}%` }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-4 bg-white/20 -translate-y-full animate-wave"></div>
                  </div>
                </div>
                {/* Bottle Cap */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-4 bg-white/30 rounded-t-lg"></div>
              </div>

              <div className="text-center">
                <p className="text-5xl font-black tracking-tighter mb-1">{waterAmount.toFixed(1)} <span className="text-xl font-bold opacity-60">L</span></p>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                  {Math.max(0, Math.ceil((targetLiters - waterAmount) / 0.25))} {t('glasses_remaining')}
                </p>
              </div>
            </div>

            <button 
              onClick={handleAddWater}
              disabled={loading}
              className="relative z-10 w-full bg-white text-tertiary font-bold py-4 rounded-2xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span className={`material-symbols-outlined ${loading ? 'animate-spin' : ''}`}>
                {loading ? 'sync' : 'add_circle'}
              </span>
              <span>{loading ? 'Updating...' : 'Add 250ml'}</span>
            </button>

            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{backgroundImage: 'radial-gradient(circle at 0% 100%, white, transparent)'}}></div>
          </div>
        </div>

        {/* Second Row: Vitals & Nutrition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Nutrition Intake */}
          <div className="lg:col-span-7 bg-surface-container-low rounded-[2rem] p-8 border border-outline-variant/10">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-primary">{t('nutrition_intake')}</h3>
              <span className="text-xs font-bold text-secondary bg-surface-container-high px-4 py-1.5 rounded-full uppercase tracking-widest">Week View</span>
            </div>
            
            <div className="grid grid-cols-7 gap-3 h-48 items-end px-2">
              {[40, 65, 30, 85, 45, 95, 70].map((h, i) => (
                <div key={i} className="flex flex-col items-center gap-3 flex-1 group">
                  <div className="w-full bg-primary/10 rounded-t-lg relative overflow-hidden transition-all group-hover:bg-primary/20" style={{height: `${h}%`}}>
                    <div className="absolute bottom-0 left-0 right-0 bg-primary/40 h-1/3"></div>
                  </div>
                  <span className="text-[10px] font-bold text-outline uppercase">Day {i+1}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex gap-6">
              <div className="flex-1 bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/5 shadow-sm">
                <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-1">Protein</p>
                <p className="text-xl font-black text-primary">124g</p>
              </div>
              <div className="flex-1 bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/5 shadow-sm">
                <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-1">Carbs</p>
                <p className="text-xl font-black text-tertiary">210g</p>
              </div>
              <div className="flex-1 bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/5 shadow-sm">
                <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-1">Fat</p>
                <p className="text-xl font-black text-secondary">58g</p>
              </div>
            </div>
          </div>

          {/* Vitals Snapshot */}
          <div className="lg:col-span-5 bg-surface-container-lowest rounded-[2rem] p-8 border border-outline-variant/10 shadow-sm">
            <h3 className="text-2xl font-bold text-primary mb-8">{t('vitals_snapshot')}</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-5 bg-surface-container-low rounded-2xl border border-outline-variant/5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-fixed text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined">favorite</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-outline uppercase tracking-widest">{t('bp')}</p>
                    <p className="text-xl font-black text-primary tracking-tight">118/76</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase">Optimal</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-5 bg-surface-container-low rounded-2xl border border-outline-variant/5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-tertiary-fixed text-tertiary flex items-center justify-center">
                    <span className="material-symbols-outlined">glucose</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-outline uppercase tracking-widest">{t('glucose')}</p>
                    <p className="text-xl font-black text-primary tracking-tight">94 mg/dL</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full uppercase">Stable</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-5 bg-surface-container-low rounded-2xl border border-outline-variant/5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary-fixed text-secondary flex items-center justify-center">
                    <span className="material-symbols-outlined">monitor_weight</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-outline uppercase tracking-widest">{t('bmi')}</p>
                    <p className="text-xl font-black text-primary tracking-tight">24.2</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase">Normal</span>
                </div>
              </div>
            </div>
            
            <Link href="/medical-dashboard" className="w-full mt-8 py-4 border-2 border-primary/10 text-primary font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-primary/5 transition-all">
              <span>{t('view_full_history')}</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Footer CTAs */}
        <section className="bg-primary-container/30 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8 border border-primary/10">
          <div className="max-w-md">
            <h3 className="text-2xl font-extrabold text-primary mb-2">{t('book_consultation')}</h3>
            <p className="text-secondary leading-relaxed">Schedule a virtual or in-person session with your primary clinical lead to discuss your recent trends.</p>
          </div>
          <button className="bg-primary text-white font-black py-5 px-10 rounded-2xl shadow-xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center gap-3">
            <span className="material-symbols-outlined">event_available</span>
            <span>{t('schedule_now')}</span>
          </button>
        </section>
      </div>

      <style jsx global>{`
        @keyframes wave {
          0% { transform: translateY(-100%) translateX(-5%); }
          50% { transform: translateY(-100%) translateX(5%); }
          100% { transform: translateY(-100%) translateX(-5%); }
        }
        .animate-wave {
          animation: wave 3s ease-in-out infinite;
        }
      `}</style>
    </DashboardLayout>
  );
}
