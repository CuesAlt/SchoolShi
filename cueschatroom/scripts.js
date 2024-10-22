// Variables to store user details
let username = '';
let password = '';
const socket = io(); // Socket.io for real-time communication

// Function to create username
function createUsername(firstName, lastName) {
  return firstName.charAt(0) + lastName;
}

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  password = document.getElementById('password').value;
  
  // Create and save username
  username = createUsername(firstName, lastName);
  
  // Save user details in cookies
  document.cookie = `username=${username}; path=/; max-age=86400`; // Expires in 1 day
  document.cookie = `password=${password}; path=/; max-age=86400`; // Expires in 1 day
  
  // Hide login form and show chat
  document.getElementById('loginDiv').style.display = 'none';
  document.getElementById('chatDiv').style.display = 'block';
});

// Handle sending messages
document.getElementById('sendMessage').addEventListener('click', () => {
  const message = document.getElementById('messageInput').value;
  const time = new Date().toLocaleTimeString();
  const date = new Date().toLocaleDateString();
  
  // Send message to server
  socket.emit('chatMessage', { username, message, time, date });
  
  // Clear input
  document.getElementById('messageInput').value = '';
});

// Display messages received from the server
socket.on('chatMessage', (data) => {
  const chatWindow = document.getElementById('chatWindow');
  
  const messageElement = document.createElement('div');
  messageElement.textContent = `${data.time} ${data.date} - ${data.username}: ${data.message}`;
  
  chatWindow.appendChild(messageElement);
});
