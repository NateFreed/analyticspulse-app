'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface AuthFormProps {
  mode: 'login' | 'signup';
}

export default function AuthForm({ mode }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { error: authError } = mode === 'signup'
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password });
      if (authError) throw authError;
      window.location.href = '/dashboard';
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}
        className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
      />
      {error && (
        <div className="px-4 py-2 bg-danger/10 border border-danger/20 rounded-xl text-sm text-danger">
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-accent hover:bg-accent-light rounded-xl font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:-translate-y-0.5 disabled:opacity-50"
      >
        {loading ? 'Loading...' : mode === 'signup' ? 'Create Account' : 'Sign In'}
      </button>
    </form>
  );
}
