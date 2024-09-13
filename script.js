// Calculator variables
let currentOperation = '';
let currentInput = '';
let previousInput = '';

// Append numbers to display
function appendToDisplay(value) {
    currentInput += value;
    document.getElementById('calc-display').value = currentInput;
}

// Perform arithmetic operations
function performOperation(operator) {
    if (currentInput === '') return;

    if (previousInput === '') {
        previousInput = currentInput;
        currentInput = '';
    }

    currentOperation = operator;
}

// Calculate result
function calculate() {
    if (currentOperation === '' || currentInput === '') return;

    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let result = 0;

    switch (currentOperation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }

    document.getElementById('calc-display').value = result;
    previousInput = result.toString();
    currentInput = '';
    currentOperation = '';
}

// Clear display
function clearDisplay() {
    currentInput = '';
    previousInput = '';
    currentOperation = '';
    document.getElementById('calc-display').value = '';
}
