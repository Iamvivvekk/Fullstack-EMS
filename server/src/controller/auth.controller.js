import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
Login for employee and admin

* POST api/auth/login
 */
export const login = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Both email and password required" });

  const user = await User.find({ email });

  if (!user) return res.status(401).json({ error: "Invalid Credentials" });

  if (role === "admin" && user.role !== "ADMIN")
    return res.status(401).json({ error: "Not authorized as admin" });

  if (role === "employee" && user.role !== "EMPLOYEE")
    return res.status(401).json({ error: "Not authorized as employee" });

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword)
    return res.status(401).json({ error: "Invalid Credentials" });

  const payload = {
    userId: user._id,
    email: user.email,
    password: user.password,
  };

  const token = await jwt.sign(payload, process.env.AUTH_SECRET_KEY, {
    expiresIn: "7d",
  });

  return res.status(200).json({ success: true, user: payload, token });

  try {
  } catch (error) {
    return res.status(500).json({ error: "Login Error :", error });
  }
};

/**
 * Get session for employee and admin
 * GET /api/auth/session
 */
export const session = (req, res) => {
  const session = req.session;
  return res.json({ user: session });
};

/**
 * Change password for employee and admin
 * POST /api/auth/change-password
 */
export const changePassword = async () => {
  const session = req.session;
  const { newPassword, currentPassword } = req.body;

  if (!newPassword || !currentPassword)
    return res.status(400).json({ error: "Both password required" });

  try {
    const user = await User.findById(session.userId);
    const isCorrectPassword = await bcrypt.compare(
      currentPassword,
      user.password,
    );
    if (!isCorrectPassword)
      return res.status(400).json({ error: "Incorrect current password" });

    user.password = newPassword;

    await user.save();
  } catch (error) {
    return res.status(500).json({ error: "Change password error :", error });
  }
};
