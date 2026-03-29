'use client';

import type { TopPage } from '../../lib/types';

export default function TopPages({ data }: { data: TopPage[] }) {
  const maxViews = data.length > 0 ? data[0].pageviews : 1;

  return (
    <div className="glow-card p-6">
      <h3 className="font-semibold mb-4">Top Pages</h3>
      <div className="space-y-3">
        {data.length === 0 && <p className="text-muted text-sm">No data yet.</p>}
        {data.map((page, i) => (
          <div key={page.path} className="flex items-center gap-3">
            <span className="text-xs text-muted w-5 text-right">{i + 1}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium truncate">{page.path}</span>
                <span className="text-xs text-muted ml-2 flex-shrink-0">{page.pageviews} views</span>
              </div>
              <div className="h-1.5 bg-background rounded-full overflow-hidden">
                <div className="h-full bg-accent rounded-full" style={{ width: `${(page.pageviews / maxViews) * 100}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
