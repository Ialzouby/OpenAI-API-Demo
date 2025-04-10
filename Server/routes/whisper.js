const express = require('express');
const multer = require('multer');
const { OpenAI } = require('openai');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/', upload.single('audio'), async (req, res) => {
  try {
    const audioPath = path.resolve(req.file.path);

    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(audioPath),
      model: 'whisper-1',
    });

    fs.unlinkSync(audioPath); // delete file after use
    res.json({ text: transcription.text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
