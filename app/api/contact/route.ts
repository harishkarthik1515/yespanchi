import { NextResponse } from 'next/server';

/**
 * Contact endpoint.
 * Prototype: validates input and logs it. Hook up email (Resend/SES/SMTP)
 * or a CRM here before going live.
 */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const name = String(body.name ?? '').trim();
  const email = String(body.email ?? '').trim();
  const message = String(body.message ?? '').trim();
  if (name.length < 2 || !EMAIL.test(email) || message.length < 10 || body.consent !== true) {
    return NextResponse.json({ error: 'Please complete the required fields.' }, { status: 422 });
  }
  const reference = `YP-${Date.now().toString(36).toUpperCase()}`;
  console.log('[contact]', reference, {
    name, email,
    phone: String(body.phone ?? ''),
    company: String(body.company ?? ''),
    topic: String(body.topic ?? ''),
    item: String(body.item ?? ''),
    message
  });
  return NextResponse.json({ ok: true, reference });
}
