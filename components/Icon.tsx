const PATHS = {
  shield: 'M12 3 L19 6 V11.5 C19 16 16 19.5 12 21 C8 19.5 5 16 5 11.5 V6 Z M9 12 L11 14 L15 10',
  key: 'M8 10 A4 4 0 1 1 8 18 A4 4 0 1 1 8 10 Z M11.5 12 H21 M18 12 V15 M21 12 V15',
  board: 'M4 5 H20 V15 H4 Z M8 19 H16 M12 15 V19',
  mic: 'M12 3 A3 3 0 0 1 15 6 V11 A3 3 0 0 1 9 11 V6 A3 3 0 0 1 12 3 Z M6 11 A6 6 0 0 0 18 11 M12 17 V21',
  rail: 'M4 7 H20 M4 17 H20 M7 4 V20 M17 4 V20',
  ai: 'M8 8 H16 V16 H8 Z M10 4 V8 M14 4 V8 M10 16 V20 M14 16 V20 M4 10 H8 M4 14 H8 M16 10 H20 M16 14 H20',
  film: 'M4 6 H20 V18 H4 Z M8 6 V18 M16 6 V18 M4 10 H8 M4 14 H8 M16 10 H20 M16 14 H20',
  chart: 'M4 20 V10 M10 20 V4 M16 20 V13 M3 20 H21',
  search: 'M10.5 4 A6.5 6.5 0 1 1 10.5 17 A6.5 6.5 0 1 1 10.5 4 Z M15.5 15.5 L20 20',
  umbrella: 'M3 12 A9 9 0 0 1 21 12 Z M12 12 V18 A2 2 0 0 1 8 18',
  list: 'M9 6 H20 M9 12 H20 M9 18 H20 M4 6 H5 M4 12 H5 M4 18 H5',
  target: 'M12 3 A9 9 0 1 1 12 21 A9 9 0 1 1 12 3 Z M12 8 A4 4 0 1 1 12 16 A4 4 0 1 1 12 8 Z',
  doc: 'M6 3 H14 L18 7 V21 H6 Z M14 3 V7 H18 M9 12 H15 M9 16 H15',
  lock: 'M6 11 H18 V20 H6 Z M8.5 11 V8 A3.5 3.5 0 0 1 15.5 8 V11',
  card: 'M3 6 H21 V18 H3 Z M3 10 H21 M7 15 H10',
  cal: 'M4 6 H20 V20 H4 Z M4 10 H20 M8 3 V7 M16 3 V7',
  hands: 'M4 12 L9 7 L13 11 M20 12 L15 7 L11 11 M7 14 L11 18 L17 12',
  photo: 'M4 5 H20 V19 H4 Z M4 16 L9 11 L13 15 L16 12 L20 16 M15 8.5 A1 1 0 1 1 15 8.6',
  check: 'M5 12.5 L10 17.5 L19 7',
  chevron: 'M6 9 L12 15 L18 9',
  arrow: 'M5 12 H19 M13 6 L19 12 L13 18',
  pin: 'M12 21 C12 21 5 14.5 5 9.5 A7 7 0 0 1 19 9.5 C19 14.5 12 21 12 21 Z M12 7 A2.5 2.5 0 1 1 12 12 A2.5 2.5 0 1 1 12 7 Z',
  mail: 'M3 6 H21 V18 H3 Z M3 6 L12 13 L21 6',
  phone: 'M5 4 H9 L11 9 L8.5 10.5 A11 11 0 0 0 13.5 15.5 L15 13 L20 15 V19 A2 2 0 0 1 18 21 A16 16 0 0 1 3 6 A2 2 0 0 1 5 4 Z',
  clock: 'M12 3 A9 9 0 1 1 12 21 A9 9 0 1 1 12 3 Z M12 7 V12 L15 14',
  menu: 'M4 7 H20 M4 12 H20 M4 17 H20',
  close: 'M6 6 L18 18 M18 6 L6 18',
  eye: 'M2 12 C5 6 19 6 22 12 C19 18 5 18 2 12 Z M12 9 A3 3 0 1 1 12 15 A3 3 0 1 1 12 9 Z',
  x: 'M4 4 L20 20 M20 4 L4 20',
  graduation: 'M3 10 L12 5 L21 10 L12 15 Z M7 12.5 V17 C7 18.5 9.5 20 12 20 C14.5 20 17 18.5 17 17 V12.5'
} as const;

export type IconName = keyof typeof PATHS;

export function Icon({ name, size = 20, className = '', strokeWidth = 1.7 }: { name: IconName; size?: number; className?: string; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d={PATHS[name]} stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconTile({ name, size = 'md' }: { name: IconName; size?: 'sm' | 'md' | 'lg' }) {
  const box = size === 'lg' ? 'h-14 w-14 rounded-2xl' : size === 'sm' ? 'h-10 w-10 rounded-[10px]' : 'h-11 w-11 rounded-xl';
  return (
    <span aria-hidden="true" className={`flex flex-none items-center justify-center border border-line2 bg-raised text-bronze ${box}`}>
      <Icon name={name} size={size === 'lg' ? 26 : size === 'sm' ? 18 : 22} />
    </span>
  );
}
