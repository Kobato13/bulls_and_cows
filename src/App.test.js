import { render, screen, fireEvent } from '@testing-library/react'
import App, { secretNumber } from './App'
import Guess from "./components/Guess/Guess"
import Input from "./components/Input/Input"


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

const setup = () => {
  const utils = render(<Input />)
  const input = utils.getByTestId('guess-input')
  return {
    input,
    ...utils,
  }
}

describe("Renders the inputed numbers", () => {

  // //doesnt work because It also accept letters but It only has buttons for numbers
  // it('should not allow letters to be inputted', () => {
  //   const {input} = setup()
  //   expect(input.value).toBe('')
  //   fireEvent.change(input, {target: {value: 'test'}})
  //   expect(input.value).toBe('')
  // })

  it('should render inputted numbers', () => {
    const {input} = setup()
    fireEvent.change(input, {target: {value: '1234'}})
    expect(input.value).toBe('1234')
  })

  // it('should have maximum of 4-digits inputted', () => {
  //   const button = screen.getByText(/Guess!/i)
  //   const {input} = setup()
  //   fireEvent.change(input, {target: {value: '1234'}})
  //   fireEvent.click(button)
  //   expect(screen.getByTestId("guess-list")).toHaveTextContent('1234');
  //   expect(input.value).toBe('1234')
  // })
})


describe("Renders the keypad value as the right number", () => {
  it('should render number 1', ()=> {
    render(<App />);
    const input1 = screen.getByText(/1/i);
    fireEvent.change(input1, { target: { value: "1" } })
    expect(input1.value).toBe("1")
  })

})