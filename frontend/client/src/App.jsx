import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext" // ✅ FIXED
import Sidebar from "./components/Sidebar"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Chat from "./pages/Chat"
import ImageGen from "./pages/ImageGen"
import Resume from "./pages/Resume"
import Notes from "./pages/Notes"
import Login from "./pages/Login"
import Register from "./pages/Register"

// 🔹 Protected Route
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token")

  if (!token) {
    return <Navigate to="/login" />
  }

  return children
}

function AppContent() {
  const location = useLocation()

  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/register"

  return (
    <div className="min-h-screen flex flex-col pt-0">
      {!hideNavbar && <Navbar />}

      <Routes>

        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected */}
        <Route
          path="/dashboard"
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
        />

        <Route
          path="/chat"
          element={<ProtectedRoute><Chat /></ProtectedRoute>}
        />

        <Route
          path="/image"
          element={<ProtectedRoute><ImageGen /></ProtectedRoute>}
        />

        <Route
          path="/resume"
          element={<ProtectedRoute><Resume /></ProtectedRoute>}
        />

        <Route
          path="/notes"
          element={<ProtectedRoute><Notes /></ProtectedRoute>}
        />

      </Routes>

    </div>
  )
}

// 🔥 MAIN EXPORT
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}