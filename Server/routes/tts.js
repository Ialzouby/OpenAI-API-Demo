const express = require('express');
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

// OpenAI TTS voices (choose one):
// 'alloy'   → Warm, engaging male voice
// 'echo'    → Calm, conversational female voice
// 'fable'   → Animated, storytelling tone
// 'onyx'    → Deep, crisp male voice
// 'nova'    → Bright, expressive female voice
// 'shimmer' → Soft, melodic high-pitched voice


    const buffer = Buffer.from(await response.arrayBuffer());

    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Length': buffer.length,
      'Content-Disposition': 'inline; filename="speech.mp3"',
    });

    res.send(buffer);
  } catch (err) {
    console.error('TTS error:', err.response?.data || err.message || err);
    res.status(500).json({ error: 'TTS generation failed' });
  }
});

module.exports = router;


