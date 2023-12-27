import { createContext, useContext, useEffect, useState } from "react";
import { addArticle, getArticles } from "../services/Firebase";

// Firebase Context
const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);
export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    const fetchArticles = async () => {
      const articleList = await getArticles();
      setArticles(articleList);
    };
    fetchArticles();
  }, []);
  return (
    <FirebaseContext.Provider value={{ user, setUser, articles, addArticle }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};
