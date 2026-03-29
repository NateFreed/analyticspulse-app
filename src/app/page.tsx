'use client';

import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span className="text-xl font-bold">AnalyticsPulse</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="text-muted hover:text-foreground text-sm">Dashboard</Link>
            <Link href="/auth" className="bg-accent hover:bg-accent-light text-white px-4 py-2 rounded-lg text-sm font-medium">
              Start Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-24 pb-16 text-center">
        <div className="inline-block bg-accent-glow text-accent text-sm font-medium px-3 py-1 rounded-full mb-6">
          No cookies. No consent banners. Just analytics.
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
          Web Analytics That<br />
          <span className="text-accent">Respects Privacy</span>
        </h1>
        <p className="text-xl text-muted max-w-2xl mx-auto mb-10">
          Simple, lightweight analytics for your website. See your traffic, sources, and top pages without tracking personal data. GDPR-compliant by default.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/auth" className="bg-accent hover:bg-accent-light text-white px-8 py-3 rounded-xl text-lg font-semibold">
            Start Free Trial
          </Link>
          <Link href="/dashboard" className="border border-border hover:border-border-light text-foreground px-8 py-3 rounded-xl text-lg font-semibold">
            Live Demo
          </Link>
        </div>
        <p className="text-sm text-muted mt-4">Free up to 5,000 pageviews/month. No credit card required.</p>
      </section>

      {/* Demo Dashboard Preview */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="glow-card p-6 md:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Visitors', value: '2,847', change: '+12%' },
              { label: 'Pageviews', value: '8,391', change: '+8%' },
              { label: 'Bounce Rate', value: '42%', change: '-3%' },
              { label: 'Avg. Duration', value: '2m 34s', change: '+15%' },
            ].map(stat => (
              <div key={stat.label} className="stat-card p-4">
                <p className="text-sm text-muted">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
                <p className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-success' : 'text-danger'}`}>
                  {stat.change} vs last period
                </p>
              </div>
            ))}
          </div>
          {/* Fake chart bars */}
          <div className="flex items-end gap-1 h-32">
            {[40, 55, 45, 70, 65, 80, 75, 90, 85, 95, 88, 72, 68, 82, 78, 91, 86, 74, 69, 83, 79, 92, 87, 76, 71, 84, 80, 93].map((h, i) => (
              <div key={i} className="flex-1 bg-accent/30 rounded-t" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted">
            <span>Mar 1</span><span>Mar 7</span><span>Mar 14</span><span>Mar 21</span><span>Mar 28</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Everything you need. Nothing you don&apos;t.</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: 'Privacy-First', desc: 'No cookies, no fingerprinting, no personal data collected. Your visitors stay anonymous.', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
            { title: 'Lightweight Script', desc: 'Under 1KB tracking script. No impact on page speed. Works with any website or framework.', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
            { title: 'Real-Time Dashboard', desc: 'See visitors, pages, sources, devices, and countries updating live. No sampling.', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
            { title: 'GDPR Compliant', desc: 'No consent banners needed. No personal data stored. Fully compliant out of the box.', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
            { title: 'Traffic Sources', desc: 'See where your visitors come from: search engines, social media, referral sites, or direct.', icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064' },
            { title: 'AI Insights', desc: 'Get automatic alerts when traffic drops or spikes. Understand why with AI-powered analysis.', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
          ].map(f => (
            <div key={f.title} className="glow-card p-6">
              <div className="w-10 h-10 bg-accent-glow rounded-lg flex items-center justify-center mb-4">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="text-accent">
                  <path strokeLinecap="round" strokeLinejoin="round" d={f.icon} />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-muted text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-bold text-center mb-4">Simple, transparent pricing</h2>
        <p className="text-muted text-center mb-12">Start free. Upgrade when you grow.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: 'Free', price: '$0', period: '/mo', pageviews: '5,000 pageviews/mo', features: ['1 website', 'Core analytics', '30-day data retention', 'Email reports'], cta: 'Start Free', highlight: false },
            { name: 'Pro', price: '$9', period: '/mo', pageviews: '100,000 pageviews/mo', features: ['10 websites', 'All analytics features', '1-year data retention', 'AI insights & alerts', 'Custom events', 'API access'], cta: 'Start Free Trial', highlight: true },
            { name: 'Business', price: '$29', period: '/mo', pageviews: '1M pageviews/mo', features: ['Unlimited websites', 'Everything in Pro', 'Unlimited data retention', 'Team members', 'White-label reports', 'Priority support'], cta: 'Start Free Trial', highlight: false },
          ].map(tier => (
            <div key={tier.name} className={`glow-card p-6 ${tier.highlight ? 'border-accent ring-1 ring-accent/20' : ''}`}>
              {tier.highlight && <span className="text-xs bg-accent text-white px-2 py-0.5 rounded-full font-medium">Most Popular</span>}
              <h3 className="text-xl font-bold mt-2">{tier.name}</h3>
              <div className="mt-3 mb-1">
                <span className="text-4xl font-bold">{tier.price}</span>
                <span className="text-muted">{tier.period}</span>
              </div>
              <p className="text-sm text-muted mb-6">{tier.pageviews}</p>
              <ul className="space-y-2 mb-8">
                {tier.features.map(f => (
                  <li key={f} className="text-sm flex items-center gap-2">
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-success flex-shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/auth" className={`block text-center py-2.5 rounded-lg font-medium text-sm ${tier.highlight ? 'bg-accent hover:bg-accent-light text-white' : 'border border-border hover:border-border-light'}`}>
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 pb-20 text-center">
        <div className="glow-card p-10">
          <h2 className="text-2xl font-bold mb-4">Add analytics to your site in 60 seconds</h2>
          <div className="bg-background rounded-lg p-4 font-mono text-sm text-muted mb-6 text-left">
            <span className="text-accent">&lt;script</span> <span className="text-success">src</span>=<span className="text-warning">&quot;https://analyticspulse.com/ap.js&quot;</span><br />
            &nbsp;&nbsp;<span className="text-success">data-site</span>=<span className="text-warning">&quot;YOUR_SITE_ID&quot;</span> <span className="text-success">defer</span><span className="text-accent">&gt;&lt;/script&gt;</span>
          </div>
          <Link href="/auth" className="bg-accent hover:bg-accent-light text-white px-8 py-3 rounded-xl text-lg font-semibold inline-block">
            Get Your Tracking Code
          </Link>
        </div>
      </section>

      {/* Comparison */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold text-center mb-8">Why switch from Google Analytics?</h2>
        <div className="glow-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-muted font-medium">Feature</th>
                <th className="p-4 text-muted font-medium">Google Analytics</th>
                <th className="p-4 text-accent font-medium">AnalyticsPulse</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Cookies required', 'Yes', 'No'],
                ['Consent banner needed', 'Yes (GDPR)', 'No'],
                ['Script size', '45KB+', '< 1KB'],
                ['Data ownership', 'Google owns it', 'You own it'],
                ['Personal data collected', 'Extensive', 'None'],
                ['Setup time', '30+ minutes', '60 seconds'],
                ['Learning curve', 'Complex', 'Instant'],
              ].map(([feature, ga, ap]) => (
                <tr key={feature} className="border-b border-border/50">
                  <td className="p-4 font-medium">{feature}</td>
                  <td className="p-4 text-center text-danger">{ga}</td>
                  <td className="p-4 text-center text-success">{ap}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-accent rounded flex items-center justify-center">
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span className="text-sm font-medium">AnalyticsPulse</span>
          </div>
          <p className="text-sm text-muted">Part of the <a href="https://pulse-suite.pages.dev" className="text-accent hover:underline">Pulse Suite</a> for small businesses.</p>
        </div>
      </footer>
    </div>
  );
}
