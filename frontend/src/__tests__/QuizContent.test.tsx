import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QuizItem } from "../components/quizPage/QuizPage";
import QuizContent from "../components/quizContent/QuizContent";
import { act } from "react-dom/test-utils";

const mockQuiz: QuizItem[] = [];

for (let i = 0; i < 10; i++) {
  const quiz: QuizItem = {
    category: `Mock category ${i}`,
    correctAnswer: "Mock Correct Answer",
    difficulty: "Mock Difficulty",
    id: "mock-id",
    incorrectAnswers: [
      "Incorrect Answer 1",
      "Incorrect Answer 2",
      "Incorrect Answer 3",
    ],
    isNiche: false,
    question: { text: "Mock Question" },
    regions: [],
    tags: [],
    type: "multiple",
  };
  mockQuiz.push(quiz);
}

test("should start the quiz index at 1", () => {
  render(<QuizContent quiz={mockQuiz} />);
  expect(screen.getByText("Question 1 / 10")).toBeVisible();
});

test("button should icrement quiz index by 1 when clicked", async () => {
  render(<QuizContent quiz={mockQuiz} />);
  jest.useFakeTimers();
  fireEvent.click(screen.getByRole("button"));
  act(() => {
    jest.runAllTimers();
  });

  expect(screen.getByText("Question 2 / 10")).toBeVisible();

  jest.useRealTimers();
});


test("the sum of category values after each quiz should be 10", async () => {
  const user = userEvent.setup();
  render(<QuizContent quiz={mockQuiz} />);
  const category: { [key: string]: number } = {};
  const button = await screen.findByRole("button");
  for (let i = 0; i < mockQuiz.length; i++) {
    const currentQuestion = mockQuiz[i];

    if (!category[currentQuestion.category]) {
      category[currentQuestion.category] = 1;
    } else {
      category[currentQuestion.category]++;
    }
    await user.click(button);
  }

  const sum = Object.values(category).reduce((acc, value) => acc + value, 0);
  expect(sum).toBe(10);
});
