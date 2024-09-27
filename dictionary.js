document.getElementById('search-button').addEventListener('click', function() {
    const word = document.getElementById('search-input').value.trim();
    const definitionElement = document.getElementById('definition');

    if (word === '') {
        definitionElement.textContent = 'Please enter a word.';
        return;
    }

    // Fetch definition from the Free Dictionary API
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Definition not found.');
            }
            return response.json();
        })
        .then(data => {
            // Extract definition from the API response
            const meanings = data[0].meanings;
            let definitionText = '';
            
            meanings.forEach(meaning => {
                definitionText += `${meaning.partOfSpeech}: ${meaning.definitions[0].definition}\n`;
            });

            definitionElement.textContent = definitionText;
        })
        .catch(error => {
            definitionElement.textContent = 'Definition not found.';
        });
});
