let operand1 = null;
let operand2 = null;
let op = null;
let inputScreenText = "";
let displayScreenText = "";

const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");

function updateInputScreen(value) {
    document.getElementById("input-screen").value = value;
}

function updateDisplayScreen(value) {
    document.getElementById("display-screen").value = value
}

function appendNum(numValue) {
    if (inputScreenText === "0" && numValue !== "0") {
        inputScreenText = numValue;
    }

    else if (!(inputScreenText === "0" && numValue === "0")) {
        inputScreenText += numValue;
    }
    
    displayScreenText += numValue;
    updateInputScreen(inputScreenText);
}

function appendOperator(operatorValue) {
    if (inputScreenText === "" || op !== null) {
        return;
    }

    op = operatorValue;
    operand1 = parseFloat(inputScreenText);
    displayScreenText += operatorValue;
    updateDisplayScreen(displayScreenText);
    inputScreenText = "";
}

function calculate() {
    if (inputScreenText === "" || op === null || operand1 === null) {
        return
    }

    operand2 = parseFloat(inputScreenText);
    let result;

    switch (op) {
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
            result = operand2 !== 0 ? operand1 / operand2 : "Cannot divide by zero";
            break;
    }

    updateDisplayScreen(displayScreenText);

    updateInputScreen(result);
    inputScreenText = "";
    operand1 = null;
    op = null;
}

digits.forEach((digit) => {
    digit.addEventListener("click", () => {
        appendNum(digit.value);
    });
});

operators.forEach((operator) => {
    operator.addEventListener("click", () => {
        appendOperator(operator.value);
    });
});