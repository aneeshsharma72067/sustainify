import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AddCircleIcon } from "../assets/Icons";
import { useFirebase } from "../context/FirebaseContext";
import { getArticles } from "../services/Firebase";
import Article from "../components/Article";
import ArticleSkeletonLoader from "../components/ArticleSkeletonLoader";

function Articles() {
  const { user, articles, setArticles } = useFirebase();
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
    <div className="py-4">
      <div className="w-4/5 mx-auto flex flex-col gap-8">
        <div className="flex items-center w-full">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-green-500">
              Echoes of Eco-Wisdom
            </h1>{" "}
            <h2 className="leading-normal font-medium text-slate-600 text-lg">
              Unite with Like-minded Individuals: Share Your Green Initiatives,
              Ideas, and Stories for a Healthier Planet
            </h2>
          </div>
        </div>
        <div className="w-full bg-green-300 rounded-xl py-10 border-dashed  border-2 border-green-500">
          <button className="flex items-center justify-center mx-auto">
            <NavLink
              to="/article/create"
              className="flex items-center justify-center px-5 py-2 bg-green-500 rounded-lg gap-3 hover:bg-green-700 duration-300"
            >
              <span>
                <AddCircleIcon size={40} />
              </span>
              <span className="text-white font-medium">Add an article</span>
            </NavLink>
          </button>
        </div>
        {articlesAreLoaded ? (
          <div className="flex flex-col gap-4">
            {articles.map((article) => {
              return <Article article={article} key={article.id} />;
            })}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <ArticleSkeletonLoader />
            <ArticleSkeletonLoader />
          </div>
        )}
      </div>
    </div>
  );
}

export default Articles;
