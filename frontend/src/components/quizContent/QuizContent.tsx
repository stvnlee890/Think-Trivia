import "./quizContent.css";
import { useState, useLayoutEffect, useRef } from "react";
import { QuizItem } from "../quizPage/QuizPage";

console.clear()
export interface IProps {
  quiz: QuizItem[];
}

type Category = {
  [key: string]: number;
};

export default function QuizContent({ quiz }: IProps) {
  const styleRef = useRef<HTMLDivElement>(null);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [correctAnswerCount, setCorrectAnswerCount] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<string>("");
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [category, setCategory] = useState<Category>({});
  const [toggleView, setToggleView] = useState<boolean>(false);
  const [disableBtn, setDisableBtn] = useState<boolean>(false);

  const currentQuestion = quiz[questionIndex];
  const getAnswerIndex = answers.indexOf(userAnswer);
  const correctAnswerIndex = answers.indexOf(currentQuestion.correctAnswer);

  /*
-----------------------------------------------------
Helper Functions
*/

  function shuffle(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function validateAnswer(currentAnswer: string, userAnswer: string) {
    if (!userAnswer) {
      return {
        userAnswerStyle: null,
        correctAnswerStyle: "red",
        correctAnswerCount: 0,
        resetStyle: null,
      };
    }
    if (userAnswer === currentAnswer) {
      return {
        userAnswerStyle: "green",
        correctAnswerStyle: "green",
        correctAnswerCount: 1,
        resetStyle: "",
      };
    } else {
      return {
        userAnswerStyle: "red",
        correctAnswerStyle: "green",
        correctAnswerCount: 0,
        resetStyle: "",
      };
    }
  }

  function updateStyling(
    styleRef: React.RefObject<HTMLDivElement>,
    correctAnswerIndex: number,
    correctAnswerStyle: string | null,
    userAnswerStyle: string | null,
    getAnswerIndex: number
  ) {
    console.log(getAnswerIndex)
    if (styleRef.current) {
      const children = styleRef.current.children;
      if (children[getAnswerIndex] && userAnswerStyle) {
        (children[getAnswerIndex] as HTMLElement).style.backgroundColor = userAnswerStyle
      }
      if (children[correctAnswerIndex] && correctAnswerStyle) {
        (children[correctAnswerIndex] as HTMLElement).style.backgroundColor =
          correctAnswerStyle;
      }
    }
  }

  function handleQuestionChange(
    setQuestionIndex: React.Dispatch<React.SetStateAction<number>>,
    setCorrectAnswerCount: React.Dispatch<React.SetStateAction<number>>,
    styleRef: React.RefObject<HTMLDivElement>,
    correctAnswerCount: number,
    setUserAnswer: React.Dispatch<React.SetStateAction<string>>
  ) {
    setDisableBtn(true);
    setTimeout(() => {
      setQuestionIndex((questionIndex) => questionIndex + 1);
      if (styleRef.current) {
        const children = styleRef.current.children;
        const answerElements = [...children];
        answerElements.forEach((answer) => {
          (answer as HTMLElement).style.backgroundColor = "";
        });
      }
      setDisableBtn(false);
    }, 1500);
    setCorrectAnswerCount((prev) => prev + correctAnswerCount);
    setUserAnswer("");
  }

  function updateCategoryState(
    category: Category,
    setCategory: React.Dispatch<React.SetStateAction<Category>>,
    currentQuestion: QuizItem,
    getAnswerIndex: number,
    correctAnswerIndex: number
  ) {
    if (
      !category[currentQuestion.category] &&
      getAnswerIndex === correctAnswerIndex
    ) {
      setCategory({ ...category, [currentQuestion.category]: 1 });
    } else if (
      getAnswerIndex === correctAnswerIndex &&
      getAnswerIndex === correctAnswerIndex
    ) {
      setCategory({
        ...category,
        [currentQuestion.category]: (category[currentQuestion.category] += 1),
      });
    }
  }

  /*
-----------------------------------------------------
*/

  useLayoutEffect(() => {
    setAnswers(
      shuffle([
        ...currentQuestion.incorrectAnswers,
        currentQuestion.correctAnswer,
      ])
    );
    setCurrentAnswer(currentQuestion.correctAnswer);
  }, [questionIndex]);

  const handleIndexCount = () => {
    const { userAnswerStyle, correctAnswerStyle, correctAnswerCount } =
      validateAnswer(currentAnswer, userAnswer);

    if (questionIndex < quiz.length - 1) {
      handleQuestionChange(
        setQuestionIndex,
        setCorrectAnswerCount,
        styleRef,
        correctAnswerCount,
        setUserAnswer
      );
      updateStyling(styleRef, correctAnswerIndex, correctAnswerStyle, userAnswerStyle, getAnswerIndex);
      updateCategoryState(
        category,
        setCategory,
        currentQuestion,
        getAnswerIndex,
        correctAnswerIndex
      );
    } else if (
      questionIndex === quiz.length - 1 &&
      getAnswerIndex === correctAnswerIndex
    ) {
      setCorrectAnswerCount((prev) => prev + correctAnswerCount);
      updateStyling(styleRef, correctAnswerIndex, correctAnswerStyle, userAnswerStyle, getAnswerIndex);
      setToggleView(true);
    } else {
      updateStyling(styleRef, correctAnswerIndex, correctAnswerStyle, userAnswerStyle, getAnswerIndex)
      setToggleView(true);
    }
  };

  const handleUserSelection = (e: React.MouseEvent) => {
    const userClick = e.target as HTMLElement;
    const text = userClick.innerText;
    const clickedElement: string = userClick.className.split(" ")[1];
    if (styleRef.current) {
      const selectedElement = [...styleRef.current.children];
      selectedElement.forEach((answer) => {
        if (answer.className.includes(clickedElement)) {
          (answer as HTMLElement).style.backgroundColor = "#1194bf";
          setUserAnswer(text);
        } else {
          (answer as HTMLElement).style.backgroundColor = "";
        }
      });
    }
  };


  return (
    <section className="quiz-content container">
      <p className="quiz-content-tracker">
        Question {questionIndex + 1} / {quiz.length}
      </p>
      {/* <p>{correctAnswerCount}</p> */}
      <div className="quiz-content wrapper">
        <p className="quiz-content-question">{currentQuestion.question.text}</p>
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
      {toggleView && <p>QUIZ DONE</p>}
      {!toggleView && (
        <button
          className="btn"
          disabled={disableBtn}
          onClick={handleIndexCount}
        >
          Next
        </button>
      )}
    </section>
  );
}
