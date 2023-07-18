import "./quizPage.css";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { TriviaApiService } from "../../services/apiService/triviaApiService";
import { dotAnimation } from "../../services/animationService/animationHelper";
import QuizContent from "../quizContent/QuizContent";
import home24 from "../../assets/homeIcons/home24.png"

export interface QuizItem {
  category: string;
  correctAnswer: string;
  difficulty: string;
  id: string;
  incorrectAnswers: string[];
  isNiche: boolean;
  question: { text: string };
  regions: [];
  tags: string[];
  type: string;
}

export default function QuizPage() {
  const navigate = useNavigate();
  const baseUrl = "https://the-trivia-api.com/v2";
  const dotRef = useRef<HTMLDivElement>(null);
  const triviaApiService = new TriviaApiService(baseUrl);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [quiz, setQuiz] = useState<QuizItem[]>([]);
  useEffect(() => {
    if (dotRef.current) {
      dotAnimation(dotRef.current.children);
    }
    triviaApiService.getRandomQuestions().then((res) => setQuiz(res));
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="quizpage-container">
      <img className="home-icon" onClick={() => navigate('/')} src={home24}/>
      <div className="quizpage-wrapper">
        {!isLoading && quiz.length > 0 && <QuizContent quiz={quiz} />}
        {isLoading && (
          <>
            <div className="loading-container">
              <h1>Loading</h1>
              <div ref={dotRef} className="loading-dots">
                <div className="loading-dot 1"></div>
                <div className="loading-dot 2"></div>
                <div className="loading-dot 3"></div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
