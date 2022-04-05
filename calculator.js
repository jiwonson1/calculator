class Calculator {
    constructor(prevElement, curElement){
        this.prevElement = prevElement
        this.curElement = curElement
        this.clear()
    }

    clear(){
        this.curOperand = ''
        this.prevOperand = ''
        this.operation = undefined
    }

    delete() {
        //배열 제일 마지막 가져오기
        this.curOperand = this.curOperand.toString().slice(0,-1)
    }

    appendNumber(num){
        if(num === '.' && this.curOperand.includes('.')) return
        this.curOperand = this.curOperand.toString() + num.toString()
    }

    chooseOperation(operation){
        if(this.curOperand === '') return
        if(this.prevOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.prevOperand = this.curOperand
        this.curOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.prevOperand)
        const cur = parseFloat(this.curOperand)
        //isNan 숫자 -> false 반환 / 숫자x -> true 반환
        if(isNaN(prev) || isNaN(cur)) return
        switch(this.operation){
            case '+' :
                computation = prev + cur
                break
            case '-' :
                computation = prev - cur
                break
            case '*' :
                computation = prev * cur
                break
            case '÷' :
                computation = prev / cur
                break
            default:
                return

        }
        this.curOperand = computation
        this.operation = undefined
        this.prevOperand = ''
    }

    getDisplayNumber(num){
        const stringNumber = num.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
            if(isNaN(integerDigits)){
                integerDisplay = ''
            }else{
                integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
            }

            if(decimalDigits != null){
                return `${integerDisplay}.${decimalDigits}`
            }else{
                return integerDisplay
            }
    }

    updateDisplay() {
        this.curElement.innerText = 
            this.getDisplayNumber(this.curOperand)
        if(this.operation != null){
            this.prevElement.innerText = 
                `${this.getDisplayNumber(this.prevOperand)} ${this.operation}`
        }else{
            this.prevElement.innerText = ''
        }
    }    
} /*클래스 끝 */

//변수 선언
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete')
const allClearButton = document.querySelector('[data-all-clear')
const prevElement = document.querySelector('[data-previous-operand]')
const curElement = document.querySelector('[data-current-operand')

const calculator = new Calculator(prevElement, curElement)

//클릭이벤트
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})
  
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})