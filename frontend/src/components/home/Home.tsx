import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Think Trivia</h1>
      <button onClick={() => navigate("/quiz")}>Start Playing</button>
    </div>
  );
}
