document.getElementById('ask-button').addEventListener('click', function() {
    const question = document.getElementById('question').value;
    const answer = document.getElementById('answer');

    if (question.trim() === '') {
        answer.textContent = 'Please enter a question.';
        return;
    }

    // Dummy response - replace with actual AI response logic
    answer.textContent = 'This is a placeholder answer. Implement your AI logic here.';
});
