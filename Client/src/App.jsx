import { Routes, Route } from 'react-router-dom'
import Home from './components/home'
import Chat from './components/chat'
import Dalle from './components/Dalle'
import TTS from './components/TTS'
import Whisper from './components/Whisper'
import Moderation from './components/Moderation'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/dalle" element={<Dalle />} />
      <Route path="/tts" element={<TTS />} />
      <Route path="/whisper" element={<Whisper />} />
      <Route path="/moderate" element={<Moderation />} />
    </Routes>
  )
}

export default App
