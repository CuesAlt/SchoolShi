document.getElementById('search-button').addEventListener('click', function() {
    const word = document.getElementById('search-input').value.trim();
    const definitionElement = document.getElementById('definition');

    if (word === '') {
        definitionElement.textContent = 'Please enter a word.';
        return;
    }

    // Static dictionary data
    const dictionary = {
        'example': 'A representative form or pattern.',
        'dictionary': 'A book or electronic resource that lists the words of a language and gives their meaning.',
        'hello': 'A greeting or expression of goodwill.',
        'world': 'The earth, together with all of its countries and peoples.'
    };

    const definition = dictionary[word.toLowerCase()] || 'Definition not found.';
    definitionElement.textContent = definition;
});
