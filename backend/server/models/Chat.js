import mongoose from "mongoose"

const chatSchema = new mongoose.Schema(
{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  messages: [
    {
      role: String,
      content: String
    }
  ]
},
{
  timestamps: true
}
)

const Chat = mongoose.model("Chat", chatSchema)

export default Chat