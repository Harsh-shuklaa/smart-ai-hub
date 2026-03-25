import fs from "fs"
import { createRequire } from "module"
import Resume from "../models/Resume.js"
import { generateAIResponse } from "../services/aiService.js"
import { handleCredits } from "../utils/creditHelper.js"

const require = createRequire(import.meta.url)
const pdf = require("pdf-parse/lib/pdf-parse.js")

// 🔹 ANALYZE
export const analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" })
    }

    const dataBuffer = fs.readFileSync(req.file.path)
    const data = await pdf(dataBuffer)

    const resumeText = data.text

    const prompt = `
You are a professional resume reviewer.

Analyze this resume and give:
1. Strengths
2. Weaknesses
3. Suggestions

Resume:
${resumeText}
    `

    const aiResponse = await generateAIResponse(prompt)

    // 🔥 SAVE
    const saved = await Resume.create({
      user: req.user,
      fileName: req.file.originalname,
      analysis: aiResponse
    })

    // 🔥 CREDIT
    const remainingCredits = await handleCredits(req.user)

    res.json({
      success: true,
      analysis: aiResponse,
      resume: saved,
      credits: remainingCredits
    })

  } catch (error) {

    if (error.message === "No credits remaining") {
      return res.status(403).json({
        success: false,
        message: error.message
      })
    }

    console.error("RESUME ERROR:", error)
    res.status(500).json({ error: "Resume analysis failed" })
  }
}

// 🔹 GET HISTORY
export const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user })
      .sort({ createdAt: -1 })

    res.json({
      success: true,
      resumes
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Server error" })
  }
}