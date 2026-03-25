import express from "express"
import { registerUser, loginUser, getMe } from "../controllers/authController.js"
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()

// 🔹 AUTH
router.post("/register", registerUser)
router.post("/login", loginUser)

// 🔥 ADD THIS (MOST IMPORTANT)
router.get("/me", authMiddleware, getMe)

export default router