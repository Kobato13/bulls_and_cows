import { render, screen, fireEvent } from '@testing-library/react';
import App, { secretNumber } from './App';
import GuessList from "./components/GuessList"
import Guess from "./components/Guess/Guess"


test("render app", () => {
  render(<App />)
})

test("renders the title", () => {
  render(<App />)
  const title = screen.getByText(/bulls and cows/i)
  expect(title).toBeInTheDocument()
})

test('check render number 1', ()=> {
  render(<App />);
  const input1 = screen.getByText(/1/i);
  fireEvent.change(input1, { target: { value: "1" } });
  expect(input1.value).toBe("1")
});

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
  it('should render a 4 digit number', () => {
    const secretNum = secretNumber()
    expect(secretNum.length).toBe(4)
  })

  // test("guess number has to be 4-digits", () => {
  //   render(<Guess guess={[]} />)
  //   const guessNum = screen.getByText(/1234/i)
  //   expect(guessNum.length).toBe(4)
  // })
  
  test("renders a random number", () => {
    const secretNum = secretNumber()
    expect(secretNum).not.toBe(null)
  })
  
})

const setup = () => {
  const utils = render(<App />)
  const input = utils.getByLabelText('guess-input')
  return {
    input,
    ...utils,
  }
}

describe("Renders the inputed numbers", () => {

  it('should not allow letters to be inputted', () => {
    const {input} = setup()
    expect(input.value).toBe('')
    fireEvent.change(input, {target: {value: 'test'}})
    expect(input.value).toBe('')
  })

  // it('should have maximum of 4-digits inputted', () => {
  //   const inputTest = screen.getByTestId("guess-input-id");
  //   expect(inputTest).toBeInTheDocument()
  //   fireEvent.change(inputTest, {target: {value: '1234'}})
  //   expect(inputTest.value).toBe('1234')
  // })
})



