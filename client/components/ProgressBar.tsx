// ProgressBar.tsx
// Animated progress bar for job status feedback
// Used in jobs dashboard to provide variable reward and mitigate latency

import React from 'react';

export default function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="w-full bg-gray-700 rounded-full h-6 mb-4">
      <div
        className="bg-yellow-400 h-6 rounded-full transition-all duration-500"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
