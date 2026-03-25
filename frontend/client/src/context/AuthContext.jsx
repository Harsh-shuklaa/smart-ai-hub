import { createContext, useState, useEffect } from "react"
import axios from "axios"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [credits, setCredits] = useState(0)

  useEffect(() => {
    const loadCredits = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) return

        const res = await axios.get(
          "http://localhost:5000/api/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        console.log("🔥 CREDIT API:", res.data)

        if (res.data.success) {
          setCredits(res.data.credits)
        }

      } catch (err) {
        console.error(err)
      }
    }

    loadCredits()
  }, [])

  return (
    <AuthContext.Provider value={{ credits, setCredits }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext