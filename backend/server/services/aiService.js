import dotenv from "dotenv"
dotenv.config()

import axios from "axios"

// 🔥 delay helper
const delay = (ms) => new Promise((res) => setTimeout(res, ms))

export const generateAIResponse = async (message, retryCount = 0) => {
  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=" + process.env.GEMINI_API_KEY,
      {
        contents: [
          {
            parts: [{ text: message }]
          }
        ]
      }
    )

    const text =
      response?.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response"

    console.log("GEMINI RAW:", text)

    return text

  } catch (error) {
    console.error("Gemini Error:", error.response?.data || error.message)

    // 🔥 HANDLE RATE LIMIT (429)
    if (error.response?.status === 429) {
      if (retryCount < 3) {
        console.log(`Retrying... Attempt ${retryCount + 1}`)

        await delay(2000) // ⏳ wait 2 sec

        return generateAIResponse(message, retryCount + 1)
      }

      return "⚠️ AI is busy. Try again after few seconds."
    }

    // 🔥 OTHER ERRORS
    return "❌ AI not responding"
  }
}