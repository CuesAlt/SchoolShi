document.getElementById('searchBtn').addEventListener('click', () => {
    const word = document.getElementById('wordInput').value.trim();
    if (word) {
        fetchDefinition(word);
    } else {
        document.getElementById('definitionResult').innerHTML = `<p>Please enter a word to search.</p>`;
    }
});

async function fetchDefinition(word) {
    const resultContainer = document.getElementById('definitionResult');
    resultContainer.innerHTML = '<p>Searching...</p>';

    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();

        if (data.title === "No Definitions Found") {
            resultContainer.innerHTML = `<p>No definition found for "${word}".</p>`;
        } else {
            const definition = data[0].meanings[0].definitions[0].definition;
            resultContainer.innerHTML = `<p><strong>${word}:</strong> ${definition}</p>`;
        }
    } catch (error) {
        resultContainer.innerHTML = '<p>Error retrieving the definition.</p>';
    }
}
