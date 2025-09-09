import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { users,initUsers } from "./users.js";
import { authenticateJWT, authorizeRole } from "./middleware.js";

dotenv.config();
const app = express();
app.use(express.json());

await initUsers();


app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user)
    return res.status(400).json({ message: "Invalid email or password" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid)
    return res.status(400).json({ message: "Invalid email or password" });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.json({ token });
});


app.put("/update-email", authenticateJWT, (req, res) => {
  const { newEmail } = req.body;
  if (!newEmail)
    return res.status(400).json({ message: "New email is required" });

  // Перевірка на унікальність
  if (users.find((u) => u.email === newEmail)) {
    return res.status(400).json({ message: "Email already in use" });
  }

  req.user.email = newEmail;
  res.json({ message: "Email updated", user: req.user });
});


app.delete("/delete-account", authenticateJWT, (req, res) => {
  const index = users.findIndex((u) => u.id === req.user.id);
  if (index === -1) return res.status(404).json({ message: "User not found" });

  users.splice(index, 1);
  res.json({ message: "Account deleted" });
});


app.put("/update-role", authenticateJWT, authorizeRole("admin"), (req, res) => {
  const { id, role } = req.body;
  const user = users.find((u) => u.id === id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.role = role;
  res.json({ message: "Role updated", user });
});



app.post("/refresh-token", authenticateJWT, (req, res) => {
  const token = jwt.sign(
    { id: req.user.id, role: req.user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1m" }
  );
  res.json({ token });
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
