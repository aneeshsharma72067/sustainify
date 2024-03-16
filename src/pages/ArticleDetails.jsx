import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { deleteArticle, fetchArticle } from "../services/Firebase";
import { useFirebase } from "../context/FirebaseContext";
import { DeleteIcon } from "../assets/Icons";
import Loader from "../components/Loader";
import { timeAgo } from "../utils/helper";

/**
 * Renders the details of an article.
 * @returns {JSX.Element} The ArticleDetails component.
 */
function ArticleDetails() {
  const { articleID } = useParams();
  const { user } = useFirebase();
  const [article, setArticle] = useState(null);
  const [articleloader, setArticleLoader] = useState(true);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    /**
     * Fetches the article from the database.
     * @returns {Promise<void>} A Promise that resolves when the article is fetched.
     */
    const getArticle = async () => {
      setArticleLoader(true);
      const res = await fetchArticle(articleID);
      setArticle(res);
      setArticleLoader(false);
    };

    getArticle();

    return () => {
      setArticle(null);
    };
  }, []);

  /**
   * Deletes the current article.
   * @returns {Promise<void>} A Promise that resolves when the article is deleted.
   */
  const delelteThisArticle = async () => {
    setLoader(true);
    const res = await deleteArticle(articleID);
    if (res) {
      setLoader(false);
      navigate("/article");
    } else {
      setLoader(false);
      alert("Delete not successfull !!");
    }
  };

  return (
    <div className="w-3/5 mx-auto my-10">
      {loader && <Loader />}
      {articleloader || !article ? (
        <div className="flex flex-col gap-5">
          {/* Placeholder skeleton UI */}
          <div className="rounded-lg h-14 w-full bg-gradient-to-r from-slate-400 to-slate-300 animate-pulse"></div>
          <div className="h-14 w-full flex justify-between">
            <div className="flex gap-3">
              <span className="w-8 h-8 rounded-full bg-gradient-to-r from-slate-400 to-slate-300 animate-pulse"></span>
              <span className=" w-20 h-7 bg-gradient-to-r from-slate-400 to-slate-300 animate-pulse"></span>
            </div>
            <span className="w-12 h-8 bg-gradient-to-r from-slate-400 to-slate-300 animate-pulse"></span>
          </div>
          <div className="rounded-lg h-7 w-full bg-gradient-to-r from-slate-400 to-slate-300 animate-pulse"></div>
          <div className="rounded-lg h-7 w-full flex gap-3">
            <div className="flex-1 rounded-lg bg-gradient-to-r from-slate-400 to-slate-300 animate-pulse"></div>
            <div className="flex-1 rounded-lg bg-gradient-to-r from-slate-400 to-slate-300 animate-pulse"></div>
          </div>
          <div className="rounded-lg h-7 w-full bg-gradient-to-r from-slate-400 to-slate-300 animate-pulse"></div>
          <div className="rounded-lg h-7 w-full flex gap-3">
            <div className="flex-[0.5] rounded-lg bg-gradient-to-r from-slate-400 to-slate-300 animate-pulse"></div>
            <div className="flex-1 rounded-lg bg-gradient-to-r from-slate-400 to-slate-300 animate-pulse"></div>
          </div>
          <div className="rounded-lg h-7 w-full flex gap-3">
            <div className="flex-[0.7] rounded-lg bg-gradient-to-r from-slate-400 to-slate-300 animate-pulse"></div>
            <div className="flex-[0.3] rounded-lg bg-gradient-to-r from-slate-400 to-slate-300 animate-pulse"></div>
          </div>
          <div className="rounded-lg h-7 w-3/5 bg-gradient-to-r from-slate-400 to-slate-300 animate-pulse"></div>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="font-bold text-slate-700 text-4xl">
            {article.title}
          </div>
          <div className="flex justify-between">
            {/* User information */}
            <span className="flex flex-col items-end">
              <NavLink
                to={`/users/${article.userId}`}
                className="flex gap-3 items-center"
              >
                {/* User avatar */}
                <span className="w-7 h-7 rounded-full bg-green-400"></span>
                <span>@{article.username}</span>
              </NavLink>
              {/* Article creation date */}
              <span className="font-medium text-sm text-slate-500">
                {new Date(article.createdAt.toDate()).toLocaleDateString(
                  "en-us",
                  {
                    dateStyle: "medium",
                  }
                )}
              </span>
            </span>
            {/* Delete button (visible to the article owner) */}
            {user && user.user_id === article.userId && (
              <div
                onClick={delelteThisArticle}
                className="px-3 py-1 rounded-md bg-red-400 duration-300 flex items-center justify-center hover:bg-red-600 cursor-pointer"
              >
                <DeleteIcon size={30} color="white" />
              </div>
            )}
          </div>
          {/* Article content */}
          <pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit" }}>
            {article.content}
          </pre>
        </div>
      )}
    </div>
  );
}

export default ArticleDetails;
