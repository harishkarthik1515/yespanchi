import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { adminConfigured, isAdminToken } from '@/lib/firebase/admin';

/** Called by the admin console after a save so changes go live immediately (otherwise pages refresh within a minute). */
export async function POST(req: Request) {
  if (!adminConfigured) return NextResponse.json({ ok: false, reason: 'not-configured' }, { status: 501 });
  const token = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '') ?? '';
  if (!token || !(await isAdminToken(token))) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  revalidatePath('/', 'layout');
  return NextResponse.json({ ok: true });
}
