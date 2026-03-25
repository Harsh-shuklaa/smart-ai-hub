import { Link, useLocation } from "react-router-dom"
import { useContext } from "react"                // 🔥 ADD
import AuthContext from "../context/AuthContext" // 🔥 ADD

function Navbar() {
  const token = localStorage.getItem("token")
  const location = useLocation()

  const { credits } = useContext(AuthContext) // 🔥 ADD

  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.href = "/login"
  }

  const linkStyle = (path) =>
    `hover:text-gray-200 ${
      location.pathname === path ? "font-bold underline" : ""
    }`

  return (
    <nav className="bg-linear-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 flex justify-between items-center shadow-lg">

      {/* Logo */}
      <h1 className="text-2xl font-bold tracking-wide">
        SmartAI Hub
      </h1>

      {/* Links */}
      <div className="flex gap-6 text-sm items-center">

        <Link to="/" className={linkStyle("/")}>
          Dashboard
        </Link>

        <Link to="/chat" className={linkStyle("/chat")}>
          AI Chat
        </Link>

        <Link to="/image" className={linkStyle("/image")}>
          Image AI
        </Link>

        <Link to="/resume" className={linkStyle("/resume")}>
          Resume AI
        </Link>

        <Link to="/notes" className={linkStyle("/notes")}>
          Notes AI
        </Link>

        {/* 🔥 CREDITS DISPLAY */}
        {token && (
          <div className="flex flex-col items-center ml-4">
            <span className="font-semibold">
              💰 {credits}/20
            </span>

            {/* 🔥 LOW CREDIT WARNING */}
            {credits <= 5 && (
              <span className="text-red-200 text-xs">
                Low Credits!
              </span>
            )}
          </div>
        )}

        {/* Auth */}
        {!token ? (
          <Link to="/login" className="hover:text-gray-200">
            Login
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-white text-purple-600 px-3 py-1 rounded hover:bg-gray-200"
          >
            Logout
          </button>
        )}

      </div>
    </nav>
  )
}

export default Navbar