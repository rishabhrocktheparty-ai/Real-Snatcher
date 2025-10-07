import React from 'react'

// AnimatedBackground.tsx
// Persistent low-opacity neon grid + binary flow background used across pages.
// Visuals: SVG grid with a slight parallax animation + CSS animated binary pattern overlay.

export default function AnimatedBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 opacity-40">
      {/* SVG neon grid */}
      <svg className="w-full h-full animate-floatGrid" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="neonGradient" x1="0%" x2="100%">
            <stop offset="0%" stopColor="#00b3ff" stopOpacity="0.08" />
            <stop offset="50%" stopColor="#ff2d95" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#00ffa3" stopOpacity="0.04" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#neonGradient)" />
        {/* grid lines */}
        <g strokeWidth="1" strokeOpacity="0.06" stroke="#00b3ff">
          {Array.from({ length: 30 }).map((_, i) => (
            <line key={`v-${i}`} x1={`${(i / 30) * 100}%`} y1="0%" x2={`${(i / 30) * 100}%`} y2="100%" />
          ))}
          {Array.from({ length: 18 }).map((_, i) => (
            <line key={`h-${i}`} x1="0%" y1={`${(i / 18) * 100}%`} x2="100%" y2={`${(i / 18) * 100}%`} />
          ))}
        </g>
      </svg>

      {/* Binary flow overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#0000,#000)] bg-[length:200%_100%] animate-binaryFlow mix-blend-overlay">
        <div className="w-full h-full bg-[url('/binary-pattern.png')] opacity-25" />
      </div>
    </div>
  )
}
