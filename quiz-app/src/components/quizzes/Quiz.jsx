import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import styles from "./quiz.module.css";

const Quiz = () => {
  const { quizId } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      const quizRef = doc(db, "quizzes", quizId);
      const quizSnapshot = await getDoc(quizRef);
      if (quizSnapshot.exists()) {
        setQuizData(quizSnapshot.data());
      } else {
        console.log("No such document!");
      }
    };
    fetchQuiz();
  }, [quizId]);

  const handleAnswerSelection = (questionIndex, answerIndex) => {
    setUserAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[questionIndex] = answerIndex;
      return updatedAnswers;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let score = 0;
    quizData.questions.forEach((question, index) => {
      const correctOptionIndex = question.correctOption;
      const userAnswerIndex = userAnswers[index];
      if (correctOptionIndex === userAnswerIndex) {
        score++;
      }
    });
    setScore(score);
  };

  return (
    <div className={styles.content}>
      {quizData ? (
        <>
          <form onSubmit={handleSubmit}>
            <h3>This quiz is made by {quizData.user}. Go ahead and see how you do.</h3>
            <ul>
              {quizData.questions.map((question, index) => (
                <li key={index}>
                  <h4>Question {index + 1}</h4>
                  <p>{question.text}</p>
                  <ul>
                    {question.options.map((option, optionIndex) => (
                      <label key={optionIndex}>
                        <input
                        className={styles}
                          type="radio"
                          name={`question-${index}`}
                          value={optionIndex}
                          checked={userAnswers[index] === optionIndex}
                          onChange={() =>
                            handleAnswerSelection(index, optionIndex)
                          }
                          disabled={score !== null}
                        />
                        {option}
                        {score !== null && ( question.correctOption === optionIndex ? (
                          <span className={styles.correctOption}>
                            Correct
                          </span>
                        ) : (
                            <span className={styles.wrongOption}>
                            X
                          </span>)
                          )}
                        <br></br>
                      </label>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            <button className={styles.button} type="submit" disabled={score !== null}>
              Submit
            </button>
          </form>
          {score !== null && (
            <>
            <p className={styles.score}>
              Score: <b>{score}/{quizData.questions.length}</b>
            </p>
            <button className={styles.button} onClick={() => window.location.reload()}>
            Restart Quiz
            </button> </>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Quiz;
