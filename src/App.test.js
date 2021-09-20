import { render, screen, fireEvent } from '@testing-library/react';
import App, { initialRandom } from './App';
import GuessList from "./components/GuessList"
import Guess from "./components/Guess"


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


test('check render number 1', ()=> {
  render(<App />);
  const input = screen.getByText(/1/i);
  fireEvent.change(input, { target: { value: "1" } });
  expect(input.value).toBe("1")
});


describe("Renders intial random number", () => {
  it('should render a 4 digit number', () => {
    const initialNumber = initialRandom()
    expect(initialNumber.length).toBe(4)
  })
  // test("guess number has to be 4-digits", () => {
  //   render(<Guess guess={[]} />)
  //   const guessNum = screen.getByText(/1234/i)
  //   expect(guessNum.length).toBe(4)
  // })
  
  // test("renders a random number", () => {
  //   const initialNumber = initialRandom()
  //   expect(initialNumber).not.toBe(null)
  // })
  
  // test("unique, not repeated numbers", () => {
  //   const initialNumber = initialRandom()
  //   expect(initialNumber).toBe(true)
  //   expect([1, 2, 3, 4]).toBe([1, 2, 3, 4])
  //   expect(1122).toBe(false)
  // })
})

