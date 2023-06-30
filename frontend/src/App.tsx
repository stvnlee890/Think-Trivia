import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import QuizPage from "./components/quizPage/QuizPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/quiz' element={<QuizPage />} />
      </Routes>
    </>
  );
}

export default App;
