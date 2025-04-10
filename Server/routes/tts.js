const express = require('express');
const { OpenAI } = require('openai');
const router = express.Router();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/', async (req, res) => {
  try {
    const { text } = req.body;

    // Validate input
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text is required for TTS' });
    }

    // Generate speech
    const mp3 = await openai.audio.speech.create({
      model: 'tts-1',
      voice: 'alloy', // alloy, echo, fable, onyx, nova, shimmer
      input: text,
      response_format: 'mp3',
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());

    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Disposition': 'inline; filename="speech.mp3"',
    });

    res.send(buffer);
  } catch (err) {
    console.error('TTS error:', err.response?.data || err.message || err);
    res.status(500).json({ error: err.message || 'TTS generation failed' });
  }
});

module.exports = router;
