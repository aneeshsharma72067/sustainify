import { initializeApp } from "firebase/app";
import {
  addDoc,
  and,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  or,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { v4 as uuid4 } from "uuid";
import { compareSync, hash, hashSync } from "bcryptjs";

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
const firebaseAuth = getAuth(firebaseApp);

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
    likes: 0,
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

const signup = async (formData) => {
  const { email, username, password } = formData;
  const existingEmail = await getDocs(
    query(collection(firestore, "users"), where("email", "==", email))
  );
  if (!existingEmail.empty) {
    throw new Error("Email already registered !!");
  }

  const existingUsername = await getDocs(
    query(collection(firestore, "users"), where("username", "==", username))
  );
  if (!existingUsername.empty) {
    throw new Error("Username already taken !!");
  }
  const hashPassword = hashSync(password, 10);
  const newUser = await createUserWithEmailAndPassword(
    firebaseAuth,
    email,
    password
  );
  if (!newUser) {
    throw new Error("Registeration failed !!");
  }
  const result = await addDoc(collection(firestore, "users"), {
    ...formData,
    user_id: newUser.user.uid,
    bio: "",
    popularity: 0,
    joinedOn: serverTimestamp(),
    password: hashPassword,
  });

  if (!result) {
    throw new Error("Something Went Wrong");
  }
  return result;
};

const login = async (formData) => {
  const { email, password } = formData;

  const userSnapshot = await getDocs(
    query(collection(firestore, "users"), where("email", "==", email))
  );
  if (userSnapshot.empty) {
    throw new Error("User not found !!");
  }

  const userData = userSnapshot.docs[0].data();
  const storedHashedPassword = userData.password;

  const passwordMatch = compareSync(password, storedHashedPassword);
  if (!passwordMatch) {
    throw new Error("Invalid Credentials !!");
  }

  const getUser = await signInWithEmailAndPassword(
    firebaseAuth,
    email,
    password
  );

  if (!getUser) {
    throw new Error("Something Went Wrong !!");
  }
  const user = {
    id: userSnapshot.docs[0].id,
    ...userData,
  };
  return userData;
};

const getUserData = async (id) => {
  const userSnapshot = await getDocs(
    query(collection(firestore, "users"), where("user_id", "==", id))
  );
  if (userSnapshot.empty) {
    return;
  }
  const user = userSnapshot.docs[0].data();
  return user;
};

const checkIfUserLoggedIn = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        try {
          const currentUser = await getUserData(user.uid);
          resolve(currentUser);
        } catch (err) {
          reject(err);
        }
      } else {
        resolve(null);
      }
      unsubscribe();
    });
  });
};

const logout = async () => {
  await signOut(firebaseAuth)
    .then((res) => {
      console.log(res, "logged out");
    })
    .catch((err) => {
      console.log(err, "cant log out");
    });
};

const likePost = async (userID, postID) => {
  console.log(userID, postID);
  const likeSnapShot = await getDocs(
    query(
      collection(firestore, "post_likes"),
      and(where("postID", "==", postID), where("userID", "==", userID))
    )
  );
  if (likeSnapShot.docs.length !== 0) {
    throw new Error("post already liked");
  }
  const result = await addDoc(collection(firestore, "post_likes"), {
    userID: userID,
    postID: postID,
    likedAt: serverTimestamp(),
  });

  if (!result) {
    throw new Error("Something went wrong !!");
  }
  const currentData = await getDoc(doc(firestore, "posts", postID));
  try {
    await updateDoc(doc(firestore, "posts", postID), {
      likes: currentData.data().likes + 1,
    });
  } catch (err) {
    throw new Error(err);
  }
};

const getlikedPosts = async (userID) => {
  const collectionRef = collection(firestore, "post_likes");
  try {
    const likedPostsSnapShot = await getDocs(
      query(collectionRef, where("userID", "==", userID))
    );
    const likedPosts = [];
    likedPostsSnapShot.forEach((post) => {
      likedPosts.push(post.data().postID);
    });
    return likedPosts;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const unlikePost = async (userID, postID) => {
  const docRef = await getDocs(
    query(
      collection(firestore, "post_likes"),
      and(where("postID", "==", postID), where("userID", "==", userID))
    )
  );
  if (docRef.empty) {
    throw new Error("post is not liked");
  }
  const deletedPost = await deleteDoc(
    doc(firestore, "post_likes", docRef.docs[0].id)
  );
  const currentData = await getDoc(doc(firestore, "posts", postID));
  try {
    await updateDoc(doc(firestore, "posts", postID), {
      likes: Math.max(currentData.data().likes - 1, 0),
    });
  } catch (err) {
    throw new Error(err);
  }
};

const getPostData = async (id) => {
  const docRef = doc(firestore, "posts", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log(docSnap);
    return docSnap.data();
  } else {
    console.log("No such document");
  }
};

const fetchArticle = async (id) => {
  const docRef = doc(firestore, "articles", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such article");
  }
};

const deletePost = async (id) => {
  const docRef = doc(firestore, "posts", id);
  try {
    await deleteDoc(docRef);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const deleteArticle = async (id) => {
  const docRef = doc(firestore, "articles", id);
  try {
    await deleteDoc(docRef);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export {
  addArticle,
  getArticles,
  addAlertPost,
  getPosts,
  signup,
  login,
  getUserData,
  checkIfUserLoggedIn,
  logout,
  likePost,
  getlikedPosts,
  unlikePost,
  getPostData,
  fetchArticle,
  deletePost,
  deleteArticle,
};
