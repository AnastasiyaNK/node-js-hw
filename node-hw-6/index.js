import express from "express";
import db from "./db.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());


app.get("/", (_, res) => {
  try {
    res.send("Hello, World!");
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
});


app.post("/", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  res.json({ message: `Hello, ${name}!` });
});


app.get("/products", async (_, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM products");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching products" });
  }
});


app.post("/products", async (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(400).json({ error: "Name and price are required" });
  }
  try {
    await db.query("INSERT INTO products (name, price) VALUES (?, ?)", [
      name,
      price,
    ]);
    res.json({ message: "Product added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error adding product" });
  }
});


app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
});
