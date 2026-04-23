'use client';

import { useTranslations, useLocale } from 'next-intl';
import DashboardLayout from '@/components/DashboardLayout';

export default function ComponentLibraryPage() {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <DashboardLayout role="admin">
      <div className={`space-y-12 ${isRTL ? 'text-right' : 'text-left'}`}>
        {/* Header */}
        <div>
          <h1 className="font-headline text-5xl font-black text-primary tracking-tight mb-4">
            {isRTL ? 'مكتبة المكونات' : 'Component Library'}
          </h1>
          <p className="text-secondary text-xl max-w-2xl leading-relaxed">
            {isRTL 
              ? 'دليل النمط والنظام البصري لـ Clinical Atelier. تم بناء جميع المكونات لتتبع قاعدة "لا خطوط" والتدرج السطحي الدقيق.' 
              : 'The visual system and style guide for Clinical Atelier. All components are built to follow the "No-Line" rule and subtle surface hierarchy.'}
          </p>
        </div>

        {/* Color Palette */}
        <section className="space-y-6">
          <h2 className="font-headline text-2xl font-bold border-b border-outline-variant pb-2">01. {isRTL ? 'لوحة الألوان' : 'Color Palette'}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="space-y-2">
              <div className="h-24 bg-primary rounded-2xl shadow-inner"></div>
              <p className="text-xs font-bold">Primary</p>
              <p className="text-[10px] text-secondary">#005c73</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 bg-primary-container rounded-2xl shadow-inner"></div>
              <p className="text-xs font-bold">Primary Container</p>
              <p className="text-[10px] text-secondary">#b8eaff</p>
            </div>
             <div className="space-y-2">
              <div className="h-24 bg-secondary rounded-2xl shadow-inner"></div>
              <p className="text-xs font-bold">Secondary</p>
              <p className="text-[10px] text-secondary">#4b626a</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 bg-tertiary rounded-2xl shadow-inner"></div>
              <p className="text-xs font-bold">Tertiary</p>
              <p className="text-[10px] text-secondary">#595c7e</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 bg-surface rounded-2xl border border-outline-variant shadow-inner"></div>
              <p className="text-xs font-bold">Surface</p>
              <p className="text-[10px] text-secondary">#f5fafc</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 bg-surface-container-highest rounded-2xl shadow-inner"></div>
              <p className="text-xs font-bold">Surface High</p>
              <p className="text-[10px] text-secondary">#dee4e6</p>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="space-y-6">
          <h2 className="font-headline text-2xl font-bold border-b border-outline-variant pb-2">02. {isRTL ? 'الخطوط' : 'Typography'}</h2>
          <div className="space-y-8">
            <div>
              <p className="text-[10px] text-secondary uppercase tracking-widest font-bold mb-2">Headline - Manrope Black</p>
              <h3 className="font-headline text-4xl font-black">The Quick Brown Fox Jumps Over The Lazy Dog</h3>
            </div>
            <div>
              <p className="text-[10px] text-secondary uppercase tracking-widest font-bold mb-2">Body - Inter Medium</p>
              <p className="font-body text-lg leading-relaxed">
                Experience precision in clinical management with the Clinical Atelier design system. 
                Focusing on information density and visual clarity.
              </p>
            </div>
          </div>
        </section>

        {/* UI Elements */}
        <section className="space-y-6">
          <h2 className="font-headline text-2xl font-bold border-b border-outline-variant pb-2">03. {isRTL ? 'عناصر واجهة المستخدم' : 'UI Elements'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Buttons */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-secondary">{isRTL ? 'الأزرار' : 'Buttons'}</h3>
              <div className="flex flex-wrap gap-4">
                <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold clinical-shadow hover:bg-primary-container transition-all">Primary Action</button>
                <button className="bg-surface-container-high text-primary px-6 py-3 rounded-xl font-bold hover:bg-surface-container-highest transition-all">Secondary</button>
                <button className="text-primary font-bold px-4 py-2 hover:bg-primary/5 rounded-lg transition-all">Ghost Button</button>
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-4">
               <h3 className="text-sm font-bold uppercase tracking-wider text-secondary">{isRTL ? 'حقول الإدخال' : 'Inputs'}</h3>
               <div className="space-y-4">
                 <input 
                  className={`w-full bg-surface-container-low border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary-container ${isRTL ? 'text-right' : ''}`} 
                  placeholder={isRTL ? 'أدخل النص هنا...' : 'Enter text here...'}
                  type="text"
                />
                <div className="relative">
                  <span className={`material-symbols-outlined absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-outline text-sm`}>search</span>
                  <input 
                    className={`w-full bg-surface-container-low border-none rounded-xl py-3 ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4'} focus:ring-2 focus:ring-primary-container`} 
                    placeholder={isRTL ? 'بحث...' : 'Search...'}
                    type="text"
                  />
                </div>
               </div>
            </div>

            {/* Cards */}
            <div className="space-y-4 col-span-full">
              <h3 className="text-sm font-bold uppercase tracking-wider text-secondary">{isRTL ? 'البطاقات' : 'Cards'}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-surface-container-lowest p-8 rounded-3xl clinical-shadow">
                  <div className="w-12 h-12 bg-primary-container rounded-2xl mb-6 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">analytics</span>
                  </div>
                  <h4 className="font-headline font-bold text-xl mb-2">Elevated Card</h4>
                  <p className="text-sm text-secondary leading-relaxed">Used for main sections and statistics. Uses clinical-shadow.</p>
                </div>
                <div className="bg-surface-container-low p-8 rounded-3xl">
                  <h4 className="font-headline font-bold text-xl mb-2">Subtle Card</h4>
                  <p className="text-sm text-secondary leading-relaxed">Used for secondary information or lists. No shadow, just container color.</p>
                </div>
                <div className="bg-primary p-8 rounded-3xl text-white">
                  <h4 className="font-headline font-bold text-xl mb-2">Inverted Card</h4>
                  <p className="text-sm text-white/80 leading-relaxed">Used for call-to-actions or critical highlights. High contrast.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
