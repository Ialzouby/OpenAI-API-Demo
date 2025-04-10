const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
app.use(express.json()); // ✅ Required for parsing JSON bodies

dotenv.config();
app.use(cors());
  
app.use(express.json());
app.get('/', (req, res) => {
    res.send('✅ Main server is working too!');
  });
  
  
const chatRoute = require('./Routes/Chat');
const dalleRoute = require('./Routes/Dalle');
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
