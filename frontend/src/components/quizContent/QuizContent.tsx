import "./quizContent.css";
import { useState, useLayoutEffect, useRef } from "react";
import { QuizItem } from "../quizPage/QuizPage";

export interface IProps {
  quiz: QuizItem[];
}

type Category = {
  [key: string]: number;
};

export default function QuizContent({ quiz }: IProps) {
  console.log(quiz);
  const styleRef = useRef<HTMLDivElement>(null);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [correctAnswerCount, setCorrectAnswerCount] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<string>("");
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
    const answerRef = styleRef.current;
    const getAnswerIndex = answers.indexOf(currentAnswer);
    const correctAnswerIndex = answers.indexOf(
      quiz[questionIndex].correctAnswer
    );
    const { userAnswerStyle, correctAnswerStyle, correctAnswerCount } =
      validateAnswer();
    if (questionIndex < 9) {
      if (answerRef) {
        (answerRef.children[getAnswerIndex] as HTMLElement).style.border =
          userAnswerStyle;
        (answerRef.children[correctAnswerIndex] as HTMLElement).style.border =
          correctAnswerStyle;
      }
      setTimeout(() => {
        setQuestionIndex((questionIndex) => questionIndex + 1);
        if (answerRef) {
          (answerRef.children[correctAnswerIndex] as HTMLElement).style.border =
            "";
          (answerRef.children[getAnswerIndex] as HTMLElement).style.border = "";
        }
      }, 1500);
      setCorrectAnswerCount((prev) => prev + correctAnswerCount);
    } else {
      setQuestionIndex((questionIndex) => questionIndex * 1);
      if (answerRef) {
        (answerRef.children[getAnswerIndex] as HTMLElement).style.border =
          userAnswerStyle;
        (answerRef.children[correctAnswerIndex] as HTMLElement).style.border =
          correctAnswerStyle;
      }
    }
  };
  console.log(correctAnswerCount);
  const storeCurrAnswer = (e: React.MouseEvent<HTMLElement>) => {
    const userClick = e.target as HTMLElement;
    setCurrentAnswer(userClick.innerText);
  };

  function shuffle(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function validateAnswer() {
    if (currentAnswer === quiz[questionIndex].correctAnswer) {
      return {
        userAnswerStyle: "1px solid green",
        correctAnswerCount: 1,
        correctAnswerStyle: "1px solid green",
      };
    } else {
      return {
        correctAnswerStyle: "1px solid green",
        userAnswerStyle: "1px solid red",
        correctAnswerCount: 0,
      };
    }
  }

  return (
    <section className="quiz-content container">
      <p>
        {questionIndex + 1} / {quiz.length}
      </p>
      <div className="quiz-content wrapper">
        <p>{currentQuestion.question.text}</p>
      </div>
      <div ref={styleRef} className="answer-container">
        {answers.map((ele, idx) => (
          <p className={`answers-${idx}`} onClick={storeCurrAnswer} key={idx}>
            {ele}
          </p>
        ))}
      </div>
      <button onClick={handleIndexCount}>Next</button>
    </section>
  );
}
