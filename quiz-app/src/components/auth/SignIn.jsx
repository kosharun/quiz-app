import React, { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import styles from "./auth.module.css";
import Navbar from "../Navbar";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <form onSubmit={signIn}>
                    <h1 className={styles.h1}>Log In</h1>
                    <input className={styles.input}
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        } }
                    ></input>
                    <input className={styles.input}
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        } }
                    ></input>
                    <button className={styles.button} type="submit">Log In</button>
                </form>

                <p className={styles.p}>
                    Dont have an account? No problem!{" "}
                    <Link to={"/signup"}>Click here to register!</Link>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
