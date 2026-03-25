import { useState, useContext, useEffect } from "react"
import axios from "axios"
import ReactMarkdown from "react-markdown"
import AuthContext from "../context/AuthContext"

export default function Resume() {
  const [file, setFile] = useState(null)
  const [analysis, setAnalysis] = useState("")
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)

  const { setCredits } = useContext(AuthContext)

  const token = localStorage.getItem("token")

  // 🔥 LOAD HISTORY
  const loadHistory = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/resume",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setHistory(res.data.resumes || [])
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    loadHistory()
  }, [])

  // 🔹 Upload Resume
  const handleUpload = async () => {
    if (!file) return

    const formData = new FormData()
    formData.append("resume", file)

    try {
      setLoading(true)
      setAnalysis("")

      const res = await axios.post(
        "http://localhost:5000/api/resume/analyze",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      )

      setAnalysis(res.data.analysis)

      // 🔥 CREDIT UPDATE
      if (res.data.credits !== undefined) {
        setCredits(res.data.credits)
      }

      loadHistory() // 🔥 refresh history

    } catch (err) {
      console.error(err)
      setAnalysis("❌ Error analyzing resume")
    }

    setLoading(false)
  }

  // 🔹 Load from history
  const handleSelectHistory = (item) => {
    setAnalysis(item.analysis)
  }

  // 🔹 Reset
  const handleNewResume = () => {
    setFile(null)
    setAnalysis("")
  }

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* 🔥 Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-4 min-h-screen overflow-y-auto">

        <h2 className="text-lg font-semibold mb-4">Resume History</h2>

        {history.map((item) => (
          <div
            key={item._id}
            onClick={() => handleSelectHistory(item)}
            className="p-2 mb-2 bg-gray-700 rounded cursor-pointer hover:bg-gray-600 text-sm"
          >
            Resume {item._id.slice(-4)}
          </div>
        ))}

      </div>

      {/* 🔥 Main */}
      <div className="flex-1 p-6 flex flex-col items-center">
        
        <div className="w-full max-w-3xl mt-4">

          <div className="bg-white p-6 rounded-xl shadow">

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">📄 Resume Analyzer</h1>

              <button
                onClick={handleNewResume}
                className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
              >
                + New Resume
              </button>
            </div>

            {/* Upload */}
            <label className="border-2 border-dashed border-gray-300 p-6 text-center block rounded cursor-pointer hover:bg-gray-50">
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
              />

              <p className="text-blue-600 font-medium">
                Click to upload resume (PDF)
              </p>

              {file && (
                <p className="text-sm text-gray-500 mt-2">
                  Selected: {file.name}
                </p>
              )}
            </label>

            {/* Button */}
            <button
              onClick={handleUpload}
              disabled={loading}
              className="mt-4 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
            >
              {loading ? "Analyzing..." : "Analyze Resume"}
            </button>

            {/* Output */}
            {analysis && (
              <div className="mt-6">
                <div className="bg-white border rounded-xl shadow-md p-5">

                  <h2 className="text-lg font-semibold mb-4 text-gray-800">
                    📊 Analysis Result
                  </h2>

                  <div className="max-h-96 overflow-y-auto pr-2 border rounded-lg p-4 bg-gray-50">

                    <div className="prose prose-sm max-w-none break-words">
                      <ReactMarkdown>
                        {analysis}
                      </ReactMarkdown>
                    </div>

                  </div>

                </div>
              </div>
            )}

          </div>

        </div>
      </div>

    </div>
  )
}