// Server-side content reads. Uses Firestore Lite with the public web config (public read rules), so content
// works as soon as the web keys are set. Falls back to the built-in content when Firebase is not configured,
// a read fails, or a collection is still empty.
import { cache } from 'react';
import { getApps, initializeApp } from 'firebase/app';
import { collection, doc, getDoc, getDocs, getFirestore } from 'firebase/firestore/lite';
import { firebaseConfig, firebaseConfigured } from '@/lib/firebase/config';
import { seed } from '@/lib/cms-seed';
import {
  defaultSettings,
  type CmsRole, type CmsTalk, type Collaboration, type CollectionId, type GalleryItem, type Insight, type SiteSettings, type UpcomingEvent
} from '@/lib/cms-schema';

const db = () => getFirestore(getApps()[0] ?? initializeApp(firebaseConfig));

const read = cache(async (name: CollectionId): Promise<Record<string, unknown>[] | null> => {
  if (!firebaseConfigured) return null;
  try {
    const snap = await getDocs(collection(db(), name));
    return snap.empty ? null : snap.docs.map((d) => ({ ...d.data(), id: d.id }));
  } catch (e) {
    console.error(`[cms] reading "${name}" failed, serving built-in content`, e);
    return null;
  }
});

const byOrder = <T extends { order?: number }>(a: T, b: T) => (a.order ?? 999) - (b.order ?? 999);

export const getInsights = cache(async (): Promise<Insight[]> => {
  const rows = ((await read('insights')) as Insight[] | null) ?? seed.insights;
  return rows
    .map((i) => ({ ...i, slug: i.slug || i.id || '', image: i.image || '/media/insights.jpg', read: Number(i.read) || 5, author: i.author || 'YesPanchi team' }))
    .sort((a, b) => b.date.localeCompare(a.date));
});

export const getTalks = cache(async (): Promise<CmsTalk[]> =>
  (((await read('talks')) as CmsTalk[] | null) ?? seed.talks).filter((t) => t.images?.length).sort(byOrder));

/** Upcoming only (today or later), soonest first. */
export const getEvents = cache(async (): Promise<UpcomingEvent[]> => {
  const today = new Date().toISOString().slice(0, 10);
  return (((await read('events')) as UpcomingEvent[] | null) ?? seed.events).filter((e) => e.date >= today).sort((a, b) => a.date.localeCompare(b.date));
});

export const getRoles = cache(async (): Promise<CmsRole[]> =>
  (((await read('roles')) as CmsRole[] | null) ?? seed.roles)
    .map((r) => ({ ...r, slug: r.slug || r.id || '', doing: r.doing ?? [], lookingFor: r.lookingFor ?? [], niceToHave: r.niceToHave ?? [] }))
    .sort(byOrder));

export const getGallery = cache(async (): Promise<GalleryItem[]> => (((await read('gallery')) as GalleryItem[] | null) ?? seed.gallery).sort(byOrder));

export const getCollaborations = cache(async (): Promise<Collaboration[]> =>
  (((await read('collaborations')) as Collaboration[] | null) ?? seed.collaborations).sort(byOrder));

export const getSettings = cache(async (): Promise<SiteSettings> => {
  if (!firebaseConfigured) return defaultSettings;
  try {
    const snap = await getDoc(doc(db(), 'settings', 'site'));
    return { ...defaultSettings, ...(snap.data() as Partial<SiteSettings> | undefined) };
  } catch {
    return defaultSettings;
  }
});
