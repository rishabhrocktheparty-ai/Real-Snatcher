// pages/index.tsx
// Homepage: Addictive UI for Real-Snatcher
// Implements Hook Model: Immediate trigger/action, minimal friction for video upload and transformation selection.
// Uses Tailwind CSS for modern, mobile-first design.


import React, { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  // State for video upload and transformation selection
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [taskType, setTaskType] = useState('face_swap');
  const [faceImageUrl, setFaceImageUrl] = useState('');
  const [targetActionPrompt, setTargetActionPrompt] = useState('');
  const [jobId, setJobId] = useState('');
  const [generationCredits, setGenerationCredits] = useState(10); // Simulated credits
  const [isUploading, setIsUploading] = useState(false);
  const [dopamine, setDopamine] = useState(false);

  // Simulate upload and job submission
  const handleUpload = async () => {
    setIsUploading(true);
    setDopamine(true);
    // Simulate S3 upload
    setTimeout(async () => {
      // In production, upload to S3 and get presigned URL
      const fakeS3Url = 'https://s3.simulated/real-snatcher/' + (videoFile?.name || 'video.mp4');
      setVideoUrl(fakeS3Url);
      // Submit job
      const payload: any = { video_url: fakeS3Url, task_type: taskType };
      if (taskType === 'face_swap') payload.face_image_url = faceImageUrl;
      if (taskType === 'action_swap') payload.target_action_prompt = targetActionPrompt;
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setJobId(data.job_id);
      setGenerationCredits((c) => c - 1); // Deduct credit
      setIsUploading(false);
      setDopamine(false);
    }, 2000);
  };

  // Drag-and-drop handler
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setVideoFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex flex-col items-center justify-center">
      <Head>
        <title>Real-Snatcher</title>
      </Head>
      {/* Top Nav: Generation Credits */}
      <nav className="w-full flex justify-between items-center px-8 py-4 bg-black bg-opacity-40">
        <span className="text-white text-xl font-bold">Real-Snatcher</span>
        <span className="text-yellow-400 font-semibold">Generation Credits: {generationCredits}</span>
      </nav>
      {/* Main UI: Upload & Select Transformation */}
      <div className="bg-white bg-opacity-10 rounded-xl shadow-lg p-8 mt-12 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-white mb-6">Upload & Transform Your Video</h1>
        <div
          className="w-full h-32 border-2 border-dashed border-yellow-400 rounded flex items-center justify-center mb-4 cursor-pointer"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          {videoFile ? (
            <span className="text-green-400">{videoFile.name} selected</span>
          ) : (
            <span className="text-yellow-400">Drag & drop video here</span>
          )}
        </div>
        <select
          className="w-full mb-4 p-2 rounded"
          value={taskType}
          onChange={(e) => setTaskType(e.target.value)}
        >
          <option value="face_swap">Face Swap</option>
          <option value="bg_swap">Background Change</option>
          <option value="action_swap">Action/Physics Swap</option>
        </select>
        {taskType === 'face_swap' && (
          <input
            type="text"
            placeholder="Face Image URL"
            className="w-full mb-4 p-2 rounded"
            value={faceImageUrl}
            onChange={(e) => setFaceImageUrl(e.target.value)}
          />
        )}
        {taskType === 'action_swap' && (
          <input
            type="text"
            placeholder="Target Action Prompt"
            className="w-full mb-4 p-2 rounded"
            value={targetActionPrompt}
            onChange={(e) => setTargetActionPrompt(e.target.value)}
          />
        )}
        <button
          className={`w-full py-3 bg-yellow-400 text-black font-bold rounded hover:bg-yellow-500 transition ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleUpload}
          disabled={!videoFile || isUploading || generationCredits <= 0}
        >
          {isUploading ? 'Uploading...' : 'Start Transformation'}
        </button>
        {dopamine && (
          <div className="mt-6 text-pink-300 animate-bounce">Processing... Dopamine hit incoming!</div>
        )}
        {jobId && (
          <div className="mt-6 text-white">
            <p>Job Submitted! <a href={`/jobs/${jobId}`} className="underline">View Progress</a></p>
          </div>
        )}
      </div>
      {/* FOMO/Streaks Placeholder */}
      <div className="mt-8 text-pink-300 font-bold animate-pulse">Daily Streak: <span className="text-white">0</span> | <span className="underline">Priority Queue Access</span> (Coming Soon)</div>
    </div>
  );
}
