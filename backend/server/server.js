import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import connectDB from "./config/db.js"

import authRoutes from "./routes/authRoutes.js"
import chatRoutes from "./routes/chatRoutes.js"
import imageRoutes from "./routes/imageRoutes.js"
import resumeRoutes from "./routes/resumeRoutes.js"
import notesRoutes from "./routes/notesRoutes.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

// connect database
connectDB()

// routes
app.use("/api/auth", authRoutes)
app.use("/api/chat", chatRoutes)
app.use("/api/image", imageRoutes)
app.use("/api/resume", resumeRoutes)
app.use("/api/notes", notesRoutes)

// test route
app.get("/", (req, res) => {
  res.send("Smart AI Hub API running")
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})