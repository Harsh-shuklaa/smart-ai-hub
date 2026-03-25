import Notes from "../models/Notes.js"
import { generateAIResponse } from "../services/aiService.js"
import { handleCredits } from "../utils/creditHelper.js"

// 🔹 Summarize Notes
export const summarizeNotes = async (req, res) => {
  try {
    const { text } = req.body

    if (!text) {
      return res.status(400).json({ error: "Text is required" })
    }

    const prompt = `Summarize the following text in a clear and concise way:\n\n${text}`

    // ✅ AI CALL
    const aiSummary = await generateAIResponse(prompt)

    // ❌ अगर AI fail
    if (!aiSummary || aiSummary.includes("❌")) {
      return res.status(500).json({
        success: false,
        message: "AI failed, try again"
      })
    }

    // ✅ CREDIT FIRST (IMPORTANT 🔥)
    const remainingCredits = await handleCredits(req.user)

    // ✅ SAVE AFTER CREDIT
    const note = await Notes.create({
      user: req.user,
      originalText: text,
      summary: aiSummary
    })

    res.json({
      success: true,
      summary: aiSummary,
      note,
      credits: remainingCredits
    })

  } catch (error) {

    if (error.message === "No credits remaining") {
      return res.status(403).json({
        success: false,
        message: error.message
      })
    }

    console.error("NOTES ERROR:", error)
    res.status(500).json({ error: "Server error" })
  }
}


// 🔹 Get Notes History
export const getNotes = async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user })
      .sort({ createdAt: -1 })

    res.json({
      success: true,
      notes
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Server error" })
  }
}