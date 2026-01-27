import { verifyToken } from "../utils/jwt.js";
import { User } from "../models/User.js";

export async function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";
    const [, token] = authHeader.split(" ");

    if (!token) {
      return res.status(401).json({ message: "Missing token" });
    }

    const payload = verifyToken(token);
    const user = await User.findById(payload.sub).lean();

    if (!user) {
      return res.status(401).json({ message: "Invalid token user" });
    }

    req.user = { id: user._id.toString(), role: user.role };
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

export function requireRole(roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    return next();
  };
}
