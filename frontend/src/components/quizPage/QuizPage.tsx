import { useEffect, useState } from "react";
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
  const baseUrl = "https://the-trivia-api.com/v2";
  const triviaApiService = new TriviaApiService(baseUrl);

  const [quiz, setQuiz] = useState<QuizItem[]>([]);

  useEffect(() => {
    triviaApiService.getRandomQuestions().then((res) => setQuiz(res));
  }, []);

  return (
    <div>
      <h1>Quiz Page</h1>
      {quiz.length > 0 ? (
        quiz.map((quizEl) => <QuizContent key={quizEl.id} quiz={quizEl} />)
      ) : (
        <h1>Something Went Wrong</h1>
      )}
    </div>
  );
}
