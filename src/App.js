import React, { useEffect, useState } from "react"
import './App.css'
import GuessList from "./components/GuessList"
import KeypadButton from "./components/KeypadButton"
import OtherButtons from "./components/OtherButtons"
import Error from "./components/Error/Error"
import Input from "./components/Input/Input"
import Score from "./components/Score/Score"
import Title from "./components/Title"

function App() {
  const [initialNum, setInitialNum] = useState([])
  const [guess, setGuesses] = useState([])
  const [num, setNum] = useState([''])
  const [error, setError] = useState(false)
  const [win, setWin] = useState('')
  const [isWin, setIsWin] = useState(false)

  useEffect(() => {
    setInitialNum(secretNumber())
  }, [])
  
  function keypad (numKey) {
    if (num.length < 4) {
      if (num.includes(numKey)) {
        return setError("Number already exists")
      }
      setNum(prevNum => prevNum += numKey.toString())
    } else {
      setError("4-digit max")
    }
  }

  function clear() {
    setNum('')
    setError('')
  }

  function handleGuess() {
    let bullCount = 0
    let cowCount = 0
    
    for (let i = 0; i < 4; i++) {
      if (num.includes(initialNum[i]) && initialNum[i].toString() === num[i]) {
        bullCount++
      } else if (num.includes(initialNum[i])) {
        cowCount++
      }
    }

    if (num === '') return setError("Guess number can't be empty")
    if (num.length < 4) return setError("Enter a 4-digit number")
    for (let i = 0; i < guess.length; i++) {
      if (Object.values(guess[i]).includes(num)) 
        return setError("You already guessed this number")
    }

    setGuesses(prevGuess => {
      return [...prevGuess, { 
        id: guess.length, guessNum: num, bull: bullCount, cow: cowCount}]
    })

    if (bullCount === 4){
      setWin("Win number is " + initialNum)
      setIsWin(true)
    }

    clear()
  }

  return (
    <div className="App">
      <div className="container">
        <Title title="Bulls and Cows" />
        <Title title={win} />
        <div className="left-container">
          <Score score={guess.length} />
          <GuessList 
            guess={guess} highlight={win ? 'highlight' : ''} 
            data-testid="guess-list"/>
        </div>
        <div className="right-container">
          <Input num={num} />
          <Error error={error}/>
          <div className="keypad">
            <OtherButtons 
              className="clear" onClick={clear} 
              buttonText="Clear" disabled={isWin} />
            <KeypadButton keyPad={keypad} keypadNum={0} disabled={isWin} />
            <KeypadButton keyPad={keypad} keypadNum={1} disabled={isWin}/>
            <KeypadButton keyPad={keypad} keypadNum={2} disabled={isWin}/>
            <KeypadButton keyPad={keypad} keypadNum={3} disabled={isWin}/>
            <KeypadButton keyPad={keypad} keypadNum={4} disabled={isWin}/>
            <KeypadButton keyPad={keypad} keypadNum={5} disabled={isWin}/>
            <KeypadButton keyPad={keypad} keypadNum={6} disabled={isWin}/>
            <KeypadButton keyPad={keypad} keypadNum={7} disabled={isWin}/>
            <KeypadButton keyPad={keypad} keypadNum={8} disabled={isWin}/>
            <KeypadButton keyPad={keypad} keypadNum={9} disabled={isWin}/>
            <OtherButtons 
              className="guess" onClick={handleGuess} 
              buttonText="Guess!" disabled={isWin}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

export function secretNumber () {
  let numArray = []
  for(let i = 0; numArray.length < 4; i++){
    let num = Math.floor(Math.random() * 10);
    if(numArray.find(n => n === num) === undefined){
      numArray.push(num)
    }
  }
  return numArray
}