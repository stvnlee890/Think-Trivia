import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QuizItem } from "../components/quizPage/QuizPage";
import QuizContent from "../components/quizContent/QuizContent";

const mockQuiz: QuizItem[] = [];

for (let i = 0; i < 10; i++) {
  const quiz: QuizItem = {
    category: `Mock category ${i}`,
    correctAnswer: "Mock Correct Answer",
    difficulty: "Mock Difficulty",
    id: "mock-id",
    incorrectAnswers: ["Incorrect Answer 1", "Incorrect Answer 2"],
    isNiche: false,
    question: { text: "Mock Question" },
    regions: [],
    tags: [],
    type: "multiple",
  };
  mockQuiz.push(quiz);
}

test("count should increment correctly and display the question text", async () => {
  const user = userEvent.setup();
  render(<QuizContent quiz={mockQuiz} />);
  let count = 0;
  const button = await screen.findByRole("button");
  for (let i = 0; i < mockQuiz.length; i++) {
    await user.click(button);
    count++;
  }
  const countParagraph = screen.getByText(`${count} / ${mockQuiz.length}`);
  const questionText = screen.getByText(mockQuiz[count -1].question.text);
  expect(countParagraph).toHaveTextContent('10 / 10');
  expect(questionText).toBeInTheDocument();
});

test("the sum of category values after each quiz should be 10", () => {
  render(<QuizContent quiz={mockQuiz} />);
  const category: { [key: string]: number } = {};
  for (let i = 0; i < mockQuiz.length; i++) {
    const currentQuestion = mockQuiz[i];

    if (!category[currentQuestion.category]) {
      category[currentQuestion.category] = 1;
    } else {
      category[currentQuestion.category]++;
    }
  }
  const sum = Object.values(category).reduce((acc, value) => acc + value, 0);
  expect(sum).toBe(10)
});
