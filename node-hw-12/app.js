import express from "express";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";
import { createConnectDB, getDB } from "./db/index.js";

dotenv.config();
const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("Home page"));

createConnectDB()
  .then(() => {
    const db = getDB();
    const products = db.collection("products");

    // CREATE
    app.post("/products", async (req, res) => {
      try {
        const result = await products.insertOne(req.body);
        res.status(201).json(result);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
      }
    });

    // READ ALL
    app.get("/products", async (req, res) => {
      try {
        const items = await products.find().toArray();
        res.json(items);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
      }
    });

    // READ ONE
    app.get("/products/:id", async (req, res) => {
      try {
        const item = await products.findOne({
          _id: new (await import("mongodb")).ObjectId(req.params.id),
        });
        if (!item) return res.status(404).json({ error: "Not found" });
        res.json(item);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
      }
    });

    // UPDATE
    app.put("/products/:id", async (req, res) => {
      try {
        const filter = { _id: new ObjectId(req.params.id) };
       const result = await products.findOneAndUpdate(
         filter,
         { $set: req.body },
         { returnDocument: "after" }
       );
       res.json(result.value ?? result); 
        if (!result.value) return res.status(404).json({ error: "Not found" });
        res.json(result.value);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
      }
    });

    // DELETE
    app.delete("/products/:id", async (req, res) => {
      try {
        const result = await products.deleteOne({
          _id: new (await import("mongodb")).ObjectId(req.params.id),
        });
        if (result.deletedCount === 0)
          return res.status(404).json({ error: "Not found" });
        res.json({ success: true });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
      }
    });

    app.use((req, res) => res.status(404).send("Not Found"));
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send("Something broke!");
    });

    app.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
    process.exit(1);
  });
