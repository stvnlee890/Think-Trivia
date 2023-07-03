import "./quizContent.css";
import { useState, useLayoutEffect } from "react";
import { QuizItem } from "../quizPage/QuizPage";

export interface IProps {
  quiz: QuizItem[];
}

type Category = {
  [key: string]: number;
};

export default function QuizContent({ quiz }: IProps) {
  console.log(quiz);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [category, setCategory] = useState<Category>({});
  const currentQuestion = quiz[questionIndex];

  useLayoutEffect(() => {
    if (!category[currentQuestion.category]) {
      setCategory({ ...category, [currentQuestion.category]: 1 });
    } else {
      setCategory({
        ...category,
        [currentQuestion.category]: (category[currentQuestion.category] += 1),
      });
    }
    console.log(category);
  }, [questionIndex]);

  const handleCount = () => {
    if (questionIndex < 9) {
      setQuestionIndex((questionIndex) => questionIndex + 1);
    } else {
      setQuestionIndex((questionIndex) => questionIndex * 1);
    }
  };

  const shuffle = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const answers = shuffle([
    ...currentQuestion.incorrectAnswers,
    currentQuestion.correctAnswer,
  ]);

  return (
    <section className="quiz-content container">
      <p>
        {questionIndex + 1} / {quiz.length}
      </p>
      <div className="quiz-content wrapper">
        <p>{currentQuestion.question.text}</p>
      </div>
      <div className="answer">
        {answers.map((ele, idx) => (
          <p key={idx}>{ele}</p>
        ))}
      </div>
      <button onClick={handleCount}>Next</button>
    </section>
  );
}
