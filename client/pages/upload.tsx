// upload.tsx
// Drag-and-drop video upload and transformation selector for Real-Snatcher
// Responsive, dopamine-optimized UI with Tailwind CSS

import React, { useState } from 'react';
import Head from 'next/head';

const TRANSFORM_TYPES = [
  { value: 'face_swap', label: 'Face Swap' },
  { value: 'bg_swap', label: 'Background Change' },
  { value: 'action_swap', label: 'Action/Physics Swap' },
];

export default function UploadPage() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [taskType, setTaskType] = useState('face_swap');
  const [faceImageUrl, setFaceImageUrl] = useState('');
  const [targetActionPrompt, setTargetActionPrompt] = useState('');
  const [jobId, setJobId] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [dopamineAnim, setDopamineAnim] = useState(false);

  // Simulate upload to S3 and get a URL
  const handleUpload = async () => {
    setIsUploading(true);
    setDopamineAnim(true);
    // Simulate S3 upload delay
    await new Promise((r) => setTimeout(r, 2000));
    // In production, upload to S3 and get presigned URL
    setVideoUrl('https://s3.simulated/real-snatcher/uploads/' + (videoFile?.name || 'demo.mp4'));
    setIsUploading(false);
    setDopamineAnim(false);
  };

  // Submit job to backend
  const submitJob = async () => {
    const payload: any = { video_url: videoUrl, task_type: taskType };
    if (taskType === 'face_swap') payload.face_image_url = faceImageUrl;
    if (taskType === 'action_swap') payload.target_action_prompt = targetActionPrompt;
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    setJobId(data.job_id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex flex-col items-center justify-center">
      <Head>
        <title>Upload | Real-Snatcher</title>
      </Head>
      <div className="bg-white bg-opacity-10 rounded-xl shadow-lg p-8 mt-12 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-white mb-6">Upload Your Video</h1>
        <div
          className={`w-full h-32 border-2 border-dashed rounded flex items-center justify-center mb-4 cursor-pointer ${videoFile ? 'border-green-400' : 'border-gray-400'}`}
          onClick={() => document.getElementById('video-upload')?.click()}
        >
          {videoFile ? (
            <span className="text-green-400">{videoFile.name}</span>
          ) : (
            <span className="text-gray-300">Drag & drop or click to select video</span>
          )}
          <input
            id="video-upload"
            type="file"
            accept="video/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) setVideoFile(e.target.files[0]);
            }}
          />
        </div>
        <button
          className="w-full py-2 bg-yellow-400 text-black font-bold rounded hover:bg-yellow-500 transition mb-4"
          onClick={handleUpload}
          disabled={!videoFile || isUploading}
        >
          {isUploading ? 'Uploading...' : 'Upload Video'}
        </button>
        {dopamineAnim && (
          <div className="w-full flex justify-center items-center mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-400"></div>
            <span className="ml-2 text-pink-300 font-bold animate-pulse">Dopamine Hit!</span>
          </div>
        )}
        {videoUrl && (
          <div className="mb-4">
            <label className="block text-white mb-2">Transformation Type</label>
            <select
              className="w-full p-2 rounded"
              value={taskType}
              onChange={(e) => setTaskType(e.target.value)}
            >
              {TRANSFORM_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
            {taskType === 'face_swap' && (
              <input
                type="text"
                placeholder="Face Image URL"
                className="w-full mt-2 p-2 rounded"
                value={faceImageUrl}
                onChange={(e) => setFaceImageUrl(e.target.value)}
              />
            )}
            {taskType === 'action_swap' && (
              <input
                type="text"
                placeholder="Target Action Prompt"
                className="w-full mt-2 p-2 rounded"
                value={targetActionPrompt}
                onChange={(e) => setTargetActionPrompt(e.target.value)}
              />
            )}
            <button
              className="w-full py-2 bg-green-400 text-black font-bold rounded hover:bg-green-500 transition mt-4"
              onClick={submitJob}
              disabled={!videoUrl}
            >
              Start Transformation
            </button>
          </div>
        )}
        {jobId && (
          <div className="mt-6 text-white">
            <p>Job Submitted! <a href={`/jobs/${jobId}`} className="underline">View Progress</a></p>
          </div>
        )}
      </div>
    </div>
  );
}
