import React from "react";

function PostSkeletonLoader() {
  return (
    <div className="w-full bg-white rounded-lg p-5 flex flex-col gap-5">
      <div className="w-full h-10 overflow-hidden flex gap-3">
        <span className="w-9 h-9 rounded-full bg-gradient-to-r from-zinc-400 to-zinc-100 animate-pulse"></span>
        <span className="h-9 w-28 rounded-md bg-gradient-to-r from-zinc-400 to-zinc-100 animate-pulse"></span>
      </div>
      <div className="flex gap-4 h-44">
        <div className="flex-1 h-full rounded-md bg-gradient-to-r from-zinc-400 to-zinc-100 animate-pulse"></div>
        <div className="flex-1 h-4/5 flex flex-col gap-2">
          <div className="bg-gradient-to-r w-full h-5 from-zinc-400 rounded-sm to-zinc-100 animate-pulse"></div>
          <div className="bg-gradient-to-r w-full h-5 from-zinc-400 rounded-sm to-zinc-100 animate-pulse"></div>
          <div className="bg-gradient-to-r w-full h-5 from-zinc-400 rounded-sm to-zinc-100 animate-pulse"></div>
          <div className="bg-gradient-to-r w-full h-5 from-zinc-400 rounded-sm to-zinc-100 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

export default PostSkeletonLoader;
