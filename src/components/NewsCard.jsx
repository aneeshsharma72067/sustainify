import React from "react";
import { timeAgo } from "../utils/helper";

function NewsCard({ news }) {
  return (
    <div className="flex gap-5 px-5 py-3 rounded-lg bg-white">
      <div className="flex-1 flex items-center justify-center bg-green-100 rounded-md">
        <img src={news.urlToImage} alt="NotFound" className="w-4/5" />
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex flex-col gap-4">
          <div className="font-bold text-slate-800 text-2xl">{news.title}</div>
          <div className="text-slate-600">
            {news.description.length > 150
              ? news.description.slice(0, 150) + "..."
              : news.description}
          </div>
        </div>
        <div className="flex gap-3 text-sm ">
          <span className="font-semibold text-slate-500">{news.author}</span>
          <span className="font-medium text-slate-500">
            {timeAgo(new Date(news.publishedAt))}
          </span>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;
