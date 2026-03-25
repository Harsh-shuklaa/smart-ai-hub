import express from "express"
import multer from "multer"
import authMiddleware from "../middleware/authMiddleware.js"
import { analyzeResume, getResumes } from "../controllers/resumeController.js"

const router = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  }
})

const upload = multer({ storage })

// 🔹 POST
router.post(
  "/analyze",
  authMiddleware,
  upload.single("resume"),
  analyzeResume
)

// 🔹 GET
router.get("/", authMiddleware, getResumes)

// ✅🔥 MOST IMPORTANT
export default router