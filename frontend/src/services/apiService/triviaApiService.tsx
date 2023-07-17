import axios from "axios";

export class TriviaApiService {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getRandomQuestions() {
    try {
      const response = await axios.get(`${this.baseUrl}/questions`);
      return response.data;
    } catch (err) {
      console.log(`Error fetching quiz questions`, err);
      throw(err)
    }
  }
}
