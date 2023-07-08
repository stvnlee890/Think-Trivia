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
  console.log(quiz)
  const styleRef = useRef<HTMLDivElement>(null);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [correctAnswerCount, setCorrectAnswerCount] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<string>("");
  const [category, setCategory] = useState<Category>({});
  const [toggleView, setToggleView] = useState<boolean>(false)
  const currentQuestion = quiz[questionIndex];

  const answerRef = styleRef.current;
  const getAnswerIndex = answers.indexOf(currentAnswer);
  const correctAnswerIndex = answers.indexOf(currentQuestion.correctAnswer);

  console.log(category)
  useLayoutEffect(() => {
    console.log(getAnswerIndex === correctAnswerIndex)
    setAnswers(shuffle([...currentQuestion.incorrectAnswers, currentQuestion.correctAnswer]));
    setCurrentAnswer(currentQuestion.correctAnswer)
  }, [questionIndex]);

  const handleIndexCount = () => {
    const { userAnswerStyle, correctAnswerStyle, correctAnswerCount } = validateAnswer();
    if (answerRef) {
      (answerRef.children[getAnswerIndex] as HTMLElement).style.backgroundColor = userAnswerStyle;
      (answerRef.children[correctAnswerIndex] as HTMLElement).style.backgroundColor = correctAnswerStyle;
    }

    if (!category[currentQuestion.category] && getAnswerIndex === correctAnswerIndex) {
      setCategory({ ...category, [currentQuestion.category]: 1 });
    } else if(getAnswerIndex === correctAnswerIndex && getAnswerIndex === correctAnswerIndex) {
      setCategory({...category,[currentQuestion.category]: (category[currentQuestion.category] += 1),
      });
    }

    if (questionIndex < quiz.length -1) {
      setTimeout(() => {
        setQuestionIndex((questionIndex) => questionIndex + 1);
        if (answerRef) {
          (answerRef.children[correctAnswerIndex] as HTMLElement).style.backgroundColor = "";
          (answerRef.children[getAnswerIndex] as HTMLElement).style.backgroundColor = "";
        }
      }, 1500);
      setCorrectAnswerCount((prev) => prev + correctAnswerCount);
    } else if (questionIndex === quiz.length - 1 && getAnswerIndex === correctAnswerIndex) {
      setCorrectAnswerCount((prev) => prev + correctAnswerCount)
      setToggleView(true)
    } else {
      setToggleView(true)
    }
  };
  // console.log(correctAnswerCount);
  const handleUserSelection = (e: React.MouseEvent) => {
    const userClick = e.target as HTMLElement;
    const text = userClick.innerText;
    const clickedElement: string = userClick.className.split(" ")[1];
    if (answerRef) {
      const selectedElement = [...answerRef.children];
      selectedElement.forEach((ele) => {
        if (ele.className.includes(clickedElement)) {
          (ele as HTMLElement).style.backgroundColor = "orange";
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
      <p>{correctAnswerCount}</p>
      <div className="quiz-content wrapper">
        <p>{currentQuestion.question.text}</p>
      </div>
      <div ref={styleRef} className="answer-container">
        {answers.map((ele, idx) => (
          <div
            key={idx}
            className={`answer-wrapper ${idx}`}
            onClick={handleUserSelection}
          >
            <p className={`answers ${idx}`}>{ele}</p>
          </div>
        ))}
      </div>
      { toggleView && <p>QUIZ DONE</p> }
      { !toggleView && <button onClick={handleIndexCount}>Next</button> }
    </section>
  );
}
