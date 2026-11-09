import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        surface: 'rgb(var(--c-surface) / <alpha-value>)',
        raised: 'rgb(var(--c-raised) / <alpha-value>)',
        line: 'rgb(var(--c-line) / <alpha-value>)',
        line2: 'rgb(var(--c-line2) / <alpha-value>)',
        line3: 'rgb(var(--c-line3) / <alpha-value>)',
        cream: 'rgb(var(--c-cream) / <alpha-value>)',
        muted: 'rgb(var(--c-muted) / <alpha-value>)',
        dim: 'rgb(var(--c-dim) / <alpha-value>)',
        bronze: {
          DEFAULT: 'rgb(var(--c-bronze) / <alpha-value>)',
          light: 'rgb(var(--c-bronze-light) / <alpha-value>)',
          dark: 'rgb(var(--c-bronze-dark) / <alpha-value>)'
        },
        /* Section-scoped accent — follows whatever `.accent-*` class is
           in effect, so a section can retint itself as you scroll. */
        accent: {
          DEFAULT: 'rgb(var(--c-accent) / <alpha-value>)',
          contrast: 'rgb(var(--c-accent-contrast) / <alpha-value>)'
        },
        /* Legacy aliases kept so existing pages keep compiling; they now
           resolve to dark-canvas equivalents. */
        paper: 'rgb(var(--c-surface) / <alpha-value>)',
        sand: 'rgb(var(--c-raised) / <alpha-value>)',
        taupe: 'rgb(var(--c-muted) / <alpha-value>)'
      },
      fontFamily: {
        sans: ['"Outfit Variable"', 'Outfit', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace']
      },
      maxWidth: { site: '1280px', wide: '1480px' },
      fontSize: {
        /* Display scale matched to the reference sites: large size,
           medium weight, ~1.1 line-height, near-normal tracking. */
        d1: ['clamp(2.75rem, 6.2vw, 5rem)', { lineHeight: '1.06', letterSpacing: '-0.025em' }],
        d2: ['clamp(2.25rem, 4.6vw, 3.75rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        d3: ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        lead: ['clamp(1.0625rem, 1.4vw, 1.3125rem)', { lineHeight: '1.6', letterSpacing: '0' }]
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        fadeDown: { from: { opacity: '0', transform: 'translate(-50%, -6px)' }, to: { opacity: '1', transform: 'translate(-50%, 0)' } }
      },
      animation: {
        marquee: 'marquee 48s linear infinite',
        fadeDown: 'fadeDown 0.18s ease-out'
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(.22,.7,.2,1)'
      }
    }
  },
  plugins: []
};

export default config;
