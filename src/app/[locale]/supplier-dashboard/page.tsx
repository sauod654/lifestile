'use client';

import {useTranslations, useLocale} from 'next-intl';
import {Link} from '@/i18n/routing';

export default function SupplierDashboardPage() {
  const t = useTranslations('SupplierDashboard');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Sidebar Navigation */}
      <aside className="w-20 lg:w-64 bg-[#f8faf9] dark:bg-slate-900 border-e border-outline-variant/10 flex flex-col items-center lg:items-start py-8 px-4 gap-8 z-50">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined">inventory_2</span>
          </div>
          <div className="hidden lg:block">
            <p className="font-headline font-black text-primary text-lg leading-none">CA</p>
            <p className="text-[10px] uppercase font-bold text-secondary tracking-widest">{t('portal_label')}</p>
          </div>
        </div>

        <nav className="flex-1 w-full space-y-2">
          <Link href="/supplier-dashboard" className="flex items-center gap-4 px-4 py-3 bg-white dark:bg-slate-800 text-primary dark:text-white rounded-2xl shadow-sm group transition-all">
            <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">grid_view</span>
            <span className="hidden lg:block font-bold">{t('nav_dashboard')}</span>
          </Link>
          <a className="flex items-center gap-4 px-4 py-3 text-secondary hover:bg-[#eceee2] dark:hover:bg-slate-800 rounded-2xl transition-all cursor-pointer">
            <span className="material-symbols-outlined">inventory</span>
            <span className="hidden lg:block font-medium">{t('nav_inventory')}</span>
          </a>
          <a className="flex items-center gap-4 px-4 py-3 text-secondary hover:bg-[#eceee2] dark:hover:bg-slate-800 rounded-2xl transition-all cursor-pointer">
            <span className="material-symbols-outlined">local_shipping</span>
            <span className="hidden lg:block font-medium">{t('nav_orders')}</span>
          </a>
          <a className="flex items-center gap-4 px-4 py-3 text-secondary hover:bg-[#eceee2] dark:hover:bg-slate-800 rounded-2xl transition-all cursor-pointer">
            <span className="material-symbols-outlined">analytics</span>
            <span className="hidden lg:block font-medium">{t('nav_analytics')}</span>
          </a>
        </nav>

        <div className="w-full pt-6 border-t border-outline-variant/10 space-y-2">
          <button className="w-full lg:signature-gradient text-white p-3 lg:rounded-2xl flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined">add_box</span>
            <span className="hidden lg:block font-bold">{t('new_shipment')}</span>
          </button>
        </div>

        <div className="mt-auto w-full space-y-1">
          <a className="flex items-center gap-4 px-4 py-2 text-secondary hover:text-primary transition-colors cursor-pointer">
            <span className="material-symbols-outlined">settings</span>
            <span className="hidden lg:block font-medium">Settings</span>
          </a>
          <Link href="/" className="flex items-center gap-4 px-4 py-2 text-error hover:bg-error-container/10 rounded-xl transition-all">
            <span className="material-symbols-outlined">logout</span>
            <span className="hidden lg:block font-medium">Exit</span>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        {/* Top Header */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
          <div className="flex items-center gap-6">
            <h1 className="text-3xl font-black text-primary tracking-tight">Clinical Atelier <span className="text-slate-300 mx-2 font-normal">|</span> <span className="text-secondary font-bold uppercase text-xl tracking-widest">{t('fulfillment_ops')}</span></h1>
          </div>
          <div className="flex items-center gap-4 bg-white dark:bg-slate-800 p-2 rounded-2xl shadow-sm border border-outline-variant/10 w-full lg:w-auto">
            <div className="flex-1 lg:w-80 flex items-center gap-3 px-4 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-outline-variant/5">
              <span className="material-symbols-outlined text-secondary text-sm">search</span>
              <input className="bg-transparent border-none focus:ring-0 text-sm w-full" placeholder={t('search_placeholder')} type="text"/>
            </div>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-secondary hover:bg-primary hover:text-white transition-all">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-primary-fixed">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQPz0k3lAYDRIMROjnXkhhaz56yPAQ4WPrs6u-hvN7-uKLwRPlJSLX1G1YtkAJ1azae12b--g2ZTEHvIlg2xqnm2rII3kSim4Qw3SKciCQU5wuA5ne7ycEBzK3e7TVxDqisteuKU0P0vW5relNz90Y8vtTObrR6Kdd68tS4vV5aJJAon-SjroAigH9rwX4mgOBVw1Eo7J_RThiLIHV8ZBUZw3oUa6um8qPFwyEUwK8-byO6XWcFXeAmmJLKOd9TkcYFl4qtjcezXY" alt="User" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-outline-variant/10 shadow-sm group hover:border-primary transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-primary-container/10 text-primary rounded-2xl group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">payments</span>
              </div>
              <span className="text-emerald-500 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-full">+12.5%</span>
            </div>
            <p className="text-secondary text-xs font-bold uppercase tracking-widest mb-1">{t('monthly_sales')}</p>
            <p className="text-3xl font-black text-primary tracking-tight">$482,900</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-outline-variant/10 shadow-sm group hover:border-primary transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-tertiary-container/10 text-tertiary rounded-2xl group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">inventory_2</span>
              </div>
            </div>
            <p className="text-secondary text-xs font-bold uppercase tracking-widest mb-1">{t('inventory_value')}</p>
            <p className="text-3xl font-black text-primary tracking-tight">1.2M <span className="text-sm font-normal text-slate-400 italic ml-1">Items</span></p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-outline-variant/10 shadow-sm group hover:border-primary transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-secondary-container/10 text-secondary rounded-2xl group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">verified</span>
              </div>
              <span className="text-emerald-500 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-full">Optimal</span>
            </div>
            <p className="text-secondary text-xs font-bold uppercase tracking-widest mb-1">{t('fulfillment_rate')}</p>
            <p className="text-3xl font-black text-primary tracking-tight">98.4%</p>
          </div>
          <div className="bg-primary p-6 rounded-[2rem] shadow-xl relative overflow-hidden group">
            <div className="relative z-10 text-white">
              <p className="text-primary-fixed-dim text-xs font-bold uppercase tracking-widest mb-4">{t('logistics_command')}</p>
              <p className="text-2xl font-black mb-1">Global Active</p>
              <p className="text-sm opacity-80 font-medium">14 Countries • 82 Nodes</p>
              <div className="mt-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[10px] font-bold uppercase tracking-tighter">Live Stream Active</span>
              </div>
            </div>
            <span className="material-symbols-outlined absolute -bottom-6 -right-6 text-9xl text-white/5 group-hover:scale-110 transition-transform">public</span>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Active Orders List */}
          <section className="lg:col-span-8 bg-white dark:bg-slate-800 rounded-[2rem] p-8 border border-outline-variant/10 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-primary mb-1">{t('active_orders_title')}</h2>
                <p className="text-secondary text-sm">Real-time Fulfillment Queue</p>
              </div>
              <button className="px-4 py-2 bg-slate-50 hover:bg-primary hover:text-white text-secondary font-bold text-xs rounded-xl transition-all border border-outline-variant/10">
                {t('track_all')}
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] uppercase font-black text-outline tracking-widest border-b border-outline-variant/5">
                    <th className="pb-4">{t('col_order_id')}</th>
                    <th className="pb-4">{t('col_items')}</th>
                    <th className="pb-4">{t('col_status')}</th>
                    <th className="pb-4">{t('priority')}</th>
                    <th className="pb-4 text-right">{t('col_actions')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/5 font-medium">
                  <tr className="group hover:bg-slate-50/50 transition-colors">
                    <td className="py-5 font-headline font-bold text-primary">#ORD-90210</td>
                    <td className="py-5 text-sm text-secondary">Diagnostic Kits x400</td>
                    <td className="py-5">
                      <span className="px-3 py-1 rounded-lg text-[10px] font-black bg-emerald-100 text-emerald-700">IN TRANSIT</span>
                    </td>
                    <td className="py-5">
                      <span className="flex items-center gap-1 text-xs font-bold text-error">
                        <span className="material-symbols-outlined text-sm">priority_high</span>
                        {t('priority_high')}
                      </span>
                    </td>
                    <td className="py-5 text-right">
                      <button className="p-2 hover:bg-white rounded-lg transition-colors">
                        <span className="material-symbols-outlined text-secondary">open_in_new</span>
                      </button>
                    </td>
                  </tr>
                  <tr className="group hover:bg-slate-50/50 transition-colors">
                    <td className="py-5 font-headline font-bold text-primary">#ORD-88421</td>
                    <td className="py-5 text-sm text-secondary">Surgical Equipment</td>
                    <td className="py-5">
                      <span className="px-3 py-1 rounded-lg text-[10px] font-black bg-amber-100 text-amber-700">PROCESSING</span>
                    </td>
                    <td className="py-5">
                      <span className="flex items-center gap-1 text-xs font-bold text-amber-600">
                        <span className="material-symbols-outlined text-sm">remove</span>
                        {t('priority_medium')}
                      </span>
                    </td>
                    <td className="py-5 text-right">
                      <button className="p-2 hover:bg-white rounded-lg transition-colors">
                        <span className="material-symbols-outlined text-secondary">open_in_new</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Performance Analytics */}
          <section className="lg:col-span-4 flex flex-col gap-8">
            <div className="bg-surface-container-high rounded-[2rem] p-8 border border-outline-variant/10 shadow-sm flex-1">
              <h3 className="text-xl font-bold text-primary mb-6">{t('performance_analytics')}</h3>
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <p className="text-[10px] font-black uppercase text-secondary tracking-widest">{t('delivery_accuracy')}</p>
                    <p className="text-xl font-black text-primary">99.2%</p>
                  </div>
                  <div className="h-2 w-full bg-white rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{width: '99.2%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <p className="text-[10px] font-black uppercase text-secondary tracking-widest">{t('avg_fulfillment')}</p>
                    <p className="text-xl font-black text-primary">4.2 <span className="text-xs font-normal opacity-50 italic">Hrs</span></p>
                  </div>
                  <div className="h-2 w-full bg-white rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{width: '85%'}}></div>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-outline-variant/5">
                <div className="flex items-center gap-4 p-4 bg-white/50 rounded-2xl">
                  <div className="w-10 h-10 rounded-xl bg-tertiary flex items-center justify-center text-white">
                    <span className="material-symbols-outlined">auto_graph</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-secondary tracking-widest">Efficiency Rating</p>
                    <p className="text-sm font-bold text-primary">Platinum Grade A+</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary-container p-8 rounded-[2rem] shadow-sm relative overflow-hidden flex items-center justify-between group cursor-pointer hover:brightness-105 transition-all">
              <div className="relative z-10 text-on-primary-container">
                <h3 className="font-headline font-black text-lg mb-1">{t('logistics_network')}</h3>
                <p className="text-xs font-medium opacity-70">Distribution Map Overview</p>
              </div>
              <span className="material-symbols-outlined text-4xl text-on-primary-container/20 group-hover:scale-125 transition-transform">explore</span>
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl -mr-12 -mt-12"></div>
            </div>
          </section>
        </div>

        {/* Live Network Stream */}
        <section className="mt-10 bg-slate-900 rounded-[2.5rem] p-8 lg:p-12 text-white relative overflow-hidden min-h-[400px] flex flex-col justify-end border border-white/5 shadow-2xl">
          <div className="absolute top-8 left-8 lg:top-12 lg:left-12 z-20">
            <h2 className="text-3xl font-black tracking-tight mb-2">{t('global_logistics')}</h2>
            <p className="text-slate-400 font-medium max-w-md leading-relaxed">{t('live_network')}</p>
          </div>
          
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
              <circle cx="500" cy="500" fill="none" r="300" stroke="white" strokeDasharray="5 5" strokeWidth="1"></circle>
              <circle cx="500" cy="500" fill="none" r="200" stroke="white" strokeDasharray="5 5" strokeWidth="1"></circle>
              <line stroke="white" strokeDasharray="5 5" strokeWidth="1" x1="500" x2="500" y1="200" y2="800"></line>
              <line stroke="white" strokeDasharray="5 5" strokeWidth="1" x1="200" x2="800" y1="500" y2="500"></line>
              {/* Nodes */}
              <circle className="animate-pulse" cx="400" cy="450" fill="#4ade80" r="4"></circle>
              <circle className="animate-pulse" cx="600" cy="550" fill="#4ade80" r="4"></circle>
              <circle className="animate-pulse" cx="500" cy="350" fill="#f87171" r="4"></circle>
            </svg>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row gap-6 mt-20">
            <div className="bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <p className="text-xs font-black uppercase tracking-widest text-slate-400">Node Status: Riyadh (RUH-01)</p>
              </div>
              <p className="text-xl font-bold mb-1">Operational Excellence</p>
              <p className="text-sm text-slate-400 font-medium leading-relaxed">Fulfillment throughput is at 104% capacity. All medical shipments prioritized for immediate dispatch.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 w-full md:w-80">
              <div className="flex justify-between items-center mb-6">
                <p className="text-xs font-black uppercase tracking-widest text-slate-400">Network Health</p>
                <span className="material-symbols-outlined text-emerald-500">check_circle</span>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="opacity-60">Latency</span>
                  <span>14ms</span>
                </div>
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="opacity-60">Packet Loss</span>
                  <span className="text-emerald-400">0.001%</span>
                </div>
                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden mt-4">
                  <div className="h-full bg-primary-fixed-dim rounded-full" style={{width: '94%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Dynamic Action Button */}
      <button className="fixed bottom-10 right-10 w-16 h-16 rounded-full signature-gradient text-white shadow-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all z-50">
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>
    </div>
  );
}
