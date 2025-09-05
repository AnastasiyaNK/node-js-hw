import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import userBalance from "./routes/userBalance.js";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

// Налаштування CORS для дозволу запитів з фронтенду на порту 5173
const corsOptions = {
  origin: "http://localhost:5173", // Дозволяємо лише цей домен
  methods: ["GET", "POST", "PUT", "DELETE"], // Дозволяємо ці методи
  allowedHeaders: ["Content-Type", "Authorization"], // Дозволяємо ці заголовки
  credentials: true, // Дозволяємо передачу куків
};

app.use(
  cors({
    origin: "http://localhost:5173", // Дозволяємо лише цей домен
  })
);

app.use(express.json());
app.use("/user", userBalance);

app.get("/", (_, res) => {
  res.send("Home Page");
});

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
