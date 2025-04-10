import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function Docs() {
  return (
    <div className="min-h-screen bg-white px-6 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center">📚 API Documentation</h1>
      <div className="space-y-10 max-w-4xl mx-auto">

        {/* OpenAI API Blocks */}
        <DocBlock
          title="💬 Conversations API"
          description="Send a chat history (list of messages) to OpenAI and get a chatbot response."
          input={`{ messages: [{ role: 'user', content: 'Hello' }] }`}
          output={`{ response: 'Hi there! How can I help you today?' }`}
          code={`const express = require('express');
const { OpenAI } = require('openai');
const router = express.Router();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/', async (req, res) => {
  try {
    const { messages } = req.body;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
    });

    res.json({ response: completion.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;`}
        />

        <DocBlock
          title="🎨 DALL·E Image Generation"
          description="Generate an image from a prompt using DALL·E 3."
          input={`{ prompt: 'A cat surfing on a wave' }`}
          output={`{ image: 'https://openai.com/path-to-image.png' }`}
          code={`const express = require('express');
const { OpenAI } = require('openai');
const router = express.Router();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt,
      n: 1,
      size: '1024x1024',
    });

    const imageUrl = response.data[0].url;
    res.json({ image: imageUrl });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate image' });
  }
});

module.exports = router;`}
        />

        <DocBlock
          title="🔊 Text-to-Speech API"
          description="Convert any text into natural-sounding speech using OpenAI's TTS model."
          input={`{ text: 'Hello, this is a test of the text-to-speech API.' }`}
          output={`Returns an MP3 audio buffer with speech.`}
          code={`const express = require('express');
const { OpenAI } = require('openai');
const router = express.Router();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text is required for TTS' });
    }

    const response = await openai.audio.speech.create({
      model: 'tts-1',
      voice: 'nova',
      input: text,
      response_format: 'mp3',
    });

    const buffer = Buffer.from(await response.arrayBuffer());

    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Length': buffer.length,
      'Content-Disposition': 'inline; filename="speech.mp3"',
    });

    res.send(buffer);
  } catch (err) {
    res.status(500).json({ error: 'TTS generation failed' });
  }
});

module.exports = router;`}
        />

        <DocBlock
          title="🎤 Whisper Transcription API"
          description="Upload an audio file and get back the transcription using Whisper."
          input={`FormData: { audio: File }`}
          output={`{ text: 'Transcribed content here.' }`}
          code={String.raw`const express = require('express');
const multer = require('multer');
const { OpenAI } = require('openai');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/', upload.single('audio'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const originalExt = path.extname(req.file.originalname);
    const tempPath = path.resolve(__dirname, '..', req.file.path);
    const finalPath = \`\${tempPath}\${originalExt}\`;

    fs.renameSync(tempPath, finalPath);

    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(finalPath),
      model: 'whisper-1',
      filename: \`audio\${originalExt}\`,
    });

    fs.unlink(finalPath, () => {});
    res.json({ text: transcription.text });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Transcription failed' });
  }
});

module.exports = router;`}
        />

        <DocBlock
          title="🛡️ Content Moderation API"
          description="Check if text contains harmful, unsafe, or policy-violating content."
          input={`{ input: 'Some input to check for safety.' }`}
          output={`{ flagged: false, categories: { hate: false, violence: false, ... } }`}
          code={`const express = require('express');
const { OpenAI } = require('openai');
const router = express.Router();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/', async (req, res) => {
  try {
    const { input } = req.body;
    if (!input) return res.status(400).json({ error: 'Missing input text.' });

    const result = await openai.moderations.create({
      input,
      model: 'omni-moderation-latest',
    });

    res.json({
      flagged: result.results[0].flagged,
      categories: result.results[0].categories,
    });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Moderation failed' });
  }
});

module.exports = router;`}
        />

        {/* Setup Instructions Section */}
        <SetupBlock
          title="🧠 Local AI Setup: Ollama + Open WebUI"
          description="Run powerful AI models like LLaMA 3 locally using Ollama and chat with them via a web interface powered by Open WebUI."
          steps={[
            '1. 🧰 Install Homebrew if needed:\n/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"',
            '2. 🧠 Install Ollama:\nbrew install ollama',
            '3. ▶️ Start Ollama:\nbrew services start ollama',
            '4. 📥 Pull your first model:\nollama run llama3',
            '5. 🐳 Install Docker if not already:\nhttps://www.docker.com/products/docker-desktop',
            '6. 🚀 Run Open WebUI:\ndocker run -d \\\n  --name open-webui \\\n  -p 3000:8080 \\\n  -e OLLAMA_BASE_URL=http://host.docker.internal:11434 \\\n  --restart=always \\\n  ghcr.io/open-webui/open-webui:main',
            '7. 🌐 Open your browser:\nhttp://localhost:3000',
          ]}
        />
      </div>
    </div>
  )
}

function DocBlock({ title, description, input, output, code }) {
  return (
    <div className="border p-4 rounded-xl shadow bg-gray-50">
      <h2 className="text-xl font-semibold mb-1">{title}</h2>
      <p className="text-sm mb-2 text-gray-600">{description}</p>

      <div className="text-sm text-gray-800 mb-1 font-medium">🔷 Input:</div>
      <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto whitespace-pre-wrap mb-3">{input}</pre>

      <div className="text-sm text-gray-800 mb-1 font-medium">🟢 Output:</div>
      <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto whitespace-pre-wrap mb-3">{output}</pre>

      <div className="text-sm text-gray-800 mb-1 font-medium">💻 Full Backend Code:</div>
      <SyntaxHighlighter language="javascript" style={tomorrow} customStyle={{ padding: '1em', borderRadius: '0.5em' }}>
        {code}
      </SyntaxHighlighter>
    </div>
  )
}

function SetupBlock({ title, description, steps }) {
  return (
    <div className="border p-4 rounded-xl shadow bg-blue-50">
      <h2 className="text-xl font-semibold mb-1">{title}</h2>
      <p className="text-sm mb-3 text-gray-700">{description}</p>
      <ol className="space-y-3 list-decimal list-inside text-sm">
        {steps.map((step, idx) => (
          <li key={idx}>
            <pre className="bg-blue-100 p-2 rounded text-xs whitespace-pre-wrap">{step}</pre>
          </li>
        ))}
      </ol>
    </div>
  )
}
