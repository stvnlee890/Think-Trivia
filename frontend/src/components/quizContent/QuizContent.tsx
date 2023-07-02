import { useState } from "react";
import { QuizItem } from "../quizPage/QuizPage";

export interface IProps {
  quiz: QuizItem[];
}

export default function QuizContent({ quiz }: IProps) {
  const [count, setCount] = useState<number>(0);
  const handleCount = () => {
    if (count < 9) {
        setCount((count) => count + 1)
    } 
  };

  return (
    <div>
      <h1>Quiz Page</h1>
      <p>{count} / {quiz.length}</p>
      <p>{quiz[count].question.text}</p>
      <button onClick={handleCount}>Next</button>
    </div>
  );
}
