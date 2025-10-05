// JobSubmissionForm.tsx
// Modular form to configure tasks (face_swap, bg_swap, action_swap)
// UX: dark input fields with neon outlines; on submit call /jobs and redirect to /jobs/[id]

import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function JobSubmissionForm({ baseVideoUrl }: { baseVideoUrl: string }) {
  const router = useRouter();
  const [taskType, setTaskType] = useState('face_swap');
  const [faceImageUrl, setFaceImageUrl] = useState('');
  const [targetActionPrompt, setTargetActionPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const submitJob = async () => {
    // psychological: immediate action reduces friction (Action step)
    setLoading(true);
    const payload: any = { base_video_url: baseVideoUrl, task_type: taskType };
    if (taskType === 'face_swap') payload.face_image_url = faceImageUrl;
    if (taskType === 'action_swap') payload.target_action_prompt = targetActionPrompt;
    const res = await fetch('/api/jobs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const data = await res.json();
    // investment: redirect to the job tracker to encourage mental ownership
    router.push(`/jobs/${data.job_id}`);
  };

  return (
    <div className="p-4 bg-glass rounded-lg">
      <label className="block text-neon-yellow mb-2">Select Transformation</label>
      <select className="w-full p-2 mb-4 bg-deep-cobalt text-white rounded outline-none ring-2 ring-transparent focus:ring-electric-pink" value={taskType} onChange={(e) => setTaskType(e.target.value)}>
        <option value="face_swap">Face Swap (Blue - Low Cost)</option>
        <option value="bg_swap">Background Swap (Green - Low Cost)</option>
        <option value="action_swap">Action Swap (Pink - Premium)</option>
      </select>

      {taskType === 'face_swap' && (
        <input className="w-full p-2 mb-4 bg-deep-cobalt text-white rounded outline-none ring-2 ring-transparent focus:ring-cyber-green" placeholder="Face image URL" value={faceImageUrl} onChange={(e) => setFaceImageUrl(e.target.value)} />
      )}

      {taskType === 'action_swap' && (
        <input className="w-full p-2 mb-4 bg-deep-cobalt text-white rounded outline-none ring-2 ring-transparent focus:ring-electric-pink" placeholder="Target action prompt" value={targetActionPrompt} onChange={(e) => setTargetActionPrompt(e.target.value)} />
      )}

      <button className="w-full py-2 bg-electric-pink text-black font-bold rounded hover:brightness-110" onClick={submitJob} disabled={loading}>
        {loading ? 'Submitting...' : 'Start Job'}
      </button>
    </div>
  );
}
