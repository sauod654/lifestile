'use client';

import { useTranslations, useLocale } from 'next-intl';
import DashboardLayout from '@/components/DashboardLayout';
import { Link, useRouter } from '@/i18n/routing';
import { useState } from 'react';

export default function SupportTicketPage() {
  const t = useTranslations('SupportTicket');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert(isRtl ? 'تم إرسال التذكرة بنجاح!' : 'Ticket submitted successfully!');
      router.push('/support');
    }, 1500);
  };

  return (
    <DashboardLayout role="employee">
      <main className="flex-1 min-h-screen pb-32 md:pb-0">
        <div className="max-w-4xl mx-auto p-6 md:p-12">
          
          <div className={`mb-10 ${isRtl ? 'text-right' : 'text-left'}`}>
            <Link href="/support" className={`inline-flex items-center text-xs font-black uppercase tracking-widest text-secondary hover:text-primary mb-6 transition-colors ${isRtl ? 'flex-row-reverse' : ''}`}>
              <span className={`material-symbols-outlined text-sm ${isRtl ? 'ml-1.5 rotate-180' : 'mr-1.5'}`}>arrow_back</span>
              {t('back')}
            </Link>
            <h1 className="font-headline text-4xl md:text-5xl font-black text-primary tracking-tighter uppercase">{t('title')}</h1>
            <p className="font-medium text-secondary mt-3 text-lg max-w-2xl">{t('desc')}</p>
          </div>

          <div className="bg-surface-container-lowest rounded-[2rem] p-8 md:p-12 shadow-[0_24px_48px_-12px_rgba(0,31,40,0.08)] relative overflow-hidden border border-outline-variant/10">
            {/* Decorative subtle gradient blob */}
            <div className={`absolute top-0 w-64 h-64 bg-primary-container opacity-20 rounded-full blur-3xl -mt-20 pointer-events-none ${isRtl ? 'left-0 -ml-20' : 'right-0 -mr-20'}`}></div>
            
            <form onSubmit={handleSubmit} className={`space-y-10 relative z-10 ${isRtl ? 'text-right' : 'text-left'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Category */}
                <div className="space-y-3">
                  <label className="block text-xs font-black text-primary uppercase tracking-widest px-1" htmlFor="category">{t('category')}</label>
                  <div className="relative">
                    <select 
                      id="category" 
                      name="category" 
                      required
                      className={`w-full bg-surface-container-high border-none rounded-2xl py-4 font-bold text-primary focus:ring-2 focus:ring-primary/20 transition-all appearance-none ${isRtl ? 'pr-4 pl-12' : 'pl-4 pr-12'}`}
                    >
                      <option disabled selected value="">{t('cat_placeholder')}</option>
                      <option value="clinical">{t('cat_clinical')}</option>
                      <option value="technical">{t('cat_tech')}</option>
                      <option value="admin">{t('cat_admin')}</option>
                    </select>
                    <div className={`pointer-events-none absolute inset-y-0 flex items-center px-4 text-primary ${isRtl ? 'left-0' : 'right-0'}`}>
                      <span className="material-symbols-outlined text-xl">expand_more</span>
                    </div>
                  </div>
                </div>

                {/* Priority */}
                <div className="space-y-3">
                  <label className="block text-xs font-black text-primary uppercase tracking-widest px-1">{t('priority')}</label>
                  <div className={`flex gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <label className="flex-1 cursor-pointer">
                      <input type="radio" name="priority" value="low" className="peer sr-only" />
                      <div className="w-full text-center py-4 px-4 rounded-2xl bg-surface-container-high text-secondary font-bold text-sm transition-all peer-checked:bg-secondary-container peer-checked:text-on-secondary-container peer-checked:shadow-sm hover:bg-surface-container">
                        {t('low')}
                      </div>
                    </label>
                    <label className="flex-1 cursor-pointer">
                      <input type="radio" name="priority" value="medium" className="peer sr-only" defaultChecked />
                      <div className="w-full text-center py-4 px-4 rounded-2xl bg-surface-container-high text-secondary font-bold text-sm transition-all peer-checked:bg-tertiary-container peer-checked:text-on-tertiary-container peer-checked:shadow-sm hover:bg-surface-container">
                        {t('medium')}
                      </div>
                    </label>
                    <label className="flex-1 cursor-pointer">
                      <input type="radio" name="priority" value="high" className="peer sr-only" />
                      <div className="w-full text-center py-4 px-4 rounded-2xl bg-surface-container-high text-secondary font-bold text-sm transition-all peer-checked:bg-error-container peer-checked:text-on-error-container peer-checked:shadow-sm hover:bg-surface-container">
                        {t('high')}
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-3">
                <label className="block text-xs font-black text-primary uppercase tracking-widest px-1" htmlFor="subject">{t('subject')}</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  required
                  placeholder={t('sub_placeholder')}
                  className={`w-full bg-surface-container-high border-none rounded-2xl py-4 px-5 text-primary font-bold placeholder:text-outline focus:ring-2 focus:ring-primary/20 transition-all ${isRtl ? 'text-right' : 'text-left'}`}
                />
              </div>

              {/* Description */}
              <div className="space-y-3">
                <label className="block text-xs font-black text-primary uppercase tracking-widest px-1" htmlFor="description">{t('description')}</label>
                <textarea 
                  id="description" 
                  name="description" 
                  rows={5} 
                  required
                  placeholder={t('desc_placeholder')}
                  className={`w-full bg-surface-container-high border-none rounded-2xl py-4 px-5 text-primary font-medium placeholder:text-outline focus:ring-2 focus:ring-primary/20 transition-all resize-y ${isRtl ? 'text-right' : 'text-left'}`}
                ></textarea>
              </div>

              {/* File Upload */}
              <div className="space-y-3">
                <label className="block text-xs font-black text-primary uppercase tracking-widest px-1">{t('attachments')}</label>
                <div className="mt-1 flex justify-center px-6 pt-8 pb-10 border-2 border-dashed border-outline-variant/30 rounded-2xl bg-surface-container-lowest hover:bg-surface-container-high transition-colors cursor-pointer group">
                  <div className="space-y-2 text-center">
                    <span className="material-symbols-outlined text-4xl text-primary mb-2 group-hover:scale-110 transition-transform">upload_file</span>
                    <div className="flex text-sm text-secondary justify-center font-bold">
                      <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-black text-primary hover:underline focus-within:outline-none uppercase tracking-widest">
                        <span>{t('upload')}</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                      </label>
                      <p className="px-2">{t('drag')}</p>
                    </div>
                    <p className="text-xs text-outline font-black uppercase tracking-widest pt-2">
                      {t('file_limits')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className={`pt-6 flex items-center gap-4 ${isRtl ? 'justify-start flex-row-reverse' : 'justify-end'}`}>
                <button 
                  type="button" 
                  onClick={() => router.push('/support')}
                  className="py-4 px-8 rounded-2xl bg-surface-container-highest text-primary font-black text-xs uppercase tracking-widest hover:bg-surface-dim transition-colors"
                >
                  {t('cancel')}
                </button>
                <button 
                  type="submit" 
                  disabled={loading}
                  className={`group relative py-4 px-10 rounded-2xl primary-gradient-glow text-white font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all overflow-hidden flex items-center gap-2 disabled:opacity-50 ${isRtl ? 'flex-row-reverse' : ''}`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {loading ? (isRtl ? 'جاري الإرسال...' : 'Submitting...') : t('submit')}
                    <span className={`material-symbols-outlined text-sm transition-transform ${isRtl ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`}>send</span>
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}
