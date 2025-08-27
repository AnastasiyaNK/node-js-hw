import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/index.js';
import cartRoutes from './routes/cartRouters.js'

dotenv.config()

const PORT = process.env.PORT;
const app = express();
app.use(express.json())
app.use("/api", cartRoutes)

app.get('/', (_, res) => {
    res.send('Home Page')
})

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
    
})