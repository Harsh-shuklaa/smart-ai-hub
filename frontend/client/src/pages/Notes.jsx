import { useEffect, useState, useContext } from "react"
import axios from "axios"
import AuthContext from "../context/AuthContext"

export default function Notes() {
  const [text, setText] = useState("")
  const [summary, setSummary] = useState("")
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)

  const { setCredits } = useContext(AuthContext)

  const token = localStorage.getItem("token")

  // 🔥 LOAD HISTORY
  const loadHistory = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/notes",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setHistory(res.data.notes || [])
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    loadHistory()
  }, [token])

  // 🔹 NEW NOTE
  const handleNewNote = () => {
    setText("")
    setSummary("")
  }

  // 🔹 Summarize
  const handleSummarize = async () => {
    if (!text.trim()) return

    setLoading(true)
    setSummary("")

    try {
      const res = await axios.post(
        "http://localhost:5000/api/notes/summarize",
        { text },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (!res.data.success) {
        setSummary(res.data.message || "❌ Failed")
        return
      }

      setSummary(res.data.summary)

      // 🔥 CREDIT UPDATE
      if (res.data.credits !== undefined) {
        setCredits(res.data.credits)
      }

      loadHistory()

    } catch (error) {
      console.error(error)

      if (error.response?.status === 403) {
        setSummary("❌ No credits remaining")
      } else {
        setSummary("❌ Error generating summary")
      }
    }

    setLoading(false)
  }

  return (
    <div className="flex h-screen bg-gray-100">

      {/* 🔥 Sidebar */}
      <div className="w-72 bg-gray-900 text-white p-4 overflow-y-auto shadow-lg">

        <button
          onClick={handleNewNote}
          className="w-full bg-blue-600 p-2 rounded mb-4 hover:bg-blue-700 transition font-semibold"
        >
          + New Note
        </button>

        <h2 className="text-lg font-semibold mb-4">History</h2>

        {history.map((item) => (
          <div
            key={item._id}
            className="mb-3 p-2 bg-gray-700 rounded cursor-pointer hover:bg-gray-600 text-sm"
            onClick={() => {
              setText(item.originalText)
              setSummary(item.summary)
            }}
          >
            <p className="text-xs text-gray-300 line-clamp-2">
              {item.originalText}
            </p>
          </div>
        ))}
      </div>

      {/* 🔥 Main */}
      <div className="flex-1 p-6 flex justify-center">
        <div className="w-full max-w-3xl bg-white p-6 rounded-xl shadow">

          <h1 className="text-2xl font-bold mb-4">
            📝 Notes Summarizer
          </h1>

          {/* 🔹 Input */}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your notes here..."
            className="w-full h-40 p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* 🔹 Button */}
          <button
            onClick={handleSummarize}
            disabled={loading}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Summarizing..." : "Summarize"}
          </button>

          {/* 🟢 ONLY SUMMARY */}
          {summary && (
            <div className="mt-6 bg-green-50 border border-green-200 p-4 rounded-xl shadow-sm">
              <h2 className="font-semibold text-green-700 mb-2">
                🤖 AI Summary
              </h2>

              <p className="text-gray-800 whitespace-pre-line leading-relaxed">
                {summary}
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}