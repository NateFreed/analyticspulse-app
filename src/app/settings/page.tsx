'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SettingsPage() {
  const [siteName, setSiteName] = useState('My Website');
  const [domain, setDomain] = useState('example.com');
  const [emailReports, setEmailReports] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [trafficAlerts, setTrafficAlerts] = useState(false);

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

      <div className="max-w-2xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-8">Settings</h1>

        {/* Site info */}
        <div className="glow-card p-6 mb-6">
          <h2 className="font-semibold mb-4">Site Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-muted mb-1">Site Name</label>
              <input
                type="text"
                value={siteName}
                onChange={e => setSiteName(e.target.value)}
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-sm text-muted mb-1">Domain</label>
              <input
                type="text"
                value={domain}
                onChange={e => setDomain(e.target.value)}
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:border-accent"
              />
            </div>
          </div>
        </div>

        {/* Tracking code */}
        <div className="glow-card p-6 mb-6">
          <h2 className="font-semibold mb-4">Tracking Code</h2>
          <p className="text-sm text-muted mb-3">Add this script to your website&apos;s &lt;head&gt; tag:</p>
          <div className="bg-background rounded-lg p-4 font-mono text-sm text-muted border border-border">
            &lt;script src=&quot;https://analyticspulse.com/ap.js&quot;<br />
            &nbsp;&nbsp;data-site=&quot;ap_demo12345&quot; defer&gt;&lt;/script&gt;
          </div>
        </div>

        {/* Notifications */}
        <div className="glow-card p-6 mb-6">
          <h2 className="font-semibold mb-4">Notifications</h2>
          <div className="space-y-4">
            {[
              { label: 'Email Reports', desc: 'Monthly analytics summary', checked: emailReports, onChange: setEmailReports },
              { label: 'Weekly Digest', desc: 'Weekly traffic overview', checked: weeklyDigest, onChange: setWeeklyDigest },
              { label: 'Traffic Alerts', desc: 'Alert on significant traffic changes', checked: trafficAlerts, onChange: setTrafficAlerts },
            ].map(toggle => (
              <div key={toggle.label} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{toggle.label}</p>
                  <p className="text-xs text-muted">{toggle.desc}</p>
                </div>
                <button
                  onClick={() => toggle.onChange(!toggle.checked)}
                  className={`w-11 h-6 rounded-full relative ${toggle.checked ? 'bg-accent' : 'bg-border'}`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${toggle.checked ? 'left-5.5' : 'left-0.5'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Subscription */}
        <div className="glow-card p-6 mb-6">
          <h2 className="font-semibold mb-4">Subscription</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Free Plan</p>
              <p className="text-sm text-muted">5,000 pageviews/month, 1 site</p>
            </div>
            <Link href="/upgrade" className="bg-accent hover:bg-accent-light text-white px-4 py-2 rounded-lg text-sm font-medium">
              Upgrade to Pro
            </Link>
          </div>
        </div>

        {/* Danger zone */}
        <div className="glow-card p-6 border-danger/30">
          <h2 className="font-semibold mb-4 text-danger">Danger Zone</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Delete Site</p>
              <p className="text-xs text-muted">Permanently delete this site and all its data</p>
            </div>
            <button className="border border-danger text-danger hover:bg-danger hover:text-white px-4 py-2 rounded-lg text-sm font-medium">
              Delete
            </button>
          </div>
        </div>

        <div className="mt-6">
          <button className="bg-accent hover:bg-accent-light text-white px-6 py-2.5 rounded-lg font-medium">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
