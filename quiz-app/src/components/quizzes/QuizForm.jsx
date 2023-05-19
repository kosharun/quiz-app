import React, { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import styles from "./quizform.module.css";

const QuizForm = ({ onQuizSubmit }) => {
    const [user, setUser] = useState("");
    const [questions, setQuestions] = useState([{ text: "", options: [] }]);
    const [numberOfQuestions, setNumberOfQuestions] = useState(1);

    const addQuestion = () => {
        setQuestions([...questions, { text: "", options: [] }]);
        setNumberOfQuestions(numberOfQuestions + 1);
    };

    const handleQuestionChange = (index, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].text = value;
        setQuestions(updatedQuestions);
    };

    const handleOptionChange = (questionIndex, optionIndex, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options[optionIndex] = value;
        if (
            optionIndex === updatedQuestions[questionIndex].correctOptionIndex
        ) {
            updatedQuestions[questionIndex].correctOptionIndex = null;
        }
        setQuestions(updatedQuestions);
    };

    const handleSubmit = (e) => {
        const newQuestions = questions.map((question) => {
            return {
                text: question.text,
                options: question.options,
                correctOption: question.correctOptionIndex,
            };
        });
        try {
            addDoc(collection(db, "quizzes"), {
                user: user,
                questions: newQuestions,
            });
        } catch (e) {
            console.error(
                "Error adding questions, try filling up every field or adding at least one option for a question. Check if you have selected the correct option."
            );
        }
        e.preventDefault();
    };

    return (
        <div className={styles.body}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <p>Make sure you have entered all fields</p>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="Enter your username"
                    value={user}
                    onChange={(e) => {
                        setUser(e.target.value);
                    }}
                />

                {questions.map((question, index) => (
                    <div className={styles.question} key={index}>
                        <br></br>
                        <br></br>
                        <p className={styles.questionTitle}>
                            Question {index + 1}:
                        </p>
                        <input
                            key={index}
                            type="text"
                            value={question.text}
                            placeholder="Enter a question"
                            className={styles.input}
                            onChange={(e) =>
                                handleQuestionChange(index, e.target.value)
                            }
                        />
                        <div>
                            <p>Options:</p>
                            {question.options.map((option, optionIndex) => (
                                <div key={optionIndex}>
                                    <input
                                        type="text"
                                        value={option}
                                        placeholder={`Enter option ${
                                            optionIndex + 1
                                        }`}
                                        className={styles.input}
                                        onChange={(e) =>
                                            handleOptionChange(
                                                index,
                                                optionIndex,
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                            ))}
                            <select
                                value={question.correctOptionIndex}
                                onChange={(e) => {
                                    const updatedQuestions = [...questions];
                                    updatedQuestions[index].correctOptionIndex =
                                        parseInt(e.target.value);
                                    setQuestions(updatedQuestions);
                                }}
                                className={styles.button}
                            >
                                <option value={null}>
                                    Select correct option
                                </option>
                                {question.options.map((option, index) => (
                                    <option key={index} value={index}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                            <button
                                type="button"
                                onClick={() => {
                                    const updatedQuestions = [...questions];
                                    updatedQuestions[index].options.push("");
                                    setQuestions(updatedQuestions);
                                }}
                                className={styles.button}
                            >
                                Add a new option
                            </button>
                        </div>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addQuestion}
                    className={styles.button}
                >
                    Add a new question
                </button>
                <button type="submit" className={styles.button}>
                    Submit Quiz
                </button>
            </form>
        </div>
    );
};

export default QuizForm;
