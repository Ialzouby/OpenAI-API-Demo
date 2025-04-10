import React, { useState } from 'react';
import axios from 'axios';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    try {
      const res = await axios.post('http://localhost:5050/api/chat', { messages: newMessages });
      setMessages([...newMessages, { role: 'assistant', content: res.data.response }]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4f7fa] to-[#eaeef6] flex items-center justify-center p-8">
      <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-3xl">
        <h2 className="text-3xl font-semibold text-center text-gray-900 mb-6">💬 Chat with AI</h2>

        {/* Chat message display area */}
        <div
          className="h-96 overflow-y-auto border border-gray-300 rounded-lg p-4 mb-4"
          style={{ scrollBehavior: 'smooth' }}
        >
          {messages.map((msg, i) => (
            <div key={i} className={`mb-4 ${msg.role === 'user' ? 'text-blue-600' : 'text-gray-800'}`}>
              <strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong>
              <p className="mt-1">{msg.content}</p>
            </div>
          ))}
        </div>

        {/* Input area */}
        <div className="flex items-center">
          <input
            type="text"
            className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            disabled={!input}
            className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg disabled:opacity-50 transition-all"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
