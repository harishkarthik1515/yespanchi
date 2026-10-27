import type { MetadataRoute } from 'next';
import { events, products, programs, services } from '@/lib/data';
import { SITE } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const u = (path: string, priority = 0.7, changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] = 'monthly') => ({
    url: `${SITE.url}${path}`, lastModified: now, changeFrequency, priority
  });
  return [
    u('/', 1, 'weekly'),
    u('/about', 0.8), u('/products', 0.9), u('/services', 0.9), u('/training', 0.8),
    u('/events', 0.7, 'weekly'), u('/events/mous', 0.5), u('/events/gallery', 0.5), u('/contact', 0.8),
    u('/privacy', 0.2, 'yearly'), u('/terms', 0.2, 'yearly'),
    ...products.map((p) => u(`/products/${p.slug}`, 0.8)),
    ...services.map((s) => u(`/services/${s.slug}`, 0.8)),
    ...programs.map((p) => u(`/training/${p.slug}`, 0.6)),
    ...events.map((e) => u(`/events/${e.slug}`, 0.5))
  ];
}
