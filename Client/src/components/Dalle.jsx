import React, { useState } from "react";
import axios from "axios";

export default function Dalle() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setImage("");
  
    try {
      const isLocal = window.location.hostname === "localhost";
      const API_BASE = isLocal
        ? "http://localhost:5050"
        : import.meta.env.VITE_API_BASE_URL;
  
      const res = await axios.post(`${API_BASE}/api/dalle`, { prompt });
      setImage(res.data.image);
    } catch (err) {
      console.error(err);
      alert("Failed to generate image");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex items-center justify-center h-screen w-screen px-4 relative overflow-hidden">
      {/* Floating Shapes */}
      <div className="shape shape-circle shape-1"></div>
      <div className="shape shape-triangle shape-2"></div>
      <div className="shape shape-blob shape-3"></div>
      <div className="shape shape-square shape-4"></div>

      {/* Animated Card */}
      <div
        className={`card transition-all duration-700 ease-in-out transform ${
          image ? "scale-100 max-w-4xl" : "scale-75 max-w-sm"
        } w-full`}
      >
        <h1 className="text-2xl md:text-3xl font-bold mb-4">🎨 DALL·E</h1>

        <div
          className={`transition-all duration-500 ease-in-out mb-6 ${
            image ? "scale-90" : "scale-100"
          }`}
        >
          <p className="text-gray-500 text-sm md:text-base mb-3">
            Describe a scene to generate an image:
          </p>
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              placeholder="e.g. A neon robot reading a book"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className={`flex-grow px-4 py-2 border border-gray-300 rounded-lg text-sm md:text-base focus:outline-none transition-all duration-300 ${
                image ? "text-sm py-1 px-3" : "text-base py-2 px-4"
              }`}
            />
            <button
              onClick={generateImage}
              disabled={loading}
              className={`transition-all duration-300 ${
                image ? "px-4 py-2 text-sm" : "px-6 py-3 text-base"
              }`}
            >
              {loading ? "Loading..." : "Generate"}
            </button>
          </div>
        </div>

        {image && (
          <div className="mt-6 flex flex-col items-center animate-fadeIn">
            <img
              src={image}
              alt="Generated"
              className="rounded-lg border border-gray-200 shadow max-h-[450px] w-full object-contain"
            />
            <a
              href={image}
              download="dalle-image.jpg"
              className="mt-3 text-sm text-[var(--primary-color)] hover:underline"
            >
              ⬇️ Download Image
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
