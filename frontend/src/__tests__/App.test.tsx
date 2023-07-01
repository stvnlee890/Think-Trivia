// Imports
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
// import user from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

// To Test
import App from "../App";

// Stack overflow
/*
jest.mock() is a Jest function that mock dependencies. Here we're mocking
the entire "react-router-dom" module.

`jest.requireActual("react-router-dom")` is used to import the actual implementations
of the `react-router-dom` module. This ensures that all other exports from
`react-router-dom` are still available in the mocked module.

Within the mocked module, the `useNavigate` export is replaced with a new function
implementation: `() => mockedUseNavigate`. This means that when
`useNavigate` is used in the tested component, it will be replaced with
`mockedUseNavigate`
*/

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

// TESTS
describe("App component", () => {
  test("Renders home content", async () => {
    render(
      <Router>
        <App />
      </Router>
    );
    const mainHeading = await screen.findByRole("heading");
    expect(mainHeading).toHaveTextContent("Think Trivia");
  });
});
