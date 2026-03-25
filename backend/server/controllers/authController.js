import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// 🔐 REGISTER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      credits: 20
    })

    res.json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        credits: user.credits
      }
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Server error"
    })
  }
}


// 🔐 LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email"
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password"
      })
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        credits: user.credits
      }
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Server error"
    })
  }
}


// 🔥 GET CURRENT USER (MOST IMPORTANT)
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user).select("credits")

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    res.json({
      success: true,
      credits: user.credits
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Server error"
    })
  }
}