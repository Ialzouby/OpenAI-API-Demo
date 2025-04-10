import React, { useState } from 'react';
import axios from 'axios';

export default function Whisper() {
  const [audioFile, setAudioFile] = useState(null);
  const [transcription, setTranscription] = useState('');
  const [loading, setLoading] = useState(false);

  const transcribe = async () => {
    if (!audioFile) return;
    const formData = new FormData();
    formData.append('audio', audioFile);
    setLoading(true);
    setTranscription('');

    try {
      const res = await axios.post('/api/whisper', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setTranscription(res.data.text);
    } catch (err) {
      console.error(err);
      alert('Transcription failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f4f7fa] to-[#eaeef6] px-4 relative overflow-hidden">
      {/* Floating Shapes (Optional) */}
      <div className="shape shape-circle shape-1"></div>
      <div className="shape shape-blob shape-2"></div>

      <div className="card max-w-2xl w-full z-10">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-4">🎤 Whisper Transcriber</h1>
        <p className="text-gray-500 text-center mb-6">
          Upload a short audio clip to transcribe it into text using OpenAI Whisper.
        </p>

        <div className="flex flex-col gap-4 mb-4">
          <input
            type="file"
            accept=".mp3,.m4a,.wav,.ogg,.webm,.mp4"
            onChange={(e) => setAudioFile(e.target.files[0])}
            className="file-input file-input-bordered w-full"
          />

          <button
            onClick={transcribe}
            disabled={!audioFile || loading}
            className="w-full bg-[var(--primary-color)] text-white font-semibold py-2 px-4 rounded-lg transition hover:bg-opacity-90 disabled:opacity-50"
          >
            {loading ? 'Transcribing...' : 'Transcribe'}
          </button>
        </div>

        {transcription && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">📝 Transcription:</h2>
            <p className="whitespace-pre-wrap text-gray-700 bg-gray-100 p-4 rounded-lg border text-sm">
              {transcription}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
