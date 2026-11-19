import { NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { adminConfigured, adminDb } from '@/lib/firebase/admin';

/**
 * Contact, job-application and white-paper download form endpoint.
 * Saves each submission to Firestore "messages" (read in the admin console Inbox).
 * Without a Firebase service account it only logs the submission.
 */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clip = (v: unknown, n: number) => String(v ?? '').trim().slice(0, n);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const entry = {
    name: clip(body.name, 120),
    email: clip(body.email, 200),
    phone: clip(body.phone, 40),
    company: clip(body.company, 200),
    topic: clip(body.topic, 60),
    item: clip(body.item, 200),
    message: clip(body.message, 5000)
  };
  if (entry.name.length < 2 || !EMAIL.test(entry.email) || entry.message.length < 10 || body.consent !== true) {
    return NextResponse.json({ error: 'Please complete the required fields.' }, { status: 422 });
  }
  const reference = `YP-${Date.now().toString(36).toUpperCase()}`;
  if (!adminConfigured) {
    console.log('[contact] (Firebase not configured, not stored)', reference, entry);
    return NextResponse.json({ ok: true, reference });
  }
  try {
    await adminDb().collection('messages').add({ ...entry, reference, createdAt: FieldValue.serverTimestamp() });
    return NextResponse.json({ ok: true, reference });
  } catch (e) {
    console.error('[contact] save failed', e);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
