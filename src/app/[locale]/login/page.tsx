'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';

export default function LoginPage() {
  const t = useTranslations('Auth');
  const locale = useLocale();
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    // Redirect based on role if needed, but for now to admin dashboard
    router.push('/admin-dashboard');
  };

  return (
    <div className="min-h-screen bg-surface-container-lowest flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-2xl border border-outline-variant/10">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary-container rounded-2xl flex items-center justify-center text-on-primary mx-auto mb-4">
            <span className="material-symbols-outlined text-3xl">clinical_notes</span>
          </div>
          <h1 className="text-3xl font-black text-primary tracking-tight">LifeStyle</h1>
          <p className="text-secondary font-medium mt-2">Sign in to manage your portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-outline uppercase tracking-widest px-1">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface-container-low border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary/20 transition-all font-bold text-primary"
              placeholder="admin@lifestile.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-outline uppercase tracking-widest px-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface-container-low border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary/20 transition-all font-bold text-primary"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="p-4 bg-error-container text-on-error-container rounded-xl text-xs font-bold animate-shake">
              {error}
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white font-black py-5 rounded-2xl shadow-xl hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center mt-10 text-[10px] font-bold text-outline uppercase tracking-widest">
          Secure Clinical Access • HIPAA Compliant
        </p>
      </div>
    </div>
  );
}
