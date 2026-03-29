'use client';

import type { DeviceBreakdown, BrowserBreakdown, CountryBreakdown } from '../../lib/types';

function BreakdownList({ items }: { items: { label: string; count: number; percentage: number }[] }) {
  return (
    <div className="space-y-2">
      {items.length === 0 && <p className="text-muted text-sm">No data yet.</p>}
      {items.map(item => (
        <div key={item.label}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm">{item.label}</span>
            <span className="text-xs text-muted">{item.percentage}%</span>
          </div>
          <div className="h-1.5 bg-background rounded-full overflow-hidden">
            <div className="h-full bg-accent rounded-full" style={{ width: `${item.percentage}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function DevicesPanel({ data }: { data: DeviceBreakdown[] }) {
  return (
    <div className="glow-card p-6">
      <h3 className="font-semibold mb-4">Devices</h3>
      <BreakdownList items={data.map(d => ({ label: d.device, count: d.count, percentage: d.percentage }))} />
    </div>
  );
}

export function BrowsersPanel({ data }: { data: BrowserBreakdown[] }) {
  return (
    <div className="glow-card p-6">
      <h3 className="font-semibold mb-4">Browsers</h3>
      <BreakdownList items={data.map(b => ({ label: b.browser, count: b.count, percentage: b.percentage }))} />
    </div>
  );
}

export function CountriesPanel({ data }: { data: CountryBreakdown[] }) {
  return (
    <div className="glow-card p-6">
      <h3 className="font-semibold mb-4">Countries</h3>
      <BreakdownList items={data.map(c => ({ label: c.country, count: c.visitors, percentage: c.percentage }))} />
    </div>
  );
}
