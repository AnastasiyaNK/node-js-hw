const EventEmitter = require('events')
const emitter = new EventEmitter()

function sendMessage(userName, message, emitter) {
  console.log(`Sending message from ${userName}..`);
  emitter.emit("message", userName, message);
}
emitter.on("message", (userName, message) => {
    console.log(`${userName}: ${message}`);
    
})

sendMessage("Alice", "Hello everyone", emitter)
sendMessage("Bob", "Hey Alice! How are you?", emitter);
sendMessage("Alice", "I'm good, thanks for asking!", emitter);
sendMessage("Charlie", "Anyone for lunch later?", emitter);
