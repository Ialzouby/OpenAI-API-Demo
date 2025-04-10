const express = require('express');
const { OpenAI } = require('openai');
const router = express.Router();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/', async (req, res) => {
  try {
    console.log('🟡 Incoming moderation request:', req.body);

    const { input } = req.body;
    if (!input) return res.status(400).json({ error: 'Missing input text.' });

    const result = await openai.moderations.create({
      input,
      model: 'omni-moderation-latest', // ✅ This is correct for the current SDK
    });
    

    res.json({
      flagged: result.results[0].flagged,
      categories: result.results[0].categories,
    });
  } catch (err) {
    console.error('❌ Moderation error:', err.message);
    if (err.response) {
      console.error('Status:', err.response.status);
      console.error('Data:', err.response.data);
    }
    res.status(500).json({ error: err.message || 'Moderation failed' });
  }
});

module.exports = router;
