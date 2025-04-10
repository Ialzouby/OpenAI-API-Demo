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
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const originalExt = path.extname(req.file.originalname); // e.g., '.mp3'
    const tempPath = path.resolve(__dirname, '..', req.file.path);
    const finalPath = `${tempPath}${originalExt}`;

    fs.renameSync(tempPath, finalPath);

    console.log('🟡 Final file sent to OpenAI:', finalPath);

    const fileStream = fs.createReadStream(finalPath);
    fileStream.path = finalPath; // ⬅️ explicitly set .path for OpenAI (important!)

    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(finalPath),
      model: 'whisper-1',
      // 🔥 Add this line:
      filename: `audio${originalExt}`, // e.g., audio.mp3
    });
    

    fs.unlink(finalPath, () => {}); // cleanup
    res.json({ text: transcription.text });
  } catch (err) {
    console.error('❌ Whisper Error');
    console.error('Message:', err.message);
    if (err.response) {
      console.error('Status:', err.response.status);
      console.error('Data:', err.response.data);
    }
    res.status(500).json({ error: err.message || 'Transcription failed' });
  }
});

module.exports = router;
