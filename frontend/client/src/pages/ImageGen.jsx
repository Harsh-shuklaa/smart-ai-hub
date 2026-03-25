import { useState, useContext } from "react"
import { generateImage } from "../services/api"
import Sidebar from "../components/Sidebar"
import AuthContext from "../context/AuthContext"

export default function ImageGen() {

  const [prompt, setPrompt] = useState("")
  const [image, setImage] = useState("")
  const [loading, setLoading] = useState(false)

  const { setCredits } = useContext(AuthContext)

  // ✅ Load history (safe)
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem("imageHistory")
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // ✅ Save history (FIXED 🔥)
  const saveHistory = (newImage) => {
    setHistory((prev) => {
      try {
        const updated = [newImage, ...prev].slice(0, 3) // 🔥 LIMIT FIX
        localStorage.setItem("imageHistory", JSON.stringify(updated))
        return updated
      } catch (err) {
        console.error("Storage full, clearing...", err)
        localStorage.removeItem("imageHistory") // auto fix
        return []
      }
    })
  }

  // 🔥 Generate Image
  const handleGenerate = async () => {
    if (!prompt.trim()) return

    try {
      setLoading(true)

      const res = await generateImage(prompt)

      if (!res?.success) {
        alert("❌ Failed to generate image")
        return
      }

      setImage(res.image)
      saveHistory(res.image)
      setCredits(res.credits)

    } catch (err) {
      console.error(err)
      alert("❌ Error generating image")
    } finally {
      setLoading(false)
    }
  }

  // 🔥 New button
  const handleNew = () => {
    setImage("")
    setPrompt("")
  }

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar
        history={history}
        onSelect={(img) => setImage(img)}
      />

      {/* Main */}
      <div className="flex-1 flex justify-center items-start p-6 bg-gray-100 overflow-y-auto">

        <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow">

          <h1 className="text-2xl font-bold mb-4">
            🎨 Image Generator
          </h1>

          {/* Input */}
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter prompt (e.g. futuristic city, anime style...)"
            className="w-full border p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          {/* Buttons */}
          <div className="flex gap-2">

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700 transition w-full"
            >
              {loading ? "Generating..." : "Generate Image"}
            </button>

            <button
              onClick={handleNew}
              className="bg-gray-500 text-white px-5 py-2 rounded hover:bg-gray-600 transition w-full"
            >
              🆕 New
            </button>

          </div>

          {/* Output */}
          {image && (
            <div className="mt-6 p-4 border rounded-lg bg-gray-50">

              <h2 className="font-semibold mb-3">
                Generated Image:
              </h2>

              <img
                src={image}
                alt="generated"
                className="rounded-lg shadow w-full max-h-[400px] object-contain"
              />

              <a
                href={image}
                download="ai-image.png"
                className="inline-block mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                ⬇ Download Image
              </a>

            </div>
          )}

        </div>

      </div>
    </div>
  )
}