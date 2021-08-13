class Calculator{
    constructor(previousValueTextElement, currentValueTextElement){
        this.previousValueTextElement =  previousValueTextElement
        this.currentValueTextElement =  currentValueTextElement
        this.clear ()
    }

    clear(){
        this.currentValue =  ''
        this.previousValue = ''
        this.operation = undefined
    }

   delete() {
       this.currentValue = this.currentValue.toString().slice(0, -1)
    }

    appendNumber(number){
        if (number === '.' && this.currentValue.includes('.'))  return
        this.currentValue = this.currentValue.toString() + number.toString()
    }

    chooseOperation(operation){
        if (this.currentValue === '') return
        if(this.previousValue !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousValue = this.currentValue
        this.currentValue = ''
    }
    
    compute(){
        let computation
        const prev = parseFloat(this.previousValue)
        const current = parseFloat(this.currentValue)
        if(isNaN(prev) || isNaN(current)) return
        switch (this.operation){
            case '+':
                  computation = prev + current
                break
            case '-':
                 computation = prev - current
                break
            case 'x':
                 computation = prev * current
                break
            case '/':
                  computation = prev / current
               break
            default:
               return
        }
        this.currentValue= computation
        this.operation = undefined
        this.previousValue = ''
    }

    getDisplayNum(number){
        const stringNum = number.toString()
        const integerDigits = parseFloat(stringNum.split('.')[0])
        const decimalDigits = stringNum.split('.')[1]
        let integrDisplay
        if (isNaN(integerDigits)) {
            integrDisplay = ''
        } else {
            integrDisplay =integerDigits.toLocaleString('en',{maximumFractionDigits:0})
        }
        if (decimalDigits != null) {
            return`${integrDisplay}.${decimalDigits}`
        } else {
            return integrDisplay
        }

        //const floatNumber = parseFloat(number)
       // if(isNan(floatNumber)) return ''
       // return number.toLocaleString('en')
    }

    updateDisplay(){
        this.currentValueTextElement.innerText = this.getDisplayNum(this.currentValue)
        if(this.operation != null){
            this.previousValueTextElement.innerText = this.previousValue
            `${this.getDisplayNum(previousValue)} ${this.operation}`
        } else {
            this.previousValueTextElement.innerText=''
        }
    }
}


const numButton = document.querySelectorAll('[data-number]')
const operationButton = document.querySelectorAll('[data-operation]')
const equalButton = document.querySelector('[data-equals]')
const acButton = document.querySelector('[data-all-clear]')
const delButton = document.querySelector('[data-delete]')
const previousValueTextElement = document.querySelector('[data-previous-value]')
const currentValueTextElement = document.querySelector('[data-current-value]')

const calculator= new Calculator(previousValueTextElement, currentValueTextElement)

numButton.forEach(button =>{
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()

    })
})

operationButton.forEach(button =>{
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()

    })
})

equalButton.addEventListener('click', button => {     
     calculator.compute()                                                                                                                                                                                                                                                                                                                                                    
     calculator.updateDisplay()   
})

acButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

delButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})