class Calculator {
    constructor(expressionElement, valueElement) {
        this.expressionElement = expressionElement
        this.valueElement = valueElement

        this.expression = this.expressionElement.innerText
        this.value = this.valueElement.innerText
    }

    updateScreen = (expression) => {
        this.expressionElement.innerText = this.expression.toString()
        this.valueElement.innerText = this.value.toString()

        console.log(this.expression, this.value)
    }

    appendNumber = (val) => {
        this.value = this.value.toString() + val.toString()
    }

    backspaceScreen = () => {
        this.expression = ""
        this.value = this.value.toString()
        this.value = this.value.slice(0, this.value.length - 1)
    }

    clearScreen = () => {
        this.expression = ""
        this.value = ""
    }

    evaluateExpression = () => {
        try {
            this.expression = this.value.toString()
            if (this.expression === "") {
                return
            }
            this.expression = this.expression.replace('x', '*')
            this.value = eval(this.expression)
            this.expression += ' = '
        } catch (err) {
            errorMessage.classList.add('active')
            console.log("Invalid expression")
            console.log(err)
        }
    }
}

// Dom Elements 
const digitKeys = document.querySelectorAll('.digit')
const operatorKeys = document.querySelectorAll('.operator')
const clearScreenKey = document.querySelector('.clear-screen')
const backspaceKey = document.querySelector('.backspace')
const equalsKey = document.querySelector('.equals')
const screenExpression = document.querySelector('.screen .expression')
const screenValue = document.querySelector('.screen .value')
const errorMessage = document.querySelector('.error-message')
const calculatorContainer = document.querySelector('.container')
const darkModeButton = document.querySelector('.toggle-button')

// Available Operations
const allOperators = ['-', '+', '*', '/']

// Merging digits and operators into a single array
digitKeysArr = Array.prototype.slice.call(digitKeys)
operatorKeysArr = Array.prototype.slice.call(operatorKeys)

digitsAndOperators = digitKeysArr.concat(operatorKeysArr)

const toggleDarkMode = () => {
    const body = document.getElementsByTagName('body')[0]
    body.classList.toggle('toggle-dark-mode')
    clearScreenKey.classList.toggle('toggle-dark-mode')
    backspaceKey.classList.toggle('toggle-dark-mode')
    digitKeys.forEach(key => {
        key.classList.toggle('toggle-dark-mode')
    })
    darkModeButton.parentElement.classList.toggle('toggle-dark-mode')
}

// Function to check if a given value is a digit or not
// This is probably not the best way to write this function
const isDigit = (val) => {
    try {
        num = parseInt(val)
        if (isNaN(num)) {
            return false
        }
        return true
    } catch (err) {
        return false
    }
}

// Function to check if a given value is an operator or not
const isOperator = (val) => {
    for (i = 0; i < allOperators.length; i++) {
        if (allOperators[i] === val) {
            return true
        }
    }
    return false
}

// Creating the calculator object
const calculator = new Calculator(screenExpression, screenValue)

// Add functions to the DOM elements
calculatorContainer.addEventListener('click', (event) => {
    targetElement = event.target
    if (targetElement.classList.contains('equals')) {
        // Do Nothing
        return
    }
    errorMessage.classList.remove('active')

})

digitsAndOperators.forEach((key) => {
    key.addEventListener('click', (event) => {
        value = event.target.innerText
        calculator.appendNumber(value)
        calculator.updateScreen()
    })
})

backspaceKey.addEventListener('click', (event) => {
    calculator.backspaceScreen()
    calculator.updateScreen()
})

clearScreenKey.addEventListener('click', (event) => {
    calculator.clearScreen()
    calculator.updateScreen()
})

equalsKey.addEventListener('click', (event) => {
    calculator.evaluateExpression()
    calculator.updateScreen()
})

// Interact with keyboard
window.addEventListener('keydown', (event) => {
    keyLocation = event.code
    key = event.key

    if (key !== "Enter") {
        errorMessage.classList.remove('active')
    }

    console.log(key + " pressed")

    if (isDigit(key) || isOperator(key)) {
        calculator.appendNumber(key)
        calculator.updateScreen()
    } else if (key === '=' || key === 'Enter') {
        calculator.evaluateExpression()
        calculator.updateScreen()
    } else if (key === 'Backspace') {
        calculator.backspaceScreen()
        calculator.updateScreen()
    }
})

// Toggle dark mode
window.addEventListener('load', (e) => {
    darkModeButton.checked = false
})
darkModeButton.addEventListener('click', toggleDarkMode)