document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('calc-display');
    const buttons = Array.from(document.querySelectorAll('.calc-btn'));
    
    let currentInput = '';
    let operator = '';
    let previousInput = '';

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const value = e.target.innerText;

            if (value === 'C') {
                currentInput = '';
                operator = '';
                previousInput = '';
                display.value = '';
            } else if (value === '=') {
                try {
                    display.value = eval(currentInput);
                    currentInput = display.value;
                } catch {
                    display.value = 'Error';
                }
            } else {
                currentInput += value;
                display.value = currentInput;
            }
        });
    });
});
