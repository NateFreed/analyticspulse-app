'use client';

import Link from 'next/link';
import { supabase } from '../../lib/supabase';

export default function UpgradePage() {
  async function handleUpgrade(planId: string) {
    const { data, error } = await supabase.functions.invoke('create-subscription-checkout', {
      body: { plan_id: planId },
    });
    if (data?.url) window.location.href = data.url;
    else alert(error?.message || 'Could not start checkout');
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-accent rounded-lg flex items-center justify-center">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span className="font-bold">AnalyticsPulse</span>
          </Link>
          <Link href="/dashboard" className="text-sm text-muted hover:text-foreground">Back to Dashboard</Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-3">Upgrade to Pro</h1>
          <p className="text-muted">Get more pageviews, more sites, and AI-powered insights.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Pro */}
          <div className="glow-card p-6 border-accent ring-1 ring-accent/20">
            <span className="text-xs bg-accent text-white px-2 py-0.5 rounded-full font-medium">Most Popular</span>
            <h2 className="text-xl font-bold mt-3">Pro</h2>
            <div className="mt-2 mb-1">
              <span className="text-4xl font-bold">$9</span>
              <span className="text-muted">/month</span>
            </div>
            <p className="text-sm text-muted mb-6">100,000 pageviews/month</p>
            <ul className="space-y-2 mb-8">
              {['10 websites', 'All analytics features', '1-year data retention', 'AI insights & alerts', 'Custom events tracking', 'API access', 'Email reports'].map(f => (
                <li key={f} className="text-sm flex items-center gap-2">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-success flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleUpgrade('analyticspulse_pro')}
              className="w-full bg-accent hover:bg-accent-light text-white py-2.5 rounded-lg font-medium"
            >
              Start Free Trial
            </button>
          </div>

          {/* Business */}
          <div className="glow-card p-6">
            <h2 className="text-xl font-bold mt-5">Business</h2>
            <div className="mt-2 mb-1">
              <span className="text-4xl font-bold">$29</span>
              <span className="text-muted">/month</span>
            </div>
            <p className="text-sm text-muted mb-6">1,000,000 pageviews/month</p>
            <ul className="space-y-2 mb-8">
              {['Unlimited websites', 'Everything in Pro', 'Unlimited data retention', 'Team members', 'White-label reports', 'Priority support', 'Custom domains'].map(f => (
                <li key={f} className="text-sm flex items-center gap-2">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-success flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleUpgrade('analyticspulse_business')}
              className="w-full border border-border hover:border-border-light py-2.5 rounded-lg font-medium"
            >
              Start Free Trial
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-muted mt-8">
          Part of the <a href="https://pulse-suite.pages.dev" className="text-accent hover:underline">Pulse Suite</a>. Bundle all tools for $79/mo.
        </p>
      </div>
    </div>
  );
}
