import React, { useState } from 'react';
import axios from 'axios';

export default function Dalle() {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setImage('');

    try {
      const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

      const res = await axios.post(`${API_BASE}/api/dalle`, { prompt });

      setImage(res.data.image);
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4f7fa] to-[#eaeef6] flex items-center justify-center px-4 bg-grid">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-xl text-center card">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          🎨 DALL·E <span className="text-primary">Image Generator</span>
        </h1>
        <p className="text-gray-500 mb-6">Describe your image</p>
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden mb-6">
          <input
            type="text"
            className="flex-grow px-4 py-2 text-gray-800 outline-none"
            placeholder="e.g. An astronaut on a rainbow zebra"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            onClick={generateImage}
            disabled={loading}
            className="bg-primary hover:bg-blue-700 text-white px-5 py-2 transition disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Generate'}
          </button>
        </div>

        {image && (
          <div className="mt-6">
            <img
              src={image}
              alt="Generated"
              className="rounded-lg shadow border border-gray-200 w-full"
            />
            <a
              href={image}
              download="dalle-image.jpg"
              className="block mt-3 text-primary text-sm hover:underline"
            >
              ⬇️ Download image
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
