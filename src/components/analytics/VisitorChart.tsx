'use client';

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { TimeseriesPoint } from '../../lib/types';

export default function VisitorChart({ data }: { data: TimeseriesPoint[] }) {
  return (
    <div className="glow-card p-6">
      <h3 className="font-semibold mb-4">Visitors & Pageviews</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="visitorsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="pageviewsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#34d399" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" tick={{ fill: '#6b7a99', fontSize: 12 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fill: '#6b7a99', fontSize: 12 }} tickLine={false} axisLine={false} width={40} />
            <Tooltip
              contentStyle={{ background: '#111827', border: '1px solid #1e2840', borderRadius: '8px', color: '#e8eaf0' }}
              labelStyle={{ color: '#6b7a99' }}
            />
            <Area type="monotone" dataKey="visitors" stroke="#3b82f6" fill="url(#visitorsGrad)" strokeWidth={2} />
            <Area type="monotone" dataKey="pageviews" stroke="#34d399" fill="url(#pageviewsGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex gap-6 mt-3 text-sm text-muted">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-accent rounded-full" />Visitors</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-success rounded-full" />Pageviews</span>
      </div>
    </div>
  );
}
