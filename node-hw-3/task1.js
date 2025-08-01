const { log } = require("console");
const fs = require("fs")

fs.mkdir("myFolder", (err) => {
    if (err) {
   return console.error((`Error created directory: ${err}`));
    
    };
    console.log("Directory myFolder created successfully");

})

fs.rmdir("myFolder", (err) => {
    if (err) {
        return console.error(`Error deleting directory: ${err}`);
    }
      console.log("Directory myFolder deleted successfully");

})