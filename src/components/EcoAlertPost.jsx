/**
 * Represents a component for displaying an eco alert post.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.post - The post object containing information about the post.
 * @param {boolean} props.isLiked - Indicates whether the post is liked by the user.
 * @param {Function} props.setLikedPosts - A function to update the list of liked posts.
 * @returns {JSX.Element} - The JSX element representing the eco alert post.
 */
import React, { useEffect, useState } from "react";
import { timeAgo } from "../utils/helper";
import { FlagIcon, LikeIcon } from "../assets/Icons";
import {
  getPosts,
  getlikedPosts,
  likePost,
  unlikePost,
} from "../services/Firebase";
import { useFirebase } from "../context/FirebaseContext";
import { useNavigate } from "react-router-dom";

function EcoAlertPost({ post, isLiked, setLikedPosts }) {
  const [imageIsLoading, setImageIsLoading] = useState(true);
  const [likeStatus, setLikeStatus] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(post.likes);

  const { user, setPosts } = useFirebase();
  const navigate = useNavigate();
  useEffect(() => {
    const image = new Image();
    image.src = post.imageURL;
    image.onload = () => setImageIsLoading(false);
    setLikeStatus(isLiked);
    return () => {
      image.onload = null;
    };
  }, [post.imageURL, isLiked]);
  const likeHandle = async () => {
    setLikeStatus(true);
    setLikeCount(likeCount + 1);
    await likePost(user.user_id, post.id);
    const postList = await getPosts();
    setPosts(postList);
    const likedPostList = await getlikedPosts(user.user_id);
    setLikedPosts(likedPostList);
  };
  const unLikeHandle = async () => {
    setLikeStatus(false);
    setLikeCount(likeCount - 1);
    await unlikePost(user.user_id, post.id);
    const postList = await getPosts();
    setPosts(postList);
    const likedPostList = await getlikedPosts(user.user_id);
    setLikedPosts(likedPostList);
  };
  return (
    <div className="w-full flex flex-col p-5 bg-white rounded-lg gap-5">
      <div className="flex gap-3 items-center">
        <span className="w-9 h-9 rounded-full bg-green-400"></span>
        <span className=" text-green-500">{post.username}</span>
      </div>
      <div
        className="w-full flex items-stretch gap-5 cursor-pointer"
        onClick={() => {
          navigate(`/alert/post/${post.id}`);
        }}
      >
        <div className="flex-1 flex bg-green-200 items-center justify-center">
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
      <div className="px-4 py-3 border-2 border-green-300 rounded-md gap-10 flex items-center ">
        <div className="flex items-center gap-1 justify-center">
          <button
            className="duration-300 group"
            onClick={isLiked ? unLikeHandle : likeHandle}
          >
            <LikeIcon
              size={25}
              color="#3ade55"
              fill={likeStatus ? "#3ade55" : "none"}
              strokeWidth={1.5}
              className="group-hover:fill-green-400 duration-300"
            />
          </button>
          {likeCount > 0 && <span className="text-green-500">{likeCount}</span>}
        </div>
        <div className="flex items-center justify-center">
          <button className="duration-300 group">
            <FlagIcon
              size={25}
              strokeWidth={1.5}
              color="#3ade55"
              className="group-hover:fill-green-400 duration-300"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default EcoAlertPost;
