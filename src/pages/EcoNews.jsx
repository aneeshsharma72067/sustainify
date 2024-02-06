import React, { useEffect, useState } from "react";
import { fetchNews } from "../services/NewsAPI";
import NewsCard from "../components/NewsCard";
import NewsSkeletonLoader from "../components/NewsSkeletonLoader";

function EcoNews() {
  const [newsList, setNewsList] = useState(null);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    const getNews = async () => {
      setLoader(true);
      const res = await fetchNews();
      setNewsList(res);
      setLoader(false);
    };
    getNews();
    return () => {
      setNewsList(null);
    };
  }, []);
  return (
    <div>
      <div className="w-4/5 mx-auto my-5">
        {loader ? (
          <div className="flex flex-col gap-10">
            <NewsSkeletonLoader />
            <NewsSkeletonLoader />
          </div>
        ) : (
          <div>
            {newsList.articles.length ? (
              <div className="flex flex-col gap-4">
                {newsList.articles.map((item, key) => {
                  return <NewsCard news={item} key={key} />;
                })}
              </div>
            ) : (
              <div>No News</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default EcoNews;
