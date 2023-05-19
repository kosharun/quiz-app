import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import styles from "./navbar.module.css";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
    const navigate = useNavigate();
    const [authUser, setAuthUser] = useState(null);

    const handleNavigate = (e) => {
        if (e.target.id === "1") {
            navigate("/");
        } else if (e.target.id === "2") {
            navigate("/signup");
        } else if (e.target.id === "3") {
            navigate("/signin");
        }
    };

    useEffect(() => {
        // Add CSS rule to prevent scrolling
        document.body.style.overflow = "hidden";
        // Remove CSS rule when component unmounts
        return () => {
            document.body.style.overflow = "visible";
        };
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

    const userSignOut = () => {
        signOut(auth)
            .then(() => {
                navigate("/signin");
            })
            .catch((error) => console.log(error));
    };

    return (
        <div className={styles.nav}>
            <button id="1" className={styles.button} onClick={handleNavigate}>
                Home
            </button>
            {!authUser && (
                <>
                    <button
                        id="2"
                        className={styles.button}
                        onClick={handleNavigate}
                    >
                        Sign Up
                    </button>
                    <button
                        id="3"
                        className={styles.button}
                        onClick={handleNavigate}
                    >
                        Sign In
                    </button>
                </>
            )}

            {authUser ? (
                <>
                    <p className={styles.p}>Signed in as {authUser.email}</p>
                    <button className={styles.button} onClick={userSignOut}>
                        Sign Out
                    </button>
                </>
            ) : (
                <>
                <p className={styles.p}>Signed out</p>
                <p className={styles.p}>Sign in to create a quiz</p>
                </>
            )}

        </div>
    );
};

export default Navbar;
