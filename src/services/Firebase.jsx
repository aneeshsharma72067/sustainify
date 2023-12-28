import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 as uuid4 } from "uuid";

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
const storage = getStorage(firebaseApp);

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

const addAlertPost = async (userID, username, image, caption) => {
  const storageRef = ref(storage, `post_images/${uuid4()}_${image.name}`);
  const imageSnapshot = await uploadBytes(storageRef, image);
  const imageURL = await getDownloadURL(imageSnapshot.ref);

  const result = await addDoc(collection(firestore, "posts"), {
    userID: userID,
    username: username,
    imageURL: imageURL,
    caption: caption,
    createdAt: serverTimestamp(),
  });
  return result;
};

const getPosts = async () => {
  const postsSnapshot = await getDocs(collection(firestore, "posts"));
  const postList = [];
  postsSnapshot.forEach((post) => {
    postList.push({ id: post.id, ...post.data() });
  });
  return postList;
};

export { addArticle, getArticles, addAlertPost, getPosts };
