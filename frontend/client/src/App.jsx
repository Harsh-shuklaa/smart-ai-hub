import { Routes, Route, Navigate, useLocation } from "react-router-dom"

import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Chat from "./pages/Chat"
import ImageGen from "./pages/ImageGen"
import ResumeAnalyzer from "./pages/ResumeAnalyzer"
import NotesSummarizer from "./pages/NotesSummarizer"
import Login from "./pages/Login"
import Register from "./pages/Register"

// 🔹 Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token")

  if (!token) {
    return <Navigate to="/login" />
  }

  return children
}

function App() {
  const location = useLocation()

  // 🔹 Hide Navbar on auth pages
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/register"

  return (
    <div className="min-h-screen bg-gray-100">

      {!hideNavbar && <Navbar />}

      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />

        <Route
          path="/image"
          element={
            <ProtectedRoute>
              <ImageGen />
            </ProtectedRoute>
          }
        />

        <Route
          path="/resume"
          element={
            <ProtectedRoute>
              <ResumeAnalyzer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <NotesSummarizer />
            </ProtectedRoute>
          }
        />

      </Routes>

    </div>
  )
}

export default App