// AnalyticsPulse Tracking Script — <1KB, no cookies, privacy-first
(function() {
  'use strict';
  var d = document, w = window, n = navigator;
  var el = d.currentScript;
  if (!el) return;
  var siteId = el.getAttribute('data-site');
  var apiUrl = el.getAttribute('data-api') || 'https://zthayenxqbkiwwqkfemh.supabase.co/functions/v1/track-pageview';
  if (!siteId) return;

  // Generate anonymous session ID (no cookies, resets each visit)
  var sid = Math.random().toString(36).slice(2) + Date.now().toString(36);

  // Detect device type from screen width
  var sw = w.screen ? w.screen.width : 0;
  var device = sw < 768 ? 'mobile' : sw < 1024 ? 'tablet' : 'desktop';

  // Simple browser detection
  var ua = n.userAgent || '';
  var browser = /Edg/.test(ua) ? 'Edge' : /Chrome/.test(ua) ? 'Chrome' : /Safari/.test(ua) ? 'Safari' : /Firefox/.test(ua) ? 'Firefox' : 'Other';

  // Simple OS detection
  var os = /Windows/.test(ua) ? 'Windows' : /Mac/.test(ua) ? 'macOS' : /Linux/.test(ua) ? 'Linux' : /Android/.test(ua) ? 'Android' : /iPhone|iPad/.test(ua) ? 'iOS' : 'Other';

  function track(path) {
    var ref = d.referrer || '';
    var refDomain = '';
    try { if (ref) refDomain = new URL(ref).hostname; } catch(e) {}
    // Don't count self-referrals
    if (refDomain === w.location.hostname) refDomain = '';

    var payload = {
      site_id: siteId,
      path: path || w.location.pathname,
      referrer: ref || null,
      referrer_domain: refDomain || null,
      device: device,
      browser: browser,
      os: os,
      screen_width: sw,
      session_id: sid
    };

    if (n.sendBeacon) {
      n.sendBeacon(apiUrl, JSON.stringify(payload));
    } else {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', apiUrl, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify(payload));
    }
  }

  // Track initial pageview
  track();

  // Track SPA navigation via History API
  var pushState = history.pushState;
  history.pushState = function() {
    pushState.apply(history, arguments);
    setTimeout(function() { track(); }, 10);
  };
  w.addEventListener('popstate', function() { track(); });
})();
