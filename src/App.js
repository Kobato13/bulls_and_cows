import React, { useEffect, useState } from "react"
import './App.css'
import GuessList from "./components/GuessList"

function App() {
  const [initialNum, setInitialNum] = useState([])
  const [guess, setGuesses] = useState([])
  const [num, setNum] = useState([''])
  const [error, setError] = useState(false)
  const [win, setWin] = useState('')

  useEffect(() => {
    setInitialNum(initialRandom())
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

    setGuesses(prevGuess => {
      return [...prevGuess, { 
        id: guess.length, guessNum: num, bull: bullCount, cow: cowCount}]
    })

    if (bullCount === 4) setWin("Win number is " + initialNum)

    clear()
  }

  return (
    <div className="App">
      <div className="container">
        <h1>Bulls and Cows</h1>
        <h1>{win}</h1>
        <div className="left-container">
          <p className="score">Score: {guess.length}</p>
          <GuessList guess={guess} highlight={win ? 'highlight' : ''}/>
        </div>
        <div className="right-container">
          <input type = "text" value = {num} readOnly={true}/>
          <p className="error">{error}</p>
          <div className="keypad">
            <button className="clear" onClick={clear}>Clear</button>
            <button onClick={() => keypad(0)}>{0}</button>
            <button onClick={() => keypad(1)}>{1}</button>
            <button onClick={() => keypad(2)}>{2}</button>
            <button onClick={() => keypad(3)}>{3}</button>
            <button onClick={() => keypad(4)}>{4}</button>
            <button onClick={() => keypad(5)}>{5}</button>
            <button onClick={() => keypad(6)}>{6}</button>
            <button onClick={() => keypad(7)}>{7}</button>
            <button onClick={() => keypad(8)}>{8}</button>
            <button onClick={() => keypad(9)}>{9}</button>
            <button className="guess" onClick={handleGuess}>Guess!</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

function initialRandom () {
  let numArray = []
  for(let i = 0; numArray.length < 4; i++){
    let num = Math.floor(Math.random() * 10);
    if(numArray.find(n => n === num) === undefined){
      numArray.push(num)
    }
  }
  return numArray
}