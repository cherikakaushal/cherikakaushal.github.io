import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Inter', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
        display: ['"Playfair Display"', 'serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
      },
      colors: {
        canvas: 'var(--ds-bg)',
        surface: 'var(--ds-surface)',
        border: 'var(--ds-border)',
        ink: 'var(--ds-text)',
        muted: 'var(--ds-text-secondary)',
        accent: 'var(--ds-accent)',
      },
      maxWidth: {
        content: '75rem',
        reading: '42rem',
      },
      borderRadius: {
        button: 'var(--ds-radius-button)',
        card: 'var(--ds-radius-card)',
        image: 'var(--ds-radius-image)',
      },
      transitionTimingFunction: {
        ds: 'var(--ds-ease)',
      },
    },
  },
  plugins: [],
};

export default config;
