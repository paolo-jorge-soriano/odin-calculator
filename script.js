let operand1 = "";
let operand2 = "";
let op = "";
let inputScreenText = "";
let displayScreenText = "";

const btnEquals = document.getElementById("btn-equals");
const btnClear = document.getElementById("btn-clear");

const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");

function updateInputScreen() {
    document.getElementById("input-screen").value = inputScreenText;
}

function updateDisplayScreen() {
    document.getElementById("display-screen").value = displayScreenText;
}

function appendNum(numValue) {
    if (inputScreenText === "0" && numValue !== "0") {
        inputScreenText = numValue;
        displayScreenText = numValue;
    }

    else if (!(inputScreenText === "0" && numValue === "0")) {
        inputScreenText += numValue;
        displayScreenText += numValue;
    }

    updateInputScreen();
}

function appendOperator(operatorValue) {
    if (inputScreenText === "" || op !== "") {
        return;
    }

    op = operatorValue;
    operand1 = parseFloat(inputScreenText);
    displayScreenText += operatorValue;
    inputScreenText = "";
    updateDisplayScreen();
    updateInputScreen();
}

function calculate() {
    if (inputScreenText === "" || op === "" || operand1 === "") {
        return;
    }

    operand2 = parseFloat(inputScreenText);
    let result = "";

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

    inputScreenText = result;
    updateDisplayScreen();
    updateInputScreen();
    inputScreenText = "";
    operand1 = "";
    op = "";
}

function clearAll() {
    inputScreenText = "";
    displayScreenText = "";
    operand1 = "";
    operand2 = "";
    op = "";
    updateDisplayScreen();
    updateInputScreen();
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

btnEquals.addEventListener("click", calculate);
btnClear.addEventListener("click", clearAll);