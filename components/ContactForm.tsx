'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { products, services, programs } from '@/lib/data';

const TOPICS = [
  { value: 'assessment', label: 'Free security assessment' },
  { value: 'product', label: 'Product demo' },
  { value: 'service', label: 'Service enquiry' },
  { value: 'training', label: 'Training programme' },
  { value: 'event', label: 'Event registration' },
  { value: 'other', label: 'Something else' }
];

type Errors = Partial<Record<'name' | 'email' | 'message' | 'consent', string>>;

export default function ContactForm() {
  const params = useSearchParams();
  const initialTopic = params.get('topic') ?? 'assessment';
  const initialItem = params.get('item') ?? '';
  const score = params.get('score');

  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '',
    topic: TOPICS.some((t) => t.value === initialTopic) ? initialTopic : 'other',
    item: initialItem,
    message: score ? `Our self-check readiness score is ${score}%. We'd like a full assessment.` : '',
    consent: false
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [ref, setRef] = useState('');

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value }));

  const itemOptions =
    form.topic === 'product' ? products.map((p) => p.name)
    : form.topic === 'service' ? services.map((s) => s.name)
    : form.topic === 'training' ? programs.map((p) => p.title)
    : [];

  function validate(): Errors {
    const e: Errors = {};
    if (form.name.trim().length < 2) e.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email.';
    if (form.message.trim().length < 10) e.message = 'Tell us a little more (10+ characters).';
    if (!form.consent) e.consent = 'Please accept the privacy policy.';
    return e;
  }

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setRef(data.reference);
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" className="flex flex-col gap-4 rounded-3xl border border-accent bg-surface p-8 md:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Message received</p>
        <h2 className="text-3xl font-semibold">Thank you, {form.name.split(' ')[0]}.</h2>
        <p className="text-muted">Our team will get back to you within one business day. Your reference is <strong className="text-cream">{ref}</strong>.</p>
        <button onClick={() => { setStatus('idle'); setForm((f) => ({ ...f, message: '' })); }} className="mt-2 min-h-[44px] self-start rounded-full border border-line3 px-6 font-semibold">Send another message</button>
      </div>
    );
  }

  const field = 'w-full rounded-2xl border border-line2 bg-ink px-4 py-3.5 text-cream placeholder:text-dim transition-colors focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/15';
  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-6 rounded-3xl border border-line bg-surface p-6 md:p-10">
      <div>
        <h2 className="text-2xl font-semibold">Send us a message</h2>
        <p className="mt-1 text-sm text-muted">Takes about a minute. Fields marked * are required.</p>
      </div>
      <fieldset>
        <legend className="mb-3 text-sm font-semibold">What can we help with?</legend>
        <div className="flex flex-wrap gap-2">
          {TOPICS.map((t) => (
            <label key={t.value} className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent ${form.topic === t.value ? 'border-accent bg-accent text-ink' : 'border-line2 text-muted hover:border-accent hover:text-cream'}`}>
              <input type="radio" name="topic" value={t.value} checked={form.topic === t.value} onChange={() => setForm((f) => ({ ...f, topic: t.value, item: '' }))} className="sr-only" />
              {t.label}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Full name *" error={errors.name}>
          <input id="name" autoComplete="name" value={form.name} onChange={set('name')} className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-err' : undefined} />
        </Field>
        <Field id="email" label="Company Email *" error={errors.email}>
          <input id="email" type="email" autoComplete="email" value={form.email} onChange={set('email')} className={field} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-err' : undefined} />
        </Field>
        <Field id="phone" label="Phone">
          <input id="phone" type="tel" autoComplete="tel" value={form.phone} onChange={set('phone')} className={field} />
        </Field>
        <Field id="company" label="Company">
          <input id="company" autoComplete="organization" value={form.company} onChange={set('company')} className={field} />
        </Field>
        {itemOptions.length > 0 ? (
          <Field id="item" label="Solution">
            <select id="item" value={form.item} onChange={set('item')} className={field}>
              <option value="">Select…</option>
              {itemOptions.map((o) => <option key={o}>{o}</option>)}
            </select>
          </Field>
        ) : form.item ? (
          <Field id="item" label="Regarding">
            <input id="item" value={form.item} onChange={set('item')} className={field} />
          </Field>
        ) : null}
      </div>
      <Field id="message" label="Message *" error={errors.message}>
        <textarea id="message" rows={5} value={form.message} onChange={set('message')} className={field} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-err' : undefined} />
      </Field>
      <div>
        <label className="flex items-start gap-3 text-sm text-muted">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={set('consent')}
            aria-invalid={!!errors.consent}
            className="mt-0.5 h-5 w-5 flex-none appearance-none rounded-[6px] border-2 border-line3 bg-transparent transition-colors checked:border-accent checked:bg-accent checked:bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22><path d=%22M5 12.5 L10 17.5 L19 7%22 stroke=%22%23141415%22 stroke-width=%223%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22/></svg>')] checked:bg-center checked:bg-no-repeat hover:border-accent"
          />
          <span>I agree to YesPanchi processing my details to respond to this enquiry, as described in the <a href="/privacy" className="text-accent underline">privacy policy</a>.</span>
        </label>
        {errors.consent && <p id="consent-err" className="mt-1 text-sm text-red-500">{errors.consent}</p>}
      </div>
      {status === 'error' && <p role="alert" className="text-red-500">Couldn’t send your message. Please try again or email us directly.</p>}
      <button type="submit" disabled={status === 'sending'} className="min-h-[52px] self-start rounded-full bg-accent px-8 font-semibold text-ink hover:bg-accent disabled:opacity-60">
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold">{label}</label>
      {children}
      {error && <p id={`${id}-err`} className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
