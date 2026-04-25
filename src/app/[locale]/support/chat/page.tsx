'use client';

import { useTranslations, useLocale } from 'next-intl';
import DashboardLayout from '@/components/DashboardLayout';
import { Link } from '@/i18n/routing';

export default function SupportChatPage() {
  const t = useTranslations('SupportChat');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  return (
    <DashboardLayout role="employee">
      <main className="flex-1 flex flex-col h-[calc(100vh-64px)] w-full relative bg-surface p-2 sm:p-6 lg:p-8">
        
        {/* Chat Container */}
        <div className="flex-1 overflow-hidden flex flex-col bg-surface-container-lowest rounded-[2rem] sm:rounded-[3rem] shadow-[0_32px_64px_-12px_rgba(0,31,40,0.06)] relative z-10 border border-outline-variant/10">
          
          {/* Chat Header */}
          <div className={`flex items-center justify-between px-6 py-5 bg-surface-container-lowest z-20 border-b border-outline-variant/10 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <div className="relative">
                <img 
                  alt="Medical Professional Avatar" 
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-surface-container-lowest shadow-sm" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYaMDNYIRc180vrjashI4rkmaH0J_K-txli-HmIr44C3wv2uNERQFMlC0VriirJm_9l-Sl_4v1bqddSuRognGLP1Xnqn6rQxOvbY3TF0md3_DggwqC0FAJ6KJV86AU6AyB5gB8me5-WCeoJBoPJGKBYO5VH1T961CIqkNCDfncQj7PXPzLKoFryPTEzhLw2FSByVQ9xUVkhlN2z290wASp4Lso2t8oopbB6cvkOBcY7Z0xYAX8mrnyPagMavsOhSENyubwIXtbGS0"
                />
                <span className={`absolute bottom-0 ${isRtl ? 'left-0' : 'right-0'} w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-surface-container-lowest`}></span>
              </div>
              <div className={isRtl ? 'text-right' : 'text-left'}>
                <h3 className="font-headline font-black text-xl text-primary tracking-tight">{t('doctor_name')}</h3>
                <p className={`font-medium text-xs text-secondary flex items-center gap-1.5 uppercase tracking-widest mt-1 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  {t('doctor_role')} 
                  <span className="w-1 h-1 bg-secondary rounded-full inline-block"></span> 
                  <span className="text-emerald-600">{t('online')}</span>
                </p>
              </div>
            </div>
            <div className={`flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <button className="p-3 rounded-full text-primary hover:bg-primary/10 transition-colors">
                <span className="material-symbols-outlined">videocam</span>
              </button>
              <button className="p-3 rounded-full text-primary hover:bg-primary/10 transition-colors">
                <span className="material-symbols-outlined">call</span>
              </button>
              <button className="p-3 rounded-full text-secondary hover:bg-surface-container-low transition-colors hidden sm:block">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>
          </div>
          
          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto chat-scroll px-4 sm:px-8 py-8 bg-surface/50 flex flex-col gap-8">
            
            {/* Date Separator */}
            <div className="flex justify-center my-2">
              <span className="font-black text-[10px] text-outline uppercase tracking-widest bg-surface-container-high px-4 py-1.5 rounded-full shadow-sm">
                {t('today')}
              </span>
            </div>
            
            {/* Received Message (Medical Professional) */}
            <div className={`flex gap-4 max-w-[85%] sm:max-w-[70%] ${isRtl ? 'flex-row-reverse' : ''}`}>
              <img 
                alt="Dr. Sarah Jenkins" 
                className="w-10 h-10 rounded-2xl object-cover mt-auto hidden sm:block shadow-sm" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgUCoDl2QPOiFWtPYDf2vaqJstpxmqO9Oz5MaRnEbr8K-D9-s-mi_lqCvMIRnds9sCDici84GFLUtAQy2RETVOtQw42RgTksMVHKU2eR7xsJuGJw7RUBARdyjwRuRBPHGmXVCIjE9xY-9oKJGZeXuufblIn2A-1sMD5YOV0ky1uiCIeJLLWZCxivkW5E2fA31B5XvL0W5aRbbyRBrpRp0bYX7tT93qvjMfEO8jxZoX4aj7x6158uOQk521c4y5u8TRBnJ9LGJG7vQ"
              />
              <div className={`flex flex-col gap-1.5 ${isRtl ? 'items-end' : 'items-start'}`}>
                <div className={`bg-white text-on-surface font-medium text-[15px] leading-relaxed px-6 py-4 rounded-[2rem] shadow-[0_8px_24px_-8px_rgba(0,31,40,0.06)] border border-outline-variant/10 ${isRtl ? 'rounded-br-sm' : 'rounded-bl-sm'} text-start`}>
                  {t('msg1')}
                </div>
                <span className="font-bold text-[10px] uppercase tracking-widest text-outline px-2">09:41 AM</span>
              </div>
            </div>
            
            {/* Sent Message (Employee) */}
            <div className={`flex gap-4 max-w-[85%] sm:max-w-[70%] self-end ${isRtl ? '' : 'flex-row-reverse'}`}>
              <div className={`flex flex-col gap-1.5 ${isRtl ? 'items-start' : 'items-end'}`}>
                <div className={`bg-gradient-to-br from-primary to-primary-container text-white font-medium text-[15px] leading-relaxed px-6 py-4 rounded-[2rem] shadow-xl shadow-primary/20 ${isRtl ? 'rounded-bl-sm' : 'rounded-br-sm'} text-start`}>
                  {t('msg2')}
                </div>
                <div className={`flex items-center gap-1.5 px-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <span className="font-bold text-[10px] uppercase tracking-widest text-outline">09:43 AM</span>
                  <span className="material-symbols-outlined text-[14px] text-primary" style={{fontVariationSettings: "'FILL' 1"}}>done_all</span>
                </div>
              </div>
            </div>
            
            {/* Received Message */}
            <div className={`flex gap-4 max-w-[85%] sm:max-w-[70%] ${isRtl ? 'flex-row-reverse' : ''}`}>
              <img 
                alt="Dr. Sarah Jenkins" 
                className="w-10 h-10 rounded-2xl object-cover mt-auto hidden sm:block shadow-sm" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFTL2d7mvre2tw4rw70ic_IO3tnQ-JlOD8GV4HV8NKZMij7QWwvh2BEHJLTkCFYA_2KFCvEQ88V8vDC7etRwBHiHNqoXVcIlNTcM-kZg55weoA88SmPaGQU6CiN4cX3Ag5T3qyobo6f3x61GhDrZGWDJLJeguVkbEhO98ysdHA3DiZsKBve85tkRvv43axTAQylDn9rT9_doVn-BaOJJoPIxgUC7brosUODiD0aNHYTCcRRUK1Nt1jqTixkHZO2xjDmuEp_29zyOw"
              />
              <div className={`flex flex-col gap-1.5 ${isRtl ? 'items-end' : 'items-start'}`}>
                <div className={`bg-white text-on-surface font-medium text-[15px] leading-relaxed px-6 py-4 rounded-[2rem] shadow-[0_8px_24px_-8px_rgba(0,31,40,0.06)] border border-outline-variant/10 ${isRtl ? 'rounded-br-sm' : 'rounded-bl-sm'} text-start`}>
                  {t('msg3')}
                </div>
                <span className="font-bold text-[10px] uppercase tracking-widest text-outline px-2">09:44 AM</span>
              </div>
            </div>
            
            {/* Typing Indicator */}
            <div className={`flex gap-4 max-w-[80%] mt-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <img 
                alt="Dr. Sarah Jenkins" 
                className="w-8 h-8 rounded-xl object-cover hidden sm:block mt-auto" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHmDZIm5zHFTXaLxcU2lFbsIu02g6I3odYrFpMBo1pq9PPg8qeBZpI239K08M3ZZFno7UxOliEOLUFhUfxLkIrv9tURKon5mzctJKmbRdwXs25o--fyrMrhzs_1ubbFN5Ee4CS5Fnc47G6GQ6RUxYW6ZHZ3VlGOWAo1kOgRQWOwj4CaUbEqHvycrmOjj_WPfO-Z1ty2N2yBWPct2sEQbdOjnlyGnU9jMhIj3iWUUhhJjV88bcmaYQz9nvhbTVO6rFt0oM6cMr8LFA"
              />
              <div className={`bg-white px-5 py-4 rounded-full shadow-sm border border-outline-variant/10 flex gap-1.5 items-center ${isRtl ? 'rounded-br-sm' : 'rounded-bl-sm'}`}>
                <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{animationDelay: "0s"}}></div>
                <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{animationDelay: "0.2s"}}></div>
                <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{animationDelay: "0.4s"}}></div>
              </div>
            </div>
          </div>
          
          {/* Message Input Area */}
          <div className="bg-surface-container-lowest px-4 sm:px-8 py-5 pb-8 sm:pb-5 z-20 border-t border-outline-variant/10">
            <div className={`flex items-end gap-3 w-full mx-auto ${isRtl ? 'flex-row-reverse' : ''}`}>
              <button className="p-4 text-secondary hover:bg-surface-container-low hover:text-primary transition-colors rounded-2xl shrink-0">
                <span className="material-symbols-outlined">attach_file</span>
              </button>
              <div className={`flex-1 bg-surface-container-high rounded-[2rem] flex items-end focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-300 border border-transparent focus-within:border-primary/20 ${isRtl ? 'flex-row-reverse' : ''}`}>
                <textarea 
                  className={`w-full bg-transparent border-none focus:ring-0 resize-none py-4 font-medium text-primary placeholder:text-outline max-h-32 min-h-[56px] ${isRtl ? 'text-right pr-6' : 'text-left pl-6'}`}
                  placeholder={t('placeholder')} 
                  rows={1}
                ></textarea>
                <button className="p-4 text-secondary hover:text-primary transition-colors shrink-0">
                  <span className="material-symbols-outlined">mic</span>
                </button>
              </div>
              <button className="p-4 bg-primary text-white rounded-[1.5rem] hover:bg-primary-container transition-all shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 shrink-0 flex items-center justify-center">
                <span className={`material-symbols-outlined ${isRtl ? 'rotate-180' : ''}`} style={{fontVariationSettings: "'FILL' 1"}}>send</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}
