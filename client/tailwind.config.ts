// tailwind.config.ts
// Defines the custom Cyber-Snatcher neon palette and config for Tailwind CSS
// Uses high-contrast dark mode with neon accents to maximize visual impact and retention
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'deep-cobalt': '#06102B', // background base
        'electric-pink': '#FF2D95',
        'cyber-green': '#00FFA3',
        'neon-yellow': '#FACC15',
        'glass': 'rgba(255,255,255,0.04)'
      },
      fontFamily: {
        display: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      }
    }
  },
  plugins: [],
}

export default config
