// pages/jobs.tsx
// Gamified Progress Dashboard for Job Status
// Implements variable reward: animated, visual feedback to mitigate latency and generate dopamine hit.
// Uses Tailwind CSS for high-impact design.


import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function JobsDashboard() {
  const router = useRouter();
  const [jobId, setJobId] = useState('');
  const [status, setStatus] = useState('QUEUED');
  const [progress, setProgress] = useState(0);
  const [resultUrl, setResultUrl] = useState('');
  const [dopamineAnim, setDopamineAnim] = useState(false);

  // Extract jobId from URL if present
  useEffect(() => {
    const id = router.query.jobId as string;
    if (id) setJobId(id);
  }, [router.query]);

  // Poll backend for job status and animate progress
  useEffect(() => {
    if (!jobId) return;
    setDopamineAnim(true);
    const interval = setInterval(async () => {
      const res = await fetch(`/api/jobs/${jobId}`);
      const data = await res.json();
      setStatus(data.status);
      setProgress((p) => Math.min(100, p + 10));
      if (data.status === 'COMPLETE') {
        clearInterval(interval);
        setDopamineAnim(false);
        // Fetch result URL
        const res2 = await fetch(`/api/jobs/${jobId}/result`);
        const data2 = await res2.json();
        setResultUrl(data2.result_url);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [jobId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-white mb-6">Job Progress</h1>
      <div className="w-full max-w-md bg-white bg-opacity-10 rounded-xl shadow-lg p-8">
        <p className="text-white mb-4">Job ID: <span className="font-mono">{jobId}</span></p>
        <div className="w-full bg-gray-700 rounded-full h-6 mb-4">
          <div
            className="bg-yellow-400 h-6 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-white mb-4">Status: <span className="font-bold">{status}</span></p>
        {dopamineAnim && !resultUrl && (
          <div className="w-full flex justify-center items-center mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-400"></div>
            <span className="ml-2 text-pink-300 font-bold animate-pulse">Dopamine Hit!</span>
          </div>
        )}
        {resultUrl ? (
          <a href={resultUrl} className="block mt-4 text-green-400 underline font-bold">Download Result</a>
        ) : (
          <p className="text-pink-300 animate-pulse">Processing... Enjoy the dopamine hit!</p>
        )}
      </div>
    </div>
  );
}
