import express from "express"
import {summarizeNotes} from "../controllers/notesController.js"

const router = express.Router()

router.post("/",summarizeNotes)

export default router