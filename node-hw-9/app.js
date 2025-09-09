import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sequelize from "./config/db.js";
import AppUser from "./models/appUser.js";

dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT;


const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Middleware для перевірки ролі admin
const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Access denied" });
  next();
};




app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "Fill all fields" });

  const existingUser = await AppUser.findOne({ where: { email } });
  if (existingUser)
    return res.status(400).json({ message: "Email already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await AppUser.create({ name, email, password: hashedPassword });

  res.status(201).json({ message: "User created", user });
});


app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await AppUser.findOne({ where: { email } });
  if (!user) return res.status(404).json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Wrong password" });

  const token = jwt.sign(
    { id: user.id, role: user.role, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ message: "Login successful", token });
});


app.post("/change-password", authenticateJWT, async (req, res) => {
  const { newPassword } = req.body;
  const user = await AppUser.findByPk(req.user.id);
  user.password = await bcrypt.hash(newPassword, 10);
  user.mustChangePassword = false;
  await user.save();
  res.json({ message: "Password updated" });
});


app.post("/delete-account", authenticateJWT, async (req, res) => {
  const { password } = req.body;
  const user = await AppUser.findByPk(req.user.id);
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Wrong password" });

  await user.destroy();
  res.json({ message: "Account deleted" });
});

// Доступ тільки для admin
app.get("/admin", authenticateJWT, authorizeAdmin, (req, res) => {
  res.json({ message: "Welcome Admin!" });
});


app.post("/change-email", authenticateJWT, async (req, res) => {
  const { newEmail, password } = req.body;
  const user = await AppUser.findByPk(req.user.id);
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Wrong password" });

  const emailTaken = await AppUser.findOne({ where: { email: newEmail } });
  if (emailTaken)
    return res.status(400).json({ message: "Email already in use" });

  user.email = newEmail;
  await user.save();
  res.json({ message: "Email updated" });
});

app.listen(PORT, async () => {
  await sequelize.authenticate();
  console.log(`Server running on http://localhost:${PORT}`);
});
