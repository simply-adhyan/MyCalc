import React,{useState} from 'react'
function precedence(op) {
    switch (op) {
      case '+':
      case '-':
        return 1;
      case '*':
      case '/':
        return 2;
      default:
        return 0;
    }
  }
  
  // Function to convert infix expression to postfix notation using shunting-yard algorithm
  function convertInfixToPostfix(infix) {
    const operators = [];
    const postfix = [];
    for (const char of infix) {
      if (!isNaN(char) || char === '.') { // Handle both digits and decimal point
        postfix.push(char);
      } else {
        switch (char) {
          case '(':
            operators.push(char);
            break;
          case ')':
            while (operators.length !== 0 && operators[operators.length - 1] !== '(') {
              postfix.push(operators.pop());
            }
            operators.pop(); // Remove the opening parenthesis
            break;
          default:
            while (operators.length !== 0 && precedence(operators[operators.length - 1]) >= precedence(char)) {
              postfix.push(operators.pop());
            }
            operators.push(char);
            break;
        }
      }
    }
  
    // Add remaining operators to postfix
    while (operators.length !== 0) {
      postfix.push(operators.pop());
    }
  
    return postfix;
  }
  
  // Function to evaluate postfix expression
  function evaluatePostfix(postfix) {
    const stack = [];
    for (const token of postfix) {
      if (!isNaN(parseFloat(token))) {
        stack.push(parseFloat(token));
      } else {
        const operand2 = stack.pop();
        const operand1 = stack.pop();
        let result;
        switch (token) {
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
            if (operand2 === 0) {
              return 'Error: Division by zero';
            }
            result = operand1 / operand2;
            break;
        }
        stack.push(result);
      }
    }
    return stack.pop();
  }
  
  function calc(expression) {
    // Convert infix expression to postfix using shunting-yard algorithm
    const postfix = convertInfixToPostfix(expression);
  
    // Evaluate the postfix expression
    return evaluatePostfix(postfix);
  }
  
  function Calculator() {
    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState('');
    const [inputSize, setInputSize] = useState('');
    const [resultSize, setResultSize] = useState('');
  
    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };
  
    const handleKey = (event) => {
      if (event.key === 'Enter') {
        handleCalculate();
      } else if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122)) {
        console.log('Alphabetic key pressed');
      } else if (event.key === 'Backspace') {
        const updatedInputValue = inputValue.slice(0, -1); // Remove last character
        setInputValue(updatedInputValue);
      }else if(event.key==='Esc'){
        setInputValue(null);
        setResult(null);
      } else {
        setInputSize('');
        setResultSize('');
      }
    };
  
    const handleCalculate = () => {
      try {
        console.log(inputValue);
        const result = calc(inputValue);
        if (!isNaN(result)) {
          setInputSize('small');
          setResultSize('big');
          setResult(result.toFixed(2)); // Format result to two decimal places
        }
      } catch (error) {
        setResult('Error');
      }
    };
  
    const handleProcess = (event) => {
      const buttonValue = event.target.value;
      switch (buttonValue) {
        case 'AC':
          setInputValue('');
          setResult('');
          setInputSize('');
          setResultSize('');
          break;
        case 'b': 
          if (inputValue !== '' ) {
            const updatedInputValue = inputValue.slice(0, -1); // Remove last character
            setInputValue(updatedInputValue);
          }
          break;
        case '%': 
            if (inputValue !== '' ) {
              const updatedInputValue = inputValue/100; 
              setInputValue(updatedInputValue);
            }
          
          break;
        case '.':
            if(inputValue.indexOf('.')===-1){
              const updatedInputValue = inputValue+'.'
              setInputValue(updatedInputValue);
            }
            break
        default:
          setInputValue(inputValue + buttonValue);
          break;
      }
    };
    
  
    return (
      <div className="container">
        <div className="disp-box">
          <p className={`result ${resultSize}`}>{result}</p>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKey}
            className={`input-element ${inputSize}`}
            placeholder="0"
            autoFocus
          />
        </div>
        <div className='calcbutt'>
          <button className="custom-button AC" value="AC" onClick={handleProcess}>
            AC
          </button>
          <button className="custom-button percent" value="%" onClick={handleProcess}>
            %
          </button>
          <button className="custom-button back" value="b" onClick={handleProcess}>
            &#x2190;
          </button>
          <button className="custom-button div" value="/" onClick={handleProcess}>
            &#x00F7;
          </button>
    
          <button className="custom-button" value="7" onClick={handleProcess}>7</button>
          <button className="custom-button" value="8" onClick={handleProcess}>8</button>
          <button className="custom-button" value="9" onClick={handleProcess}>9</button>
    
    
    
          <button className="custom-button mul" value="*" onClick={handleProcess}>
            *
          </button>
          <button className="custom-button" value="4" onClick={handleProcess}>4</button>
          <button className="custom-button" value="5" onClick={handleProcess}>5</button>
          <button className="custom-button" value="6" onClick={handleProcess}>6</button>
          <button className="custom-button sub" value="-" onClick={handleProcess}>
            -
          </button>
    
          <button className="custom-button" value="1" onClick={handleProcess}>1</button>
          <button className="custom-button" value="2" onClick={handleProcess}>2</button>
          <button className="custom-button" value="3" onClick={handleProcess}>3</button>
          <button className="custom-button add" value="+" onClick={handleProcess}>
            +
          </button>
          <button className="custom-button" value="00" onClick={handleProcess}>00</button>
          <button className="custom-button" value="0" onClick={handleProcess}>0</button>
          <button className="custom-button" value="." onClick={handleProcess}>.</button>
    
          
    
          <button className="custom-button equal-to" onClick={handleCalculate}>
            =
          </button>
        </div>
      </div>
    );
  }
  
  export default Calculator;