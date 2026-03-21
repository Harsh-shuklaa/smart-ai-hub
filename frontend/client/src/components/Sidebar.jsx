import { Link } from "react-router-dom"

function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-6">

      <h2 className="text-xl font-bold mb-8">
        AI Tools
      </h2>

      <div className="flex flex-col gap-4">

        <Link to="/chat" className="hover:bg-gray-800 p-3 rounded">
          🤖 AI Chat
        </Link>

        <Link to="/image" className="hover:bg-gray-800 p-3 rounded">
          🎨 Image Generator
        </Link>

        <Link to="/resume" className="hover:bg-gray-800 p-3 rounded">
          📄 Resume Analyzer
        </Link>

        <Link to="/notes" className="hover:bg-gray-800 p-3 rounded">
          📝 Notes Summarizer
        </Link>

      </div>

    </div>
  )
}

export default Sidebar