import Chat from "../models/Chat.js"
import { generateAIResponse } from "../services/aiService.js"

// 🔹 Send Message
export const sendMessage = async (req, res) => {
  try {
    const { message, chatId } = req.body

    if (!message) {
      return res.status(400).json({ error: "Message required" })
    }

    const aiReply = await generateAIResponse(message)
    console.log("AI REPLY:", aiReply)

    let chat

    if (chatId) {
      chat = await Chat.findOne({
        _id: chatId,
        user: req.user
      })

      if (!chat) {
        return res.status(404).json({ error: "Chat not found" })
      }

      chat.messages.push(
        { role: "user", content: message },
        { role: "ai", content: aiReply }
      )

      await chat.save()

    } else {
      chat = await Chat.create({
        user: req.user,
        messages: [
          { role: "user", content: message },
          { role: "ai", content: aiReply }
        ]
      })
    }

    // ✅ 🔥 UPDATED LINE (IMPORTANT)
   res.json({
  success: true,        // ✅ ADD THIS
  reply: aiReply,
  chat                  // ✅ ADD THIS (for future use)
})

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Server error" })
  }
}


// 🔹 Get Chats (USER-SPECIFIC)
export const getChats = async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.user }).sort({ createdAt: -1 })

    res.json({
      success: true,
      chats
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Server error" })
  }
}