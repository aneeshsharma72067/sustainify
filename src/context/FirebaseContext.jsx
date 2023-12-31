import { createContext, useContext, useEffect, useState } from "react";
import { checkIfUserLoggedIn } from "../services/Firebase";
// Firebase Context
const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);
export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);
  const [articles, setArticles] = useState([]);
  const [posts, setPosts] = useState([]);
  const [screenIsLoading, setScreenIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userExists = await checkIfUserLoggedIn();
        console.log(userExists);
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
