// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7R0eYp8hkc3lutAronD6uGgbriwSfhGU",
  authDomain: "quiz-app-e0543.firebaseapp.com",
  projectId: "quiz-app-e0543",
  storageBucket: "quiz-app-e0543.appspot.com",
  messagingSenderId: "938596779615",
  appId: "1:938596779615:web:121ae108b9e4ff25d4bdea",
  measurementId: "G-V97BYGMTDQ",
};




// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
