import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import connectDB from "./db/index.js";

dotenv.config();

const PORT = process.env.PORT || 3002;
const app = express();

// Middleware
app.use(express.json());

// Routes
app.get("/", (_, res) => {
  res.send("Main page");
});

app.use("/api/auth", authRoutes);

// Start server
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});