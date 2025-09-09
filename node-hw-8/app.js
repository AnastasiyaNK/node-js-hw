import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import Book from "./models/book.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.get("/books", async (req, res) => {
  const books = await Book.findAll();
  res.json(books);
});


app.post("/books", async (req, res) => {
  const { title, author, year } = req.body;
  const book = await Book.create({ title, author, year });
  res.status(201).json(book);
});


app.put("/books/:id", async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });
  await book.update(req.body);
  res.json(book);
});


app.delete("/books/:id", async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });
  await book.destroy();
  res.json({ message: "Book deleted" });
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("DB error:", err));
