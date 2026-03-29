'use client';

import { useState } from 'react';
import Link from 'next/link';

interface SiteEntry {
  id: string;
  name: string;
  domain: string;
  trackingId: string;
  pageviews: number;
}

export default function SitesPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDomain, setNewDomain] = useState('');
  const [newName, setNewName] = useState('');

  const sites: SiteEntry[] = [
    { id: '1', name: 'My Business Site', domain: 'example.com', trackingId: 'ap_demo12345', pageviews: 8391 },
    { id: '2', name: 'Blog', domain: 'blog.example.com', trackingId: 'ap_demo67890', pageviews: 2104 },
  ];

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
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-sm text-muted hover:text-foreground">Dashboard</Link>
            <Link href="/settings" className="text-sm text-muted hover:text-foreground">Settings</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Your Sites</h1>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-accent hover:bg-accent-light text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            + Add Site
          </button>
        </div>

        {showAddForm && (
          <div className="glow-card p-6 mb-6">
            <h2 className="font-semibold mb-4">Add a New Site</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-muted mb-1">Site Name</label>
                <input type="text" value={newName} onChange={e => setNewName(e.target.value)} placeholder="My Website" className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:border-accent" />
              </div>
              <div>
                <label className="block text-sm text-muted mb-1">Domain</label>
                <input type="text" value={newDomain} onChange={e => setNewDomain(e.target.value)} placeholder="example.com" className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:border-accent" />
              </div>
              <div className="flex gap-3">
                <button className="bg-accent hover:bg-accent-light text-white px-4 py-2 rounded-lg text-sm font-medium">Add Site</button>
                <button onClick={() => setShowAddForm(false)} className="text-sm text-muted hover:text-foreground">Cancel</button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {sites.map(site => (
            <Link key={site.id} href={`/dashboard?site=${site.id}`} className="glow-card p-5 block hover:border-accent/30">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{site.name}</h3>
                  <p className="text-sm text-muted">{site.domain}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{site.pageviews.toLocaleString()}</p>
                  <p className="text-xs text-muted">pageviews this month</p>
                </div>
              </div>
              <div className="mt-3 bg-background rounded-lg p-3 font-mono text-xs text-muted">
                &lt;script src=&quot;.../ap.js&quot; data-site=&quot;{site.trackingId}&quot; defer&gt;&lt;/script&gt;
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
