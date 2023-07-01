import { render, screen, fireEvent } from "@testing-library/react";
// import user from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

import Home from "../components/home/Home";

describe("Home page renders", () => {
  test("Displays application name heading", async () => {
    render(<Home />);
    const mainHeading = await screen.findByRole("heading");
    expect(mainHeading).toHaveTextContent("Think Trivia");
  });

  test("Displays proper button text", async () => {
    render(<Home />);
    const button = await screen.findByRole("button");
    expect(button).toHaveTextContent("Start Playing");
  });
});

describe("Button interaction", () => {
  test("Navigates to QuizPage when button is clicked", async () => {    
    render(<Home />);
    const button = screen.getByRole("button", { name: "Start Playing" });
    fireEvent.click(button);
    expect(window.location.pathname).toContain('/quiz');
  });
});
