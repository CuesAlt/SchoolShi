// Get elements
const registerButton = document.getElementById('registerButton');
const chatArea = document.getElementById('chatArea');
const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const errorMessage = document.getElementById('errorMessage');

// Function to set cookies
function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
}

// Function to get cookies
function getCookie(name) {
    return document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=');
        return parts[0] === name ? decodeURIComponent(parts[1]) : r
    }, '');
}

// Check for existing user
const existingUser = getCookie('username');
if (existingUser) {
    showChatArea(existingUser);
}

// Register button click
registerButton.addEventListener('click', () => {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const password = document.getElementById('password').value;

    // Validate password
    if (password.length < 5 || !/[A-Z]/.test(password)) {
        errorMessage.textContent = "Password must be at least 5 characters and include 1 uppercase letter.";
        return;
    }

    const username = firstName.charAt(0).toUpperCase() + lastName.toLowerCase();
    setCookie('username', username, 7); // Store username for 7 days
    showChatArea(username);
});

// Function to show chat area
function showChatArea(username) {
    document.getElementById('registration').style.display = 'none';
    chatArea.style.display = 'block';
    messagesDiv.innerHTML = `<p>Welcome, ${username}!</p>`;
}

// Send button click
sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    const username = getCookie('username');

    if (message) {
        const date = new Date();
        const time = date.toLocaleTimeString();
        const day = date.toLocaleDateString();
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.innerHTML = `<strong>${username}</strong> (${day} ${time}): ${message}`;
        messagesDiv.appendChild(messageElement);
        messageInput.value = '';
        messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll to the bottom
    }
});
