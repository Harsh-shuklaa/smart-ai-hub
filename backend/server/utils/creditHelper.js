import User from "../models/User.js"

export const handleCredits = async (userId) => {
  const user = await User.findById(userId)

  if (!user) {
    throw new Error("User not found")
  }

  // 🔥 AUTO RESET (DEV ONLY)
  if (user.credits <= 0) {
    user.credits = 20
  }

  user.credits -= 1

  await user.save()

  return user.credits
}