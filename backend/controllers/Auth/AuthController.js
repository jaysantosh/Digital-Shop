const User = require("../../models/User")
const bcrypt = require("bcryptjs")

// Register User
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user
    const newUser = new User({ name, email, password: hashedPassword, role })
    await newUser.save()

    res.json({ id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role })
  } catch (error) {
    res.status(500).json({ message: "Error registering user" })
  }
}

// Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" })
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" })
    }

    // Store user session
    req.session.user = { id: user._id, name: user.name, email: user.email, role: user.role }

    res.json({ id: user._id, name: user.name, email: user.email, role: user.role })
  } catch (error) {
    res.status(500).json({ message: "Error logging in" })
  }
}

// Logout User
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Logged out successfully" })
    console.log("logged out")
  })
}
