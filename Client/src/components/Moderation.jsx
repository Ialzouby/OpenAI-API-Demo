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

  return (
    <div>
      <h2>Content Moderation</h2>
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Enter content..." rows={4} />
      <br />
      <button onClick={checkModeration}>Check</button>
      {result && (
        <div>
          <p>Flagged: {result.flagged ? 'Yes' : 'No'}</p>
          <pre>{JSON.stringify(result.categories, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}