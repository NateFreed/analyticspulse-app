export const dynamic = 'force-static';
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://analyticspulse.pages.dev/', lastModified: new Date('2026-03-29'), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://analyticspulse.pages.dev/dashboard', lastModified: new Date('2026-03-29'), changeFrequency: 'weekly', priority: 0.8 },
  ]
}
