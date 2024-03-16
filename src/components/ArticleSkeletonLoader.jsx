/**
 * Renders a skeleton loader for an article component.
 * @returns {JSX.Element} The article skeleton loader component.
 */
import React from "react";

function ArticleSkeleton() {
  return (
    <div className="w-full bg-white rounded-lg px-5 py-3 flex flex-col gap-3">
      <div className="w-full h-8 overflow-hidden flex gap-3">
        <span className="w-7 h-7 rounded-full bg-gradient-to-r from-zinc-400 to-zinc-100 animate-pulse"></span>
        <span className="h-7 w-28 rounded-md bg-gradient-to-r from-zinc-400 to-zinc-100 animate-pulse"></span>
      </div>
      <div className="w-full h-10 rounded-md bg-gradient-to-r from-zinc-400 to-zinc-100 animate-pulse"></div>
      <div className="w-full h-16 rounded-md bg-gradient-to-r from-gray-400 to-slate-100 animate-pulse"></div>
      <div className="w-1/3 h-5 rounded-md bg-gradient-to-r from-gray-400 to-slate-100 animate-pulse"></div>

      <div></div>
    </div>
  );
}

export default ArticleSkeleton;
