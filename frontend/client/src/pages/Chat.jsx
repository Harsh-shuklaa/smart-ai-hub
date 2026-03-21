import { useEffect, useState, useRef } from "react"
import { sendChatMessage, fetchChats } from "../services/api"
import { useNavigate } from "react-router-dom"
import ReactMarkdown from "react-markdown"

export default function Chat() {
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState("")
  const [chatList, setChatList] = useState([])
  const [chatId, setChatId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [cooldown, setCooldown] = useState(false) // 🔥 FIX: prevent spam

  const navigate = useNavigate()
  const bottomRef = useRef(null)

  // 🔐 Auth check
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) navigate("/login")
  }, [navigate])

  // 🔽 Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // 🔹 Load chats
  const loadChats = async () => {
    try {
      const res = await fetchChats()
      if (res?.success) setChatList(res.chats || [])
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
  const initChats = async () => {
    try {
      const res = await fetchChats()
      if (res?.success) {
        setChatList(res.chats || [])
      }
    } catch (err) {
      console.error(err)
    }
  }

  initChats()
}, [])

  // 🔹 Send message
  const handleSend = async () => {
    // 🔥 FIX: prevent spam + multiple clicks
    if (!message.trim() || loading || cooldown) return

    const userMsg = message
    setMessage("")
    setLoading(true)
    setCooldown(true) // 🔥 FIX

    // 🔥 FIX: unique ID for AI message
    const aiId = Date.now()

    // ✅ Add user + empty AI message
    setMessages((prev) => [
      ...prev,
      { role: "user", content: userMsg, id: Date.now() + 1 },
      { role: "ai", content: "⏳ Thinking...", id: aiId }
    ])

    try {
      const res = await sendChatMessage(userMsg, chatId)

      let aiText = "No response"

      // 🔥 FIX: backend returns only { reply }
      if (res?.reply) {
        aiText = res.reply
      }

      // 🔥 FIX: update by ID (NOT last index)
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === aiId
            ? { ...msg, content: String(aiText) }
            : msg
        )
      )

      loadChats()

    } catch (err) {
      console.error(err)

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === aiId
            ? { ...msg, content: "❌ Error getting response" }
            : msg
        )
      )
    }

    // 🔥 FIX: cooldown delay (avoid 429 error)
    setTimeout(() => {
      setCooldown(false)
    }, 5000)

    setLoading(false)
  }

  // 🔹 Copy
  const copyText = (text, index) => {
    navigator.clipboard.writeText(text || "")

    setMessages((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], copied: true }
      return updated
    })

    setTimeout(() => {
      setMessages((prev) => {
        const updated = [...prev]
        updated[index] = { ...updated[index], copied: false }
        return updated
      })
    }, 1500)
  }

  // 🔹 Select chat
  const handleSelectChat = (chat) => {
    setChatId(chat._id)
    setMessages(chat.messages || [])
  }

  // 🔹 New chat
  const handleNewChat = () => {
    setChatId(null)
    setMessages([])
  }

  return (
    <div className="flex h-screen bg-gray-200">

      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-4 flex flex-col">
        <button
          onClick={handleNewChat}
          className="bg-blue-600 p-2 rounded mb-4 hover:bg-blue-700 transition"
        >
          + New Chat
        </button>

        <div className="flex-1 overflow-y-auto space-y-2">
          {chatList.map((chat) => (
            <div
              key={chat._id}
              onClick={() => handleSelectChat(chat)}
              className="p-2 bg-gray-700 rounded cursor-pointer hover:bg-gray-600"
            >
              Chat {chat._id.slice(-4)}
            </div>
          ))}
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">

        {/* Header */}
        <div className="bg-linear-to-r from-blue-600 to-blue-500 text-white p-4 font-semibold shadow">
          SmartAI Chat 🚀
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100">

          {messages.map((msg, i) => (
            <div
              key={msg.id || i}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-3 rounded-2xl max-w-[75%] text-sm shadow-md relative ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-800"
                }`}
              >
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown>
                    {String(msg.content || "")}
                  </ReactMarkdown>
                </div>

                {msg.role === "ai" && (
                  <button
                    onClick={() => copyText(msg.content, i)}
                    className="absolute top-1 right-2 text-xs text-gray-400 hover:text-black"
                  >
                    {msg.copied ? "Copied ✅" : "Copy"}
                  </button>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="text-gray-500 text-sm animate-pulse">
              🤖 Thinking...
            </div>
          )}

          <div ref={bottomRef}></div>
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask anything..."
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                handleSend()
              }
            }}
          />

          <button
            onClick={handleSend}
            disabled={loading || cooldown} // 🔥 FIX
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full"
          >
            {loading ? "..." : cooldown ? "Wait..." : "Send"}
          </button>
        </div>

      </div>
    </div>
  )
}