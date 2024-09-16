document.getElementById('search-button').addEventListener('click', function() {
    const word = document.getElementById('search-input').value;
    if (word.trim() === '') {
        document.getElementById('definition').textContent = 'Please enter a word.';
        return;
    }
    
    // Dummy data - replace with actual dictionary API or data
    const dictionary = {
        'example': 'A representative form or pattern.',
        'dictionary': 'A book or electronic resource that lists the words of a language and gives their meaning.'
    };

    const definition = dictionary[word.toLowerCase()] || 'Definition not found.';
    document.getElementById('definition').textContent = definition;
});
