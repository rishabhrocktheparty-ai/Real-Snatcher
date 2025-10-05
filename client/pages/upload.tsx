// upload.tsx
// Drag-and-drop video upload and transformation selector for Real-Snatcher
// upload.tsx
// Cyber-Snatcher themed upload page (clean, low-friction). Upload → select-task flow.

import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function UploadPage() {
  const router = useRouter();
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Low-friction upload. Immediately route to task selection with base_video_url in query.
  const handleUpload = async () => {
    if (!videoFile) return;
    setIsUploading(true);
    // Simulate fast upload and immediately produce a presigned URL
    await new Promise((r) => setTimeout(r, 1200));
    const fakeUrl = `https://s3.simulated/real-snatcher/uploads/${encodeURIComponent(videoFile.name)}`;
    // Redirect to select-task and pass base video URL for next step
    router.push({ pathname: '/select-task', query: { base: fakeUrl } });
  };

  return (
    <div className="min-h-screen bg-deep-cobalt flex items-center justify-center">
      <Head>
        <title>Upload | Cyber-Snatcher</title>
      </Head>

      <div className="w-full max-w-2xl p-8">
        <div className="bg-glass p-8 rounded-xl">
          <h1 className="text-4xl font-display text-electric-pink mb-4">Upload your Video</h1>
          <div className={`w-full h-56 border-2 border-dashed rounded flex items-center justify-center mb-4 cursor-pointer ${videoFile ? 'border-cyber-green' : 'border-electric-pink'}`} onClick={() => document.getElementById('video-input')?.click()}>
            {videoFile ? <span className="text-cyber-green">{videoFile.name}</span> : <span className="text-neon-yellow">Drag & Drop or Click to Upload</span>}
          </div>
          <input id="video-input" type="file" accept="video/*" className="hidden" onChange={(e) => { if (e.target.files?.[0]) setVideoFile(e.target.files[0]); }} />

          <div className="mt-4">
            <button className={`py-3 px-6 rounded bg-electric-pink text-black font-bold ${isUploading ? 'opacity-50' : ''}`} onClick={handleUpload} disabled={!videoFile || isUploading}>
              {isUploading ? 'Uploading...' : 'Upload & Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
                        <title>Upload | Cyber-Snatcher</title>
                      </Head>

                      <div className="w-full max-w-2xl p-8">
                        <div className="bg-glass p-8 rounded-xl">
                          <h1 className="text-4xl font-display text-electric-pink mb-4">Upload your Video</h1>
                          <div className={`w-full h-56 border-2 border-dashed rounded flex items-center justify-center mb-4 cursor-pointer ${videoFile ? 'border-cyber-green' : 'border-electric-pink'}`} onClick={() => document.getElementById('video-input')?.click()}>
                            {videoFile ? <span className="text-cyber-green">{videoFile.name}</span> : <span className="text-neon-yellow">Drag & Drop or Click to Upload</span>}
                          </div>
                          <input id="video-input" type="file" accept="video/*" className="hidden" onChange={(e) => { if (e.target.files?.[0]) setVideoFile(e.target.files[0]); }} />

                          <div className="mt-4">
                            <button className={`py-3 px-6 rounded bg-electric-pink text-black font-bold ${isUploading ? 'opacity-50' : ''}`} onClick={handleUpload} disabled={!videoFile || isUploading}>
                              {isUploading ? 'Uploading...' : 'Upload & Continue'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
