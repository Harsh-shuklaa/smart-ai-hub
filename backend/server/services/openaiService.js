import axios from "axios"

export const generateAIResponse = async (message) => {
  try {
    const res = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful AI assistant." },
          { role: "user", content: message }
        ]
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    )

    return res.data.choices[0].message.content

  } catch (error) {
    console.error("OpenAI Error:", error.response?.data || error.message)
    return "AI error occurred"
  }
}