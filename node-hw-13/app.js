import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/index.js';
import Magazine from './models/Magazine.js';
import Publisher from './models/Publisher.js';



dotenv.config()

const PORT = process.env.PORT;
const app = express();
app.use(express.json())


app.get('/', (_, res) => {
    res.send('Home Page')
})
app.get("/test-models", async (_, res) => {
  try {
    // Перевірка створення документів
    const publisher = new Publisher({
      name: "Test Publisher",
      location: "Test Location",
    });

    const magazine = new Magazine({
      title: "Test Magazine",
      issueNumber: 1,
      publisher: publisher._id,
    });

    res.json({
      message: "Models are available and working",
      publisher: publisher,
      magazine: magazine,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
    
})