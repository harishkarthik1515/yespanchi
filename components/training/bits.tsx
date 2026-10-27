import type { Instructor } from '@/lib/mock/training';

export const initials = (n: string) => n.replace(/^(Dr\.|Inspector)\s+/, '').split(/\s+/).map((s) => s[0]).slice(0, 2).join('');

export function SeatsBadge({ left }: { left: number }) {
  const tone = left <= 5 ? 'bg-rose-500/15 text-rose-400 ring-rose-400/30' : left <= 12 ? 'bg-amber-500/15 text-amber-500 ring-amber-500/30' : 'bg-emerald-500/15 text-emerald-500 ring-emerald-500/30';
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${tone}`}>
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
      {left <= 5 ? `Only ${left} seats left` : `${left} seats left`}
    </span>
  );
}

export function Avatar({ name, size = 'md' }: { name: string; size?: 'md' | 'lg' }) {
  return (
    <span aria-hidden="true" className={`flex flex-none items-center justify-center rounded-full bg-gradient-to-br from-bronze-light to-bronze-dark font-bold text-ink ${size === 'lg' ? 'h-16 w-16 text-xl' : 'h-11 w-11 text-sm'}`}>
      {initials(name)}
    </span>
  );
}

export function InstructorCard({ i }: { i: Instructor }) {
  return (
    <article className="flex h-full flex-col gap-4 rounded-3xl border border-line bg-surface p-7">
      <div className="flex items-center gap-4">
        <Avatar name={i.name} size="lg" />
        <div className="min-w-0">
          <h3 className="text-lg font-bold">{i.name}</h3>
          <p className="text-sm text-bronze">{i.role}</p>
        </div>
      </div>
      <p className="text-sm text-muted">{i.bio}</p>
      <ul className="mt-auto flex flex-wrap gap-2 text-xs" aria-label="Expertise">
        <li className="rounded-full bg-raised px-2.5 py-1 font-semibold">{i.years} yrs experience</li>
        {i.focus.map((f) => <li key={f} className="rounded-full border border-line2 px-2.5 py-1 text-muted">{f}</li>)}
      </ul>
    </article>
  );
}

export function CertificatePreview({ title, course }: { title: string; course: string }) {
  return (
    <figure className="relative mx-auto w-full max-w-xl overflow-hidden rounded-2xl border-[6px] border-double border-bronze/60 bg-[#FBF7F0] p-6 text-[#1C1712] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] sm:p-10">
      <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#C9A577]/20" />
      <p className="text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8F6D47]">YesPanchi Academy · IIT Madras Research Park</p>
      <p className="mt-5 text-center font-serif text-2xl sm:text-3xl">Certificate of Achievement</p>
      <p className="mt-4 text-center text-sm text-[#5C5247]">This certifies that</p>
      <p className="mt-1 text-center font-serif text-xl italic sm:text-2xl">Your Name Here</p>
      <p className="mt-3 text-center text-sm text-[#5C5247]">has successfully completed <span className="font-semibold text-[#1C1712]">{course}</span> and is awarded the credential</p>
      <p className="mt-2 text-center font-semibold text-[#8F6D47]">{title}</p>
      <div className="mt-8 flex items-end justify-between gap-4 text-[11px] text-[#5C5247]">
        <div><div className="mb-1 h-px w-24 bg-[#1C1712]/40" />Programme Director</div>
        <span aria-hidden="true" className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#8F6D47] text-[10px] font-bold text-[#8F6D47]">SEAL</span>
        <div className="text-right"><div className="mb-1 ml-auto h-px w-24 bg-[#1C1712]/40" />ID: YPA-2027-XXXX</div>
      </div>
      <figcaption className="sr-only">Sample certificate preview for {course}</figcaption>
    </figure>
  );
}
