import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { deleteArticle, fetchArticle } from "../services/Firebase";
import { useFirebase } from "../context/FirebaseContext";
import { DeleteIcon } from "../assets/Icons";

function ArticleDetails() {
  const { articleID } = useParams();
  const { user } = useFirebase();
  const [article, setArticle] = useState(null);
  const [articleloader, setArticleLoader] = useState(true);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
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
  const delelteThisArticle = async () => {
    setLoader(true);
    const res = await deleteArticle(articleID);
    setLoader(false);
    if (res) {
      navigate("/artice");
    } else {
      alert("Delete not successfull !!");
    }
  };
  return (
    <div className="w-3/5 mx-auto my-10">
      {articleloader || !article ? (
        <div className="flex flex-col gap-5">Loading...</div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="font-bold text-slate-700 text-4xl">
            {article.title}
          </div>
          <div className="flex justify-between">
            <NavLink
              to={`/users/${article.userId}`}
              className="flex gap-3 items-center"
            >
              <span className="w-7 h-7 rounded-full bg-green-400"></span>
              <span>@{article.username}</span>
            </NavLink>
            {user && user.user_id === article.userId && (
              <div
                onClick={delelteThisArticle}
                className="px-3 py-1 rounded-md bg-red-400 duration-300 hover:bg-red-600 cursor-pointer"
              >
                <DeleteIcon size={30} color="white" />
              </div>
            )}
          </div>
          <div>{article.content}</div>
        </div>
      )}
    </div>
  );
}

export default ArticleDetails;
