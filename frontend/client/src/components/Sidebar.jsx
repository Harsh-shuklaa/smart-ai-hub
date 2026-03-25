import { Link, useLocation } from "react-router-dom"

function Sidebar({ history = [], onSelect }) {
  const location = useLocation()

  const navItem = (path, label) => (
    <Link
      to={path}
      className={`p-3 rounded-lg transition flex items-center gap-2
      ${
        location.pathname === path
          ? "bg-purple-600"
          : "hover:bg-gray-800"
      }`}
    >
      {label}
    </Link>
  )

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">

      {/* 🔷 TOP SECTION */}
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-xl font-bold">🚀 SmartAI</h2>
      </div>

      {/* 🔷 NAVIGATION */}
      <div className="p-4 space-y-2">

        {navItem("/", "🏠 Dashboard")}
        {navItem("/chat", "🤖 AI Chat")}
        {navItem("/image", "🎨 Image Generator")}
        {navItem("/resume", "📄 Resume Analyzer")}
        {navItem("/notes", "📝 Notes Summarizer")}

      </div>

      {/* 🔷 HISTORY SECTION */}
      <div className="flex-1 overflow-y-auto p-4 border-t border-gray-700">

        <h3 className="text-sm text-gray-400 mb-3">
          🖼 Image History
        </h3>

        {history.length === 0 ? (
          <p className="text-xs text-gray-500">No images yet</p>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {history.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="history"
                onClick={() => onSelect && onSelect(img)}
                className="rounded cursor-pointer hover:scale-105 transition"
              />
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

export default Sidebar