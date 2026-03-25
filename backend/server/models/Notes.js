import mongoose from "mongoose"

const notesSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    originalText: {
      type: String,
      required: true
    },

    summary: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

const Notes = mongoose.model("Notes", notesSchema)

export default Notes