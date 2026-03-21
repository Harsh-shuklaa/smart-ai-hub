import mongoose from "mongoose"

const creditSchema = new mongoose.Schema({
  userId:String,
  credits:{
    type:Number,
    default:10
  }
})

export default mongoose.model("Credit",creditSchema)