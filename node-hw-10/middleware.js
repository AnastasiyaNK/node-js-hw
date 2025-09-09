import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { users } from "./users.js";

dotenv.config();

export function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = users.find((u) => u.id === decoded.id);
    if (!req.user) return res.sendStatus(401);
    next();
  } catch (err) {
    return res.sendStatus(403);
  }
}

export function authorizeRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role)
      return res.status(403).json({ message: "Access denied" });
    next();
  };
}
