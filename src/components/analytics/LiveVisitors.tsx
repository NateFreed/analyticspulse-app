'use client';

import { useState, useEffect } from 'react';

export default function LiveVisitors() {
  const [count, setCount] = useState(7);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => Math.max(1, prev + Math.floor(Math.random() * 5) - 2));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glow-card p-6 flex flex-col">
      <h3 className="font-semibold mb-4">Live Visitors</h3>
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="relative mb-3">
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full animate-pulse" />
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center">
            <span className="text-3xl font-bold text-success">{count}</span>
          </div>
        </div>
        <p className="text-sm text-muted">people on your site right now</p>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted">/</span>
          <span className="font-medium">{Math.ceil(count * 0.4)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted">/pricing</span>
          <span className="font-medium">{Math.ceil(count * 0.3)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted">/blog</span>
          <span className="font-medium">{Math.ceil(count * 0.2)}</span>
        </div>
      </div>
    </div>
  );
}
