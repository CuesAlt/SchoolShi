document.getElementById('searchBtn').addEventListener('click', () => {
    const word = document.getElementById('wordInput').value;
    fetchDefinition(word);
});

async function fetchDefinition(word) {
    const resultContainer = document.getElementById('definitionResult');
    resultContainer.innerHTML = 'Searching...';

    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();

        if (data.title === "No Definitions Found") {
            resultContainer.innerHTML = 'No definition found.';
        } else {
            const definition = data[0].meanings[0].definitions[0].definition;
            resultContainer.innerHTML = `<strong>${word}</strong>: ${definition}`;
        }
    } catch (error) {
        resultContainer.innerHTML = 'Error retrieving definition.';
    }
}
