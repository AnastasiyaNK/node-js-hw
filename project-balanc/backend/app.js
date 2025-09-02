import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";


dotenv.config();

const PORT = process.env.PORT;
const app = express();
app.use(express.json());


app.get("/", (_, res) => {
  res.send("Home Page");
});

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
