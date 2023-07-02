import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import { TriviaApiService } from "../services/triviaApiService";
import QuizPage from "../components/quizPage/QuizPage";
const baseUrl = "https://the-trivia-api.com/v2";

describe("Axios get request", () => {
  it('should not throw an error', async () => {
    const apiService = new TriviaApiService(baseUrl);

    try {
      await apiService.getRandomQuestions();
    } catch (err) {
      expect(err).toBeUndefined();
    }
  });

  it('should return an array of ten quiz questions', async () => {
    const apiService = new TriviaApiService(baseUrl);
    try {
        const service = await apiService.getRandomQuestions();
        expect(service).toHaveLength(10)
    } catch (err) {
        expect(err).toBeUndefined()
    }
  })

  it('should display an error text when api fails', async () => {
    render(<QuizPage />) 
    const errorText = await screen.findByText('Something Went Wrong')
    expect(errorText).toBeInTheDocument()
  })

});
