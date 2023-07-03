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
  const [correctAnswerCount, setCorrectAnswerCount] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [category, setCategory] = useState<Category>({});
  const currentQuestion = quiz[questionIndex];

  useLayoutEffect(() => {
    setAnswers(
      shuffle([
        ...currentQuestion.incorrectAnswers,
        currentQuestion.correctAnswer,
      ])
    );
    if (!category[currentQuestion.category]) {
      setCategory({ ...category, [currentQuestion.category]: 1 });
    } else {
      setCategory({
        ...category,
        [currentQuestion.category]: (category[currentQuestion.category] += 1),
      });
    }
  }, [questionIndex]);

  const handleIndexCount = () => {
    if (questionIndex < 9) {
      setQuestionIndex((questionIndex) => questionIndex + 1);
    } else {
      setQuestionIndex((questionIndex) => questionIndex * 1);
    }
  };

  const checkAnswers = (e: React.MouseEvent<HTMLElement>) => {
    const userClick = e.target as HTMLElement;
    if (userClick.innerText === quiz[questionIndex].correctAnswer) {
      setCorrectAnswerCount((prev) => (prev += 1));
    }
  };
  console.log(correctAnswerCount);

  function shuffle(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

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
          <p onClick={checkAnswers} key={idx}>
            {ele}
          </p>
        ))}
      </div>
      <button onClick={handleIndexCount}>Next</button>
    </section>
  );
}
