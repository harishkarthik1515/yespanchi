'use client';

import { useEffect, useState } from 'react';

/* Live "open now" badge based on IST office hours (Mon–Fri 9:30–18:30). */
export function OpenNow() {
  const [open, setOpen] = useState<boolean | null>(null);
  useEffect(() => {
    const check = () => {
      const ist = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
      const mins = ist.getHours() * 60 + ist.getMinutes();
      const day = ist.getDay();
      setOpen(day >= 1 && day <= 5 && mins >= 570 && mins < 1110);
    };
    check();
    const id = setInterval(check, 60_000);
    return () => clearInterval(id);
  }, []);
  if (open === null) return null;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${open ? 'bg-emerald-500/15 text-emerald-600' : 'bg-raised text-dim'}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${open ? 'animate-pulse bg-emerald-500' : 'bg-dim'}`} />
      {open ? 'Open now' : 'Closed · replies next business day'}
    </span>
  );
}
