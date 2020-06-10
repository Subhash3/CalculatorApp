const digitKeys = document.querySelectorAll('.digit')
const operatorKeys = document.querySelectorAll('.operator')
const clearScreenKey = document.querySelector('.clear-screen')
const backspaceKey = document.querySelector('.backspace')
const equalsKey = document.querySelector('.equals')
const screen = document.querySelector('.screen')
const errorMessage = document.querySelector('.error-message')
const calculatorContainer = document.querySelector('.container')

const allOperators = ['-', '+', '*', '/']

digitKeysArr = Array.prototype.slice.call(digitKeys)
operatorKeysArr = Array.prototype.slice.call(operatorKeys)

digitsAndOperators = digitKeysArr.concat(operatorKeysArr)

const updateScreen = (expression) => {
    screen.value += expression
}

const backspaceScreen = () => {
    screenValue = screen.value
    screen.value = screenValue.slice(0, screenValue.length - 1)
    if (screen.value === "") {
        screen.value = "0"
    }
}

const clearScreen = () => {
    screen.value = "0"
}

const evaluateExpression = () => {
    try {
        expression = screen.value
        if (expression === "") {
            return
        }
        expression = expression.replace('x', '*')
        value = eval(expression)
        // console.log(expression, value)
        screen.value = value
    } catch (err) {
        errorMessage.classList.add('active')
        console.log("Invalid expression")
        // console.log(err)
    }
}

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

const isOperator = (val) => {
    for (i = 0; i < allOperators.length; i++) {
        if (allOperators[i] === val) {
            return true
        }
    }
    return false
}

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
        updateScreen(value)
    })
})

backspaceKey.addEventListener('click', (event) => {
    backspaceScreen()
})

clearScreenKey.addEventListener('click', (event) => {
    clearScreen()
})

equalsKey.addEventListener('click', (event) => {
    evaluateExpression()
})

window.addEventListener('keydown', (event) => {
    keyLocation = event.code
    key = event.key

    if (key !== "Enter") {
        errorMessage.classList.remove('active')
    }

    if (isDigit(key) || isOperator(key)) {
        updateScreen(key)
    } else if (key === '=' || key === 'Enter') {
        evaluateExpression()
    } else if (key === 'Backspace') {
        backspaceScreen()
    }
})