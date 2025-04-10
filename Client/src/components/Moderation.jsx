import React, { useState } from 'react';
import axios from 'axios';

export default function Moderation() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const checkModeration = async () => {
    try {
      const res = await axios.post('http://localhost:5050/api/moderate', { input });
      setResult(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const hasFlaggedCategory = result && Object.values(result.categories).includes(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f4f7fa] to-[#eaeef6] px-4 py-12">
      <div className="card max-w-2xl w-full">
        <h2 className="text-3xl font-semibold mb-6 text-center text-[var(--text-color)]">
          🛡️ Content Moderation
        </h2>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Enter content to check..."
          rows={5}
          className="w-full p-4 border border-gray-300 rounded-lg mb-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
        />
        <button
          onClick={checkModeration}
          disabled={!input}
          className="bg-[var(--primary-color)] hover:bg-transparent hover:text-[var(--primary-color)] border-2 border-[var(--primary-color)] text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 w-full"
        >
          Check
        </button>

        {result && (
          <div className="mt-6">
            {hasFlaggedCategory && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
                ⚠️ Warning: The content has been flagged for sensitive or unsafe material.
              </div>
            )}
            <p className="text-sm font-medium mb-2 text-gray-700">
              Flagged: <span className={result.flagged ? 'text-red-600' : 'text-green-600'}>{result.flagged ? 'Yes' : 'No'}</span>
            </p>
            <div className="bg-gray-100 p-4 rounded-lg text-sm overflow-auto max-h-64 border border-gray-300">
              <pre className="whitespace-pre-wrap break-words">{JSON.stringify(result.categories, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
