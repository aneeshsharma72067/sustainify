import { createContext, useContext, useState } from "react";

// Firebase Context
const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);
export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);
  const [articles, setArticles] = useState([]);
  const [posts, setPosts] = useState([]);
  return (
    <FirebaseContext.Provider
      value={{ user, setUser, articles, setArticles, posts, setPosts }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
