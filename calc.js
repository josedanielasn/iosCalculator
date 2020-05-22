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

const calculator = document.querySelector('.calculator'); // This will help the javascript treat the html as an object
const keys = calculator.querySelector('.calculator__keys'); // This will create an object with name "keys" containing the values of .calculator__keys from the calculator object
const display = calculator.querySelector('.calculator__display'); // this allows JS to save the html part with class ".calculator__display" as an object

// an eventlist that has an event and a function.
keys.addEventListener('click', e => {
  if (e.target.matches('button')) { // the e.target allows access to the elements of the html, and ".matches('button')", ensures that what is clicked is a button
    const key = e.target; //saves the clicked button/ part of html, as the variable key
    const action = key.dataset.action; // this saves the values of  keys with values that are part of the data-action attribute
    const keyContent = key.textContent;// this will access and save the content of the targeted button as a object
    const displayedNum = display.textContent; // this will access and save the content of the display 
    const previousKeyType = calculator.dataset.previousKeyType;
    const firstValue = calculator.dataset.firstValue; // these set of variables are place incase an operation was executed, to store the values
    const operator = calculator.dataset.operator;
    const secondValue = displayedNum;

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

    if (!action) {
      if (displayedNum === '0'|| 
          previousKeyType === 'operator' ||
          previousKeyType === 'calculate'
         ) {
        display.textContent = keyContent
      } else {
        display.textContent = displayedNum + keyContent
        }
      calculator.dataset.previousKey = 'number'
    }

    if (action === 'decimal') {
      if (!displayedNum.includes('.')) { // very tricky, vaguely understand
        display.textContent = displayedNum + '.'
      } else if (previousKeyType === 'operator' ||  // I understand this part only if how I understand the previous one is correct
                previousKeyType === 'calculate'
      ) {        
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

      if (firstValue && 
          operator && 
          previousKeyType !== 'operator' &&
          previousKeyType !== 'calculate'
         ) {
        const calcValue = calculate(firstValue, operator, secondValue)
        display.textContent = calcValue
        calculator.dataset.firstValue = calcValue  // Update calculated value as firstValue
      } else {
        // If there are no calculations, set displayedNum as the firstValue
        calculator.dataset.firstValue = displayedNum
      }
      
      key.classList.add('is-depressed') // I'm not sure if this should be applied to previous ones as well
      calculator.dataset.previousKeyType = 'operator'
      calculator.dataset.firstValue = displayedNum
      calculator.dataset.operator = action
    }

    // using "Array.from(key.parentNode.children", the object will act like an array without returning an actual array
    // Remove .is-depressed class from all keys
    Array.from(key.parentNode.children) // "key.parentNode.children", is used to select any button element under the parent element whihch has a class .calculator__keys
    .forEach(k => k.classList.remove('is-depressed'))

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

  if (action !== 'clear') {
    const clearButton = calculator.querySelector('[data-action=clear]') // "[data-action = clear]" was used to pin point the tags with the 
    clearButton.textContent = 'CE' // this will 
  }
  if (action === 'clear') { // this was used to reset the 
    display.textContent = 0
    key.textContent = 'AC'
    calculator.dataset.previousKeyType = 'clear'
  }

  }
})

