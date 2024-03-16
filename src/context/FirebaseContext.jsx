import { createContext, useContext, useEffect, useState } from "react";
import { checkIfUserLoggedIn } from "../services/Firebase";

/**
 * Context for Firebase operations.
 * @typedef {Object} FirebaseContextType
 * @property {Object} user - The current user object.
 * @property {Function} setUser - Function to set the current user object.
 * @property {Array} articles - Array of articles.
 * @property {Function} setArticles - Function to set the array of articles.
 * @property {Array} posts - Array of posts.
 * @property {Function} setPosts - Function to set the array of posts.
 * @property {boolean} screenIsLoading - Flag indicating if the screen is loading.
 */

/**
 * Custom hook to access the Firebase context.
 * @returns {FirebaseContextType} The Firebase context.
 */
export const useFirebase = () => useContext(FirebaseContext);

/**
 * Provider component for Firebase context.
 * @param {Object} props - The component props.
 * @returns {JSX.Element} The FirebaseProvider component.
 */
export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);
  const [articles, setArticles] = useState([]);
  const [posts, setPosts] = useState([]);
  const [screenIsLoading, setScreenIsLoading] = useState(true);

  useEffect(() => {
    /**
     * Fetches user data from Firebase.
     * @returns {void}
     */
    const fetchUserData = async () => {
      try {
        const userExists = await checkIfUserLoggedIn();
        if (userExists) {
          setUser(userExists);
        } else {
          console.log("User not logged in");
        }
        setScreenIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchUserData();

    // Clean up function
    return () => {};
  }, []);

  return (
    <FirebaseContext.Provider
      value={{
        user,
        setUser,
        articles,
        setArticles,
        posts,
        setPosts,
        screenIsLoading,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
