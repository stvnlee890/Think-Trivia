// Imports
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import '@testing-library/jest-dom/extend-expect'

// To Test
import App from "../App";

// TESTS
describe("App component", () => {
  test("Renders main page correctly", async () => {
    // Arrange
    render(<App />);
    const heading = await screen.findByRole('heading')
    expect(heading).toHaveTextContent('Vite + React')
  });


test("Renders button correctly", async () => {
    render(<App />)
    const button = await screen.findByRole('button')
    expect(button).toHaveTextContent('count is: 0')
})

test("Increments button correctly", async () => {
    // Arrang
    render(<App />)
    const button = await screen.findByRole('button')
    // Act
    await user.click(button)
    await user.click(button)
    // Assert
    expect(button).toHaveTextContent('count is: 2')
})
});
