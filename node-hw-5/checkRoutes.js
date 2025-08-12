import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;
const BASE_URL = `http://localhost:${PORT}`;


async function testRequests() {
    try {
      const putResponse = await axios({
        method: "put",
        url: BASE_URL,
        headers: { "Content-Type": "text/plain" },
      });
      console.log("PUT Response:", putResponse.data);

      // Тестуємо DELETE-запит
      const deleteResponse = await axios({
        method: "delete",
        url: BASE_URL,
        headers: { "Content-Type": "text/plain" },
      });
      console.log("DELETE Response:", deleteResponse.data);
    } catch (error) {
        console.error("Error executing the request:", error.message);
        
    }
    
}

testRequests();