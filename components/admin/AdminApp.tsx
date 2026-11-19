'use client';

/* ------------------------------------------------------------------
 * Admin console: edit website content without touching code.
 * Sign-in: Firebase email/password, then the account must exist in the
 * Firestore "admins" collection (document id = the user's UID).
 * Writes are enforced server-side by firestore.rules / storage.rules.
 * ------------------------------------------------------------------ */
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  browserSessionPersistence, onAuthStateChanged, sendPasswordResetEmail, setPersistence, signInWithEmailAndPassword, signOut, type User
} from 'firebase/auth';
import {
  addDoc, collection, deleteDoc, doc, getDoc, getDocs, limit, orderBy, query, setDoc, where, writeBatch, type QueryConstraint
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { fb } from '@/lib/firebase/client';
import { firebaseConfigured } from '@/lib/firebase/config';
import { defaultSettings, sections, settingsFields, slugify, type Field, type Section } from '@/lib/cms-schema';
import { seed } from '@/lib/cms-seed';

type Row = Record<string, unknown> & { id: string };
type Notify = (msg: string, tone?: 'ok' | 'err') => void;

const btn = 'inline-flex min-h-[40px] items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition-colors disabled:opacity-50';
const primary = `${btn} bg-[#1F4E79] text-white hover:bg-[#163a5c]`;
const ghost = `${btn} border border-slate-300 text-slate-700 hover:border-slate-500 bg-white`;
const danger = `${btn} border border-red-200 text-red-700 hover:bg-red-50 bg-white`;
const input = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-[15px] text-slate-900 focus:border-[#1F4E79] focus:outline-none focus:ring-2 focus:ring-[#1F4E79]/20';

export function AdminApp() {
  return (
    <div className="fixed inset-0 z-[200] overflow-auto bg-slate-100 text-slate-900">
      {firebaseConfigured ? <Console /> : <SetupNotice />}
    </div>
  );
}

function SetupNotice() {
  return (
    <div className="mx-auto max-w-2xl p-10">
      <h1 className="text-2xl font-semibold">Console not connected yet</h1>
      <p className="mt-3 text-slate-600">Add the Firebase keys to <code>.env.local</code> (see <code>.env.example</code>) and restart the server. Until then the website serves its built-in content.</p>
    </div>
  );
}

/* ---------------- Auth ---------------- */
function Console() {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [error, setError] = useState('');

  useEffect(() => {
    const { auth, db } = fb();
    return onAuthStateChanged(auth, async (u) => {
      if (!u) return setUser(null);
      const ok = await getDoc(doc(db, 'admins', u.uid)).then((s) => s.exists()).catch(() => false);
      if (!ok) {
        await signOut(auth);
        setError('This account is not allowed to use the console.');
        return setUser(null);
      }
      setUser(u);
    });
  }, []);

  // Sign out after 30 minutes without activity.
  useEffect(() => {
    if (!user) return;
    let t: ReturnType<typeof setTimeout>;
    const reset = () => { clearTimeout(t); t = setTimeout(() => signOut(fb().auth), 30 * 60 * 1000); };
    const evs = ['mousemove', 'keydown', 'click', 'scroll'];
    evs.forEach((e) => window.addEventListener(e, reset, { passive: true }));
    reset();
    return () => { clearTimeout(t); evs.forEach((e) => window.removeEventListener(e, reset)); };
  }, [user]);

  if (user === undefined) return <p className="p-10 text-slate-500">Loading…</p>;
  if (!user) return <Login error={error} setError={setError} />;
  return <Dashboard user={user} />;
}

function Login({ error, setError }: { error: string; setError: (s: string) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [info, setInfo] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setError(''); setInfo('');
    try {
      const { auth } = fb();
      await setPersistence(auth, browserSessionPersistence); // session ends when the tab closes
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (err) {
      const code = (err as { code?: string }).code ?? '';
      setError(code.includes('too-many-requests') ? 'Too many attempts. Please wait a few minutes and try again.' : 'Email or password is incorrect.');
    } finally {
      setBusy(false);
    }
  }

  async function reset() {
    if (!email.trim()) return setError('Enter your email first, then choose "Forgot password".');
    await sendPasswordResetEmail(fb().auth, email.trim()).catch(() => undefined);
    setInfo('If this email has an account, a reset link is on its way.');
  }

  return (
    <div className="flex min-h-full items-center justify-center p-6">
      <form onSubmit={submit} className="flex w-full max-w-sm flex-col gap-4 rounded-2xl bg-white p-8 shadow-xl">
        <Image src="/logo.png" alt="YesPanchi" width={1107} height={345} className="h-10 w-auto self-start" />
        <h1 className="text-xl font-semibold">Website console</h1>
        <label className="flex flex-col gap-1.5 text-sm font-medium">Email
          <input type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} className={input} />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium">Password
          <input type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className={input} />
        </label>
        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
        {info && <p role="status" className="text-sm text-green-700">{info}</p>}
        <button type="submit" disabled={busy} className={primary}>{busy ? 'Signing in…' : 'Sign in'}</button>
        <button type="button" onClick={reset} className="self-start text-sm text-slate-600 underline-offset-4 hover:underline">Forgot password</button>
      </form>
    </div>
  );
}

/* ---------------- Shell ---------------- */
const EXTRA = [
  { key: 'settings', label: 'Announcement bar', group: 'Website' },
  { key: 'messages', label: 'Messages & applications', group: 'Inbox' },
  { key: 'subscribers', label: 'Newsletter subscribers', group: 'Inbox' }
];

function Dashboard({ user }: { user: User }) {
  const [active, setActive] = useState(sections[0].key);
  const [toast, setToast] = useState<{ msg: string; tone: 'ok' | 'err' } | null>(null);
  const notify: Notify = useCallback((msg, tone = 'ok') => {
    setToast({ msg, tone });
    setTimeout(() => setToast(null), 4000);
  }, []);
  const nav = [...sections.map((s) => ({ key: s.key, label: s.label, group: s.group })), ...EXTRA];
  const groups = Array.from(new Set(nav.map((n) => n.group)));
  const section = sections.find((s) => s.key === active);

  return (
    <div className="grid min-h-full md:grid-cols-[250px_1fr]">
      <aside className="flex flex-col gap-6 border-r border-slate-200 bg-white p-5">
        <Image src="/logo.png" alt="YesPanchi" width={1107} height={345} className="h-9 w-auto self-start" />
        <nav aria-label="Console" className="flex flex-col gap-5">
          {groups.map((g) => (
            <div key={g} className="flex flex-col gap-1">
              <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">{g}</p>
              {nav.filter((n) => n.group === g).map((n) => (
                <button key={n.key} type="button" onClick={() => setActive(n.key)} aria-current={active === n.key}
                  className={`rounded-lg px-3 py-2 text-left text-sm font-medium ${active === n.key ? 'bg-[#1F4E79] text-white' : 'text-slate-700 hover:bg-slate-100'}`}>
                  {n.label}
                </button>
              ))}
            </div>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-2 border-t border-slate-200 pt-4 text-sm">
          <span className="truncate text-slate-500">{user.email}</span>
          <a href="/" target="_blank" rel="noopener" className="text-[#1F4E79] hover:underline">View website ↗</a>
          <button type="button" onClick={() => signOut(fb().auth)} className={ghost}>Sign out</button>
        </div>
      </aside>
      <main className="min-w-0 p-6 md:p-10">
        {section && <SectionManager key={section.key} section={section} user={user} notify={notify} />}
        {active === 'settings' && <SettingsPanel user={user} notify={notify} />}
        {active === 'messages' && <MessagesPanel notify={notify} />}
        {active === 'subscribers' && <SubscribersPanel notify={notify} />}
      </main>
      {toast && (
        <p role="status" className={`fixed bottom-6 right-6 z-10 rounded-xl px-5 py-3 text-sm font-medium text-white shadow-xl ${toast.tone === 'ok' ? 'bg-green-700' : 'bg-red-700'}`}>{toast.msg}</p>
      )}
    </div>
  );
}

/** Ask the server to refresh the public pages now; without a service account they refresh within a minute anyway. */
async function publish(user: User) {
  const res = await fetch('/api/revalidate', { method: 'POST', headers: { Authorization: `Bearer ${await user.getIdToken()}` } }).catch(() => null);
  return res?.ok ? 'Saved. The website is updated.' : 'Saved. The website updates within a minute.';
}

/* ---------------- Collection manager ---------------- */
function SectionManager({ section, user, notify }: { section: Section; user: User; notify: Notify }) {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [editing, setEditing] = useState<Row | 'new' | null>(null);
  const [q, setQ] = useState('');
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const { db } = fb();
    const filters: QueryConstraint[] = Object.entries(section.fixed ?? {}).map(([k, v]) => where(k, '==', v));
    const snap = await getDocs(query(collection(db, section.collection), ...filters));
    const list = snap.docs.map((d) => ({ ...d.data(), id: d.id }) as Row);
    const { field, dir } = section.sort;
    list.sort((a, b) => {
      const x = a[field] ?? '', y = b[field] ?? '';
      const c = typeof x === 'number' && typeof y === 'number' ? x - y : String(x).localeCompare(String(y));
      return dir === 'asc' ? c : -c;
    });
    setRows(list);
  }, [section]);

  useEffect(() => { load().catch(() => notify('Could not load. Check your connection or permissions.', 'err')); }, [load, notify]);

  const seedRows = useMemo(() => {
    const all = seed[section.collection] as unknown as Record<string, unknown>[];
    return all.filter((r) => Object.entries(section.fixed ?? {}).every(([k, v]) => r[k] === v));
  }, [section]);

  async function importSeed() {
    if (!confirm(`Import ${seedRows.length} ${section.label.toLowerCase()} from the current website?`)) return;
    setBusy(true);
    try {
      const { db } = fb();
      const batch = writeBatch(db);
      seedRows.forEach((r) => {
        const ref = section.slugFrom ? doc(db, section.collection, String(r.slug)) : doc(collection(db, section.collection));
        batch.set(ref, { ...r, updatedAt: new Date().toISOString() });
      });
      await batch.commit();
      await load();
      notify(await publish(user));
    } catch {
      notify('Import failed. Check that your account is in the admins list.', 'err');
    } finally {
      setBusy(false);
    }
  }

  async function remove(r: Row) {
    if (!confirm(`Delete "${String(r[section.titleField] ?? 'this entry')}"? This cannot be undone.`)) return;
    try {
      await deleteDoc(doc(fb().db, section.collection, r.id));
      await load();
      notify(await publish(user));
    } catch {
      notify('Delete failed.', 'err');
    }
  }

  if (editing) {
    return (
      <Editor
        section={section}
        row={editing === 'new' ? null : editing}
        onClose={() => setEditing(null)}
        onSaved={async () => { setEditing(null); await load(); notify(await publish(user)); }}
        notify={notify}
      />
    );
  }

  const terms = q.toLowerCase().trim();
  const shown = (rows ?? []).filter((r) => !terms || JSON.stringify(r).toLowerCase().includes(terms));

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{section.group}</p>
          <h1 className="text-2xl font-semibold">{section.label}</h1>
        </div>
        <button type="button" onClick={() => setEditing('new')} className={primary}>+ Add new</button>
      </header>

      {rows && rows.length === 0 && (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-amber-300 bg-amber-50 p-5 text-sm text-amber-900">
          <p>Nothing here yet, so the website is still showing its built-in {section.label.toLowerCase()}{seedRows.length ? ` (${seedRows.length})` : ''}. {seedRows.length ? 'Import them to start editing.' : 'Add the first entry to show this section.'}</p>
          {seedRows.length > 0 && <button type="button" onClick={importSeed} disabled={busy} className={primary}>{busy ? 'Importing…' : 'Import current website content'}</button>}
        </div>
      )}

      {rows && rows.length > 0 && (
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" aria-label="Search entries" className={`${input} max-w-sm`} />
      )}

      {!rows ? <p className="text-slate-500">Loading…</p> : (
        <ul className="divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white">
          {shown.map((r) => {
            const img = (r.image ?? r.src ?? (Array.isArray(r.images) ? r.images[0] : '')) as string;
            return (
              <li key={r.id} className="flex items-center gap-4 p-3">
                <span className="relative h-14 w-20 flex-none overflow-hidden rounded-md bg-slate-100">
                  {img && <Image src={img} alt="" fill sizes="80px" className="object-cover" unoptimized />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium">{String(r[section.titleField] ?? '(untitled)')}</span>
                  {section.subtitle && <span className="block truncate text-sm text-slate-500">{section.subtitle(r)}</span>}
                </span>
                <button type="button" onClick={() => setEditing(r)} className={ghost}>Edit</button>
                <button type="button" onClick={() => remove(r)} className={danger}>Delete</button>
              </li>
            );
          })}
          {rows.length > 0 && shown.length === 0 && <li className="p-5 text-slate-500">No matches.</li>}
        </ul>
      )}
    </div>
  );
}

function emptyValue(f: Field): unknown {
  return f.type === 'bool' ? false : f.type === 'images' || f.type === 'list' ? [] : '';
}

function Editor({ section, row, onClose, onSaved, notify }: { section: Section; row: Row | null; onClose: () => void; onSaved: () => void; notify: Notify }) {
  const [data, setData] = useState<Record<string, unknown>>(() =>
    Object.fromEntries(section.fields.map((f) => [f.key, row?.[f.key] ?? emptyValue(f)])));
  const [saving, setSaving] = useState(false);
  const [missing, setMissing] = useState<string[]>([]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    const out: Record<string, unknown> = {};
    for (const f of section.fields) {
      const v = data[f.key];
      out[f.key] = f.type === 'number' ? (v === '' || v == null ? null : Number(v)) : typeof v === 'string' ? v.trim() : v;
    }
    if (section.slugFrom) out.slug = slugify(String(out.slug || out[section.slugFrom] || ''));
    const gaps = section.fields.filter((f) => f.required && (out[f.key] === '' || out[f.key] == null || (Array.isArray(out[f.key]) && !(out[f.key] as unknown[]).length)));
    setMissing(gaps.map((f) => f.key));
    if (gaps.length) return notify(`Please fill in: ${gaps.map((f) => f.label).join(', ')}`, 'err');

    setSaving(true);
    try {
      const { db } = fb();
      const payload = { ...out, ...section.fixed, updatedAt: new Date().toISOString() };
      if (row) {
        await setDoc(doc(db, section.collection, row.id), payload);
      } else if (section.slugFrom) {
        const id = String(out.slug);
        if ((await getDoc(doc(db, section.collection, id))).exists()) {
          setSaving(false);
          return notify('An entry with this URL slug already exists. Change the title or slug.', 'err');
        }
        await setDoc(doc(db, section.collection, id), payload);
      } else {
        await addDoc(collection(db, section.collection), payload);
      }
      onSaved();
    } catch {
      notify('Save failed. Check your connection or permissions.', 'err');
      setSaving(false);
    }
  }

  return (
    <form onSubmit={save} className="flex max-w-3xl flex-col gap-6" noValidate>
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{section.label}</p>
          <h1 className="text-2xl font-semibold">{row ? 'Edit entry' : 'New entry'}</h1>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={onClose} className={ghost}>Cancel</button>
          <button type="submit" disabled={saving} className={primary}>{saving ? 'Saving…' : 'Save and publish'}</button>
        </div>
      </header>
      <div className="flex flex-col gap-5 rounded-xl border border-slate-200 bg-white p-6">
        {section.fields.map((f) => (
          <FieldInput key={f.key} field={f} value={data[f.key]} invalid={missing.includes(f.key)} folder={section.collection}
            onChange={(v) => setData((d) => ({ ...d, [f.key]: v }))} notify={notify} />
        ))}
      </div>
    </form>
  );
}

/* ---------------- Fields ---------------- */
function FieldInput({ field: f, value, onChange, invalid, folder, notify }: {
  field: Field; value: unknown; onChange: (v: unknown) => void; invalid?: boolean; folder: string; notify: Notify;
}) {
  const id = `f-${f.key}`;
  const cls = `${input} ${invalid ? 'border-red-500' : ''}`;
  const label = <span className="text-sm font-medium">{f.label}{f.required && <span className="text-red-600"> *</span>}</span>;
  const help = f.help && <span className="text-xs text-slate-500">{f.help}</span>;

  if (f.type === 'bool') {
    return (
      <label htmlFor={id} className="flex items-center gap-3">
        <input id={id} type="checkbox" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} className="h-5 w-5 accent-[#1F4E79]" />
        {label}
      </label>
    );
  }

  let control: React.ReactNode;
  switch (f.type) {
    case 'textarea':
    case 'markdown':
      control = <textarea id={id} rows={f.type === 'markdown' ? 16 : 3} value={String(value ?? '')} onChange={(e) => onChange(e.target.value)} className={`${cls} ${f.type === 'markdown' ? 'font-mono text-sm' : ''}`} />;
      break;
    case 'list':
      control = <textarea id={id} rows={4} value={(value as string[] | undefined)?.join('\n') ?? ''} onChange={(e) => onChange(e.target.value.split('\n'))} onBlur={(e) => onChange(e.target.value.split('\n').map((s) => s.trim()).filter(Boolean))} className={cls} />;
      break;
    case 'select':
      control = (
        <select id={id} value={String(value ?? '')} onChange={(e) => onChange(e.target.value)} className={cls}>
          <option value="">Choose…</option>
          {f.options?.map((o) => <option key={o}>{o}</option>)}
        </select>
      );
      break;
    case 'image':
    case 'file':
      control = <UploadOne id={id} kind={f.type} value={String(value ?? '')} onChange={onChange} folder={folder} notify={notify} invalid={invalid} />;
      break;
    case 'images':
      control = <UploadMany id={id} value={(value as string[]) ?? []} onChange={onChange} folder={folder} notify={notify} />;
      break;
    default:
      control = <input id={id} type={f.type === 'url' ? 'url' : f.type} value={String(value ?? '')} onChange={(e) => onChange(e.target.value)} className={cls} />;
  }
  return <label htmlFor={id} className="flex flex-col gap-1.5">{label}{control}{help}</label>;
}

const MAX = { image: 10, file: 25 }; // MB

/** Uploads to Cloudinary when NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is set (server-signed), otherwise to Firebase Storage. */
async function upload(file: File, folder: string) {
  if (process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
    const user = fb().auth.currentUser;
    const sign = await fetch('/api/upload-sign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${await user?.getIdToken()}` },
      body: JSON.stringify({ folder })
    });
    if (!sign.ok) throw new Error('sign failed');
    const s = (await sign.json()) as { folder: string; timestamp: number; signature: string; apiKey: string; cloudName: string };
    const form = new FormData();
    form.append('file', file);
    form.append('api_key', s.apiKey);
    form.append('timestamp', String(s.timestamp));
    form.append('folder', s.folder);
    form.append('signature', s.signature);
    const res = await fetch(`https://api.cloudinary.com/v1_1/${s.cloudName}/auto/upload`, { method: 'POST', body: form });
    if (!res.ok) throw new Error('upload failed');
    return ((await res.json()) as { secure_url: string }).secure_url;
  }
  const name = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, '-');
  const r = ref(fb().storage, `uploads/${folder}/${Date.now()}-${name}`);
  await uploadBytes(r, file, { contentType: file.type });
  return getDownloadURL(r);
}

function check(file: File, kind: 'image' | 'file', notify: Notify) {
  const okType = kind === 'image' ? file.type.startsWith('image/') : file.type === 'application/pdf';
  if (!okType) { notify(kind === 'image' ? 'Please choose an image file.' : 'Please choose a PDF file.', 'err'); return false; }
  if (file.size > MAX[kind] * 1024 * 1024) { notify(`File is larger than ${MAX[kind]} MB.`, 'err'); return false; }
  return true;
}

function UploadOne({ id, kind, value, onChange, folder, notify, invalid }: {
  id: string; kind: 'image' | 'file'; value: string; onChange: (v: unknown) => void; folder: string; notify: Notify; invalid?: boolean;
}) {
  const [busy, setBusy] = useState(false);
  async function pick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file || !check(file, kind, notify)) return;
    setBusy(true);
    try { onChange(await upload(file, folder)); } catch { notify('Upload failed.', 'err'); } finally { setBusy(false); }
  }
  return (
    <span className={`flex flex-wrap items-center gap-4 rounded-lg border border-dashed p-3 ${invalid ? 'border-red-500' : 'border-slate-300'}`}>
      {kind === 'image' && value && <span className="relative h-20 w-32 overflow-hidden rounded-md bg-slate-100"><Image src={value} alt="" fill sizes="128px" className="object-cover" unoptimized /></span>}
      {kind === 'file' && value && <a href={value} target="_blank" rel="noopener" className="text-sm text-[#1F4E79] underline">Current PDF ↗</a>}
      <span className={ghost}>
        {busy ? 'Uploading…' : value ? 'Replace' : kind === 'image' ? 'Upload image' : 'Upload PDF'}
        <input id={id} type="file" accept={kind === 'image' ? 'image/*' : 'application/pdf'} onChange={pick} disabled={busy} className="sr-only" />
      </span>
      {value && <button type="button" onClick={() => onChange('')} className="text-sm text-red-700 hover:underline">Remove</button>}
    </span>
  );
}

function UploadMany({ id, value, onChange, folder, notify }: { id: string; value: string[]; onChange: (v: unknown) => void; folder: string; notify: Notify }) {
  const [busy, setBusy] = useState(false);
  async function pick(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []).filter((f) => check(f, 'image', notify));
    e.target.value = '';
    if (!files.length) return;
    setBusy(true);
    try { onChange([...value, ...(await Promise.all(files.map((f) => upload(f, folder))))]); } catch { notify('Upload failed.', 'err'); } finally { setBusy(false); }
  }
  const move = (i: number, d: number) => { const n = [...value]; [n[i], n[i + d]] = [n[i + d], n[i]]; onChange(n); };
  return (
    <span className="flex flex-col gap-3 rounded-lg border border-dashed border-slate-300 p-3">
      <span className="flex flex-wrap gap-3">
        {value.map((src, i) => (
          <span key={src + i} className="flex flex-col items-center gap-1">
            <span className="relative h-20 w-28 overflow-hidden rounded-md bg-slate-100"><Image src={src} alt="" fill sizes="112px" className="object-cover" unoptimized /></span>
            <span className="flex gap-2 text-xs">
              {i > 0 && <button type="button" onClick={() => move(i, -1)} aria-label="Move earlier">◀</button>}
              <button type="button" onClick={() => onChange(value.filter((_, j) => j !== i))} className="text-red-700">Remove</button>
              {i < value.length - 1 && <button type="button" onClick={() => move(i, 1)} aria-label="Move later">▶</button>}
            </span>
          </span>
        ))}
      </span>
      <span className={`${ghost} self-start`}>
        {busy ? 'Uploading…' : 'Add photos'}
        <input id={id} type="file" accept="image/*" multiple onChange={pick} disabled={busy} className="sr-only" />
      </span>
    </span>
  );
}

/* ---------------- Settings ---------------- */
function SettingsPanel({ user, notify }: { user: User; notify: Notify }) {
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  useEffect(() => {
    getDoc(doc(fb().db, 'settings', 'site')).then((s) => setData({ ...defaultSettings, ...s.data() })).catch(() => notify('Could not load settings.', 'err'));
  }, [notify]);
  if (!data) return <p className="text-slate-500">Loading…</p>;
  async function save(e: React.FormEvent) {
    e.preventDefault();
    try {
      await setDoc(doc(fb().db, 'settings', 'site'), data!, { merge: true });
      notify(await publish(user));
    } catch {
      notify('Save failed.', 'err');
    }
  }
  return (
    <form onSubmit={save} className="flex max-w-3xl flex-col gap-6">
      <header className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Announcement bar</h1>
        <button type="submit" className={primary}>Save and publish</button>
      </header>
      <div className="flex flex-col gap-5 rounded-xl border border-slate-200 bg-white p-6">
        {settingsFields.map((f) => <FieldInput key={f.key} field={f} value={data[f.key]} folder="settings" notify={notify} onChange={(v) => setData((d) => ({ ...d!, [f.key]: v }))} />)}
      </div>
    </form>
  );
}

/* ---------------- Inbox ---------------- */
type Msg = Row & { createdAt?: { toDate: () => Date } };
const when = (m: Msg) => m.createdAt?.toDate?.().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) ?? '';

function downloadCsv(name: string, cols: string[], rows: Msg[]) {
  const esc = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const csv = [cols.join(','), ...rows.map((r) => cols.map((c) => esc(c === 'createdAt' ? when(r) : r[c])).join(','))].join('\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
  a.download = `${name}-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(a.href);
}

function useInbox(name: 'messages' | 'subscribers', notify: Notify) {
  const [rows, setRows] = useState<Msg[] | null>(null);
  const load = useCallback(() => {
    getDocs(query(collection(fb().db, name), orderBy('createdAt', 'desc'), limit(500)))
      .then((s) => setRows(s.docs.map((d) => ({ ...d.data(), id: d.id }) as Msg)))
      .catch(() => notify('Could not load.', 'err'));
  }, [name, notify]);
  useEffect(load, [load]);
  const remove = async (id: string) => {
    if (!confirm('Delete this entry?')) return;
    await deleteDoc(doc(fb().db, name, id)).catch(() => notify('Delete failed.', 'err'));
    load();
  };
  return { rows, remove };
}

function MessagesPanel({ notify }: { notify: Notify }) {
  const { rows, remove } = useInbox('messages', notify);
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Messages &amp; applications</h1>
        {rows && rows.length > 0 && <button type="button" onClick={() => downloadCsv('messages', ['createdAt', 'reference', 'topic', 'item', 'name', 'email', 'phone', 'company', 'message'], rows)} className={ghost}>Download CSV</button>}
      </header>
      <p className="text-sm text-slate-500">Contact form, job applications and white-paper downloads, newest first.</p>
      {!rows ? <p className="text-slate-500">Loading…</p> : rows.length === 0 ? <p className="text-slate-500">No messages yet.</p> : (
        <ul className="divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white">
          {rows.map((m) => (
            <li key={m.id} className="flex flex-col gap-2 p-4">
              <button type="button" onClick={() => setOpen(open === m.id ? null : m.id)} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-left">
                <span className="font-medium">{String(m.name)}</span>
                <span className="text-sm text-slate-600">{String(m.email)}</span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700">{String(m.topic || 'general')}</span>
                <span className="ml-auto text-xs text-slate-500">{when(m)}</span>
              </button>
              {open === m.id && (
                <div className="flex flex-col gap-2 rounded-lg bg-slate-50 p-4 text-sm">
                  {['reference', 'item', 'phone', 'company'].map((k) => m[k] ? <p key={k}><span className="text-slate-500">{k}: </span>{String(m[k])}</p> : null)}
                  <p className="whitespace-pre-line">{String(m.message)}</p>
                  <div className="flex gap-2 pt-2">
                    <a href={`mailto:${String(m.email)}`} className={ghost}>Reply by email</a>
                    <button type="button" onClick={() => remove(m.id)} className={danger}>Delete</button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function SubscribersPanel({ notify }: { notify: Notify }) {
  const { rows, remove } = useInbox('subscribers', notify);
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Newsletter subscribers {rows && <span className="text-slate-500">({rows.length})</span>}</h1>
        {rows && rows.length > 0 && <button type="button" onClick={() => downloadCsv('subscribers', ['email', 'createdAt'], rows)} className={ghost}>Download CSV</button>}
      </header>
      <p className="text-sm text-slate-500">Export the list to send each issue from your email tool.</p>
      {!rows ? <p className="text-slate-500">Loading…</p> : rows.length === 0 ? <p className="text-slate-500">No subscribers yet.</p> : (
        <ul className="divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white">
          {rows.map((s) => (
            <li key={s.id} className="flex items-center gap-4 p-3 text-sm">
              <span className="flex-1">{String(s.email)}</span>
              <span className="text-slate-500">{when(s)}</span>
              <button type="button" onClick={() => remove(s.id)} className={danger}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
