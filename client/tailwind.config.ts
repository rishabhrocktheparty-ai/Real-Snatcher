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
        'deep-cobalt': '#0b1b3a',
        'electric-pink': '#ff2d95',
        'cyber-green': '#00ffa3',
        'neon-blue': '#00b3ff',
        'neon-yellow': '#FACC15',
        'glass': 'rgba(255,255,255,0.04)'
      },
      keyframes: {
        floatGrid: {
          '0%': { transform: 'translateY(0) translateX(0) scale(1)' },
          '50%': { transform: 'translateY(-6px) translateX(6px) scale(1.02)' },
          '100%': { transform: 'translateY(0) translateX(0) scale(1)' }
        },
        binaryFlow: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '100% 0' }
        }
      },
      animation: {
        floatGrid: 'floatGrid 8s ease-in-out infinite',
        binaryFlow: 'binaryFlow 12s linear infinite'
      }
    }
  },
  plugins: [],
}

export default config
