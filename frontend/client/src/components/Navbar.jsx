import { Link } from "react-router-dom"

function Navbar() {
  const token = localStorage.getItem("token")

  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.href = "/login"
  }

  return (
    <nav className="bg-linear-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 flex justify-between items-center shadow-lg">

      <h1 className="text-2xl font-bold tracking-wide">
        SmartAI Hub
      </h1>

      <div className="flex gap-6 text-sm">

        <Link to="/" className="hover:text-gray-200">
          Dashboard
        </Link>

        <Link to="/chat" className="hover:text-gray-200">
          AI Chat
        </Link>

        <Link to="/image" className="hover:text-gray-200">
          Image AI
        </Link>

        {/* 🔥 CONDITIONAL AUTH BUTTON */}
        {!token ? (
          <Link to="/login" className="hover:text-gray-200">
            Login
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="hover:text-gray-200"
          >
            Logout
          </button>
        )}

      </div>

    </nav>
  )
}

export default Navbar