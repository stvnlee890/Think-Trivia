import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QuizItem } from "../components/quizPage/QuizPage";
import QuizContent from "../components/quizContent/QuizContent";

describe("Test count state functionality", () => {
  test("count should increment correctly and display the question text", async () => {
    const user = userEvent.setup();

    const mockQuiz: QuizItem[] = [
      {
        category: "Mock Category",
        correctAnswer: "Mock Correct Answer",
        difficulty: "Mock Difficulty",
        id: "mock-id",
        incorrectAnswers: ["Incorrect Answer 1", "Incorrect Answer 2"],
        isNiche: false,
        question: { text: "Mock Question" },
        regions: [],
        tags: [],
        type: "multiple",
      },
      {
        category: "Mock Category",
        correctAnswer: "Mock Correct Answer",
        difficulty: "Mock Difficulty",
        id: "mock-id",
        incorrectAnswers: ["Incorrect Answer 1", "Incorrect Answer 2"],
        isNiche: false,
        question: { text: "Mock Questions" },
        regions: [],
        tags: [],
        type: "multiple",
      },
    ];

    render(<QuizContent quiz={mockQuiz} />);
    let count = 0;
    const button = screen.getByText("Next");
    for (let i = 0; i < mockQuiz.length - 1; i++) {
      await user.click(button);
      count++;
    }
    const countParagraph = screen.getByText(`${count} / ${mockQuiz.length}`);
    const questionText = screen.getByText(mockQuiz[count].question.text);
    expect(countParagraph).toHaveTextContent(`${count} / ${mockQuiz.length}`);
    expect(questionText).toBeInTheDocument();
  });
});
