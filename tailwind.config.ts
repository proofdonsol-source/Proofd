import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // THIS IS THE MAGIC SAUCE! 
      // It connects the imported fonts to the classes we've been writing.
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['"Instrument Sans"', 'sans-serif'],
        'mono-brand': ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        navy: {
          DEFAULT: '#0A101C', // Deep dark background
          mid: '#111A2C',
          light: '#1A263D',
        },
        surface: {
          1: '#131D31',
          2: '#1C2942',
          3: '#253655',
        },
        blue: {
          primary: '#3B82F6',
          light: '#60A5FA',
          deep: '#1D4ED8',
        },
        slate: {
          muted: '#94A3B8',
          brand: '#64748B',
        }
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.2)',
        'glow-sm': '0 0 15px rgba(59,130,246,0.3)',
      }
    },
  },
  plugins: [],
};
export default config;
