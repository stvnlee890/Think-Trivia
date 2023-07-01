// Imports
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import App from "../App";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock("react-router-dom")

// TESTS
describe("App component", () => {
  test("Renders home content", async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const mainHeading = await screen.findByRole("heading");
    expect(mainHeading).toHaveTextContent("Think Trivia");
  });
});
