import { createHash } from 'node:crypto';
import { NextResponse } from 'next/server';
import { isAdminToken } from '@/lib/firebase/admin';

/**
 * Signs a Cloudinary upload for a signed-in console admin. The API secret never leaves the server,
 * so nobody else can upload to the account.
 */
const FOLDERS = ['insights', 'talks', 'events', 'roles', 'gallery', 'collaborations', 'clients', 'settings'];

export async function POST(req: Request) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? '';
  const apiKey = process.env.CLOUDINARY_API_KEY ?? '';
  const apiSecret = process.env.CLOUDINARY_API_SECRET ?? '';
  if (!cloudName || !apiKey || !apiSecret || apiSecret.startsWith('YOUR_')) {
    return NextResponse.json({ error: 'Cloudinary is not configured.' }, { status: 501 });
  }
  const token = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '') ?? '';
  if (!token || !(await isAdminToken(token))) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { folder } = (await req.json().catch(() => ({}))) as { folder?: string };
  if (!folder || !FOLDERS.includes(folder)) return NextResponse.json({ error: 'Bad folder' }, { status: 400 });

  const params = { folder: `yespanchi/${folder}`, timestamp: Math.floor(Date.now() / 1000) };
  // Cloudinary signature: sorted "key=value" pairs joined with "&", then the API secret, SHA-1.
  const toSign = Object.entries(params).sort(([a], [b]) => a.localeCompare(b)).map(([k, v]) => `${k}=${v}`).join('&');
  const signature = createHash('sha1').update(toSign + apiSecret).digest('hex');
  return NextResponse.json({ ...params, signature, apiKey, cloudName });
}
