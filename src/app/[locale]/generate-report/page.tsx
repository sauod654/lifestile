'use client';

import { useTranslations, useLocale } from 'next-intl';
import DashboardLayout from '@/components/DashboardLayout';
import { useState, useEffect } from 'react';
import { useRouter } from '@/i18n/routing';

export default function GenerateReportPage() {
  const t = useTranslations('Reports');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [intervalType, setIntervalType] = useState<'last_30' | 'custom'>('last_30');
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['vitals']);
  
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    setEndDate(todayStr);
    setStartDate(todayStr);
  }, []);

  const toggleType = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleSelectAll = () => {
    if (selectedTypes.length === 4) {
      setSelectedTypes([]);
    } else {
      setSelectedTypes(['vitals', 'activity', 'hydration', 'sleep']);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/generate-report/success');
    }, 1500);
  };

  return (
    <DashboardLayout role="employee">
      <main className="pb-32 px-5 max-w-4xl mx-auto w-full">
        {/* Editorial Header */}
        <section className="mb-12 mt-8 text-start">
          <span className="text-primary font-black tracking-[0.3em] text-[10px] uppercase block mb-3">{t('subtitle')}</span>
          <h2 className="font-headline text-7xl font-black text-primary leading-none tracking-tighter uppercase">{t('title')}</h2>
          <p className="text-secondary text-xl font-medium mt-6 leading-relaxed max-w-2xl opacity-80">
            {t('description')}
          </p>
        </section>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column: Config */}
          <div className="space-y-12">
            {/* Date Range Section */}
            <div className="space-y-6">
              <h3 className={`font-headline text-2xl font-black text-primary tracking-tight text-start uppercase`}>{t('interval')}</h3>
              <div className={`grid grid-cols-2 gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
                <button 
                  type="button" 
                  onClick={() => setIntervalType('last_30')}
                  className={`p-6 rounded-[2rem] text-start border-2 transition-all group ${intervalType === 'last_30' ? 'bg-white border-primary shadow-xl shadow-primary/10' : 'bg-surface-container-high border-transparent hover:border-primary/50'}`}
                >
                  <span className={`block text-[10px] uppercase tracking-widest font-black mb-2 ${intervalType === 'last_30' ? 'text-primary' : 'text-secondary opacity-60'}`}>{isRtl ? 'آخر' : 'LAST'}</span>
                  <span className="text-primary font-black text-xl leading-none">{t('last_30')}</span>
                </button>
                <button 
                  type="button" 
                  onClick={() => setIntervalType('custom')}
                  className={`p-6 rounded-[2rem] text-start border-2 transition-all ${intervalType === 'custom' ? 'bg-white border-primary shadow-xl shadow-primary/10' : 'bg-surface-container-high border-transparent hover:border-primary/50'}`}
                >
                  <span className={`block text-[10px] uppercase tracking-widest font-black mb-2 ${intervalType === 'custom' ? 'text-primary' : 'text-secondary opacity-60'}`}>{t('custom')}</span>
                  <span className="text-primary font-black text-xl leading-none">{isRtl ? 'نطاق زمني' : 'Range'}</span>
                </button>
              </div>
              <div className={`bg-surface-container-low p-8 rounded-[2.5rem] space-y-6 transition-all ${intervalType === 'custom' ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                <div className="flex flex-col gap-2 text-start">
                  <label className="text-[10px] uppercase font-black text-outline tracking-widest ml-1">{t('start_date')}</label>
                  <input className="w-full bg-white border-none rounded-2xl focus:ring-2 focus:ring-primary text-primary p-4 font-bold shadow-sm" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} disabled={intervalType !== 'custom'}/>
                </div>
                <div className="flex flex-col gap-2 text-start">
                  <label className="text-[10px] uppercase font-black text-outline tracking-widest ml-1">{t('end_date')}</label>
                  <input className="w-full bg-white border-none rounded-2xl focus:ring-2 focus:ring-primary text-primary p-4 font-bold shadow-sm" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} disabled={intervalType !== 'custom'}/>
                </div>
              </div>
            </div>

            {/* Export Format */}
            <div className="space-y-6">
              <h3 className="font-headline text-2xl font-black text-primary tracking-tight text-start uppercase">{t('format')}</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <label className="flex-1 cursor-pointer group">
                  <input defaultChecked name="format" type="radio" value="pdf" className="hidden peer" />
                  <div className="peer-checked:bg-primary peer-checked:text-white bg-surface-container-low p-6 rounded-[2rem] flex items-center gap-4 transition-all hover:bg-surface-container-high peer-checked:shadow-xl peer-checked:shadow-primary/20">
                    <span className="material-symbols-outlined text-3xl">picture_as_pdf</span>
                    <span className="font-black text-sm uppercase tracking-widest">{t('pdf')}</span>
                  </div>
                </label>
                <label className="flex-1 cursor-pointer group">
                  <input name="format" type="radio" value="csv" className="hidden peer" />
                  <div className="peer-checked:bg-primary peer-checked:text-white bg-surface-container-low p-6 rounded-[2rem] flex items-center gap-4 transition-all hover:bg-surface-container-high peer-checked:shadow-xl peer-checked:shadow-primary/20">
                    <span className="material-symbols-outlined text-3xl">table_chart</span>
                    <span className="font-black text-sm uppercase tracking-widest">{t('csv')}</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Data Types */}
          <div className="space-y-12">
            <div className="space-y-6">
              <div className={`flex justify-between items-end ${isRtl ? 'flex-row-reverse' : ''}`}>
                <h3 className="font-headline text-2xl font-black text-primary tracking-tight uppercase">{t('include_data')}</h3>
                <button type="button" onClick={handleSelectAll} className="text-[10px] font-black text-primary hover:underline uppercase tracking-widest">{t('select_all')}</button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {/* Vitals */}
                <div onClick={() => toggleType('vitals')} className={`p-8 rounded-[2.5rem] relative group cursor-pointer transition-all hover:scale-[1.02] ${selectedTypes.includes('vitals') ? 'bg-white shadow-xl shadow-primary/5 border-2 border-primary' : 'bg-surface-container-low border-2 border-transparent hover:bg-surface-container-high'}`}>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-10 ${selectedTypes.includes('vitals') ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}`}>
                    <span className="material-symbols-outlined text-2xl" style={{fontVariationSettings: "'FILL' 1"}}>monitor_heart</span>
                  </div>
                  <div className="text-start">
                    <p className="font-black text-xl text-primary tracking-tight">{t('types.vitals')}</p>
                    <p className="text-[10px] text-outline font-bold leading-tight mt-1 uppercase tracking-widest">{t('types.vitals_sub')}</p>
                  </div>
                  {selectedTypes.includes('vitals') && <span className={`absolute top-6 right-6 material-symbols-outlined text-primary text-3xl ${isRtl ? 'right-auto left-6' : ''}`}>check_circle</span>}
                </div>
                {/* Activity */}
                <div onClick={() => toggleType('activity')} className={`p-8 rounded-[2.5rem] relative transition-all cursor-pointer group hover:scale-[1.02] ${selectedTypes.includes('activity') ? 'bg-white shadow-xl shadow-primary/5 border-2 border-primary' : 'bg-surface-container-low border-2 border-transparent hover:bg-surface-container-high'}`}>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-10 ${selectedTypes.includes('activity') ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}`}>
                    <span className="material-symbols-outlined text-2xl">directions_run</span>
                  </div>
                  <div className="text-start">
                    <p className="font-black text-xl text-primary tracking-tight">{t('types.activity')}</p>
                    <p className="text-[10px] text-outline font-bold leading-tight mt-1 uppercase tracking-widest">{t('types.activity_sub')}</p>
                  </div>
                  {selectedTypes.includes('activity') && <span className={`absolute top-6 right-6 material-symbols-outlined text-primary text-3xl ${isRtl ? 'right-auto left-6' : ''}`}>check_circle</span>}
                </div>
                
                {/* Smaller Bento Items */}
                <div onClick={() => toggleType('hydration')} className={`p-6 rounded-[2rem] flex flex-col items-center justify-center text-center group cursor-pointer transition-all border-2 ${selectedTypes.includes('hydration') ? 'bg-white border-primary shadow-lg' : 'bg-surface-container-low border-transparent hover:bg-surface-container-high'}`}>
                  <span className={`material-symbols-outlined text-3xl mb-3 ${selectedTypes.includes('hydration') ? 'text-primary' : 'text-secondary'}`}>water_drop</span>
                  <p className="text-[10px] font-black text-primary uppercase tracking-widest">{t('types.hydration')}</p>
                </div>
                <div onClick={() => toggleType('sleep')} className={`p-6 rounded-[2rem] flex flex-col items-center justify-center text-center group cursor-pointer transition-all border-2 ${selectedTypes.includes('sleep') ? 'bg-white border-primary shadow-lg' : 'bg-surface-container-low border-transparent hover:bg-surface-container-high'}`}>
                  <span className={`material-symbols-outlined text-3xl mb-3 ${selectedTypes.includes('sleep') ? 'text-primary' : 'text-secondary'}`}>bedtime</span>
                  <p className="text-[10px] font-black text-primary uppercase tracking-widest">{t('types.sleep')}</p>
                </div>
              </div>
            </div>

            {/* Action Button Container */}
            <div className="pt-8">
              <button 
                disabled={loading}
                type="submit" 
                className="w-full primary-gradient-glow text-white py-6 rounded-[2rem] font-black text-xl flex items-center justify-center gap-4 active:scale-[0.98] transition-all disabled:opacity-50 uppercase tracking-tight"
              >
                <span>{loading ? (isRtl ? 'جاري المعالجة...' : 'PROCESSING...') : t('generate')}</span>
                <span className={`material-symbols-outlined text-3xl ${isRtl ? 'rotate-180' : ''}`}>arrow_forward</span>
              </button>
              <div className="flex items-center justify-center gap-2 mt-6 opacity-40">
                <span className="material-symbols-outlined text-sm">lock</span>
                <p className="text-[10px] text-secondary font-black uppercase tracking-[0.2em]">{t('encrypted')}</p>
              </div>
            </div>
          </div>
        </form>
      </main>
    </DashboardLayout>
  );
}
