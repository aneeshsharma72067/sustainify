import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
import { createContext, useContext, useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyCeCiujs2TwwPw6GHBhsmA5NATqtzk_wqo",
  authDomain: "sustainify-4ee8b.firebaseapp.com",
  projectId: "sustainify-4ee8b",
  storageBucket: "sustainify-4ee8b.appspot.com",
  messagingSenderId: "1084970092267",
  appId: "1:1084970092267:web:09da9473889c4c2dcaa0ae",
};

// Firebase Services
const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore();

// const firestore =

// Firebase Context
const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);
export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);
  const addArticle = async (formData) => {
    const result = await addDoc(collection(firestore, "articles"), {
      ...formData,
      createdAt: serverTimestamp(),
    });
    return result;
  };
  return (
    <FirebaseContext.Provider value={{ user, setUser, addArticle }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};
