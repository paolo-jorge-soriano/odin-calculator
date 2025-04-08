let operand1 = null;
let operand2 = null;
let op = null;
let screenText = "";

const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");

function updateDisplay(value) {
    document.getElementById("display").value = value;
}

function appendNum(numValue) {
    if (screenText === "0" && numValue !== "0") {
        screenText = numValue;
    }

    else if (!(screenText === "0" && numValue === "0")) {
        screenText += numValue;
    }

    updateDisplay(screenText);
}

function appendOperator(operatorValue) {
    if (screenText === "") {
        return;
    }

    op = operatorValue;
    operand1 = parseFloat(screenText);
    screenText = "";
}

function calculate() {
    if (screenText === "" || op === null || operand1 === null) {
        return
    }

    operand2 = parseFloat(screenText);
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

    updateDisplay(result);
    screenText = "";
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