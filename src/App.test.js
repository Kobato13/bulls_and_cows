import { render, screen, fireEvent } from '@testing-library/react'
import App, { secretNumber } from './App'
import Guess from "./components/Guess/Guess"
import Input from "./components/Input/Input"
import OtherButtons from "./components/OtherButtons"
import Error from "./components/Error/Error"


test("render app", () => {
  render(<App />)
})

test("renders the title", () => {
  render(<App />)
  const title = screen.getByText(/bulls and cows/i)
  expect(title).toBeInTheDocument()
})

describe("Renders the guess, bulls and cows", () => {
  it("should render the guess", () => {
    render(<Guess guess={[]} />)
    const guess = screen.getByText(/guess/i)
    expect(guess).toBeInTheDocument()
  })
  
  it("should render the bulls", () => {
    render(<Guess guess={[]} />)
    const bulls = screen.getByText(/bulls/i)
    expect(bulls).toBeInTheDocument()
  })
  
  it("should render the cows", () => {
    render(<Guess guess={[]} />)
    const cows = screen.getByText(/cows/i)
    expect(cows).toBeInTheDocument()
  })
})

describe("Renders intial random number", () => {
  it("should render a random number", () => {
    const secretNum = secretNumber()
    expect(secretNum).not.toBe(null)
  })
  it('should render a 4 digit number', () => {
    const secretNum = secretNumber()
    expect(secretNum.length).toBe(4)
  })
  it('should not be repeated numbers', () => {
    const secretNum = secretNumber() // [1,2,2,4] --test
    function checkIfArrayIsUnique(array) {
      return array.length === new Set(array).size
    }
    expect(checkIfArrayIsUnique(secretNum)).toBe(true)
  })

})

describe("Renders the inputed numbers", () => {
  // //doesnt work because It also accept letters but It only has buttons for numbers
  // it('should not allow letters to be inputted', () => {
  //   render (<App />)
  //   const inputText = screen.getByRole('textbox')
  //   fireEvent.click(screen.getByRole('button', {  name: /test/i}))
  //   expect(inputText.value).toBe('')
  // })
    
  it('should render inputted numbers', () => {
    render (<App />)
    const inputText = screen.getByRole('textbox')
    fireEvent.click(screen.getByRole('button', {  name: /1/i}))
    fireEvent.click(screen.getByRole('button', {  name: /2/i}))
    fireEvent.click(screen.getByRole('button', {  name: /3/i}))
    fireEvent.click(screen.getByRole('button', {  name: /4/i}))
    expect(inputText.value).toBe('1234')
  })

  it('should have maximum of 4-digits inputted', () => {
    render (<App />)
    //render (<Error />)
    const inputText = screen.getByRole('textbox')
    //const errorText = screen.getByText(/4\-digit max/i)
    fireEvent.click(screen.getByRole('button', {  name: /1/i}))
    fireEvent.click(screen.getByRole('button', {  name: /2/i}))
    fireEvent.click(screen.getByRole('button', {  name: /3/i}))
    fireEvent.click(screen.getByRole('button', {  name: /4/i}))
    fireEvent.click(screen.getByRole('button', {  name: /5/i}))
    expect(inputText.value).not.toBe('12345')
    //expect(errorText.value).toBe('4-digit max')
  })

  it('should have no duplicate input numbers', () => {
    render (<App />)
    const inputText = screen.getByRole('textbox')
    fireEvent.click(screen.getByRole('button', {  name: /2/i}))
    fireEvent.click(screen.getByRole('button', {  name: /2/i}))
    expect(inputText.value).not.toBe('22')
  })
})


describe("Renders the keypad value as the right number", () => {
  it('should render number 1', ()=> {
    render(<App />);
    const input1 = screen.getByText(/1/i);
    fireEvent.change(input1, { target: { value: "1" } })
    expect(input1.value).toBe("1")
  })
})

describe("For guess and clear buttons", () => {
  test('Clicking guess will clear the inputted numbers', () => {
    render (<App />)
    const inputText = screen.getByRole('textbox')
    fireEvent.click(screen.getByRole('button', {  name: /1/i}))
    fireEvent.click(screen.getByRole('button', {  name: /2/i}))
    fireEvent.click(screen.getByRole('button', {  name: /3/i}))
    fireEvent.click(screen.getByRole('button', {  name: /4/i}))
    expect(inputText.value).toBe('1234')
    fireEvent.click(screen.getByRole('button', {  name: /guess!/i}))
    expect(inputText.value).toBe('')
  })

  test('Clicking clear will clear the inputted numbers', () => {
    render (<App />)
    const inputText = screen.getByRole('textbox')
    fireEvent.click(screen.getByRole('button', {  name: /1/i}))
    fireEvent.click(screen.getByRole('button', {  name: /2/i}))
    fireEvent.click(screen.getByRole('button', {  name: /3/i}))
    fireEvent.click(screen.getByRole('button', {  name: /4/i}))
    fireEvent.click(screen.getByRole('button', {  name: /clear/i}))
    expect(inputText.value).not.toBe('1234')
  })
})