'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { fetchDashboardData } from '../../lib/analytics';
import type { DashboardData, TimeRange } from '../../lib/types';
import VisitorChart from '../../components/analytics/VisitorChart';
import TopPages from '../../components/analytics/TopPages';
import SourcesChart from '../../components/analytics/SourcesChart';
import { DevicesPanel, BrowsersPanel, CountriesPanel } from '../../components/analytics/DeviceChart';

// Demo data for when no site is connected
function getDemoData(): DashboardData {
  const days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    return d.toISOString().slice(0, 10);
  });

  return {
    stats: { visitors: 2847, pageviews: 8391, bounceRate: 42, avgDuration: 154, visitorsChange: 12, pageviewsChange: 8 },
    timeseries: days.map(date => ({
      date,
      visitors: Math.floor(60 + Math.random() * 80),
      pageviews: Math.floor(180 + Math.random() * 200),
    })),
    topPages: [
      { path: '/', visitors: 1203, pageviews: 2105, bounceRate: 38 },
      { path: '/pricing', visitors: 856, pageviews: 1342, bounceRate: 45 },
      { path: '/features', visitors: 621, pageviews: 987, bounceRate: 41 },
      { path: '/blog/getting-started', visitors: 445, pageviews: 712, bounceRate: 52 },
      { path: '/docs', visitors: 389, pageviews: 834, bounceRate: 29 },
      { path: '/blog/privacy-analytics', visitors: 312, pageviews: 498, bounceRate: 48 },
      { path: '/contact', visitors: 201, pageviews: 289, bounceRate: 67 },
    ],
    sources: [
      { source: 'google.com', visitors: 1124, percentage: 39 },
      { source: 'Direct / None', visitors: 683, percentage: 24 },
      { source: 'twitter.com', visitors: 421, percentage: 15 },
      { source: 'github.com', visitors: 298, percentage: 10 },
      { source: 'reddit.com', visitors: 187, percentage: 7 },
      { source: 'linkedin.com', visitors: 134, percentage: 5 },
    ],
    devices: [
      { device: 'Desktop', count: 1853, percentage: 65 },
      { device: 'Mobile', count: 854, percentage: 30 },
      { device: 'Tablet', count: 140, percentage: 5 },
    ],
    browsers: [
      { browser: 'Chrome', count: 1538, percentage: 54 },
      { browser: 'Safari', count: 598, percentage: 21 },
      { browser: 'Firefox', count: 370, percentage: 13 },
      { browser: 'Edge', count: 228, percentage: 8 },
      { browser: 'Other', count: 113, percentage: 4 },
    ],
    countries: [
      { country: 'United States', visitors: 1282, percentage: 45 },
      { country: 'United Kingdom', visitors: 398, percentage: 14 },
      { country: 'Germany', visitors: 256, percentage: 9 },
      { country: 'Canada', visitors: 213, percentage: 7 },
      { country: 'France', visitors: 171, percentage: 6 },
      { country: 'Australia', visitors: 142, percentage: 5 },
      { country: 'Netherlands', visitors: 114, percentage: 4 },
    ],
  };
}

function DashboardContent() {
  const searchParams = useSearchParams();
  const siteId = searchParams.get('site');
  const [range, setRange] = useState<TimeRange>('30d');
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      if (siteId) {
        const result = await fetchDashboardData(siteId, range);
        setData(result);
      } else {
        setData(getDemoData());
      }
      setLoading(false);
    }
    load();
  }, [siteId, range]);

  const ranges: { key: TimeRange; label: string }[] = [
    { key: '24h', label: '24h' },
    { key: '7d', label: '7 days' },
    { key: '30d', label: '30 days' },
    { key: '90d', label: '90 days' },
  ];

  function formatDuration(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
  }

  if (loading || !data) {
    return <div className="flex items-center justify-center min-h-screen text-muted">Loading analytics...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <nav className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 bg-accent rounded-lg flex items-center justify-center">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span className="font-bold">AnalyticsPulse</span>
            </Link>
            {!siteId && (
              <span className="text-xs bg-accent-glow text-accent px-2 py-0.5 rounded-full">Demo Mode</span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Link href="/settings" className="text-sm text-muted hover:text-foreground">Settings</Link>
            <Link href="/upgrade" className="text-sm bg-accent hover:bg-accent-light text-white px-3 py-1.5 rounded-lg">Upgrade</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Header + time range selector */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">{siteId ? 'Dashboard' : 'Demo Dashboard'}</h1>
            <p className="text-sm text-muted mt-1">{siteId || 'example.com'}</p>
          </div>
          <div className="flex bg-surface rounded-lg p-0.5 border border-border">
            {ranges.map(r => (
              <button
                key={r.key}
                onClick={() => setRange(r.key)}
                className={`px-3 py-1.5 text-sm rounded-md ${range === r.key ? 'bg-accent text-white' : 'text-muted hover:text-foreground'}`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Visitors', value: data.stats.visitors.toLocaleString(), change: data.stats.visitorsChange },
            { label: 'Pageviews', value: data.stats.pageviews.toLocaleString(), change: data.stats.pageviewsChange },
            { label: 'Bounce Rate', value: `${data.stats.bounceRate}%`, change: null },
            { label: 'Avg. Duration', value: formatDuration(data.stats.avgDuration), change: null },
          ].map(stat => (
            <div key={stat.label} className="stat-card p-4">
              <p className="text-sm text-muted">{stat.label}</p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
              {stat.change !== null && (
                <p className={`text-sm mt-1 ${stat.change >= 0 ? 'text-success' : 'text-danger'}`}>
                  {stat.change >= 0 ? '+' : ''}{stat.change}% vs prev
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Visitor chart */}
        <div className="mb-6">
          <VisitorChart data={data.timeseries} />
        </div>

        {/* Two columns: Pages + Sources */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <TopPages data={data.topPages} />
          <SourcesChart data={data.sources} />
        </div>

        {/* Three columns: Devices, Browsers, Countries */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <DevicesPanel data={data.devices} />
          <BrowsersPanel data={data.browsers} />
          <CountriesPanel data={data.countries} />
        </div>

        {/* Tracking code CTA */}
        {!siteId && (
          <div className="glow-card p-6 text-center">
            <h3 className="font-semibold mb-2">This is demo data</h3>
            <p className="text-sm text-muted mb-4">Add the tracking script to your website to see real analytics.</p>
            <Link href="/auth" className="bg-accent hover:bg-accent-light text-white px-6 py-2 rounded-lg text-sm font-medium inline-block">
              Get Your Tracking Code
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-muted">Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
