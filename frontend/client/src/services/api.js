import axios from "axios"

const API_BASE =
  import.meta.env.VITE_API_BASE || "http://localhost:5000/api"

// ✅ Token helper
const getAuthHeaders = () => {
  const token = localStorage.getItem("token")

  if (!token) return {}

  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
}

//
// ========================
// 🔐 AUTH APIs
// ========================
//

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

//
// ========================
// 💬 CHAT APIs
// ========================
//

// 🔹 GET chats
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

// 🔹 SEND message
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

//
// ========================
// 🎨 IMAGE APIs
// ========================
//

// 🔹 Generate Image
export const generateImage = async (prompt) => {
  try {
    const res = await axios.post(
      `${API_BASE}/image`,
      { prompt },
      getAuthHeaders()
    )
    return res.data
  } catch (error) {
    console.error("image error:", error)
    return { success: false }
  }
}

//
// ========================
// 📝 NOTES APIs (🔥 ADD THIS)
// ========================
//

// 🔹 Summarize Notes
export const summarizeNotes = async (text) => {
  try {
    const res = await axios.post(
      `${API_BASE}/notes/summarize`,
      { text },
      getAuthHeaders()
    )
    return res.data
  } catch (error) {
    console.error("summarizeNotes error:", error)
    return { success: false }
  }
}

// 🔹 Get Notes History
export const fetchNotes = async () => {
  try {
    const res = await axios.get(
      `${API_BASE}/notes`,
      getAuthHeaders()
    )
    return res.data
  } catch (error) {
    console.error("fetchNotes error:", error)
    return { success: false, notes: [] }
  }
}