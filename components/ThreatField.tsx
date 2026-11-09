'use client';

import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from './motion';

/* ------------------------------------------------------------------
 * ThreatField — the hero backdrop. A slow horizontal weave of light
 * filaments (echoing the ribbon in the Palo Alto hero) over a drifting
 * particle field, with the accent colour pulled from the live CSS
 * custom property so it retints with the section.
 * ------------------------------------------------------------------ */
export function ThreatField({ className = '', intensity = 1 }: { className?: string; intensity?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0, t = 0, visible = true;
    const still = prefersReducedMotion();
    const pointer = { x: -9999, y: -9999, active: false };

    type Node = { x: number; y: number; vx: number; vy: number; r: number; tw: number };
    let nodes: Node[] = [];

    const accent = () => {
      const v = getComputedStyle(canvas).getPropertyValue('--c-accent').trim();
      return v || '230 57 80';
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(90, Math.max(26, (w * h) / 26000)) * intensity);
      nodes = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.5 + 0.5,
        tw: Math.random() * Math.PI * 2
      }));
    };

    /* Three stacked sine ribbons that breathe across the canvas. */
    const ribbons = (a: string) => {
      for (let band = 0; band < 3; band++) {
        const amp = h * (0.07 + band * 0.035);
        const yBase = h * (0.46 + band * 0.07);
        const speed = t * (0.0004 + band * 0.00014);
        const grad = ctx.createLinearGradient(0, 0, w, 0);
        grad.addColorStop(0, `rgba(${a} / 0)`);
        grad.addColorStop(0.35, `rgba(${a} / ${0.3 - band * 0.07})`);
        grad.addColorStop(0.62, `rgba(255 255 255 / ${0.14 - band * 0.04})`);
        grad.addColorStop(1, `rgba(${a} / 0)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5 - band * 0.35;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 8) {
          const k = x / w;
          const y =
            yBase +
            Math.sin(k * 5.2 + speed * 9) * amp * Math.sin(k * Math.PI) +
            Math.sin(k * 11 + speed * 14 + band) * amp * 0.26 * Math.sin(k * Math.PI);
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    };

    const draw = () => {
      const a = accent();
      ctx.clearRect(0, 0, w, h);
      ribbons(a);

      const LINK = 132;
      for (let i = 0; i < nodes.length; i++) {
        const p = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const q = nodes[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            const o = (1 - Math.sqrt(d2) / LINK) * 0.14;
            ctx.strokeStyle = `rgba(255 255 255 / ${o})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
        const md = pointer.active ? Math.hypot(p.x - pointer.x, p.y - pointer.y) : 9999;
        const near = md < 190;
        if (near) {
          ctx.strokeStyle = `rgba(${a} / ${(1 - md / 190) * 0.5})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(pointer.x, pointer.y); ctx.stroke();
        }
        const twinkle = 0.45 + Math.sin(t * 0.002 + p.tw) * 0.3;
        ctx.fillStyle = near ? `rgba(${a} / .95)` : `rgba(255 255 255 / ${twinkle * 0.45})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * (near ? 1.7 : 1), 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      t += 16;
      for (const p of nodes) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < -20) p.x = w + 20; else if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20; else if (p.y > h + 20) p.y = -20;
      }
      draw();
      if (visible) raf = requestAnimationFrame(step);
    };

    resize();
    if (still) draw(); else raf = requestAnimationFrame(step);

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.active = pointer.x > -60 && pointer.x < w + 60 && pointer.y > -60 && pointer.y < h + 60;
      if (still) draw();
    };
    const onLeave = () => { pointer.active = false; };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !still) { cancelAnimationFrame(raf); raf = requestAnimationFrame(step); }
      else cancelAnimationFrame(raf);
    });
    io.observe(canvas);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect(); ro.disconnect();
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, [intensity]);

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
