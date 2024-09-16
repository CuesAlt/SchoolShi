document.getElementById('ask-button').addEventListener('click', async function() {
    const question = document.getElementById('question').value.trim();
    const answerElement = document.getElementById('answer');

    if (question === '') {
        answerElement.textContent = 'Please enter a question.';
        return;
    }

    const apiKey = 'sk-WRqfV4K2AG3XDcynH1Wlc1v-2x96SbUs-p5XAEw8RIT3BlbkFJ5bUzAtTkm4Xuy1T-rYX4TlkUoB-ozMI6XtCDZynmUA'; // Replace with your OpenAI API key
    const apiUrl = 'https://api.openai.com/v1/completions';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'text-davinci-003', // Use the appropriate model ID here
                prompt: question,
                max_tokens: 150
            })
        });

        const data = await response.json();
        if (data.choices && data.choices[0]) {
            answerElement.textContent = data.choices[0].text.trim();
        } else {
            answerElement.textContent = 'No answer found.';
        }
    } catch (error) {
        console.error('Error fetching response:', error);
        answerElement.textContent = 'Error fetching the answer.';
    }
});
