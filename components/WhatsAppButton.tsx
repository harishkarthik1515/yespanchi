import { SITE } from '@/lib/site';

export default function WhatsAppButton() {
  const text = encodeURIComponent('Hi YesPanchi, I’d like to know more about your security services.');
  return (
    <a
      href={`https://wa.me/${SITE.whatsapp}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with YesPanchi on WhatsApp"
      className="group fixed bottom-6 right-6 z-40 flex h-14 items-center gap-0 overflow-hidden rounded-full bg-bronze pl-4 pr-4 font-semibold text-ink shadow-[0_12px_32px_rgba(200,30,58,0.3)] transition-all hover:gap-2 hover:pr-5 hover:text-ink"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 20 L5.3 16.2 A8.5 8.5 0 1 1 8 18.8 Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M9 9.5 C9 12 11 14.5 14 15 L15 13.8 L13.6 13 L12.9 13.6 C11.9 13.1 11 12.2 10.5 11.2 L11.1 10.5 L10.3 9 Z" fill="currentColor" />
      </svg>
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-[15px] transition-[max-width] duration-300 group-hover:max-w-[160px]">Chat with us</span>
    </a>
  );
}
