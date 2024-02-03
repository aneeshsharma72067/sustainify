import React, { useEffect, useState } from "react";
import UserGreet from "../components/UserGreet";
import Article from "../components/Article";
import { useFirebase } from "../context/FirebaseContext";
import ArticleSkeletonLoader from "../components/ArticleSkeletonLoader";
import { getArticles } from "../services/Firebase";

export default function Home() {
  const { articles, setArticles, user } = useFirebase();
  const [articlesAreLoaded, setArticlesAreLoaded] = useState(false);
  useEffect(() => {
    const fetchArticles = async () => {
      const articleList = await getArticles();
      setArticles(articleList);
      setArticlesAreLoaded(true);
    };
    fetchArticles();
  }, []);
  return (
    <div className="flex gap-5 py-10">
      <div className="flex-[0.6] flex flex-col gap-10">
        <UserGreet />
        <div className="flex flex-col gap-5">
          <h1 className="text-3xl font-medium text-slate-700">
            Recent Articles
          </h1>
          {articlesAreLoaded ? (
            articles.length ? (
              <div className="flex flex-col gap-4">
                {articles.map((article) => {
                  return <Article article={article} key={article.id} />;
                })}
              </div>
            ) : (
              <div className="text-slate-800 font-bold text-3xl my-10">
                No Articles to show !!
              </div>
            )
          ) : (
            <div className="flex flex-col gap-4">
              <ArticleSkeletonLoader />
              <ArticleSkeletonLoader />
            </div>
          )}
        </div>
      </div>
      <div className="flex-[0.4]"></div>
    </div>
  );
}
