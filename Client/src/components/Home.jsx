import { Link } from 'react-router-dom'

const cards = [
  { title: 'ChatGPT', route: '/chat', emoji: '💬' },
  { title: 'DALL·E Image Gen', route: '/dalle', emoji: '🎨' },
  { title: 'Text-to-Speech', route: '/tts', emoji: '🔊' },
  { title: 'Whisper Transcribe', route: '/whisper', emoji: '🎤' },
  { title: 'Content Moderation', route: '/moderate', emoji: '🛡️' },
]

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#f4f7fa] to-[#eaeef6] relative">
      <h1 className="text-4xl font-bold text-center mb-6">
        AI-Powered Development <span className="text-primary">- OpenAI Demo</span>
      </h1>
      <p className="text-center text-gray-500 mb-10 max-w-3xl mx-auto">
        Explore various OpenAI APIs through interactive, beautiful demos. Click any card below to try it out!
      </p>
      
      {/* Floating Shapes */}
      <div className="shape shape-1"></div>
      <div className="shape shape-2"></div>
      <div className="shape shape-3"></div>
      <div className="shape shape-4"></div>

      <div className="grid-container">
        {cards.map(({ title, route, emoji }) => (
          <Link
            key={route}
            to={route}
            className="card bg-card-hover text-center text-lg font-semibold flex flex-col items-center justify-center cursor-pointer"
          >
            <div className="text-6xl mb-4">{emoji}</div>
            <h2>{title}</h2>
          </Link>
        ))}
      </div>
    </div>
  )
}
