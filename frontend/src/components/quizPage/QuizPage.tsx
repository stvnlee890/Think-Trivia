import { useEffect } from "react";
import { TriviaApiService } from "../../services/triviaApiService";

export default function QuizPage() {

    const baseUrl = "https://the-trivia-api.com/v2"
    const triviaApiService = new TriviaApiService(baseUrl)

    useEffect(() => {
        triviaApiService.getRandomQuestions().then(res => console.log(res))
    }, [])
  return (
    <div>
      <h1>Quiz Page</h1>
    </div>
  );
}
