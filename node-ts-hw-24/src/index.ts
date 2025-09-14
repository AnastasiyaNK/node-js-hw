import dotenv from 'dotenv'
import express, { Request, Response } from "express";
dotenv.config()



const app = express();
const PORT = process.env.PORT;

app.use(express.json());


app.get("/", (req: Request, res: Response) => {
  res.send("Привет! Это GET маршрут 🚀");
});


app.post("/data", (req: Request, res: Response) => {
  const body = req.body;
  res.json({
    message: "Данные успешно получены ✅",
    data: body,
  });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
