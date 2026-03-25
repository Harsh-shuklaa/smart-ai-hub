import express from "express"
import { generateImage } from "../controllers/imageController.js"
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/", authMiddleware, generateImage)

export default router