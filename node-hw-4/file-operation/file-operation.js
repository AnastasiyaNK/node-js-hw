import fs from 'fs'
import dotenv from 'dotenv'
import { log } from 'console';
dotenv.config()

const fileName = process.env.FILENAME;
const fileContent = "This is my file content\nCreated with Node.js";

fs.writeFile(fileName, fileContent, (err) => {
    if (err) {
        console.error('Error writing file:' + err);
        return
        
    }
    console.log(`File ${fileName} created successfully`);
    

    fs.readFile(fileName, "utf8", (err, data) => {
        if (err) {
            console.error('Error riding file', err);
            return
        }
        console.log('\nFile content');
        console.log('data');
        
    })
    
})