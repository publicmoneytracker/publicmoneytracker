import type { Config } from 'tailwindcss'
const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper:   '#f5f0e8',
        ink:     '#1a1a1a',
        'ink-light': '#2c2c2c',
        red:     '#c0392b',
        'red-dark': '#a93226',
        muted:   '#8b7355',
        border:  '#d4c5a9',
        card:    '#ede8df',
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body:    ['Source Serif 4', 'Georgia', 'serif'],
        mono:    ['IBM Plex Mono', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}
export default config
