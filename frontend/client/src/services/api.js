import axios from "axios"

const API_BASE =
  import.meta.env.VITE_API_BASE || "http://localhost:5000/api"

// ✅ Token helper (FIXED 🔥)
const getAuthHeaders = () => {
  const token = localStorage.getItem("token")

  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "" // 🔥 FIX HERE
    }
  }
}

// ✅ GET chats
export const fetchChats = async () => {
  try {
    const res = await axios.get(
      `${API_BASE}/chat`,
      getAuthHeaders()
    )

    return res.data
  } catch (error) {
    console.error("fetchChats error:", error)
    return { success: false, chats: [] }
  }
}

// ✅ SEND message
export const sendChatMessage = async (message, chatId) => {
  try {
    const res = await axios.post(
      `${API_BASE}/chat`,
      { message, chatId },
      getAuthHeaders()
    )

    return res.data
  } catch (error) {
    console.error("sendChatMessage error:", error)
    return { success: false }
  }
}

// 🔹 Register
export const registerUser = async (userData) => {
  try {
    const res = await axios.post(`${API_BASE}/auth/register`, userData)
    return res.data
  } catch (error) {
    console.error("register error:", error)
    return { success: false }
  }
}

// 🔹 Login
export const loginUser = async (userData) => {
  try {
    const res = await axios.post(`${API_BASE}/auth/login`, userData)
    return res.data
  } catch (error) {
    console.error("login error:", error)
    return { success: false }
  }
}