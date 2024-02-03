import React from "react";
import { timeAgo } from "../utils/helper";
import { NavLink } from "react-router-dom";

function Article({ article }) {
  return (
    <div className="bg-white px-5 py-3 rounded-lg flex flex-col gap-4 text-slate-700">
      <NavLink
        to={`/users/${article.userId}`}
        className="flex gap-3 items-center"
      >
        <span className="w-7 h-7 rounded-full bg-green-400"></span>
        <span>@{article.username}</span>
      </NavLink>
      <div className="bg-green-400 text-white px-4 py-2 rounded-md">
        {article.title.length > 100
          ? article.title.slice(0, 100) + "..."
          : article.title}
      </div>
      <div>
        {article.content.length > 200
          ? article.content.slice(0, 200) + "..."
          : article.content}
      </div>
      <div className="flex gap-3 text-sm items-center">
        <span className="text-slate-500 font-medium">
          {timeAgo(article.createdAt.toDate())}
        </span>
        <span className="text-white px-3 py-1 rounded-md bg-green-400">
          {article.category}
        </span>
      </div>
    </div>
  );
}

export default Article;
