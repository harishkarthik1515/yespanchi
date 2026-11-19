import type { MetadataRoute } from 'next';
import { products } from '@/lib/data';
import { insightTypes } from '@/lib/mock/insights';
import { getInsights, getRoles } from '@/lib/cms';
import { SITE } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const u = (path: string, priority = 0.7, changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] = 'monthly') => ({
    url: `${SITE.url}${path}`, lastModified: now, changeFrequency, priority
  });
  const [roles, insights] = await Promise.all([getRoles(), getInsights()]);
  return [
    u('/', 1, 'weekly'),
    u('/about', 0.8), u('/products', 0.9),
    u('/events', 0.7, 'weekly'), u('/events/mous', 0.5), u('/events/gallery', 0.5), u('/contact', 0.8),
    u('/careers', 0.6, 'weekly'), u('/insights', 0.7, 'weekly'),
    ...roles.map((r) => u(`/careers/${r.slug}`, 0.5)),
    ...insightTypes.map((t) => u(`/insights/${t.slug}`, 0.5)),
    ...insights.map((i) => u(`/insights/${i.type}/${i.slug}`, 0.5)),
    u('/privacy', 0.2, 'yearly'), u('/terms', 0.2, 'yearly'),
    ...products.filter((p) => !p.externalUrl).map((p) => u(`/products/${p.slug}`, 0.8))
  ];
}
