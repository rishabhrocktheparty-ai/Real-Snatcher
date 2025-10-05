// NavBar.tsx
// Top navigation bar showing Generation Credits and branding
// Used across all pages for investment and FOMO triggers

import React from 'react';

export default function NavBar({ credits }: { credits: number }) {
  return (
    <nav className="w-full flex justify-between items-center px-8 py-4 bg-black bg-opacity-40">
      <span className="text-white text-xl font-bold">Real-Snatcher</span>
      <span className="text-yellow-400 font-semibold">Generation Credits: {credits}</span>
    </nav>
  );
}
