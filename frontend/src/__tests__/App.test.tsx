// Imports
import { render, screen } from "@testing-library/react"
import user from '@testing-library/user-event'

// To Test
import App from "../App";

// TESTS
test('Renders main page correctly', async () => {
    // Setup
    render(<App />);
    const buttonCount = await screen.findByRole('button')

    // Pre expectations
    expect(buttonCount.innerHTML).toBe('count is: 0')

    // Init
    // Need await because user.click() returns a promise
    await user.click(buttonCount);
    await user.click(buttonCount);

    // Post expectations
    expect(buttonCount.innerHTML).toBe('count is: 2')
})

