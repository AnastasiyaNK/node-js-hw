import fs from "fs";
import http from "http";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;
const errorServer = http.createServer((req, res) => {
  try {
    throw new Error("Testing error");
  } catch (error) {
      const errorMessage = `${new Date().toISOString()} - ${error.message}\n`;
      fs.appendFile("errors.log", errorMessage, (err) => {
           if (err) {
             console.error("Failed to write to log file:", err);
           }
          
      });
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/plain");
      res.end("Internal Server Error");
      
  }
});

errorServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
