// VARIABLES
let previousOperand = "";
let currentOperand = "";
let operation = undefined;

const previousOperandText = document.querySelector("[data-previous-operand]");
const currentOperandText = document.querySelector("[data-current-operand]");

const btnNumbers = document.querySelectorAll("[data-number]");
const btnOperations = document.querySelectorAll("[data-operation]");
const btnEquals = document.querySelector("[data-equals]");
const btnAllClear = document.querySelector("[data-all-clear]");
const btnDelete = document.querySelector("[data-delete]");

// Map keyboard keys to HTML button id's
const keyboardKeys = {
    '0': '0',
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    '+': "add",
    '-': "subtract",
    '*': "multiply",
    '/': "divide",
    '%': "modulo",
    '.': "decimal",
    '=': "equals",
    "Enter": "equals",
    "Backspace": "delete"
};

// FUNCTIONS
function setDisplay() {
    currentOperandText.innerText = currentOperand;

    if (operation != null) {
        previousOperandText.innerText = `${previousOperand} ${operation}`;
    }

    else {
        previousOperandText.innerText = "";
    }
}

function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) {
        return;
    }

    currentOperand += number;
}

function setOperation(op) {
    if (currentOperand === "") {
        return;
    }

    if (previousOperand !== "") {
        calculate();
    }

    operation = op;
    previousOperand = currentOperand;
    currentOperand = "";
}

function calculate() {
    const operand1 = parseFloat(previousOperand);
    const operand2 = parseFloat(currentOperand);
    let result = undefined;

    if (isNaN(operand1) || isNaN(operand2)) {
        return;
    }

    switch (operation) {
        case '+':
            result = operand1 + operand2;
            break;
        case '-':
            result = operand1 - operand2;
            break;
        case '*':
            result = operand1 * operand2;
            break;
        case '/':
            result = operand1 / operand2;
            break;
        case "mod":
        case '%':
            result = operand1 % operand2;
            break;
        default:
            return;
    }

    currentOperand = result;
    operation = undefined;
    previousOperand = "";
}

function allClear() {
    currentOperand = "";
    previousOperand = "";
    operation = undefined;
}

function deleteNumber() {
    currentOperand = currentOperand.slice(0, -1);
}

// DOM
btnNumbers.forEach(btnNumber => {
    btnNumber.addEventListener("click", () => {
        appendNumber(btnNumber.innerText);
        setDisplay();
    });
});

btnOperations.forEach(btnOperation => {
    btnOperation.addEventListener("click", () => {
        setOperation(btnOperation.innerText);
        setDisplay();
    });
});

btnEquals.addEventListener("click", () => {
    calculate();
    setDisplay();
    currentOperand = "";
});

btnAllClear.addEventListener("click", () => {
    allClear();
    setDisplay();
});

btnDelete.addEventListener("click", () => {
    deleteNumber();
    setDisplay();
});

// Listen for keyboard events
document.addEventListener("keydown", e => {
    if (keyboardKeys[e.key] !== undefined) {
        document.getElementById(`btn-${keyboardKeys[e.key]}`).click();
    }
});