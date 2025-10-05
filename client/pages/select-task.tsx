// select-task.tsx
// High-impact task menu with neon modules for each transformation
// Implements the Hook Model by offering high-value choices after upload (Investment)

import React from 'react';
import { useRouter } from 'next/router';

export default function SelectTask() {
  const router = useRouter();
  // In a full app, baseVideoUrl would be passed via state or query
  const baseVideoUrl = (router.query.base as string) || '';

  return (
    <div className="min-h-screen bg-deep-cobalt flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-display mb-8">Select Your Module</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        <div className="p-6 rounded-lg bg-gradient-to-br from-blue-900 to-blue-700 shadow-lg ring-2 ring-neon-yellow cursor-pointer" onClick={() => router.push(`/upload`)}>
          <h2 className="text-2xl mb-2">FACE SWAP</h2>
          <p className="text-sm">Blue Neon - Credit-based low cost option</p>
        </div>
        <div className="p-6 rounded-lg bg-gradient-to-br from-green-900 to-green-700 shadow-lg ring-2 ring-cyber-green cursor-pointer" onClick={() => router.push(`/upload`)}>
          <h2 className="text-2xl mb-2">BACKGROUND SWAP</h2>
          <p className="text-sm">Cyber Green - Fast & scalable</p>
        </div>
        <div className="p-6 rounded-lg bg-gradient-to-br from-pink-900 to-pink-700 shadow-lg ring-2 ring-electric-pink cursor-pointer" onClick={() => router.push(`/upload`)}>
          <h2 className="text-2xl mb-2">ACTION SWAP</h2>
          <p className="text-sm">Electric Pink - Premium, high cost</p>
        </div>
      </div>
    </div>
  );
}
