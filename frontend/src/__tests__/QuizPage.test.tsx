import "@testing-library/jest-dom/extend-expect";
// import { render } from "@testing-library/react";
// import axios from "axios";
// import userEvent from "@testing-library/user-event";
import { TriviaApiService } from "../services/triviaApiService";
// import QuizPage from "../components/quizPage/QuizPage";

const baseUrl = "https://the-trivia-api.com/v2";

describe("Axios get request", () => {
  it("getRandomQuestion does not throw an error", async () => {
    const apiService = new TriviaApiService(baseUrl);

    try {
      await apiService.getRandomQuestions();
    } catch (err) {
      expect(err).toBeUndefined();
    }
  });

});
