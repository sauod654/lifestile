'use client';

import {useTranslations, useLocale} from 'next-intl';
import {useState} from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Link } from '@/i18n/routing';

export default function BookAppointmentPage() {
  const t = useTranslations('BookAppointment');
  const tDoc = useTranslations('Doctors');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const [step, setStep] = useState(1);
  const [selectedSpec, setSelectedSpec] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDayIdx, setSelectedDayIdx] = useState<number | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSupport = () => {
    alert(isRtl ? 'فريق الكونسيرج سيتواصل معك عبر البريد الإلكتروني في خلال 5 دقائق.' : 'The concierge team will contact you via email within 5 minutes.');
  };

  if (isSuccess) {
    return (
      <DashboardLayout role="employee">
        <div className="max-w-2xl mx-auto py-20 text-center space-y-8 animate-fade-in">
          <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-200">
            <span className="material-symbols-outlined text-5xl" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
          </div>
          <h1 className="text-4xl font-black text-primary tracking-tight">{t('booking_success')}</h1>
          <p className="text-xl text-secondary font-medium">{t('booking_success_desc')}</p>
          <div className="pt-10">
            <Link href="/employee-dashboard" className="px-10 py-5 bg-primary text-white font-black rounded-2xl shadow-xl hover:scale-105 transition-all inline-block">
              {t('back_to_dashboard')}
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="employee">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Booking Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="text-start">
            <h1 className="text-4xl font-extrabold text-primary tracking-tight mb-2">{t('title')}</h1>
            <p className="text-lg text-secondary max-w-2xl leading-relaxed">{t('schedule_desc')}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`w-10 h-10 rounded-full border-4 border-surface flex items-center justify-center font-bold text-xs ${
                  step >= i ? 'bg-primary text-white' : 'bg-surface-container-high text-outline'
                }`}>
                  {i}
                </div>
              ))}
            </div>
            <p className="text-xs font-bold text-outline uppercase tracking-widest">Step {step} of 3</p>
          </div>
        </header>

        {/* Step 1: Specialization & Practitioner */}
        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4 space-y-6">
              <h3 className="text-2xl font-bold text-primary text-start">{t('specialization')}</h3>
              <div className="space-y-3">
                {[
                  { id: 'nutrition', name: isRtl ? 'التغذية والحمية' : 'Nutrition & Dietetics', icon: 'restaurant', count: 12 },
                  { id: 'general', name: isRtl ? 'الطب العام' : 'General Medicine', icon: 'medical_services', count: 8 },
                  { id: 'cardio', name: isRtl ? 'أمراض القلب' : 'Cardiology', icon: 'favorite', count: 4 },
                  { id: 'mental', name: isRtl ? 'الصحة النفسية' : 'Mental Wellness', icon: 'psychology', count: 6 },
                ].map((spec) => (
                  <button 
                    key={spec.id} 
                    onClick={() => setSelectedSpec(spec.name)}
                    className={`w-full p-5 rounded-2xl border transition-all flex items-center justify-between group ${
                      selectedSpec === spec.name 
                        ? 'bg-primary/5 border-primary shadow-md' 
                        : 'bg-surface-container-low border-outline-variant/10 hover:border-primary/30 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`material-symbols-outlined transition-transform group-hover:scale-110 ${selectedSpec === spec.name ? 'text-primary' : 'text-secondary'}`}>{spec.icon}</span>
                      <span className={`font-bold ${selectedSpec === spec.name ? 'text-primary' : 'text-slate-700'}`}>{spec.name}</span>
                    </div>
                    <span className="text-[10px] font-bold text-outline bg-surface-container-high px-2 py-1 rounded-md">{spec.count} {isRtl ? 'متاح' : 'Available'}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-8 space-y-6">
              <h3 className="text-2xl font-bold text-primary text-start">{t('practitioners')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: '1', name: tDoc('sarah_mansour'), role: tDoc('sarah_role'), rate: 4.9, img: '42' },
                  { id: '2', name: tDoc('james_khalid'), role: tDoc('james_role'), rate: 4.8, img: '33' },
                  { id: '3', name: tDoc('amira_yusuf'), role: tDoc('amira_role'), rate: 4.7, img: '44' },
                  { id: '4', name: tDoc('robert_chen'), role: tDoc('robert_role'), rate: 4.9, img: '52' },
                ].map((doc, idx) => (
                  <div key={idx} className={`p-6 rounded-[2rem] border transition-all flex flex-col justify-between group ${
                    selectedDoctor?.id === doc.id 
                      ? 'bg-white border-primary shadow-lg ring-2 ring-primary/5' 
                      : 'bg-surface-container-lowest border-outline-variant/10 shadow-sm hover:shadow-md'
                  }`}>
                    <div className="flex items-start justify-between mb-6">
                      <div className={`flex items-center gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
                        <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-primary-fixed shadow-inner">
                          <img src={`https://i.pravatar.cc/150?u=${doc.img}`} alt={doc.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="text-start">
                          <h4 className="font-extrabold text-primary tracking-tight">{doc.name}</h4>
                          <p className="text-xs text-secondary font-medium">{doc.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2 py-1 rounded-lg">
                        <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                        <span className="text-xs font-bold">{doc.rate}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        setSelectedDoctor(doc);
                        setStep(2);
                      }}
                      className={`w-full py-3 font-bold rounded-xl border transition-all ${
                        selectedDoctor?.id === doc.id
                          ? 'bg-primary text-white border-primary'
                          : 'bg-surface-container-low text-primary border-outline-variant/10 group-hover:bg-primary group-hover:text-white'
                      }`}
                    >
                      {isRtl ? 'اختيار الممارس' : 'Select Practitioner'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Scheduler */}
        {step === 2 && (
          <div className="bg-surface-container-lowest rounded-[2.5rem] p-10 border border-outline-variant/10 shadow-sm animate-fade-in">
            <h3 className="text-2xl font-bold text-primary mb-10 text-start">{t('scheduler')}</h3>
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
              {/* Calendar Days */}
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
                <div key={idx} className="space-y-4">
                  <div className="text-center">
                    <p className="text-[10px] font-black text-outline uppercase tracking-widest mb-1">
                      {isRtl ? ['اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت', 'أحد'][idx] : day}
                    </p>
                    <button 
                      onClick={() => setSelectedDayIdx(idx)}
                      className={`w-10 h-10 mx-auto flex items-center justify-center rounded-full font-bold transition-all ${
                        selectedDayIdx === idx 
                          ? 'bg-primary text-white shadow-lg scale-110' 
                          : 'text-primary hover:bg-primary/10'
                      }`}
                    >
                      {24 + idx}
                    </button>
                  </div>
                  <div className="space-y-2">
                    {['09:00', '10:30', '14:00'].map((time, tIdx) => (
                      <button 
                        key={tIdx} 
                        onClick={() => {
                          setSelectedTime(time);
                          setSelectedDayIdx(idx);
                          setStep(3);
                        }}
                        className={`w-full py-2.5 rounded-lg text-xs font-bold border transition-all ${
                          selectedTime === time && selectedDayIdx === idx
                          ? 'bg-primary text-white border-primary shadow-md' 
                          : 'bg-surface-container-low border-transparent text-secondary hover:border-outline-variant/20'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className={`mt-12 flex justify-between items-center pt-10 border-t border-outline-variant/10 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <button onClick={() => setStep(1)} className="text-sm font-bold text-secondary hover:underline">
                {t('cancel')}
              </button>
              <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
                <span className="material-symbols-outlined text-secondary">info</span>
                <p className="text-xs text-secondary italic">
                  {selectedTime 
                    ? `${isRtl ? 'المختار' : 'Selected'}: ${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][selectedDayIdx || 0]}, Oct ${24 + (selectedDayIdx || 0)} @ ${selectedTime}`
                    : (isRtl ? 'يرجى اختيار وقت' : 'Please select a time slot')}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Summary & Confirm */}
        {step === 3 && (
          <div className="max-w-2xl mx-auto bg-surface-container-lowest rounded-[2.5rem] p-10 border border-outline-variant/10 shadow-xl overflow-hidden relative animate-fade-in">
            <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
              <span className="material-symbols-outlined text-[120px]">verified</span>
            </div>
            
            <h3 className="text-3xl font-extrabold text-primary mb-8 tracking-tight text-start">{t('summary')}</h3>
            <div className="space-y-6">
              <div className={`flex justify-between items-center p-6 bg-surface-container-low rounded-2xl border border-outline-variant/5 ${isRtl ? 'flex-row-reverse' : ''}`}>
                <div className="text-start">
                  <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-1">{t('practitioner_label')}</p>
                  <p className="text-xl font-extrabold text-primary">{selectedDoctor?.name || 'Dr. Sarah Mansour'}</p>
                </div>
                <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-primary-fixed shadow-sm">
                  <img src={`https://i.pravatar.cc/150?u=${selectedDoctor?.img || '42'}`} alt="Doctor" className="w-full h-full object-cover" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-surface-container-low rounded-2xl border border-outline-variant/5 text-start">
                  <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-1">{t('date_time')}</p>
                  <p className="font-extrabold text-primary">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][selectedDayIdx || 0]}, Oct {24 + (selectedDayIdx || 0)}
                  </p>
                  <p className="text-sm font-bold text-secondary">{selectedTime || '10:30 AM'} (GMT+3)</p>
                </div>
                <div className="p-6 bg-surface-container-low rounded-2xl border border-outline-variant/5 text-start">
                  <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-1">{t('specialization_label')}</p>
                  <p className="font-extrabold text-primary">{selectedSpec || 'General Medicine'}</p>
                  <p className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-1">{t('insurance_covered')}</p>
                </div>
              </div>
            </div>

            <div className="mt-12 space-y-4">
              <button 
                onClick={() => setIsSuccess(true)}
                className="w-full py-5 bg-primary text-white font-black rounded-2xl shadow-xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
              >
                <span className="material-symbols-outlined">check_circle</span>
                <span>{t('confirm')}</span>
              </button>
              <button onClick={() => setStep(2)} className="w-full py-4 text-secondary font-bold hover:underline transition-all">
                {t('change_selection')}
              </button>
            </div>

            <div className="mt-10 pt-8 border-t border-outline-variant/10 flex items-center justify-center gap-10 opacity-60">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">lock</span>
                <p className="text-[10px] font-bold uppercase tracking-widest">End-to-End Encrypted</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">verified_user</span>
                <p className="text-[10px] font-bold uppercase tracking-widest">HIPAA Compliant</p>
              </div>
            </div>
          </div>
        )}

        {/* Global Support Footer */}
        <footer className={`bg-surface-container-low/50 rounded-[2rem] p-8 border border-outline-variant/5 flex flex-col md:flex-row items-center justify-between gap-8 ${isRtl ? 'flex-row-reverse' : ''}`}>
          <div className={`flex items-center gap-5 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">help_outline</span>
            </div>
            <div className="text-start">
              <h4 className="font-bold text-primary">{t('need_help')}</h4>
              <p className="text-sm text-secondary">{t('concierge_help')}</p>
            </div>
          </div>
          <button 
            onClick={handleSupport}
            className="bg-white text-primary px-8 py-3 rounded-xl font-bold shadow-sm border border-outline-variant/10 hover:bg-primary hover:text-white transition-all"
          >
            {t('talk_support')}
          </button>
        </footer>
      </div>
    </DashboardLayout>
  );
}
