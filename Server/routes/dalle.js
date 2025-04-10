const express = require('express');
const { OpenAI } = require('openai');
const router = express.Router();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    console.log('Generating image for prompt:', prompt);

    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: prompt,
      n: 1,
      size: '1024x1024', // ✅ Supported
    });
    

    const imageUrl = response.data[0].url;
    res.json({ image: imageUrl });
  } catch (error) {
    console.error('DALL·E error:', error.response?.data || error.message || error);
    res.status(500).json({ error: 'Failed to generate image' });
  }
});

module.exports = router;
