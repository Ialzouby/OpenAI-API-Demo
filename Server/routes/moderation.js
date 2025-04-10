const express = require('express');
const { OpenAI } = require('openai');
const router = express.Router();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/', async (req, res) => {
  try {
    const { input } = req.body;

    const result = await openai.moderations.create({ input });

    res.json({ flagged: result.results[0].flagged, categories: result.results[0].categories });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
