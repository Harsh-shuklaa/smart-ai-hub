import { useState } from "react"
import { registerUser } from "../services/api"
import { useNavigate } from "react-router-dom"

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("All fields required")
      return
    }

    const res = await registerUser({ name, email, password })

    if (res && res.success) {
      alert("Registered successfully")
      navigate("/login")
    } else {
      alert(res.error || "Register failed")
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">

        <h2 className="text-xl font-bold mb-4 text-center">Register</h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full mb-3 p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
          onClick={handleRegister}
          className="w-full bg-green-600 text-white p-2 rounded"
        >
          Register
        </button>

      </div>
    </div>
  )
}