import { supabase } from './supabase';
import type { DashboardData, DashboardStats, TopPage, TrafficSource, DeviceBreakdown, BrowserBreakdown, CountryBreakdown, TimeseriesPoint, TimeRange, Pageview } from './types';

function getDateRange(range: TimeRange): { start: string; end: string } {
  const end = new Date();
  const start = new Date();
  switch (range) {
    case '24h': start.setHours(start.getHours() - 24); break;
    case '7d': start.setDate(start.getDate() - 7); break;
    case '30d': start.setDate(start.getDate() - 30); break;
    case '90d': start.setDate(start.getDate() - 90); break;
  }
  return { start: start.toISOString(), end: end.toISOString() };
}

function getPreviousRange(range: TimeRange): { start: string; end: string } {
  const currentEnd = new Date();
  const currentStart = new Date();
  switch (range) {
    case '24h': currentStart.setHours(currentStart.getHours() - 24); break;
    case '7d': currentStart.setDate(currentStart.getDate() - 7); break;
    case '30d': currentStart.setDate(currentStart.getDate() - 30); break;
    case '90d': currentStart.setDate(currentStart.getDate() - 90); break;
  }
  const diff = currentEnd.getTime() - currentStart.getTime();
  const prevEnd = new Date(currentStart);
  const prevStart = new Date(currentStart.getTime() - diff);
  return { start: prevStart.toISOString(), end: prevEnd.toISOString() };
}

export async function fetchDashboardData(siteId: string, range: TimeRange): Promise<DashboardData> {
  const { start, end } = getDateRange(range);
  const prev = getPreviousRange(range);

  const { data: currentViews } = await supabase
    .from('ap_pageviews')
    .select('*')
    .eq('site_id', siteId)
    .gte('timestamp', start)
    .lte('timestamp', end)
    .order('timestamp', { ascending: true });

  const { data: prevViews } = await supabase
    .from('ap_pageviews')
    .select('session_id')
    .eq('site_id', siteId)
    .gte('timestamp', prev.start)
    .lte('timestamp', prev.end);

  const views: Pageview[] = currentViews || [];
  const previousSessions = new Set((prevViews || []).map(v => v.session_id));

  const stats = computeStats(views, previousSessions.size);
  const timeseries = computeTimeseries(views, range);
  const topPages = computeTopPages(views);
  const sources = computeSources(views);
  const devices = computeDevices(views);
  const browsers = computeBrowsers(views);
  const countries = computeCountries(views);

  return { stats, timeseries, topPages, sources, devices, browsers, countries };
}

function computeStats(views: Pageview[], prevVisitorCount: number): DashboardStats {
  const sessions = new Set(views.map(v => v.session_id));
  const visitors = sessions.size;
  const pageviews = views.length;

  // Bounce rate: sessions with only 1 pageview
  const sessionPageCounts = new Map<string, number>();
  views.forEach(v => sessionPageCounts.set(v.session_id, (sessionPageCounts.get(v.session_id) || 0) + 1));
  const bounces = Array.from(sessionPageCounts.values()).filter(c => c === 1).length;
  const bounceRate = sessions.size > 0 ? Math.round((bounces / sessions.size) * 100) : 0;

  // Avg session duration (simplified: time between first and last pageview in session)
  const sessionTimes = new Map<string, { min: number; max: number }>();
  views.forEach(v => {
    const t = new Date(v.timestamp).getTime();
    const existing = sessionTimes.get(v.session_id);
    if (!existing) sessionTimes.set(v.session_id, { min: t, max: t });
    else {
      if (t < existing.min) existing.min = t;
      if (t > existing.max) existing.max = t;
    }
  });
  const durations = Array.from(sessionTimes.values()).map(s => (s.max - s.min) / 1000).filter(d => d > 0);
  const avgDuration = durations.length > 0 ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length) : 0;

  const visitorsChange = prevVisitorCount > 0 ? Math.round(((visitors - prevVisitorCount) / prevVisitorCount) * 100) : 0;
  const pageviewsChange = 0; // Simplified — would need prev pageview count

  return { visitors, pageviews, bounceRate, avgDuration, visitorsChange, pageviewsChange };
}

function computeTimeseries(views: Pageview[], range: TimeRange): TimeseriesPoint[] {
  const buckets = new Map<string, { visitors: Set<string>; pageviews: number }>();

  views.forEach(v => {
    const date = range === '24h'
      ? v.timestamp.slice(0, 13) + ':00' // hourly
      : v.timestamp.slice(0, 10); // daily
    const bucket = buckets.get(date) || { visitors: new Set(), pageviews: 0 };
    bucket.visitors.add(v.session_id);
    bucket.pageviews++;
    buckets.set(date, bucket);
  });

  return Array.from(buckets.entries())
    .map(([date, data]) => ({ date, visitors: data.visitors.size, pageviews: data.pageviews }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

function computeTopPages(views: Pageview[]): TopPage[] {
  const pages = new Map<string, { visitors: Set<string>; pageviews: number; sessions: Map<string, number> }>();

  views.forEach(v => {
    const page = pages.get(v.path) || { visitors: new Set(), pageviews: 0, sessions: new Map() };
    page.visitors.add(v.session_id);
    page.pageviews++;
    page.sessions.set(v.session_id, (page.sessions.get(v.session_id) || 0) + 1);
    pages.set(v.path, page);
  });

  return Array.from(pages.entries())
    .map(([path, data]) => {
      const singlePageSessions = Array.from(data.sessions.values()).filter(c => c === 1).length;
      return {
        path,
        visitors: data.visitors.size,
        pageviews: data.pageviews,
        bounceRate: data.sessions.size > 0 ? Math.round((singlePageSessions / data.sessions.size) * 100) : 0,
      };
    })
    .sort((a, b) => b.pageviews - a.pageviews)
    .slice(0, 10);
}

function computeSources(views: Pageview[]): TrafficSource[] {
  const sources = new Map<string, Set<string>>();
  views.forEach(v => {
    const source = v.referrer_domain || 'Direct / None';
    const set = sources.get(source) || new Set();
    set.add(v.session_id);
    sources.set(source, set);
  });

  const total = new Set(views.map(v => v.session_id)).size;
  return Array.from(sources.entries())
    .map(([source, sessions]) => ({
      source,
      visitors: sessions.size,
      percentage: total > 0 ? Math.round((sessions.size / total) * 100) : 0,
    }))
    .sort((a, b) => b.visitors - a.visitors)
    .slice(0, 10);
}

function computeDevices(views: Pageview[]): DeviceBreakdown[] {
  const devices = new Map<string, Set<string>>();
  views.forEach(v => {
    const d = v.device || 'Unknown';
    const set = devices.get(d) || new Set();
    set.add(v.session_id);
    devices.set(d, set);
  });

  const total = new Set(views.map(v => v.session_id)).size;
  return Array.from(devices.entries())
    .map(([device, sessions]) => ({
      device: device.charAt(0).toUpperCase() + device.slice(1),
      count: sessions.size,
      percentage: total > 0 ? Math.round((sessions.size / total) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count);
}

function computeBrowsers(views: Pageview[]): BrowserBreakdown[] {
  const browsers = new Map<string, Set<string>>();
  views.forEach(v => {
    const b = v.browser || 'Unknown';
    const set = browsers.get(b) || new Set();
    set.add(v.session_id);
    browsers.set(b, set);
  });

  const total = new Set(views.map(v => v.session_id)).size;
  return Array.from(browsers.entries())
    .map(([browser, sessions]) => ({
      browser,
      count: sessions.size,
      percentage: total > 0 ? Math.round((sessions.size / total) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
}

function computeCountries(views: Pageview[]): CountryBreakdown[] {
  const countries = new Map<string, Set<string>>();
  views.forEach(v => {
    const c = v.country || 'Unknown';
    const set = countries.get(c) || new Set();
    set.add(v.session_id);
    countries.set(c, set);
  });

  const total = new Set(views.map(v => v.session_id)).size;
  return Array.from(countries.entries())
    .map(([country, sessions]) => ({
      country,
      visitors: sessions.size,
      percentage: total > 0 ? Math.round((sessions.size / total) * 100) : 0,
    }))
    .sort((a, b) => b.visitors - a.visitors)
    .slice(0, 10);
}
