import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";

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

const addArticle = async (formData) => {
  const result = await addDoc(collection(firestore, "articles"), {
    ...formData,
    createdAt: serverTimestamp(),
  });

  return result;
};

const getArticles = async () => {
  const articlesSnapshot = await getDocs(collection(firestore, "articles"));
  const articlesList = [];
  articlesSnapshot.forEach((article) => {
    articlesList.push({ id: article.id, ...article.data() });
  });
  return articlesList;
};

export { addArticle, getArticles };
