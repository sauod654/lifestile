'use client';

import { useTranslations, useLocale } from 'next-intl';
import DashboardLayout from '@/components/DashboardLayout';

export default function SupportPage() {
  const t = useTranslations('Support');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const handleStartChat = () => {
    alert(isRtl ? 'جاري الاتصال بمركز الدعم السريري...' : 'Connecting to Clinical Support Center...');
  };

  return (
    <DashboardLayout role="employee">
      <main className="pb-32 px-5 max-w-5xl mx-auto w-full">
        {/* Hero Branding Section */}
        <section className="mb-16 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex-1 text-start">
              <h1 className="text-7xl font-black tracking-tighter text-primary leading-[0.9] uppercase font-headline">
                {isRtl ? 'مركز' : 'Support'}<br/>{isRtl ? 'الدعم' : 'Center'}
              </h1>
              <p className="text-secondary text-xl font-medium mt-6 max-w-sm leading-relaxed opacity-80">
                {t('subtitle')}
              </p>
              <div className="mt-10 flex gap-4">
                <div className="flex -space-x-3 rtl:space-x-reverse">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-surface-container-high overflow-hidden shadow-sm">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Support Team" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="text-start">
                  <p className="text-xs font-black text-primary uppercase tracking-widest">{isRtl ? 'فريق الدعم متصل' : 'Support team online'}</p>
                  <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    {isRtl ? 'وقت الاستجابة: < ٥ دقائق' : 'Response time: < 5 mins'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex-1 w-full max-w-md h-64 md:h-80 rounded-[3rem] overflow-hidden relative shadow-2xl shadow-primary/10 group">
              <img 
                alt="Clinical environment" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800" 
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent"></div>
            </div>
          </div>
        </section>

        {/* Primary Support Channels */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
          <div className="md:col-span-7 bg-surface-container-lowest p-10 rounded-[3rem] shadow-[0_32px_64px_-12px_rgba(0,31,40,0.06)] border border-outline-variant/10 flex flex-col justify-between relative overflow-hidden group">
            <div className="z-10 text-start">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-[1.5rem] flex items-center justify-center mb-8 group-hover:signature-gradient group-hover:text-white transition-all duration-500">
                <span className="material-symbols-outlined text-3xl" style={{fontVariationSettings: "'FILL' 1"}}>chat_bubble</span>
              </div>
              <h3 className="text-3xl font-black text-primary tracking-tighter uppercase mb-2">{t('channels.chat')}</h3>
              <p className="text-secondary font-medium text-lg opacity-80">{t('channels.chat_sub')}</p>
            </div>
            <button 
              onClick={handleStartChat}
              className="z-10 w-full md:w-fit bg-primary text-white px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] mt-10 shadow-xl shadow-primary/20 hover:scale-105 active:scale-[0.98] transition-all"
            >
              {t('channels.start_chat')}
            </button>
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl transition-colors group-hover:bg-primary/10"></div>
          </div>

          <div className="md:col-span-5 flex flex-col gap-8">
            <div className="flex-1 bg-surface-container-low p-8 rounded-[2.5rem] flex flex-col justify-between group hover:bg-surface-container-high transition-all cursor-pointer border border-outline-variant/5">
              <span className="material-symbols-outlined text-4xl text-secondary mb-4">confirmation_number</span>
              <div className="text-start">
                <h4 className="font-black text-primary text-xl uppercase tracking-tight">{t('channels.ticket')}</h4>
                <p className="text-xs font-bold text-outline mt-1 uppercase tracking-widest">{t('channels.ticket_sub')}</p>
              </div>
            </div>
            <div className="flex-1 bg-surface-container-low p-8 rounded-[2.5rem] flex flex-col justify-between group hover:bg-surface-container-high transition-all cursor-pointer border border-outline-variant/5">
              <span className="material-symbols-outlined text-4xl text-secondary mb-4">contact_support</span>
              <div className="text-start">
                <h4 className="font-black text-primary text-xl uppercase tracking-tight">{t('channels.call')}</h4>
                <p className="text-xs font-bold text-outline mt-1 uppercase tracking-widest">{t('channels.call_sub')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20">
          <div className={`flex items-center justify-between mb-10 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <h2 className="text-3xl font-black text-primary tracking-tighter uppercase font-headline">{t('faq_title')}</h2>
            <button className="text-xs font-black text-primary hover:underline uppercase tracking-widest">{t('browse_all')}</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[0, 1, 2].map((idx) => (
              <div key={idx} className={`group bg-surface-container-lowest p-8 rounded-[2rem] transition-all hover:bg-white hover:shadow-xl hover:shadow-primary/5 border border-outline-variant/10 flex items-center justify-between cursor-pointer active:scale-[0.98] ${isRtl ? 'flex-row-reverse' : ''}`}>
                <p className="text-lg font-bold text-primary tracking-tight">{t(`faqs.${idx}`)}</p>
                <span className={`material-symbols-outlined text-outline transition-transform ${isRtl ? 'group-hover:-translate-x-2 rotate-180' : 'group-hover:translate-x-2'}`}>chevron_right</span>
              </div>
            ))}
          </div>
        </section>

        <footer className="text-center opacity-40">
          <p className="text-[10px] uppercase tracking-[0.3em] text-secondary font-black">{t('footer')}</p>
        </footer>
      </main>
    </DashboardLayout>
  );
}
