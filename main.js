let currentInput = '0';
let operator = null;
let previousInput = null;

const resultDisplay = document.getElementById('result');
const digits = document.querySelectorAll('.digit');
const operators = document.querySelectorAll('.operator');
const equalButton = document.querySelector('.equal');
const resetButton = document.querySelector('.reset');
const delButton = document.querySelector('.del');
const themeButtons = document.querySelectorAll('.lin');

function updateDisplay() {
    resultDisplay.textContent = currentInput;
}

function handleDigit(digit) {
    if (currentInput === '0' || currentInput === '-0') {
        currentInput = digit;
    } else {
        currentInput += digit;
    }
    updateDisplay();
}

function handleOperator(op) {
    if (operator !== null) {
        calculate();
    }
    previousInput = currentInput;
    currentInput = '0';
    operator = op;
}

function calculate() {
    if (previousInput === null || operator === null) return;
    
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let result;

    switch(operator) {
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
    }

    currentInput = result.toString();
    operator = null;
    previousInput = null;
    updateDisplay();
}

digits.forEach(digit => {
    digit.addEventListener('click', () => handleDigit(digit.value));
});

operators.forEach(op => {
    op.addEventListener('click', () => handleOperator(op.value));
});

equalButton.addEventListener('click', calculate);

resetButton.addEventListener('click', () => {
    currentInput = '0';
    operator = null;
    previousInput = null;
    updateDisplay();
});

delButton.addEventListener('click', () => {
    currentInput = currentInput.slice(0, -1);
    if (currentInput === '') currentInput = '0';
    updateDisplay();
});

// Theme switching functionality
function setTheme(theme) {
    document.body.className = theme;
    localStorage.setItem('calculatorTheme', theme);
}

themeButtons.forEach(button => {
    button.addEventListener('click', () => setTheme(button.dataset.theme));
});

// Load saved theme or default
const savedTheme = localStorage.getItem('calculatorTheme') || 'default';
setTheme(savedTheme);