import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

router.get("/cart", async (_, res) => {
  try {
    const product = await Product.find();
    res.send(product);
  } catch (error) {
    console.error("Error server", error.message);
    res.status(500).send({ message: "Error server" });
  }
});

router.post("/cart", async (req, res) => {
  try {
    const { name, quantity, price } = req.body;
    const newProduct = await Product.create({ name, quantity, price });
    res.status(201).send({ message: "Array of products", newProduct });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
});

router.patch("/cart/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity, price } = req.body;
    if (!name || quantity == null || price == null || price <= 0)
      return res.status(400).json({
        message: "Name is required, quantity must be ≥ 0, price must be > 0",
      });
    const updateProduct = await Product.findByIdAndUpdate(
      id,
      { name, quantity, price },
      { new: true, runValidators: true }
    );
    if (!updateProduct) {
      return res.status(404).send({ message: "Not Found" });
    }
    res.status(201).send({ message: "Product updated", updateProduct });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
});

router.delete("/cart/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).send({ message: "Not Found Product" });
    }
    res.send({ message: "Product deleted" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
});

export default router;
