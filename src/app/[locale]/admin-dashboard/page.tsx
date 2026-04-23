'use client';

import { useTranslations, useLocale } from 'next-intl';
import DashboardLayout from '@/components/DashboardLayout';

export default function AdminDashboardPage() {
  const t = useTranslations('AdminDashboard');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <DashboardLayout role="admin">
      {/* Hero Stats */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stat 1 */}
        <div className="bg-surface-container-lowest p-6 rounded-xl clinical-shadow group transition-all hover:-translate-y-1">
          <div className={`flex justify-between items-start mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="p-2 bg-primary-container/10 rounded-lg">
              <span className="material-symbols-outlined text-primary fill-1">groups</span>
            </div>
            <span className="text-teal-600 text-xs font-bold bg-teal-50 px-2 py-1 rounded-full">+12.5%</span>
          </div>
          <h3 className={`text-slate-500 text-xs font-bold uppercase tracking-widest mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
            {isRTL ? 'إجمالي الموظفين النشطين' : 'Total Active Employees'}
          </h3>
          <p className={`text-3xl font-black text-teal-950 ${isRTL ? 'text-right' : 'text-left'}`}>2,840</p>
        </div>

        {/* Stat 2 */}
        <div className="bg-surface-container-lowest p-6 rounded-xl clinical-shadow group transition-all hover:-translate-y-1">
          <div className={`flex justify-between items-start mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="p-2 bg-primary-container/10 rounded-lg">
              <span className="material-symbols-outlined text-primary fill-1">medical_services</span>
            </div>
            <span className="text-slate-500 text-xs font-bold">{isRTL ? 'مثالي' : 'Optimal'}</span>
          </div>
          <h3 className={`text-slate-500 text-xs font-bold uppercase tracking-widest mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
            {isRTL ? 'سعة الفريق الطبي' : 'Medical Team Capacity'}
          </h3>
          <p className={`text-3xl font-black text-teal-950 ${isRTL ? 'text-right' : 'text-left'}`}>94.2<span className="text-lg font-medium opacity-60">%</span></p>
        </div>

        {/* Stat 3 */}
        <div className="bg-surface-container-lowest p-6 rounded-xl clinical-shadow group transition-all hover:-translate-y-1">
          <div className={`flex justify-between items-start mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="p-2 bg-primary-container/10 rounded-lg">
              <span className="material-symbols-outlined text-primary fill-1">local_shipping</span>
            </div>
            <span className="text-error text-xs font-bold bg-error-container/20 px-2 py-1 rounded-full">-2.1%</span>
          </div>
          <h3 className={`text-slate-500 text-xs font-bold uppercase tracking-widest mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
            {isRTL ? 'تنفيذ الموردين' : 'Supplier Fulfillment'}
          </h3>
          <p className={`text-3xl font-black text-teal-950 ${isRTL ? 'text-right' : 'text-left'}`}>88.7<span className="text-lg font-medium opacity-60">%</span></p>
        </div>

        {/* Stat 4 */}
        <div className="bg-primary p-6 rounded-xl clinical-shadow group transition-all hover:-translate-y-1">
          <div className={`flex justify-between items-start mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="p-2 bg-white/10 rounded-lg text-white">
              <span className="material-symbols-outlined fill-1">security</span>
            </div>
            <span className="text-on-primary text-xs font-bold bg-white/20 px-2 py-1 rounded-full uppercase">{isRTL ? 'يعمل' : 'Operational'}</span>
          </div>
          <h3 className={`text-white/60 text-xs font-bold uppercase tracking-widest mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
            {isRTL ? 'حالة النظام' : 'System Health Status'}
          </h3>
          <p className={`text-3xl font-black text-white ${isRTL ? 'text-right' : 'text-left'}`}>100%</p>
        </div>
      </section>

      {/* Middle Section: Asymmetric Layout */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Ecosystem Analytics */}
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-2xl p-8 clinical-shadow">
          <div className={`flex justify-between items-center mb-10 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h2 className="text-2xl font-black text-teal-950 tracking-tight">{isRTL ? 'تحليلات مؤشر العافية' : 'Wellness Index Analytics'}</h2>
              <p className="text-slate-500 text-sm">{isRTL ? 'اتجاه العلامات الصحية الإجمالية خلال الربع الأخير' : 'Aggregate health vitals trend over the last quarter'}</p>
            </div>
            <div className="flex space-x-2" dir="ltr">
              <button className="px-4 py-2 text-xs font-bold bg-surface-container-high text-teal-900 rounded-lg">AR</button>
              <button className="px-4 py-2 text-xs font-bold bg-primary text-white rounded-lg">EN</button>
            </div>
          </div>
          <div className="relative h-[300px] w-full bg-teal-50/30 rounded-xl overflow-hidden">
            <div className="absolute inset-0 flex items-end">
              <div className="w-full h-full bg-gradient-to-t from-teal-500/10 to-transparent"></div>
              <svg className="absolute bottom-0 w-full h-[60%]" preserveAspectRatio="none" viewBox="0 0 1000 100">
                <path d="M0,80 C150,70 250,95 400,60 C550,25 750,40 1000,10 L1000,100 L0,100 Z" fill="rgba(0, 92, 115, 0.08)"></path>
                <path d="M0,80 C150,70 250,95 400,60 C550,25 750,40 1000,10" fill="none" stroke="#005c73" strokeWidth="3"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Logistics Pipeline */}
        <div className="bg-surface-container-lowest rounded-2xl p-8 clinical-shadow">
          <h2 className={`text-xl font-black text-teal-950 tracking-tight mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
            {isRTL ? 'خط أنابيب اللوجستيات' : 'Logistics Pipeline'}
          </h2>
          <div className="space-y-6">
            <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="w-1 h-12 bg-primary rounded-full mt-1"></div>
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <h4 className="text-sm font-bold text-teal-900">Route Alpha-9</h4>
                <p className="text-xs text-slate-500 mb-2">Central Medical Depot → Sector 4</p>
                <span className="text-[10px] uppercase font-black px-2 py-0.5 bg-teal-100 text-teal-800 rounded">In Transit</span>
              </div>
            </div>
            <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="w-1 h-12 bg-amber-400 rounded-full mt-1"></div>
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <h4 className="text-sm font-bold text-teal-900">Supplier Order #8821</h4>
                <p className="text-xs text-slate-500 mb-2">Precision Instruments Inc.</p>
                <span className="text-[10px] uppercase font-black px-2 py-0.5 bg-amber-100 text-amber-800 rounded">Awaiting QC</span>
              </div>
            </div>
            <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="w-1 h-12 bg-slate-200 rounded-full mt-1"></div>
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <h4 className="text-sm font-bold text-teal-900">Vaccine Batch Q3</h4>
                <p className="text-xs text-slate-500 mb-2">BioMed Global Solutions</p>
                <span className="text-[10px] uppercase font-black px-2 py-0.5 bg-slate-100 text-slate-600 rounded">Pending Approval</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Access Requests */}
        <div className="bg-surface-container-lowest rounded-2xl p-8 clinical-shadow overflow-hidden">
          <div className={`flex justify-between items-center mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <h2 className="text-xl font-black text-teal-950 tracking-tight">{isRTL ? 'طلبات الوصول الأخيرة' : 'Recent Access Requests'}</h2>
            <a className="text-xs font-bold text-primary hover:underline" href="#">{isRTL ? 'إدارة الدليل' : 'Manage Directory'}</a>
          </div>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className={`flex items-center justify-between p-4 bg-surface rounded-xl group hover:bg-surface-container-low transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <p className="text-sm font-bold text-teal-950">{i === 1 ? 'Elena Martinez' : 'Julian Kang'}</p>
                    <p className="text-xs text-slate-500">{i === 1 ? 'Medical Practitioner' : 'Supplier Liaison'} • 2h ago</p>
                  </div>
                </div>
                <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <button className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors">
                    <span className="material-symbols-outlined">close</span>
                  </button>
                  <button className="p-2 bg-primary text-white rounded-lg hover:bg-primary-container transition-all">
                    <span className="material-symbols-outlined">check</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Critical Alerts */}
        <div className="bg-surface-container-lowest rounded-2xl p-8 clinical-shadow">
          <div className={`flex justify-between items-center mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <h2 className="text-xl font-black text-teal-950 tracking-tight">{isRTL ? 'تنبيهات النظام الحرجة' : 'Critical System Alerts'}</h2>
            <span className="text-[10px] bg-error-container text-on-error-container px-2 py-1 rounded-full font-black uppercase tracking-tighter">Live Feed</span>
          </div>
          <div className="space-y-4">
            <div className={`p-4 bg-error-container/10 border-l-4 border-error rounded-r-xl ${isRTL ? 'border-l-0 border-r-4 rounded-r-none rounded-l-xl text-right' : 'text-left'}`}>
              <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className="material-symbols-outlined text-error fill-1">warning</span>
                <div>
                  <p className="text-sm font-bold text-on-error-container">{isRTL ? 'تأخر شحنة المورد XYZ' : 'Supplier XYZ shipment delayed'}</p>
                  <p className="text-xs text-error/70">Potential impact on Surgical Unit capacity. 15 mins ago.</p>
                </div>
              </div>
            </div>
            <div className={`p-4 bg-teal-50 border-l-4 border-teal-600 rounded-r-xl ${isRTL ? 'border-l-0 border-r-4 rounded-r-none rounded-l-xl text-right' : 'text-left'}`}>
              <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className="material-symbols-outlined text-teal-600 fill-1">cloud_done</span>
                <div>
                  <p className="text-sm font-bold text-teal-900">{isRTL ? 'نجاح النسخ الاحتياطي لقاعدة البيانات' : 'Database backup successful'}</p>
                  <p className="text-xs text-teal-700/70">System snapshot CA-2023-10-24 completed at 04:00 AM.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}
