import "./home.css";
import { useNavigate } from "react-router-dom";
import ideas from '../../assets/homeIcons/ideas.png'
import quiz from '../../assets/homeIcons/quiz.png'

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <h1 className="home-header">Think Trivia</h1>
      <p className="home-text">
        Unleash your curiosity with our random <br /> trivia app! Engage in
        endless brain-teasing <br /> fun as you tackle unpredictable questions{" "}
        <br /> that will keep you guessing.
      </p>
      <div className="icon-container">
        <img className="icons ideas" src={ideas} ></img>
        <img className="icons quiz" src={quiz}></img>
      </div>
      <button onClick={() => navigate("/quiz")}>Start Playing</button>
    </div>
  );
}
