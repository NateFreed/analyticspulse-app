import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.100.1';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'content-type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
    });
  }

  // Also accept beacon (no Content-Type header)
  try {
    const body = await req.text();
    const { site_id, path, referrer, referrer_domain, device, browser, os, screen_width, session_id } = JSON.parse(body);

    if (!site_id || !path) {
      return new Response(JSON.stringify({ error: 'Missing site_id or path' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    // Verify site exists
    const { data: site } = await supabase
      .from('ap_sites')
      .select('id')
      .eq('tracking_id', site_id)
      .single();

    if (!site) {
      return new Response(JSON.stringify({ error: 'Invalid site_id' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    // Get country from CF headers (Cloudflare provides this)
    const country = req.headers.get('cf-ipcountry') || req.headers.get('x-country') || null;

    await supabase.from('ap_pageviews').insert({
      site_id: site.id,
      path: path.slice(0, 500),
      referrer: referrer?.slice(0, 1000) || null,
      referrer_domain: referrer_domain?.slice(0, 200) || null,
      country,
      device: device || 'desktop',
      browser: browser?.slice(0, 50) || null,
      os: os?.slice(0, 50) || null,
      screen_width: screen_width || null,
      session_id: session_id?.slice(0, 50) || null,
      timestamp: new Date().toISOString(),
    });

    // Return 1x1 transparent pixel as fallback (for img tag tracking)
    return new Response('{"ok":true}', {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
});
