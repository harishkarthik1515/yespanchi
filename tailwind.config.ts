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
        bronze: { DEFAULT: 'rgb(var(--c-bronze) / <alpha-value>)', light: 'rgb(var(--c-bronze-light) / <alpha-value>)', dark: 'rgb(var(--c-bronze-dark) / <alpha-value>)' },
        paper: '#FFFFFF',
        sand: '#F0E8E9',
        taupe: '#6B5F62'
      },
      fontFamily: {
        sans: ['"Outfit Variable"', 'Outfit', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace']
      },
      maxWidth: { site: '1280px' },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        fadeDown: { from: { opacity: '0', transform: 'translate(-50%, -6px)' }, to: { opacity: '1', transform: 'translate(-50%, 0)' } }
      },
      animation: {
        marquee: 'marquee 45s linear infinite',
        fadeDown: 'fadeDown 0.18s ease-out'
      }
    }
  },
  plugins: []
};

export default config;
