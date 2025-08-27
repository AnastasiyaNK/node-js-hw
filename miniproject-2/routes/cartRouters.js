import express from 'express'
import Product from '../models/Product.js'

const router = express.Router()

router.get("/cart", async (_, res) => {
    try {
        const product = await Product.find();
        res.send(product)
    } catch (error) {
        console.error("Error server", error.message)
        res.status(500).send({ message: "Error server" });
        
    }
})

router.post("/cart", async (req, res) => {
    try {
        const { name, quantity, price } = req.body;
        const newProduct = new Product({ name, quantity, price });
         res.status(201).send({ message: "Array of products", newProduct });
    } catch (error) {
     res.status(500).send({message: "Internal server error", error: error.message})
        
    }
})

export default router;