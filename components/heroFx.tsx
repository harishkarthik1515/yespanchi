'use client';

import { useEffect, useRef } from 'react';

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Shared canvas loop: sizing (incl. when un-hidden), visibility pause, pointer tracking. */
function useCanvas(setup: (ctx: CanvasRenderingContext2D, size: { w: number; h: number }, mouse: { x: number; y: number }) => {
  reset: () => void; frame: (t: number) => void;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = { w: 0, h: 0 }, mouse = { x: -9999, y: -9999 };
    const { reset, frame } = setup(ctx, size, mouse);
    let raf = 0, visible = true;
    const still = reducedMotion();

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      if (!r.width) return;
      size.w = r.width; size.h = r.height;
      canvas.width = r.width * dpr; canvas.height = r.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      reset();
      if (still) frame(0);
    };
    const loop = (t: number) => { frame(t); if (visible) raf = requestAnimationFrame(loop); };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = mouse.y = -9999; };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible && !still) raf = requestAnimationFrame(loop);
    });
    io.observe(canvas);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return ref;
}

/* ------------------------------------------------------------------
 * Dot field (Gemini-style) — a grid of dots that breathes in a slow
 * wave and springs away from the cursor, glowing gold where it's pushed.
 * ------------------------------------------------------------------ */
export function DotField({ gap = 26 }: { gap?: number }) {
  const ref = useCanvas((ctx, size, mouse) => {
    type D = { ox: number; oy: number; x: number; y: number; vx: number; vy: number };
    let dots: D[] = [];
    const R = 150;
    return {
      reset: () => {
        dots = [];
        for (let y = gap / 2; y < size.h; y += gap)
          for (let x = gap / 2; x < size.w; x += gap) dots.push({ ox: x, oy: y, x, y, vx: 0, vy: 0 });
      },
      frame: (t) => {
        ctx.clearRect(0, 0, size.w, size.h);
        for (const d of dots) {
          const dx = d.x - mouse.x, dy = d.y - mouse.y, dist = Math.hypot(dx, dy);
          if (dist < R && dist > 0.1) {
            const f = (1 - dist / R) ** 2 * 3.2;
            d.vx += (dx / dist) * f; d.vy += (dy / dist) * f;
          }
          d.vx += (d.ox - d.x) * 0.06; d.vy += (d.oy - d.y) * 0.06;
          d.vx *= 0.82; d.vy *= 0.82;
          d.x += d.vx; d.y += d.vy;

          const wave = (Math.sin(d.ox * 0.012 + d.oy * 0.008 - t * 0.0012) + 1) / 2;
          const push = Math.min(1, Math.hypot(d.x - d.ox, d.y - d.oy) / 18);
          const near = dist < R * 1.4 ? 1 - dist / (R * 1.4) : 0;
          const a = 0.12 + wave * 0.18 + near * 0.6;
          ctx.fillStyle = near > 0.05 || push > 0.1 ? `rgba(226,201,163,${Math.min(1, a + push * 0.3)})` : `rgba(181,173,162,${a})`;
          ctx.beginPath(); ctx.arc(d.x, d.y, 1 + wave * 0.5 + near * 1.3, 0, Math.PI * 2); ctx.fill();
        }
      }
    };
  });
  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />;
}

/* ------------------------------------------------------------------
 * Cipher field — a faint wall of encrypted hex. Under the cursor the
 * characters light up gold and keep re-scrambling, like a decryption lens.
 * ------------------------------------------------------------------ */
const GLYPHS = '0123456789ABCDEF';
export function CipherField({ cell = 22 }: { cell?: number }) {
  const ref = useCanvas((ctx, size, mouse) => {
    let cols = 0, rows = 0, chars: string[] = [], heat: number[] = [];
    const R = 180;
    const rand = () => GLYPHS[(Math.random() * 16) | 0];
    return {
      reset: () => {
        cols = Math.ceil(size.w / cell); rows = Math.ceil(size.h / cell);
        chars = Array.from({ length: cols * rows }, rand);
        heat = new Array(cols * rows).fill(0);
      },
      frame: (t) => {
        ctx.clearRect(0, 0, size.w, size.h);
        ctx.font = `500 ${Math.round(cell * 0.55)}px "JetBrains Mono", ui-monospace, monospace`;
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const i = r * cols + c, x = c * cell + cell / 2, y = r * cell + cell / 2;
            const d = Math.hypot(x - mouse.x, y - mouse.y);
            const near = d < R ? 1 - d / R : 0;
            heat[i] = Math.max(near, heat[i] * 0.94); // lingering trail
            const h = heat[i];
            if (h > 0.05 && Math.random() < h * 0.35) chars[i] = rand();
            else if (Math.random() < 0.0015) chars[i] = rand();
            const drift = (Math.sin(c * 0.35 + r * 0.22 - t * 0.0008) + 1) / 2;
            const a = 0.05 + drift * 0.05 + h * 0.85;
            ctx.fillStyle = h > 0.08 ? `rgba(226,201,163,${a})` : `rgba(181,173,162,${a})`;
            ctx.fillText(chars[i], x, y);
          }
        }
      }
    };
  });
  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full [mask-image:linear-gradient(to_bottom,#000_70%,transparent)]" />;
}
