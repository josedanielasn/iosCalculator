const calculator = document.querySelector('.calculator'); // This will help the javascript treat the html as an object
const keys = calculator.querySelector('.calculator__keys'); // This will create an object with name "keys" containing the values of .calculator__keys from the calculator object

// an eventlist that has an event and a function.

keys.addEventListener('click', e => {
 if (e.target.matches('button')) {
// the e.target allows access to the elements of the html, and ".matches('button')", ensures that what is clicked is a button
    const key = e.target //saves the clicked button/ part of html, as the variable key
    const action = key.dataset.action // this saves the values of  keys with values that are part of the data-action attribute
    
    if (!action) {
        console.log('number key!')
      }
    
    if (
        action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide'
      ) {
        console.log('operator key!')
    }
    
    if (action === 'decimal') {
        console.log('decimal key!')
    }
      
    if (action === 'clear') {
        console.log('clear key!')
    }
      
    if (action === 'calculate') {
        console.log('equal key!')
    }
    
 }
})

const display = document.querySelector('.calculator__display') // this allows JS to save the html part with class ".calculator__display" as an object

keys.addEventListener('click', e => {
  if (e.target.matches('button')) {
    const key = e.target
    const action = key.dataset.action
    const keyContent = key.textContent // this will access and save the content of the targeted button as a object
    const displayedNum = display.textContent // this will access and save the content of the display 
    
    if (!action) {
        if (displayedNum === '0') {
          display.textContent = keyContent
        } else {
          display.textContent = displayedNum + keyContent
        }
      }

    if (action === 'decimal') {
        display.textContent = displayedNum + '.'
      }

    if (
        action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide'
      ) {
        key.classList.add('is-depressed')
      }

  }
})

keys.addEventListener('click', e => {
  if (e.target.matches('button')) {
    const key = e.target
    // ...
    // using "Array.from(key.parentNode.children", the object will act like an array without returning an actual array
    // Remove .is-depressed class from all keys
    Array.from(key.parentNode.children) // "key.parentNode.children", is used to select any button element under the parent element whihch has a class .calculator__keys
      .forEach(k => k.classList.remove('is-depressed'))
  } 
})



keys.addEventListener('click', e => { // start of the operations in the calculator
  if (e.target.matches('button')) {
    // ...
    
    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) {
      key.classList.add('is-depressed')
      // Add custom attribute
      calculator.dataset.previousKeyType = 'operator'
    }
    if (!action) {
      // Add custom attribute
      calculator.dataset.previousKey = 'number'
    }
    
    if (action === 'decimal') {
      // Add custom attribute
      calculator.dataset.previousKey = 'decimal'
    }
    
    if (action === 'clear') {
      // Add custom attribute
      calculator.dataset.previousKeyType = 'clear'
    }
    
    if (action === 'calculate') {
     // Add custom attribute
      calculator.dataset.previousKeyType = 'calculate'
    }

const previousKeyType = calculator.dataset.previousKeyType

    if (!action) {
      if (displayedNum === '0' || previousKeyType === 'operator' ||
      previousKeyType === 'calculate') {
        display.textContent = keyContent
      } else {
        display.textContent = displayedNum + keyContent
      }
      calculator.dataset.previousKeyType = 'number'
    }

    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) {
    
      calculator.dataset.firstValue = displayedNum
      calculator.dataset.operator = action
    }

    // if (action === 'calculate') {
    //   const firstValue = calculator.dataset.firstValue
    //   const operator = calculator.dataset.operator
    //   const secondValue = displayedNum
      
    //   display.textContent = calculate(firstValue, operator, secondValue) // this will use the values and will trigger function
    // }

    if (action === 'calculate') {
      let firstValue = calculator.dataset.firstValue
      const operator = calculator.dataset.operator
      const secondValue = displayedNum
      
    if (firstValue) { // this is place to ensure that an operator was clicked before an equal sign, becuase firstvalue is only stored after clicking an operator
      if (previousKeyType === 'calculate') {
        firstValue = displayedNum // this will make the calculated value the first number if there is a previous calculation
        secondValue = calculator.dataset.modValue // this will make the second value valid for subsequent calculations, although I'm not sure why it has to be restated as a new attribute
      }
        display.textContent = calculate(firstValue, operator, secondValue)
      }
    calculator.dataset.modValue = secondValue // this will store the second value
    calculator.dataset.previousKeyType = 'calculate'
    }

    const calculate = (n1, operator, n2) => { //this is the calculate function
      let result = ''
      
      if (operator === 'add') {
        result = parseFloat(n1) + parseFloat(n2) // "parseFloat" is used because the accessed value from target is a string by default
      } else if (operator === 'subtract') {
        result = parseFloat(n1) - parseFloat(n2)
      } else if (operator === 'multiply') {
        result = parseFloat(n1) * parseFloat(n2)
      } else if (operator === 'divide') {
        result = parseFloat(n1) / parseFloat(n2)
      }
      
      return result
    }

    if (!displayedNum.includes('.')) { // very tricky, vaguely understand
      display.textContent = displayedNum + '.'
    }

    if (action === 'decimal') {
      if (!displayedNum.includes('.')) {
        display.textContent = displayedNum + '.'
      } else if (previousKeyType === 'operator' ||previousKeyType === 'calculate') { // I understand this part only if how I understand the previous one is correct
        display.textContent = '0.'
      }
      
    calculator.dataset.previousKeyType = 'decimal'
    }

    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) {
      const firstValue = calculator.dataset.firstValue
      const operator = calculator.dataset.operator
      const secondValue = displayedNum
      
    // Note: It's sufficient to check for firstValue and operator because secondValue always exists
      if (firstValue && operator) { // i don't understand the boolean for this, but initial though is that if there is a first value and an operator it will calculate
        display.textContent = calculate(firstValue, operator, secondValue)
      }
      
    key.classList.add('is-depressed')  
      calculator.dataset.previousKeyType = 'operator'
      calculator.dataset.firstValue = displayedNum // this will make the calculated value the first value
      calculator.dataset.operator = action
    }

const firstValue = calculator.dataset.firstValue // these set of variables are place incase an operation was executed, to store the values
const operator = calculator.dataset.operator
const secondValue = displayedNum

if (
  firstValue &&
  operator &&
  previousKeyType !== 'operator' && previousKeyType !== 'calculate'
) {
  const calcValue = calculate(firstValue, operator, secondValue)
  display.textContent = calcValue
  
// Update calculated value as firstValue
  calculator.dataset.firstValue = calcValue
} else {
  // If there are no calculations, set displayedNum as the firstValue
  calculator.dataset.firstValue = displayedNum
}

// I don't understand this
key.classList.add('is-depressed') 
calculator.dataset.previousKeyType = 'operator' 
calculator.dataset.operator = action


if (action !== 'clear') {
  const clearButton = calculator.querySelector('[data-action=clear]')
  clearButton.textContent = 'CE'
}

  }
})

