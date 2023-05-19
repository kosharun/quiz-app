import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import styles from "./base.module.css";

const Home = () => {

    const [authUser, setAuthUser] = useState(null);
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        const fetchQuizzes = async () => {
            const querySnapshot = await getDocs(collection(db, "quizzes"));
            const quizzesData = [];
            querySnapshot.forEach((doc) => {
                const quizData = doc.data();
                quizzesData.push({
                    id: doc.id,
                    user: quizData.user,
                    questions: quizData.questions,
                });
            });
            setQuizzes(quizzesData);
        };
        fetchQuizzes();
    }, []);

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        });

        return () => {
            listen();
        };
    }, []);

    return (
        <div className={styles.content}>
            <div>
                {quizzes.map((quiz) => (
                    <Link to={`/quiz/${quiz.id}`}>
                        <div className={styles.card} key={quiz.id}>
                            <h2>Quiz by {quiz.user}</h2>
                        </div>
                    </Link>
                ))}
            </div>

            {authUser ? (
                <Link to={"/create-quiz"}>
                    <button className={styles["make-quiz-btn"]}>+</button>
                </Link>
            ) : (
                <Link to={"/signin"}>
                    <button className={styles["make-quiz-btn"]}>+</button>
                </Link>
            )}
        </div>
    );
};

export default Home;
