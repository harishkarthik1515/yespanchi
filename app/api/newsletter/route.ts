import { NextResponse } from 'next/server';

/** Newsletter endpoint — prototype logs the email. Connect Mailchimp/Brevo/etc. here. */
export async function POST(req: Request) {
  const { email } = (await req.json().catch(() => ({}))) as { email?: string };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email.' }, { status: 422 });
  }
  console.log('[newsletter] subscribe', email);
  return NextResponse.json({ ok: true });
}
