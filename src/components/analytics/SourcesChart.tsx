'use client';

import type { TrafficSource } from '../../lib/types';

const SOURCE_COLORS: Record<string, string> = {
  'google.com': '#4285f4',
  'twitter.com': '#1da1f2',
  'x.com': '#1da1f2',
  'facebook.com': '#1877f2',
  'linkedin.com': '#0a66c2',
  'reddit.com': '#ff4500',
  'github.com': '#8b5cf6',
  'Direct / None': '#6b7a99',
};

export default function SourcesChart({ data }: { data: TrafficSource[] }) {
  return (
    <div className="glow-card p-6">
      <h3 className="font-semibold mb-4">Traffic Sources</h3>
      <div className="space-y-3">
        {data.length === 0 && <p className="text-muted text-sm">No data yet.</p>}
        {data.map(source => (
          <div key={source.source} className="flex items-center gap-3">
            <div
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ background: SOURCE_COLORS[source.source] || '#3b82f6' }}
            />
            <span className="text-sm flex-1 truncate">{source.source}</span>
            <span className="text-sm font-medium">{source.visitors}</span>
            <span className="text-xs text-muted w-10 text-right">{source.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
