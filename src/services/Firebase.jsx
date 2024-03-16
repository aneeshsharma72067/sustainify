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

/**
 * Firebase configuration object.
 * @type {Object}
 */
const firebaseConfig = {
  apiKey: "AIzaSyCeCiujs2TwwPw6GHBhsmA5NATqtzk_wqo",
  authDomain: "sustainify-4ee8b.firebaseapp.com",
  projectId: "sustainify-4ee8b",
  storageBucket: "sustainify-4ee8b.appspot.com",
  messagingSenderId: "1084970092267",
  appId: "1:1084970092267:web:09da9473889c4c2dcaa0ae",
};

// Firebase Services

/**
 * Initialize the Firebase app.
 * @type {Object}
 */
const firebaseApp = initializeApp(firebaseConfig);

/**
 * Get the Firestore instance.
 * @type {Object}
 */
const firestore = getFirestore();

/**
 * Get the Firebase Storage instance.
 * @type {Object}
 */
const storage = getStorage(firebaseApp);

/**
 * Get the Firebase Authentication instance.
 * @type {Object}
 */
const firebaseAuth = getAuth(firebaseApp);

/**
 * Add an article to the Firestore collection.
 * @param {Object} formData - The form data for the article.
 * @returns {Promise} A promise that resolves with the result of adding the article.
 */
const addArticle = async (formData) => {
  const result = await addDoc(collection(firestore, "articles"), {
    ...formData,
    createdAt: serverTimestamp(),
  });

  return result;
};

/**
 * Get all articles from the Firestore collection.
 * @returns {Promise} A promise that resolves with an array of articles.
 */
const getArticles = async () => {
  const articlesSnapshot = await getDocs(collection(firestore, "articles"));
  const articlesList = [];
  articlesSnapshot.forEach((article) => {
    articlesList.push({ id: article.id, ...article.data() });
  });
  return articlesList;
};

/**
 * Add an alert post to the Firestore collection.
 * @param {string} userID - The ID of the user creating the post.
 * @param {string} username - The username of the user creating the post.
 * @param {File} image - The image file for the post.
 * @param {string} caption - The caption for the post.
 * @returns {Promise} A promise that resolves with the result of adding the post.
 */
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

/**
 * Get all posts from the Firestore collection.
 * @returns {Promise} A promise that resolves with an array of posts.
 */
const getPosts = async () => {
  const postsSnapshot = await getDocs(collection(firestore, "posts"));
  const postList = [];

  postsSnapshot.forEach((post) => {
    postList.push({ id: post.id, ...post.data() });
  });
  return postList;
};

/**
 * Sign up a new user.
 * @param {Object} formData - The form data for the user.
 * @returns {Promise} A promise that resolves with the result of signing up the user.
 */
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

/**
 * Log in a user.
 * @param {Object} formData - The form data for the user.
 * @returns {Promise} A promise that resolves with the result of logging in the user.
 */
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

/**
 * Get user data by ID.
 * @param {string} id - The ID of the user.
 * @returns {Promise} A promise that resolves with the user data.
 */
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

/**
 * Check if a user is logged in.
 * @returns {Promise} A promise that resolves with the current user data if logged in, or null if not logged in.
 */
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

/**
 * Log out the current user.
 * @returns {Promise} A promise that resolves when the user is logged out.
 */
const logout = async () => {
  await signOut(firebaseAuth)
    .then((res) => {
      console.log(res, "logged out");
    })
    .catch((err) => {
      console.log(err, "cant log out");
    });
};

/**
 * Like a post.
 * @param {string} userID - The ID of the user liking the post.
 * @param {string} postID - The ID of the post to like.
 * @returns {Promise} A promise that resolves with the result of liking the post.
 */
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

/**
 * Get the IDs of posts liked by a user.
 * @param {string} userID - The ID of the user.
 * @returns {Promise} A promise that resolves with an array of post IDs.
 */
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

/**
 * Unlike a post.
 * @param {string} userID - The ID of the user unliking the post.
 * @param {string} postID - The ID of the post to unlike.
 * @returns {Promise} A promise that resolves with the result of unliking the post.
 */
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

/**
 * Get the data of a post by ID.
 * @param {string} id - The ID of the post.
 * @returns {Promise} A promise that resolves with the post data.
 */
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

/**
 * Fetch an article by ID.
 * @param {string} id - The ID of the article.
 * @returns {Promise} A promise that resolves with the article data.
 */
const fetchArticle = async (id) => {
  const docRef = doc(firestore, "articles", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such article");
  }
};

/**
 * Delete a post by ID.
 * @param {string} id - The ID of the post to delete.
 * @returns {Promise} A promise that resolves with a boolean indicating whether the post was deleted successfully.
 */
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

/**
 * Delete an article by ID.
 * @param {string} id - The ID of the article to delete.
 * @returns {Promise} A promise that resolves with a boolean indicating whether the article was deleted successfully.
 */
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

/**
 * Get articles by user ID.
 * @param {string} id - The ID of the user.
 * @returns {Promise} A promise that resolves with an array of articles.
 */
const getArticlesByUser = async (id) => {
  const articlesSnapshot = await getDocs(
    query(collection(firestore, "articles"), where("userId", "==", id))
  );
  const articlesList = [];
  articlesSnapshot.forEach((article) => {
    articlesList.push({ id: article.id, ...article.data() });
  });
  return articlesList;
};

/**
 * Get posts by user ID.
 * @param {string} id - The ID of the user.
 * @returns {Promise} A promise that resolves with an array of posts.
 */
const getPostsByUser = async (id) => {
  const postsSnapshot = await getDocs(
    query(collection(firestore, "posts"), where("userID", "==", id))
  );
  const postList = [];
  postsSnapshot.forEach((post) => {
    postList.push({ id: post.id, ...post.data() });
  });
  return postList;
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
  getArticlesByUser,
  getPostsByUser,
};
