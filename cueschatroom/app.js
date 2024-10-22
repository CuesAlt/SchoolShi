const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Listen for client connections
io.on('connection', (socket) => {
  console.log('New user connected');

  // Listen for chat messages
  socket.on('chatMessage', (msgData) => {
    // Broadcast message to everyone
    io.emit('chatMessage', msgData);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
