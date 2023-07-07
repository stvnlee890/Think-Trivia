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

  const answerRef = styleRef.current;

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
    setCurrentAnswer(currentQuestion.correctAnswer)
  }, [questionIndex]);
console.log(currentAnswer)
  const handleIndexCount = () => {
    const getAnswerIndex = answers.indexOf(currentAnswer);
    const correctAnswerIndex = answers.indexOf(
      currentQuestion.correctAnswer
    );
    const { userAnswerStyle, correctAnswerStyle, correctAnswerCount } =
      validateAnswer();
      console.log(getAnswerIndex)

    if (answerRef) {
      (
        answerRef.children[getAnswerIndex] as HTMLElement
      ).style.backgroundColor = userAnswerStyle;
      (
        answerRef.children[correctAnswerIndex] as HTMLElement
      ).style.backgroundColor = correctAnswerStyle;
    }

    if (questionIndex < 9) {
      setTimeout(() => {
        setQuestionIndex((questionIndex) => questionIndex + 1);
        if (answerRef) {
          (
            answerRef.children[correctAnswerIndex] as HTMLElement
          ).style.backgroundColor = "";
          (
            answerRef.children[getAnswerIndex] as HTMLElement
          ).style.backgroundColor = "";
        }
      }, 1500);
      setCorrectAnswerCount((prev) => prev + correctAnswerCount);
    } else {
      // Allow render of last quiz element in array
      setQuestionIndex((questionIndex) => questionIndex * 1);
    }
  };
  // console.log(correctAnswerCount);
  const handleClick = (e: React.MouseEvent) => {
    const userClick = e.target as HTMLElement;
    const text = userClick.innerText;
    const clickedElement: string = userClick.className.split(" ")[1];
    if (answerRef) {
      const childNodes = [...answerRef.children];
      childNodes.forEach((ele) => {
        if (ele.className.includes(clickedElement)) {
          (ele as HTMLElement).style.backgroundColor = "blue";
        } else {
          (ele as HTMLElement).style.backgroundColor = "";
        }
      });
    }
    setCurrentAnswer(text);
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
        userAnswerStyle: "green",
        correctAnswerCount: 1,
        correctAnswerStyle: "green",
      };
    } else {
      return {
        correctAnswerStyle: "green",
        userAnswerStyle: "red",
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
          <div
            key={idx}
            className={`answer-wrapper ${idx}`}
            onClick={handleClick}
          >
            <p className={`answers ${idx}`}>{ele}</p>
          </div>
        ))}
      </div>
      <button onClick={handleIndexCount}>Next</button>
    </section>
  );
}
