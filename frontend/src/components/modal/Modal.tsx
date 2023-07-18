import { Category } from "../quizContent/QuizContent";
import { Dispatch, SetStateAction } from "react";
import "./modal.css";

type ModalProps = {
  category: Category;
  correctAnswerCount: number;
  setToggleModal: Dispatch<SetStateAction<boolean>>;
};

export default function Modal({
  category,
  correctAnswerCount,
  setToggleModal,
}: ModalProps) {
  console.log(correctAnswerCount);

  return (
    <div className="modal-container">
      <div className="modal-wrapper">
        <p onClick={() => setToggleModal(false)} className="close-button">
          close
        </p>
        <div className="modal-header">
          <h1>Overview</h1>
        </div>
        <div className="category-container">
          <h3>Categories</h3>
          {Object.keys(category).map((key, idx) => (
            <div key={idx} className="category-wrapper">
              <p className="category key">
                {key.replace(/_/g, " ")}:
              </p>
              <p className="category value">{category[key]}</p>
            </div>
          ))}
        </div>
        <h3>Score: {correctAnswerCount} / 10</h3>
      </div>
    </div>
  );
}
