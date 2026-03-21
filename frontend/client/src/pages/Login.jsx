import { useState } from "react"
import { loginUser } from "../services/api"


export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)


  const handleLogin = async () => {
    if (!email || !password) {
      alert("All fields required")
      return
    }

    setLoading(true)

    try {
      const res = await loginUser({ email, password })
      console.log("LOGIN RESPONSE:", res)

      if (res?.token) {
        // ✅ Save token
        localStorage.setItem("token", res.token)

        alert("Login successful")

        // 🔥 IMPORTANT FIX (force reload for navbar update)
        window.location.href = "/chat"
      } else {
        alert(res?.error || "Login failed")
      }

    } catch (error) {
      console.error("Login error:", error)
      alert("Something went wrong")
    }

    setLoading(false)
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">

        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </div>
    </div>
  )
}