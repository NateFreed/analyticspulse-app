-- AnalyticsPulse Schema (ap_ prefix)
-- Run against shared Supabase instance: zthayenxqbkiwwqkfemh

CREATE TABLE IF NOT EXISTS ap_sites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  domain TEXT NOT NULL,
  name TEXT NOT NULL,
  tracking_id TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ap_pageviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  site_id UUID REFERENCES ap_sites(id) ON DELETE CASCADE,
  path TEXT NOT NULL,
  referrer TEXT,
  referrer_domain TEXT,
  country TEXT,
  device TEXT DEFAULT 'desktop',
  browser TEXT,
  os TEXT,
  screen_width INT,
  session_id TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for fast dashboard queries
CREATE INDEX IF NOT EXISTS idx_ap_pageviews_site_time ON ap_pageviews(site_id, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_ap_pageviews_session ON ap_pageviews(site_id, session_id);
CREATE INDEX IF NOT EXISTS idx_ap_sites_user ON ap_sites(user_id);
CREATE INDEX IF NOT EXISTS idx_ap_sites_tracking ON ap_sites(tracking_id);

-- RLS policies
ALTER TABLE ap_sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE ap_pageviews ENABLE ROW LEVEL SECURITY;

-- Users can only see their own sites
CREATE POLICY "Users can view own sites" ON ap_sites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sites" ON ap_sites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own sites" ON ap_sites
  FOR DELETE USING (auth.uid() = user_id);

-- Users can view pageviews for their own sites
CREATE POLICY "Users can view own pageviews" ON ap_pageviews
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM ap_sites WHERE ap_sites.id = ap_pageviews.site_id AND ap_sites.user_id = auth.uid())
  );

-- Service role can insert pageviews (from Edge Function)
CREATE POLICY "Service can insert pageviews" ON ap_pageviews
  FOR INSERT WITH CHECK (true);
