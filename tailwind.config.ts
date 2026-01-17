import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Zavia brand colors
        zavia: {
          navy: '#0a1628',
          gold: '#c9a227',
          cream: '#f5f5dc',
          slate: '#334155',
        },
        // Layer-specific colors
        canon: {
          primary: '#1e40af',
          secondary: '#3b82f6',
          accent: '#60a5fa',
        },
        guild: {
          primary: '#7c2d12',
          secondary: '#c2410c',
          accent: '#fb923c',
        },
        fellowship: {
          primary: '#14532d',
          secondary: '#166534',
          accent: '#22c55e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
