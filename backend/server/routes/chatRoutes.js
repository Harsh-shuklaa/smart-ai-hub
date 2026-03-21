import express from "express"
import { sendMessage, getChats } from "../controllers/chatController.js"
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/", authMiddleware, sendMessage)
router.get("/", authMiddleware, getChats)

export default router