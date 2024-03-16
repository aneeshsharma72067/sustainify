/**
 * Renders a skeleton loader for news items.
 * @param {Object} props - The component props.
 * @param {boolean} props.homepage - Indicates whether the skeleton loader is being used on the homepage.
 * @returns {JSX.Element} The rendered skeleton loader component.
 */
import React from "react";

function NewsSkeletonLoader({ homepage }) {
  return (
    <div className="flex gap-4">
      <div className="flex-1 flex items-center justify-center">
        <div
          className={`w-4/5 ${
            homepage ? "h-28" : "h-[13rem]"
          } rounded-lg animate-pulse bg-gradient-to-r from-slate-400 to-slate-200`}
        ></div>
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex flex-col gap-3">
          {!homepage && (
            <>
              <div className="w-4/5 h-10 rounded-md animate-pulse bg-gradient-to-r from-slate-400 to-slate-200"></div>
              <div className="w-4/5 h-5 rounded-md animate-pulse bg-gradient-to-r from-slate-400 to-slate-200"></div>
            </>
          )}
          <div className="w-3/5 h-5 rounded-md animate-pulse bg-gradient-to-r from-slate-400 to-slate-200"></div>
          <div className="w-2/5 h-5 rounded-md animate-pulse bg-gradient-to-r from-slate-400 to-slate-200"></div>
        </div>
        <div className="flex gap-3">
          <span className="w-10 h-5 rounded-md animate-pulse bg-gradient-to-r from-slate-400 to-slate-200"></span>
          <span className="w-10 h-5 rounded-md animate-pulse bg-gradient-to-r from-slate-400 to-slate-200"></span>
        </div>
      </div>
    </div>
  );
}

export default NewsSkeletonLoader;
