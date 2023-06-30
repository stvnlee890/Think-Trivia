import { render, screen, fireEvent } from "@testing-library/react";
// import user from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

import Home from "../components/home/Home";

// Stack overflow
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Home renders", () => {
  test("Displays application name heading", async () => {
    render(<Home />);
    const mainHeading = await screen.findByRole("heading");
    expect(mainHeading).toHaveTextContent("Think Trivia");
  });

  test("Displays start playing button", async () => {
    render(<Home />);
    const button = await screen.findByRole("button");
    expect(button).toHaveTextContent("Start Playing");
  });
});

describe("Button interaction", () => {
  test("Direct users to quiz page", async () => {
    render(<Home />);
    const button = screen.getByRole("button", { name: "Start Playing" });
    fireEvent.click(button);
    expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
  });
});
