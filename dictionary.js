document.getElementById('search-button').addEventListener('click', function() {
    const word = document.getElementById('search-input').value.trim();
    const definitionElement = document.getElementById('definition');

    if (word === '') {
        definitionElement.textContent = 'Please enter a word.';
        return;
    }

    const apiKey = 'YOUR_API_KEY'; // Replace with your Merriam-Webster API key
    const apiUrl = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0 || data[0].meta === undefined) {
                definitionElement.textContent = 'Definition not found.';
            } else {
                const definitions = data[0].shortdef.map(def => `<li>${def}</li>`).join('');
                definitionElement.innerHTML = `<ul>${definitions}</ul>`;
            }
        })
        .catch(error => {
            console.error('Error fetching the definition:', error);
            definitionElement.textContent = 'Error fetching the definition.';
        });
});
