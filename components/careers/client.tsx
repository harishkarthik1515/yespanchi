'use client';

import Link from 'next/link';
import { useRef, useState, type ReactNode } from 'react';
import type { Role } from '@/lib/mock/careers';
import { btnClass } from '@/components/ui';
import { Icon } from '@/components/Icon';

const field = 'w-full rounded-2xl border border-line2 bg-ink px-4 py-3.5 text-cream placeholder:text-dim transition-colors focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/15';
const uniq = (xs: string[]) => Array.from(new Set(xs));

/* ---------- Open roles, filterable by team, location and experience ---------- */
export function RoleList({ roles }: { roles: Role[] }) {
  const [team, setTeam] = useState('');
  const [location, setLocation] = useState('');
  const [level, setLevel] = useState('');
  const list = roles.filter((r) => (!team || r.team === team) && (!location || r.location === location) && (!level || r.level === level));

  const select = (label: string, value: string, set: (v: string) => void, options: string[]) => (
    <label className="flex min-w-[180px] flex-1 flex-col gap-2 text-sm font-semibold">
      {label}
      <select value={value} onChange={(e) => set(e.target.value)} className={field}>
        <option value="">All</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </label>
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-4">
        {select('Team', team, setTeam, uniq(roles.map((r) => r.team)))}
        {select('Location', location, setLocation, uniq(roles.map((r) => r.location)))}
        {select('Experience', level, setLevel, uniq(roles.map((r) => r.level)))}
      </div>
      <p className="text-sm text-dim" aria-live="polite">{list.length} of {roles.length} roles shown</p>
      <ul className="flex flex-col gap-3">
        {list.map((r) => (
          <li key={r.slug} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-accent">
            <span className="flex min-w-0 flex-col gap-2">
              <Link href={`/careers/${r.slug}`} className="text-xl font-semibold text-heading hover:text-accent">{r.title}</Link>
              <span className="flex flex-wrap gap-2 text-sm text-muted">
                {[r.team, r.location, r.type, r.experience].map((t) => <span key={t} className="rounded-full border border-line2 px-3 py-1">{t}</span>)}
              </span>
            </span>
            <span className="flex flex-wrap items-center gap-5">
              <Link href={`/careers/${r.slug}`} className="font-semibold text-muted hover:text-cream">View role</Link>
              <ApplyButton roles={roles} role={r.slug} className="min-h-[44px] px-6 py-2.5">Apply now</ApplyButton>
            </span>
          </li>
        ))}
        {list.length === 0 && <li className="rounded-2xl border border-line p-6 text-muted">No roles match these filters. Join the talent pool, we read every application.</li>}
      </ul>
    </div>
  );
}

/* ---------- "Apply" button: opens the application form in a native <dialog> ---------- */
export function ApplyButton({ roles, role = '', variant = 'primary', className = '', children }: {
  roles: Role[]; role?: string; variant?: 'primary' | 'outline'; className?: string; children: ReactNode;
}) {
  const dlg = useRef<HTMLDialogElement>(null);
  const [opened, setOpened] = useState(0); // bumped on each open so the form starts fresh
  const title = roles.find((r) => r.slug === role)?.title;
  const open = () => { setOpened((n) => n + 1); dlg.current?.showModal(); };

  return (
    <>
      <button type="button" onClick={open} className={btnClass(variant, className)}>
        {children}
        <Icon name="arrow" size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
      </button>
      <dialog
        ref={dlg}
        aria-label={title ? `Apply for ${title}` : 'Join the talent pool'}
        onClick={(e) => e.target === dlg.current && dlg.current?.close()}
        className="w-[min(760px,calc(100vw-32px))] max-h-[calc(100dvh-48px)] overflow-hidden rounded-2xl border border-line bg-surface p-0 text-cream shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm"
      >
        <div className="max-h-[calc(100dvh-48px)] overflow-y-auto p-6 md:p-10">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{title ? 'Apply for this role' : 'Talent pool'}</p>
              <h2 className="text-3xl font-medium">{title ?? 'Send us your profile'}</h2>
              <p className="text-sm text-muted">We only use your details to assess your application.</p>
            </div>
            <button type="button" onClick={() => dlg.current?.close()} aria-label="Close application form" className="flex h-10 w-10 flex-none items-center justify-center rounded-full hover:bg-raised">
              <Icon name="close" size={20} />
            </button>
          </div>
          {opened > 0 && <ApplyForm key={opened} roles={roles} role={role} />}
        </div>
      </dialog>
    </>
  );
}

/* ---------- Application form (posts to the existing /api/contact endpoint) ---------- */
type Errors = Partial<Record<'name' | 'email' | 'resume' | 'consent', string>>;

function ApplyForm({ roles, role }: { roles: Role[]; role: string }) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    role: roles.find((r) => r.slug === role)?.title ?? '',
    location: '', experience: '', profile: '', resume: '', note: '', consent: false
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [ref, setRef] = useState('');

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value }));

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    const e: Errors = {};
    if (form.name.trim().length < 2) e.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email.';
    if (!/^https?:\/\/\S+\.\S+/.test(form.resume)) e.resume = 'Please paste a link to your resume (starting with https://).';
    if (!form.consent) e.consent = 'Please accept the privacy policy.';
    setErrors(e);
    if (Object.keys(e).length) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name, email: form.email, phone: form.phone, consent: true,
          topic: 'careers', item: form.role || 'Talent pool',
          message: `Location: ${form.location}\nExperience: ${form.experience}\nLinkedIn/GitHub: ${form.profile}\nResume: ${form.resume}\n\n${form.note}`
        })
      });
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
      <div role="status" className="flex flex-col gap-4 rounded-2xl border border-accent p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Application received</p>
        <h3 className="text-3xl">Thank you, {form.name.split(' ')[0]}.</h3>
        <p className="text-muted">We aim to reply within 7 working days. Your reference is <strong className="text-cream">{ref}</strong>.</p>
      </div>
    );
  }

  const input = (id: keyof Errors | 'phone' | 'location' | 'experience' | 'profile', label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => {
    const err = errors[id as keyof Errors];
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={`ap-${id}`} className="text-sm font-semibold">{label}</label>
        <input id={`ap-${id}`} value={form[id] as string} onChange={set(id)} className={field} aria-invalid={!!err} aria-describedby={err ? `ap-${id}-err` : undefined} {...props} />
        {err && <p id={`ap-${id}-err`} className="text-sm text-red-500">{err}</p>}
      </div>
    );
  };

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-6">
      <div className="grid gap-5 sm:grid-cols-2">
        {input('name', 'Full name *', { autoComplete: 'name' })}
        {input('email', 'Email *', { type: 'email', autoComplete: 'email' })}
        {input('phone', 'Phone', { type: 'tel', autoComplete: 'tel' })}
        <div className="flex flex-col gap-2">
          <label htmlFor="ap-role" className="text-sm font-semibold">Role</label>
          <select id="ap-role" value={form.role} onChange={set('role')} className={field}>
            <option value="">Talent pool, no specific role</option>
            {roles.map((r) => <option key={r.slug}>{r.title}</option>)}
          </select>
        </div>
        {input('location', 'Preferred location', { placeholder: 'Chennai, Bengaluru, hybrid…' })}
        {input('experience', 'Experience', { placeholder: 'e.g. 3 years, or final-year student' })}
        {input('profile', 'LinkedIn or GitHub', { type: 'url', placeholder: 'https://' })}
        {/* shortcut: resume is a link, not a file upload: the endpoint only accepts JSON and nowhere to store files has been chosen. Switch to a PDF upload once storage is decided. */}
        {input('resume', 'Resume link (PDF) *', { type: 'url', placeholder: 'https://drive.google.com/…' })}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="ap-note" className="text-sm font-semibold">Cover note</label>
        <textarea id="ap-note" rows={4} value={form.note} onChange={set('note')} className={field} />
      </div>
      <div>
        <label className="flex items-start gap-3 text-sm text-muted">
          <input type="checkbox" checked={form.consent} onChange={set('consent')} aria-invalid={!!errors.consent} className="mt-0.5 h-5 w-5 flex-none accent-[rgb(var(--c-accent-bg))]" />
          <span>I agree to YesPanchi using these details only to assess my application, as described in the <a href="/privacy" className="text-accent underline">privacy policy</a>.</span>
        </label>
        {errors.consent && <p className="mt-1 text-sm text-red-500">{errors.consent}</p>}
      </div>
      {status === 'error' && <p role="alert" className="text-red-500">Couldn’t send your application. Please try again or email us directly.</p>}
      <button type="submit" disabled={status === 'sending'} className="min-h-[52px] self-start rounded-full bg-accent px-8 font-semibold text-accent-contrast disabled:opacity-60">
        {status === 'sending' ? 'Sending…' : 'Submit application'}
      </button>
    </form>
  );
}
