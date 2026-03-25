import axios from "axios"
import { handleCredits } from "../utils/creditHelper.js" // ✅ FIX (extension bhi)

export const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body

    if (!prompt) {
      return res.status(400).json({ error: "Prompt required" })
    }

    // 🔥 CALL HUGGINGFACE API (same as before)
    const response = await axios.post(
      "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0",
      {
        inputs: prompt
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          Accept: "image/png"
        },
        responseType: "arraybuffer"
      }
    )

    // 🔥 Convert image (same as before)
    const base64Image = Buffer.from(response.data).toString("base64")
    const image = `data:image/png;base64,${base64Image}`

    // ✅ CREDIT DEDUCT (AFTER SUCCESS)
    const remainingCredits = await handleCredits(req.user)

    // ✅ FINAL RESPONSE
    res.json({
      success: true,
      image,
      credits: remainingCredits
    })

  } catch (err) {

    // ❌ CREDIT ERROR HANDLE
    if (err.message === "No credits remaining") {
      return res.status(403).json({
        success: false,
        message: err.message
      })
    }

    console.error("HF ERROR:", err.response?.data?.toString() || err.message)

    res.status(500).json({
      error: "Image generation failed"
    })
  }
}