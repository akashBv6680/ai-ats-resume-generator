import { User } from "../models/User.js";
import { signToken } from "../utils/jwt.js";
import { isNonEmptyString, requireFields } from "../utils/validation.js";

export async function register(req, res) {
  const missing = requireFields(req.body, ["name", "email", "password"]);
  if (missing.length) {
    return res.status(400).json({ message: `Missing fields: ${missing.join(", ")}` });
  }

  const { name, email, password } = req.body;

  if (!isNonEmptyString(email) || !isNonEmptyString(password)) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(409).json({ message: "Email already registered" });
  }

  const passwordHash = await User.hashPassword(password);
  const user = await User.create({ name, email, passwordHash });

  return res.status(201).json({
    id: user._id,
    name: user.name,
    email: user.email
  });
}

export async function login(req, res) {
  const missing = requireFields(req.body, ["email", "password"]);
  if (missing.length) {
    return res.status(400).json({ message: `Missing fields: ${missing.join(", ")}` });
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const ok = await user.verifyPassword(password);
  if (!ok) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = signToken({ sub: user._id.toString(), role: user.role });

  return res.json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
}
