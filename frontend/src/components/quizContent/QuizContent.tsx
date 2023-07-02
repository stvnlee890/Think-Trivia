import "./quizContent.css";
import { useState } from "react";
import { QuizItem } from "../quizPage/QuizPage";

export interface IProps {
  quiz: QuizItem[];
}

export default function QuizContent({ quiz }: IProps) {
  console.log(quiz);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const currentQuestion = quiz[questionIndex]

  const handleCount = () => {
    if (questionIndex < 9) {
      setQuestionIndex((questionIndex) => questionIndex + 1);
    }
  };

  const shuffle = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const answers = shuffle([...currentQuestion.incorrectAnswers, currentQuestion.correctAnswer])

  return (
    <section className="quiz-content container">
      <p>
        {questionIndex + 1} / {quiz.length}
      </p>
      <div className="quiz-content wrapper">
        <p>{currentQuestion.question.text}</p>
      </div>
      <div className="answer">
        { answers.map((ele, idx) => (
            <p key={idx}>{ele}</p>
        )) }
      </div>
      <button onClick={handleCount}>Next</button>
    </section>
  );
}
