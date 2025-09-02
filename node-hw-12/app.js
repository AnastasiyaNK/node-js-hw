import express from "express";
import { connectToDatabase, getDb } from "./db/index.js";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

async function startServer() {
  try {
    await connectToDatabase(); // чекаємо підключення
    const db = getDb(); // тепер db точно визначено
    const products = db.collection("products");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
}

startServer();

app.use(express.json());
app.get("/", (_, res) => {
  res.send("Home page");
});


app.post("/products", async (req, res) => {
    try {
        const result = await products.insertOne(req.body)
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
})