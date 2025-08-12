import http from "http";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;

const methodServer = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/plain")
    if (req.method === 'PUT') {
        res.statusCode = 200;
        res.end("PUT request is processed");
    } else if (req.method === 'DELETE') {
        res.statusCode = 200;
        res.end("DELETE request is processed");
    } else {
        res.statusCode = 405; 
        res.end("Method Not Allowed");
    }
});


methodServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
