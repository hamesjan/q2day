import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import { getStorage } from "firebase/storage";

import "firebase/compat/auth";
import "firebase/compat/firestore";

import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  doc,
  getDoc,
  arrayUnion,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyCfYilsj3PAhg04-_WGbIUNsPj8XXyTUUQ",
  authDomain: "q2day-e7dcf.firebaseapp.com",
  projectId: "q2day-e7dcf",
  storageBucket: "q2day-e7dcf.appspot.com",
  messagingSenderId: "885123420962",
  appId: "1:885123420962:web:d2c6a2bad80ba1c7730b7b",
  measurementId: "G-WYTPEJM332",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = getStorage(firebaseApp);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const dateJoined = Date.now();
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await db.collection("users").doc(user.uid).set({
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        lastAnswered: null,
        responses: [],
        profilePicURL: "",
        dateJoined: dateJoined,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const dateJoined = Date.now();
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await db.collection("users").doc(user.uid).set({
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      lastAnswered: null,
      responses: [],
      profilePicURL: "",
      dateJoined: dateJoined,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

const recordUserAnswer = async (uid, answer, name, question, profilePicURL) => {
  try {
    const timeStamp = Date.now();
    const newAnswer = {
      answer: answer,
      name: name,
      profilePicURL: profilePicURL,
      timestamp: timeStamp,
      uid: uid,
    };
    await updateDoc(doc(db, "q2day", "daily"), {
      responses: arrayUnion(newAnswer),
    });

    await updateDoc(doc(db, "users", uid), {
      lastAnswered: timeStamp,
      responses: arrayUnion({
        answer: answer,
        timestamp: timeStamp,
        question: question,
      }),
    });

    // const itemSnapshot = await getDocs(updateitemRef);

    // this is gonna only be one because there is only one doc with that uid
    // itemSnapshot.forEach((doc) => {
    //   updateDoc(doc.ref, {
    //     responses: arrayUnion({
    //       answer: answer,
    //       timestamp: timeStamp,
    //       question: question,
    //     }),
    //   });
    // });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const recordGuestAnswer = async (answer) => {
  try {
    const timeStamp = Date.now();
    const newAnswer = {
      answer: answer,
      name: "Guest",
      profilePicURL: "https://via.placeholder.com/200x200",
      timestamp: timeStamp,
      uid: "GuestUID",
    };
    await updateDoc(doc(db, "q2day", "daily"), {
      responses: arrayUnion(newAnswer),
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const addNewQuestion = async (question) => {
  try {
    const timeStamp = Date.now();
    await db.collection("questions").add({
      question: question,
      timestamp: timeStamp,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export {
  auth,
  db,
  storage,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  recordUserAnswer,
  recordGuestAnswer,
  addNewQuestion,
};
