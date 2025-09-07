import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import Category from "./models/Category.js";
import Product from "./models/Product.js";

dotenv.config();

const PORT = process.env.PORT;
const app = express();
app.use(express.json());

app.get("/", (_, res) => {
  res.send("Home Page");
});

app.post("/categories", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }
    const category = new Category({ name });
    await category.save();
    res.status(201).json({ message: "Category successfully added", category });
  } catch (error) {
    res.status(500).json({ message: "Server error while creating category" });
  }
});

app.post("/products", async (req, res) => {
  try {
    const { name, price, category } = req.body;
    if (!name || !price || !category) {
      return res.status(400).json({
        message: "Please provide product name, price, and category",
      });
    }

    const foundCategory = await Category.findOne({ name: category });
    if (!foundCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    const product = new Product({
      name,
      price,
      category: foundCategory._id,
    });

    await product.save();

    res.status(201).json({
      message: "Product successfully added",
      product,
    });
  } catch (error) {
    console.error("Error while adding product:", error);
    res.status(500).json({ message: "Server error while adding product" });
  }
});

app.get("/products", async (_, res) => {
  try {
    const products = await Product.find().populate("category");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching products" });
  }
});

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
