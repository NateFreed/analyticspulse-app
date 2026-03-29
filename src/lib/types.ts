export interface Site {
  id: string;
  user_id: string;
  domain: string;
  name: string;
  tracking_id: string;
  created_at: string;
}

export interface Pageview {
  id: string;
  site_id: string;
  path: string;
  referrer: string | null;
  referrer_domain: string | null;
  country: string | null;
  device: 'desktop' | 'mobile' | 'tablet';
  browser: string | null;
  os: string | null;
  screen_width: number | null;
  session_id: string;
  timestamp: string;
}

export interface DashboardStats {
  visitors: number;
  pageviews: number;
  bounceRate: number;
  avgDuration: number;
  visitorsChange: number;
  pageviewsChange: number;
}

export interface TopPage {
  path: string;
  visitors: number;
  pageviews: number;
  bounceRate: number;
}

export interface TrafficSource {
  source: string;
  visitors: number;
  percentage: number;
}

export interface DeviceBreakdown {
  device: string;
  count: number;
  percentage: number;
}

export interface BrowserBreakdown {
  browser: string;
  count: number;
  percentage: number;
}

export interface CountryBreakdown {
  country: string;
  visitors: number;
  percentage: number;
}

export interface TimeseriesPoint {
  date: string;
  visitors: number;
  pageviews: number;
}

export interface DashboardData {
  stats: DashboardStats;
  timeseries: TimeseriesPoint[];
  topPages: TopPage[];
  sources: TrafficSource[];
  devices: DeviceBreakdown[];
  browsers: BrowserBreakdown[];
  countries: CountryBreakdown[];
}

export type TimeRange = '24h' | '7d' | '30d' | '90d';
