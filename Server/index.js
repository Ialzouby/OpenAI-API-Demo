const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

dotenv.config();
app.use(cors());
  
app.use(express.json());
app.get('/', (req, res) => {
    res.send('✅ Main server is working too!');
  });
  
  
const chatRoute = require('./routes/chat');
const dalleRoute = require('./routes/dalle');
const ttsRoute = require('./routes/tts');
const moderationRoute = require('./routes/moderation');
const whisperRoute = require('./routes/whisper');

app.use('/api/chat', chatRoute);
app.use('/api/dalle', dalleRoute);
app.use('/api/tts', ttsRoute);
app.use('/api/moderate', moderationRoute);
app.use('/api/whisper', whisperRoute);

const PORT = 5050;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
