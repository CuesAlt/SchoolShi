document.getElementById('sendBtn').addEventListener('click', () => {
    const userInput = document.getElementById('userInput').value.trim();
    if (userInput) {
        addUserMessage(userInput);
        getBotResponse(userInput);
        document.getElementById('userInput').value = ''; // Clear input
    }
});

function addUserMessage(message) {
    const chatArea = document.getElementById('chatArea');
    const userMessage = document.createElement('div');
    userMessage.classList.add('user-message');
    userMessage.textContent = message;
    chatArea.appendChild(userMessage);
    chatArea.scrollTop = chatArea.scrollHeight; // Scroll to bottom
}

function getBotResponse(userInput) {
    const chatArea = document.getElementById('chatArea');
    const botMessage = document.createElement('div');
    botMessage.classList.add('bot-message');

    let response = getAnswer(userInput);
    botMessage.textContent = response;
    chatArea.appendChild(botMessage);
    chatArea.scrollTop = chatArea.scrollHeight; // Scroll to bottom
}

function getAnswer(question) {
    // Basic keyword-based responses
    const responses = {
        "hello": "Hi there! How can I help you today?",
        "weather": "I'm sorry, I can't provide real-time weather updates.",
        "name": "I'm a simple chatbot created to help answer basic questions!",
        "windows 10": "Windows 10 is a popular operating system developed by Microsoft."
    };

    // Look for a matching response based on keywords
    question = question.toLowerCase();
    for (let keyword in responses) {
        if (question.includes(keyword)) {
            return responses[keyword];
        }
    }

    return "Sorry, I don't know the answer to that. Try asking something else!";
}
