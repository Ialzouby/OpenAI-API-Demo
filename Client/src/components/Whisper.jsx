// Client/src/components/Whisper.jsx
import React, { useState } from 'react';
import axios from 'axios';

export default function Whisper() {
  const [audioFile, setAudioFile] = useState(null);
  const [transcription, setTranscription] = useState('');

  const transcribe = async () => {
    const formData = new FormData();
    formData.append('audio', audioFile);

    try {
      const res = await axios.post('http://localhost:5050/api/whisper', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setTranscription(res.data.text);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Whisper Speech-to-Text</h2>
      <input type="file" accept="audio/*" onChange={e => setAudioFile(e.target.files[0])} />
      <button onClick={transcribe}>Transcribe</button>
      <p><strong>Transcription:</strong> {transcription}</p>
    </div>
  );
}
