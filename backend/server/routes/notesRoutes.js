import express from "express"
import { summarizeNotes, getNotes } from "../controllers/notesController.js"
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()

// 🔹 Summarize Notes (Protected)
router.post("/summarize", authMiddleware, summarizeNotes)

// 🔹 Get Notes History (Protected)
router.get("/", authMiddleware, getNotes)

export default router