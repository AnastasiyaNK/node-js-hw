const fs = require("fs");
const path = require("path");

const logFile = path.join(__dirname, "log.txt");

function LogMessage(message) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${message}\n`;

  fs.appendFile(logFile, logEntry, (err) => {
    if (err) {
      console.error("Logging error:", err);
    }
  });
}

module.exports = {LogMessage}