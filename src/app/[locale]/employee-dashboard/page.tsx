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

  const [waterAmount, setWaterAmount] = useState(0); // Initialized to 0 as requested
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAndResetHydration = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth();
      const currentDate = now.getDate();
      const currentHours = now.getHours();

      // Determine the "Health Day" boundary (Reset at 1:00 AM)
      // If it's before 1:00 AM, we are still in the "Health Day" that started yesterday at 1:00 AM
      let healthDayIdentifier;
      if (currentHours < 1) {
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        healthDayIdentifier = `${yesterday.getFullYear()}-${yesterday.getMonth()}-${yesterday.getDate()}`;
      } else {
        healthDayIdentifier = `${currentYear}-${currentMonth}-${currentDate}`;
      }

      const storedData = localStorage.getItem('hydration_data');
      if (storedData) {
        const { amount, lastHealthDay } = JSON.parse(storedData);
        if (lastHealthDay === healthDayIdentifier) {
          setWaterAmount(amount);
        } else {
          // New Health Day started (after 1:00 AM), reset to 0
          setWaterAmount(0);
          localStorage.setItem('hydration_data', JSON.stringify({ amount: 0, lastHealthDay: healthDayIdentifier }));
        }
      } else {
        // First time initialization
        setWaterAmount(0);
        localStorage.setItem('hydration_data', JSON.stringify({ amount: 0, lastHealthDay: healthDayIdentifier }));
      }
      setLoading(false);
    };

    checkAndResetHydration();
  }, []);

  const handleAddWater = async () => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      const newAmount = Math.min(waterAmount + 0.25, targetLiters);
      setWaterAmount(newAmount);
      
      // Update local storage for persistence within the same health day
      const now = new Date();
      let healthDayIdentifier;
      if (now.getHours() < 1) {
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        healthDayIdentifier = `${yesterday.getFullYear()}-${yesterday.getMonth()}-${yesterday.getDate()}`;
      } else {
        healthDayIdentifier = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
      }
      
      localStorage.setItem('hydration_data', JSON.stringify({ 
        amount: newAmount, 
        lastHealthDay: healthDayIdentifier 
      }));
      
      setLoading(false);
    }, 800);
  };

  const targetLiters = 3;
  const percentage = Math.min((waterAmount / targetLiters) * 100, 100);

  return (
    <DashboardLayout role="employee">
      <div className="space-y-12 pb-12">
        {/* Welcome Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="animate-fade-in">
            <h1 className="text-5xl font-black text-primary tracking-tighter mb-2 font-headline uppercase leading-none">
              {t('greeting')}
            </h1>
            <p className="text-xl text-secondary max-w-2xl leading-relaxed font-medium">{t('greeting_subtitle')}</p>
          </div>
          <div className="bg-surface-container-high px-8 py-4 rounded-[2rem] shadow-sm flex flex-col items-center">
            <p className="text-[10px] font-black text-outline uppercase tracking-[0.2em] mb-1">{t('today')}</p>
            <p className="font-headline font-black text-primary text-xl">24 Oct, 2023</p>
          </div>
        </header>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Activity / Health Rings */}
          <div className="lg:col-span-8 bg-surface-container-lowest rounded-[3.5rem] p-12 clinical-shadow flex flex-col justify-between min-h-[450px] relative overflow-hidden group">
            <div className="flex justify-between items-start relative z-10">
              <div>
                <h2 className="text-4xl font-black text-primary tracking-tighter mb-2 font-headline uppercase">{t('exercise_rings')}</h2>
                <p className="text-secondary font-bold text-lg">Daily activity and movement goals</p>
              </div>
              <div className="text-right">
                <p className="text-6xl font-black text-tertiary tracking-tighter leading-none">85%</p>
                <p className="text-[10px] font-black text-outline uppercase tracking-[0.2em] mt-1">Global Goal</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-16 mt-12 relative z-10">
              {/* SVG Rings */}
              <div className="relative w-64 h-64 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="128" cy="128" r="100" fill="transparent" stroke="currentColor" strokeWidth="22" className="text-primary/5" />
                  <circle cx="128" cy="128" r="100" fill="transparent" stroke="currentColor" strokeWidth="22" strokeDasharray="628.32" strokeDashoffset="157.08" className="text-primary transition-all duration-1000" strokeLinecap="round" />
                  
                  <circle cx="128" cy="128" r="74" fill="transparent" stroke="currentColor" strokeWidth="22" className="text-tertiary/5" />
                  <circle cx="128" cy="128" r="74" fill="transparent" stroke="currentColor" strokeWidth="22" strokeDasharray="465.00" strokeDashoffset="116.25" className="text-tertiary transition-all duration-1000" strokeLinecap="round" />
                  
                  <circle cx="128" cy="128" r="48" fill="transparent" stroke="currentColor" strokeWidth="22" className="text-secondary/5" />
                  <circle cx="128" cy="128" r="48" fill="transparent" stroke="currentColor" strokeWidth="22" strokeDasharray="301.59" strokeDashoffset="150.80" className="text-secondary transition-all duration-1000" strokeLinecap="round" />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="material-symbols-outlined text-5xl text-primary drop-shadow-sm" style={{fontVariationSettings: "'FILL' 1"}}>bolt</span>
                </div>
              </div>

              <div className="flex-1 space-y-8 w-full">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm font-black uppercase tracking-widest">
                    <span className="text-primary">Movement</span>
                    <span className="text-on-surface/60">450 / 600 <span className="text-[10px]">kcal</span></span>
                  </div>
                  <div className="w-full bg-primary/5 h-3 rounded-full overflow-hidden">
                    <div className="signature-gradient h-full w-3/4 rounded-full"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm font-black uppercase tracking-widest">
                    <span className="text-tertiary">Exercise</span>
                    <span className="text-on-surface/60">22 / 30 <span className="text-[10px]">min</span></span>
                  </div>
                  <div className="w-full bg-tertiary/5 h-3 rounded-full overflow-hidden">
                    <div className="bg-tertiary h-full w-2/3 rounded-full"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm font-black uppercase tracking-widest">
                    <span className="text-secondary">Stand</span>
                    <span className="text-on-surface/60">6 / 12 <span className="text-[10px]">hr</span></span>
                  </div>
                  <div className="w-full bg-secondary/5 h-3 rounded-full overflow-hidden">
                    <div className="bg-secondary h-full w-1/2 rounded-full"></div>
                  </div>
                </div>
                <p className="text-sm text-secondary font-bold pt-6 border-t border-surface-container-high italic opacity-80">
                  "Only 8 {t('min_remaining')}"
                </p>
              </div>
            </div>

            {/* Background Texture */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          </div>

          {/* Water Tracker - Interactive Design */}
          <div className="lg:col-span-4 signature-gradient text-white rounded-[3.5rem] p-12 flex flex-col justify-between clinical-shadow relative overflow-hidden group">
            <div className="relative z-10">
              <h2 className="text-3xl font-black mb-1 font-headline uppercase tracking-tighter">{t('hydration_tracker')}</h2>
              <p className="text-xs font-bold opacity-70 uppercase tracking-widest mb-10">{t('daily_target')}: 3.0 Liters</p>
              
              <div className="relative w-full aspect-[2/3] max-w-[160px] mx-auto mb-10">
                {/* Bottle Shape */}
                <div className="absolute inset-0 border-[6px] border-white/20 rounded-[3rem] overflow-hidden backdrop-blur-md bg-white/5 shadow-inner">
                  {/* Water Level Animation */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-white/30 transition-all duration-1000 ease-in-out"
                    style={{ height: `${percentage}%` }}
                  >
                    {/* Glossy overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div>
                    <div className="absolute top-0 left-0 right-0 h-8 bg-white/20 -translate-y-full animate-wave blur-[2px]"></div>
                  </div>
                  
                  {/* Glass highlights */}
                  <div className="absolute top-0 left-4 w-2 h-full bg-white/10 blur-[1px]"></div>
                </div>
                {/* Bottle Cap */}
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-12 h-5 bg-white/40 rounded-t-xl backdrop-blur-md"></div>
              </div>

              <div className="text-center">
                <p className="text-7xl font-black tracking-tighter mb-1 leading-none">{waterAmount.toFixed(1)} <span className="text-2xl font-bold opacity-60">L</span></p>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mt-2">
                  {Math.max(0, Math.ceil((targetLiters - waterAmount) / 0.25))} {t('glasses_remaining')}
                </p>
              </div>
            </div>

            <button 
              onClick={handleAddWater}
              disabled={loading}
              className="relative z-10 w-full bg-white text-primary font-black py-5 rounded-3xl shadow-2xl hover:scale-[1.03] active:scale-[0.97] transition-all flex items-center justify-center gap-3 disabled:opacity-50 group/btn"
            >
              <div className={`w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center transition-transform group-hover/btn:rotate-90 ${loading ? 'animate-spin' : ''}`}>
                <span className="material-symbols-outlined text-xl">
                  {loading ? 'sync' : 'add'}
                </span>
              </div>
              <span className="text-lg tracking-tight">{loading ? 'UPDATING...' : 'ADD 250ML'}</span>
            </button>

            {/* Background Texture */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{backgroundImage: 'radial-gradient(circle at 0% 100%, white, transparent)'}}></div>
          </div>
        </div>

        {/* Second Row: Vitals & Nutrition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Nutrition Intake */}
          <div className="lg:col-span-7 bg-surface-container-low rounded-[3rem] p-10 clinical-shadow relative overflow-hidden">
            <div className="flex justify-between items-center mb-12 relative z-10">
              <h3 className="text-3xl font-black text-primary font-headline uppercase tracking-tighter">{t('nutrition_intake')}</h3>
              <span className="text-[10px] font-black text-secondary bg-surface-container-high px-6 py-2.5 rounded-full uppercase tracking-[0.2em] shadow-sm">Week View</span>
            </div>
            
            <div className="grid grid-cols-7 gap-4 h-56 items-end px-4 relative z-10">
              {[40, 65, 30, 85, 45, 95, 70].map((h, i) => (
                <div key={i} className="flex flex-col items-center gap-4 flex-1 group">
                  <div className="w-full bg-primary/5 rounded-2xl relative overflow-hidden transition-all group-hover:bg-primary/10 cursor-pointer" style={{height: `${h}%`}}>
                    <div className="absolute bottom-0 left-0 right-0 signature-gradient opacity-40 h-1/3"></div>
                  </div>
                  <span className="text-[10px] font-black text-outline uppercase tracking-widest">Day {i+1}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 flex gap-8 relative z-10">
              <div className="flex-1 bg-surface-container-lowest p-6 rounded-[2rem] shadow-sm group hover:scale-105 transition-all">
                <p className="text-[10px] font-black text-outline uppercase tracking-widest mb-2">Protein</p>
                <p className="text-3xl font-black text-primary tracking-tighter">124<span className="text-sm ml-1 font-bold opacity-40 uppercase">g</span></p>
              </div>
              <div className="flex-1 bg-surface-container-lowest p-6 rounded-[2rem] shadow-sm group hover:scale-105 transition-all">
                <p className="text-[10px] font-black text-outline uppercase tracking-widest mb-2">Carbs</p>
                <p className="text-3xl font-black text-tertiary tracking-tighter">210<span className="text-sm ml-1 font-bold opacity-40 uppercase">g</span></p>
              </div>
              <div className="flex-1 bg-surface-container-lowest p-6 rounded-[2rem] shadow-sm group hover:scale-105 transition-all">
                <p className="text-[10px] font-black text-outline uppercase tracking-widest mb-2">Fat</p>
                <p className="text-3xl font-black text-secondary tracking-tighter">58<span className="text-sm ml-1 font-bold opacity-40 uppercase">g</span></p>
              </div>
            </div>
          </div>

          {/* Vitals Snapshot */}
          <div className="lg:col-span-5 bg-surface-container-lowest rounded-[3rem] p-10 clinical-shadow flex flex-col">
            <h3 className="text-3xl font-black text-primary mb-2 font-headline uppercase tracking-tighter">{t('vitals_snapshot')}</h3>
            <p className="text-[10px] font-black text-outline uppercase tracking-[0.2em] mb-10">Latest Clinical Results</p>
            <div className="space-y-4 flex-1">
              <div className="flex items-center justify-between p-6 bg-surface-container-low rounded-[2rem] transition-all hover:bg-surface-container-high group cursor-pointer">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-3xl bg-primary/10 text-primary flex items-center justify-center group-hover:signature-gradient group-hover:text-white transition-all">
                    <span className="material-symbols-outlined text-3xl">favorite</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-outline uppercase tracking-widest mb-1">{t('bp')}</p>
                    <p className="text-2xl font-black text-primary tracking-tight">118/76 <span className="text-sm font-bold opacity-40 uppercase">mmHg</span></p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full uppercase tracking-widest">Optimal</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-6 bg-surface-container-low rounded-[2rem] transition-all hover:bg-surface-container-high group cursor-pointer">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-3xl bg-tertiary/10 text-tertiary flex items-center justify-center group-hover:bg-tertiary group-hover:text-white transition-all">
                    <span className="material-symbols-outlined text-3xl">glucose</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-outline uppercase tracking-widest mb-1">{t('glucose')}</p>
                    <p className="text-2xl font-black text-primary tracking-tight">94 <span className="text-sm font-bold opacity-40 uppercase">mg/dL</span></p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-black text-amber-600 bg-amber-50 px-4 py-2 rounded-full uppercase tracking-widest">Stable</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-6 bg-surface-container-low rounded-[2rem] transition-all hover:bg-surface-container-high group cursor-pointer">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-3xl bg-secondary/10 text-secondary flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-all">
                    <span className="material-symbols-outlined text-3xl">monitor_weight</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-outline uppercase tracking-widest mb-1">{t('bmi')}</p>
                    <p className="text-2xl font-black text-primary tracking-tight">24.2 <span className="text-sm font-bold opacity-40 uppercase">Points</span></p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full uppercase tracking-widest">Normal</span>
                </div>
              </div>
            </div>
            
            <Link href="/medical-dashboard" className="w-full mt-10 py-5 bg-primary/5 text-primary font-black rounded-3xl flex items-center justify-center gap-3 hover:bg-primary hover:text-white transition-all group uppercase tracking-widest text-xs">
              <span>{t('view_full_history')}</span>
              <span className={`material-symbols-outlined text-xl transition-transform ${isRtl ? 'group-hover:-translate-x-2' : 'group-hover:translate-x-2'}`}>
                {isRtl ? 'arrow_back' : 'arrow_forward'}
              </span>
            </Link>
          </div>
        </div>

        {/* Footer CTAs */}
        <section className="bg-primary/5 rounded-[4rem] p-16 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
          <div className="max-w-xl relative z-10 text-center md:text-start">
            <h3 className="text-4xl font-black text-primary mb-4 font-headline uppercase tracking-tighter leading-none">{t('book_consultation')}</h3>
            <p className="text-secondary text-xl font-medium leading-relaxed opacity-80">Discuss your recent trends and personalized health plan with your assigned medical team.</p>
          </div>
          <button className="primary-gradient-glow text-white font-black py-6 px-16 rounded-[2rem] text-xl hover:scale-105 active:scale-[0.98] transition-all flex items-center gap-4 relative z-10 uppercase tracking-tighter">
            <span className="material-symbols-outlined text-3xl">event_available</span>
            <span>{t('schedule_now')}</span>
          </button>
          
          {/* Abstract Decorations */}
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute right-20 top-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
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
