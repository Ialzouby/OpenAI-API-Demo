import React, { useState } from 'react';
import axios from 'axios';

export default function TTS() {
  const [text, setText] = useState('');

  const speak = async () => {
    try {
      const res = await axios.post('http://localhost:5050/api/tts', { text }, { responseType: 'blob' });
      const url = URL.createObjectURL(res.data);
      const audio = new Audio(url);
      audio.play();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4f7fa] to-[#eaeef6] flex items-center justify-center p-8">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-3xl">
        <h2 className="text-3xl font-semibold text-center text-gray-900 mb-6">🔊 Text-to-Speech</h2>
        <p className="text-center text-gray-500 mb-6 max-w-2xl mx-auto">
          Enter text and click "Play" to hear it spoken by the AI. Enjoy the experience!
        </p>

        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Enter text..."
          rows={6}
          className="w-full p-4 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-600 outline-none"
        />

        <div className="flex justify-center">
          <button
            onClick={speak}
            disabled={!text}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all disabled:opacity-50"
          >
            Play
          </button>
        </div>
      </div>
    </div>
  );
}
