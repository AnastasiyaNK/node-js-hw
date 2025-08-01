const fs = require("fs").promises;

async function fileOperations() {
    try {
        await fs.writeFile("info.txt", "Node.js is awesome!");
        const data = await fs.readFile("info.txt", "utf-8");
        console.log(`File content: ${data}`);
        
        
    } catch (error) {
        console.error("Error:", error)
        
      
    }
}
fileOperations();

