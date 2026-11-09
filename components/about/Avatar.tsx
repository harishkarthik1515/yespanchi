/** Initials avatar — no external images. */
export function Avatar({ initials, size = 'md' }: { initials: string; size?: 'sm' | 'md' | 'lg' }) {
  const dim = { sm: 'h-10 w-10 text-sm', md: 'h-14 w-14 text-lg', lg: 'h-20 w-20 text-2xl' }[size];
  return (
    <span aria-hidden="true" className={`flex flex-none items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent font-medium text-ink ${dim}`}>
      {initials}
    </span>
  );
}
