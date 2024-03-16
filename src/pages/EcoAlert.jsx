import React, { useEffect, useState } from "react";
import { AddCircleIcon } from "../assets/Icons";
import EcoAlertPost from "../components/EcoAlertPost";
import { useFirebase } from "../context/FirebaseContext";
import { getPosts, getlikedPosts } from "../services/Firebase";
import PostSkeletonLoader from "../components/PostSkeletonLoader";
import { NavLink } from "react-router-dom";

/**
 * Renders the EcoAlert page.
 * This page displays recent posts related to eco-alerts and allows users to add new posts.
 */
function EcoAlert() {
  const { user, posts, setPosts } = useFirebase();
  const [likedPosts, setLikedPosts] = useState([]);
  const [postsAreLoaded, setPostsAreLoaded] = useState(false);

  useEffect(() => {
    /**
     * Fetches the posts and liked posts from Firebase.
     */
    const fetchPosts = async () => {
      const postList = await getPosts();
      setPosts(postList);
      if (user) {
        const likedPostList = await getlikedPosts(user.user_id);
        setLikedPosts(likedPostList);
      } else {
        console.log("no user and no likedpost");
      }
      setPostsAreLoaded(true);
    };

    fetchPosts();
  }, [user, setLikedPosts]);

  return (
    <div className="py-4">
      <div className="w-4/5 mx-auto flex flex-col gap-8">
        <div className="flex items-center w-full">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-green-500">
              Capturing the Call for Cleanup
            </h1>{" "}
            <h2 className="leading-normal font-medium text-slate-600 text-lg">
              Your Lens, Our Inspiration! Share Images of Neglected Spaces,
              Echoing the Need for Eco-Revitalization. Each Photo Ignites a
              Green Revolution – Join Us in Picturing a Cleaner Tomorrow
            </h2>
          </div>
        </div>
        <div className="w-full bg-green-300 rounded-xl py-10 border-dashed  border-2 border-green-500">
          <button className="flex items-center justify-center mx-auto">
            <NavLink
              to="/alert/create"
              className="flex items-center justify-center px-5 py-2 bg-green-500 rounded-lg gap-3 hover:bg-green-700 duration-300"
            >
              <span>
                <AddCircleIcon size={40} />
              </span>
              <span className="text-white font-medium">Add a post</span>
            </NavLink>
          </button>
        </div>
        <div className="flex flex-col gap-6 w-full">
          <h1 className="text-3xl font-medium text-slate-700">Recent Posts</h1>
          {postsAreLoaded ? (
            <div className="flex flex-col gap-4 w-4/5 mx-auto">
              {posts.length ? (
                posts.map((post) => {
                  return (
                    <EcoAlertPost
                      key={post.id}
                      post={post}
                      isLiked={likedPosts.includes(post.id)}
                      likedPost={likedPosts}
                      setLikedPosts={setLikedPosts}
                    />
                  );
                })
              ) : (
                <div className="text-center font-bold text-slate-700 text-4xl my-5">
                  No Posts Available
                </div>
              )}
            </div>
          ) : (
            <div className="w-4/5 mx-auto flex flex-col gap-4">
              <PostSkeletonLoader />
              <PostSkeletonLoader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EcoAlert;
