'use client';

import { useState } from 'react';
import { Icon } from '@/components/Icon';

/** White-paper download behind a short form; the request lands in the console Inbox as topic "download". */
export function DownloadGate({ title, file }: { title: string; file: string }) {
  const [f, setF] = useState({ name: '', email: '', company: '', consent: false });
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [err, setErr] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (f.name.trim().length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email) || !f.company.trim() || !f.consent) {
      setErr('Please check the highlighted fields and try again.');
      return;
    }
    setState('sending'); setErr('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...f, topic: 'download', item: title, message: `White paper download: ${title}` })
      });
      if (!res.ok) throw new Error();
      setState('done');
    } catch {
      setState('error');
      setErr('Something went wrong. Please check the highlighted fields and try again.');
    }
  }

  if (state === 'done') {
    return (
      <div className="flex flex-col gap-4 rounded-2xl border border-accent bg-surface p-7">
        <p className="text-lg font-medium">Thank you. Your download is ready.</p>
        <a href={file} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[48px] items-center gap-2 self-start rounded-full bg-accent px-6 font-semibold text-accent-contrast hover:text-accent-contrast">
          <Icon name="doc" size={18} /> Download the white paper
        </a>
      </div>
    );
  }

  const field = 'w-full rounded-xl border border-line2 bg-ink px-4 py-3 text-cream placeholder:text-dim focus:border-accent focus:outline-none';
  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-7">
      <p className="text-lg font-medium">Enter your work email to download this white paper.</p>
      <div className="grid gap-3 sm:grid-cols-3">
        <input aria-label="Name" placeholder="Name" autoComplete="name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} className={field} />
        <input aria-label="Work email" type="email" placeholder="Work email" autoComplete="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} className={field} />
        <input aria-label="Organisation" placeholder="Organisation" autoComplete="organization" value={f.company} onChange={(e) => setF({ ...f, company: e.target.value })} className={field} />
      </div>
      <label className="flex items-start gap-3 text-sm text-muted">
        <input type="checkbox" checked={f.consent} onChange={(e) => setF({ ...f, consent: e.target.checked })} className="mt-1 h-4 w-4 accent-[rgb(var(--c-accent))]" />
        I agree to YesPanchi contacting me about this white paper, as described in the <a href="/privacy" className="text-accent underline">privacy policy</a>.
      </label>
      {err && <p role="alert" className="text-sm text-red-500">{err}</p>}
      <button type="submit" disabled={state === 'sending'} className="inline-flex min-h-[48px] items-center justify-center self-start rounded-full bg-accent px-6 font-semibold text-accent-contrast disabled:opacity-60">
        {state === 'sending' ? 'Sending…' : 'Get the white paper'}
      </button>
    </form>
  );
}
