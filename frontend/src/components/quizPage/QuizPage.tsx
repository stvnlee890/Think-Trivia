import "./quizPage.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TriviaApiService } from "../../services/triviaApiService";
import QuizContent from "../quizContent/QuizContent";

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
  const triviaApiService = new TriviaApiService(baseUrl);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [quiz, setQuiz] = useState<QuizItem[]>([]);
  useEffect(() => {
    triviaApiService.getRandomQuestions().then((res) => setQuiz(res));
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="quizpage-container">
      <p onClick={() => navigate("/")}>HOME</p>
      <div className="quizpage-wrapper">
        {(!isLoading && quiz.length > 0) && <QuizContent quiz={quiz} />}
        {isLoading && <h1 className="loading">Loading your quiz</h1>}
      </div>
    </div>
  );
}
