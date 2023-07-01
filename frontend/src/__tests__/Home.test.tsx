import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import ReactRouter from "react-router-dom";
import Home from "../components/home/Home";

describe("Home page renders", () => {
  it("should display app name", async () => {
    render(<Home />);
    const mainHeading = await screen.findByRole("heading");
    expect(mainHeading).toHaveTextContent("Think Trivia");
  });

  it("should display button's proper text", async () => {
    render(<Home />);
    const button = await screen.findByRole("button");
    expect(button).toHaveTextContent("Start Playing");
  });
});

describe("Button interaction", () => {
  it("should navigate to QuizPage when button is clicked", async () => {
    const user = userEvent.setup();
    const mockedUsedNavigate = jest.fn();
    jest.spyOn(ReactRouter, "useNavigate").mockReturnValue(mockedUsedNavigate);

    render(<Home />);

    const button = screen.getByText("Start Playing");
    await user.click(button);

    expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/quiz");
  });
});
