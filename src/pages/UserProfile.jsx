import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getArticlesByUser,
  getPostsByUser,
  getUserData,
} from "../services/Firebase";
import Article from "../components/Article";
import ArticleSkeletonLoader from "../components/ArticleSkeletonLoader";
import EcoAlertPost from "../components/EcoAlertPost";
import PostSkeletonLoader from "../components/PostSkeletonLoader";

function UserProfile() {
  const { id } = useParams();
  const [articles, setArticles] = useState(null);
  const [articlesAreLoaded, setArticlesAreLoaded] = useState(false);
  const [posts, setPosts] = useState(null);
  const [postsAreLoaded, setPostsAreLoaded] = useState(false);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      const user = await getUserData(id);
      if (user) {
        console.log(user);
        setUserData(user);
      } else {
        console.log("Error fetching user");
      }
    };
    const fetchArticles = async () => {
      setArticlesAreLoaded(false);
      const articleList = await getArticlesByUser(id);
      setArticles(articleList);
      setArticlesAreLoaded(true);
    };
    const fetchPosts = async () => {
      setPostsAreLoaded(false);
      const postList = await getPostsByUser(id);
      setPosts(postList);
      setPostsAreLoaded(true);
    };
    fetchUserData();
    fetchArticles();
    fetchPosts();
    return () => {
      setUserData(null);
      setArticles(null);
    };
  }, []);
  // if (!userData) {
  //   return (
  //     <>
  //       <div className="w-3/5 my-10 mx-auto text-4xl font-bold text-slate-700 text-center">
  //         User Not Found !!
  //       </div>
  //     </>
  //   );
  // }
  return (
    <div className="w-4/5 mx-auto">
      <div className="w-4/5">
        {userData ? (
          <div className="flex gap-10 w-full my-10">
            <div className="flex-[0.4]">
              <div className="aspect-square bg-green-400 rounded-full w-3/5 max-w-[15rem] h-auto"></div>
            </div>
            <div className="flex-[0.6] flex flex-col gap-5 text-2xl py-5">
              <div className="font-bold text-blue-950">
                @{userData.username}
              </div>
              <div className="text-medium">{userData.fullname}</div>
              {userData.bio !== "" && <div>{userData.bio}</div>}
              <div className="text-lg font-medium text-slate-600">
                Joined On{" "}
                {new Date(userData.joinedOn.toDate()).toLocaleDateString(
                  "en-us",
                  {
                    dateStyle: "medium",
                  }
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex gap-2 flex-col">
            <div className="w-full h-40 bg-gradient-to-r from-zinc-400 to-slate-50 animate-pulse"></div>
          </div>
        )}
      </div>
      <div className="flex gap-4 my-6">
        <div className="flex-1 flex flex-col gap-5">
          <h1 className="text-3xl font-medium text-slate-700">Articles</h1>
          {articlesAreLoaded ? (
            articles.length ? (
              <div className="flex flex-col gap-4">
                {articles.slice(0, 5).map((article) => {
                  return <Article article={article} key={article.id} />;
                })}
              </div>
            ) : (
              <div className="text-slate-800 font-bold text-3xl my-10">
                No Articles by {userData.username} !!
              </div>
            )
          ) : (
            <div className="flex flex-col gap-4">
              <ArticleSkeletonLoader />
              <ArticleSkeletonLoader />
            </div>
          )}
        </div>
        <div className="flex-1 flex flex-col gap-5">
          <h1 className="text-3xl font-medium text-slate-700">
            EcoAlert Posts
          </h1>
          {postsAreLoaded ? (
            posts.length ? (
              <div className="flex flex-col gap-4">
                {posts.map((post, key) => {
                  return <EcoAlertPost post={post} key={key} />;
                })}
              </div>
            ) : (
              <div className="text-slate-800 font-bold text-3xl my-10">
                No Posts by {userData.username} !!
              </div>
            )
          ) : (
            <div className="flex flex-col gap-4">
              <PostSkeletonLoader />
              <PostSkeletonLoader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
