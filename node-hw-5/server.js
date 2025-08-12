import http from 'http'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT

const authServer = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/plain");

    if (!req.headers.authorization) {
        res.statusCode = 401;
        res.end("Unauthorized");
    } else {
        res.statusCode = 200;
        res.end("Authorization header received");
    }
})

authServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    
})
