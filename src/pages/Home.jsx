/**
 * Home page component.
 * 
 * @returns {JSX.Element} The rendered Home component.
 */
import React, { useEffect, useState } from "react";
import UserGreet from "../components/UserGreet";
import Article from "../components/Article";
import { useFirebase } from "../context/FirebaseContext";
import ArticleSkeletonLoader from "../components/ArticleSkeletonLoader";
import { getArticles } from "../services/Firebase";
import { fetchNews } from "../services/NewsAPI";
import NewsCard from "../components/NewsCard";
import NewsSkeletonLoader from "../components/NewsSkeletonLoader";
import { NavLink } from "react-router-dom";

export default function Home() {
  const { articles, setArticles, user } = useFirebase();
  const [articlesAreLoaded, setArticlesAreLoaded] = useState(false);
  const [newsLoaded, setNewsLoaded] = useState(false);
  const [news, setNews] = useState(null);
  useEffect(() => {
    const fetchArticles = async () => {
      const articleList = await getArticles();
      const newsList = await fetchNews(5);
      setArticles(articleList);
      setNews(newsList);
      setArticlesAreLoaded(true);
      setNewsLoaded(true);
    };
    fetchArticles();
  }, []);
  return (
    <div className="flex gap-10 py-10 ">
      <div className="flex-[0.6] flex flex-col gap-10">
        <UserGreet />
        <div className="flex flex-col gap-5">
          <h1 className="text-3xl font-medium text-slate-700">
            Recent Articles
          </h1>
          {articlesAreLoaded ? (
            articles.length ? (
              <div className="flex flex-col gap-4">
                {articles.slice(0, 5).map((article) => {
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
      <div className="flex-[0.4] flex flex-col gap-5">
        <h1 className="text-3xl font-medium text-slate-700">Latest News</h1>
        {newsLoaded ? (
          news.articles.length ? (
            <div className="flex flex-col gap-4">
              {news.articles.map((newsItem, key) => {
                return <NewsCard key={key} news={newsItem} homepage={true} />;
              })}
              <NavLink
                to={"/news"}
                className="font-bold text-xl text-center text-green-500"
              >
                See More...
              </NavLink>
            </div>
          ) : (
            <div className="text-slate-800 font-bold text-3xl my-6">
              No News To Show :(
            </div>
          )
        ) : (
          <div className="flex flex-col gap-4">
            <NewsSkeletonLoader homepage={true} />
            <NewsSkeletonLoader homepage={true} />
          </div>
        )}
      </div>
    </div>
  );
}
