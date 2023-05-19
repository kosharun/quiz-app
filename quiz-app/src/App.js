import React from "react";
import "./App.css";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styles from "./components/base.module.css";
import Navbar from "./components/Navbar";
import QuizForm from "./components/quizzes/QuizForm";
import Quiz from "./components/quizzes/Quiz";

const App = () => {
    return (
        <div className={styles.container}>
            <Router>
                <Navbar />

                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/create-quiz" element={<QuizForm />} />
                    <Route path="/quiz/:quizId" element={<Quiz />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
