import React, { useEffect, useState } from "react";
import { timeAgo } from "../utils/helper";

function EcoAlertPost({ post }) {
  const [imageIsLoading, setImageIsLoading] = useState(true);
  useEffect(() => {
    const image = new Image();
    image.src = post.imageURL;
    image.onload = () => setImageIsLoading(false);
    return () => {
      image.onload = null;
    };
  }, [post.imageURL]);
  return (
    <div className="w-full flex flex-col p-5 bg-white rounded-lg gap-5">
      <div className="flex gap-3 items-center">
        <span className="w-9 h-9 rounded-full bg-green-400"></span>
        <span className=" text-green-500">{post.username}</span>
      </div>
      <div className="w-full flex items-stretch gap-5">
        <div className="flex-1 flex items-center justify-center">
          {!imageIsLoading ? (
            <img
              src={post.imageURL}
              alt="not-found"
              className="w-auto max-h-[10rem]"
            />
          ) : (
            <div className="flex-1 h-44 rounded-md bg-gradient-to-r from-zinc-400 to-zinc-100 animate-pulse"></div>
          )}
        </div>
        <div className="flex-1 flex flex-col justify-between pb-1">
          <p>
            {post.caption.length > 170
              ? post.caption.slice(0, 170) + "..."
              : post.caption}
          </p>

          <div className="text-slate-500 text-sm font-medium">
            {timeAgo(post.createdAt.toDate())}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EcoAlertPost;
