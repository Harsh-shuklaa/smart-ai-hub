import jwt from "jsonwebtoken"

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    // ❌ No header OR wrong format
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized" })
    }

    const token = authHeader.split(" ")[1]

    // ❌ No token after split
    if (!token) {
      return res.status(401).json({ message: "Token missing" })
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // ✅ Attach user id
    req.user = decoded.id

    next()

  } catch (error) {
    console.error("Auth Error:", error.message)
    return res.status(401).json({ message: "Token invalid" })
  }
}

export default authMiddleware