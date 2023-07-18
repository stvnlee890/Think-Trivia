import { Category } from "../quizContent/QuizContent";
import { Dispatch, SetStateAction } from 'react';
import "./modal.css";

type ModalProps = {
  category: Category;
  correctAnswerCount: number;
  setToggleModal: Dispatch<SetStateAction<boolean>>
};

export default function Modal({ category, correctAnswerCount, setToggleModal }: ModalProps) {
    console.log(correctAnswerCount)
  return (
    <div className="modal-container">
      <div className="modal-wrapper">
        <p onClick={() => setToggleModal(false)} className="close-button">Close</p>
        <h1>Categories</h1>
        <p>Score: {correctAnswerCount} / 10</p>
        {Object.keys(category).map((key, idx) => (
          <li key={idx}>
            {key}: {category[key]}
          </li>
        ))}
      </div>
    </div>
  );
}
