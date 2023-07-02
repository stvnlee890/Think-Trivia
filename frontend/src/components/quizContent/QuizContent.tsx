import { QuizItem } from "../quizPage/QuizPage";

// interface IProps {
//   quiz: QuizItem;
// }

export default function QuizContent({ quiz }: QuizItem) {
  return (
    <div>
      <h1>Quiz Page</h1>
      <p>{quiz.question.text}</p>
    </div>
  );
}
