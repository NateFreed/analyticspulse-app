'use client';

import Tutorial, { TutorialStep } from './Tutorial';

const steps: TutorialStep[] = [
  {
    title: 'Privacy-First Analytics',
    description: 'AnalyticsPulse tracks your website traffic without cookies, fingerprinting, or personal data. No consent banners needed — GDPR-compliant by default.',
  },
  {
    title: 'One-Line Setup',
    description: 'Add our tiny tracking script (under 1KB) to your site and start seeing real-time visitor data instantly. Works with any website or framework.',
  },
  {
    title: 'AI-Powered Insights',
    description: 'Upgrade to Pro for automatic alerts when traffic drops or spikes, AI-powered analysis explaining why, and custom event tracking.',
  },
];

export default function AppTutorial() {
  return <Tutorial appName="AnalyticsPulse" steps={steps} accentColor="bg-accent" />;
}
