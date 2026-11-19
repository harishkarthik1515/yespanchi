import { NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { adminConfigured, adminDb } from '@/lib/firebase/admin';

/** Newsletter sign-up: stored in Firestore "subscribers" (one document per email, so repeats do not duplicate). */
export async function POST(req: Request) {
  const { email } = (await req.json().catch(() => ({}))) as { email?: string };
  const clean = String(email ?? '').trim().toLowerCase().slice(0, 200);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) {
    return NextResponse.json({ error: 'Please enter a valid email.' }, { status: 422 });
  }
  if (!adminConfigured) {
    console.log('[newsletter] (Firebase not configured, not stored)', clean);
    return NextResponse.json({ ok: true });
  }
  try {
    // Firestore ids cannot contain "/", which valid emails never do after the check above.
    await adminDb().doc(`subscribers/${clean}`).set({ email: clean, createdAt: FieldValue.serverTimestamp() }, { merge: true });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[newsletter] save failed', e);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
