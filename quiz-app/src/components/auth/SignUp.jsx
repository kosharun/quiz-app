import React, { useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import styles from "./auth.module.css";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
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
                <form onSubmit={signUp}>
                    <h1 className={styles.h1}>Create an account</h1>
                    <input className={styles.input}
                        type="email"
                        placeholder="Enter your new email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    ></input>
                    <input className={styles.input}
                        type="password"
                        placeholder="Enter your new password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    ></input>
                    <button className={styles.button} type="submit">Sign Up</button>
                </form>
                <p className={styles.p}>
                    You already have an account?  {" "}
                    <Link to={"/signin"}>Click here to log in!</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
