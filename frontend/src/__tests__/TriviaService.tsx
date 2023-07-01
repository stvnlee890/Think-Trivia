import "@testing-library/jest-dom/extend-expect";
import { TriviaApiService } from "../services/triviaApiService";

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

  it('should return an array of ten quiz questions', async () => {
    const apiService = new TriviaApiService(baseUrl);
    try {
        const service = await apiService.getRandomQuestions();
        expect(service).toHaveLength(10)
    } catch (err) {
        expect(err).toBeUndefined()
    }
  })

});
