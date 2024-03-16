/**
 * Renders the details of an alert post.
 * @returns {JSX.Element} The rendered AlertPostDetails component.
 */
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { deletePost, getPostData } from "../services/Firebase";
import { setDoc } from "firebase/firestore";
import { DeleteIcon } from "../assets/Icons";
import Loader from "../components/Loader";
import { useFirebase } from "../context/FirebaseContext";

function AlertPostDetails() {
  const params = useParams();
  const { user } = useFirebase();
  const alertPostID = params.alertPostID;
  const [loaderActive, setLoaderActive] = useState(false);
  const [postHasLoaded, setPostHasLoaded] = useState(false);
  const [postData, setPostData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserData = async () => {
      const post = await getPostData(alertPostID);
      console.log(post);
      setPostData(post);
      setPostHasLoaded(true);
    };
    fetchUserData();
    return () => {
      setPostData(null);
      setPostHasLoaded(false);
    };
  }, []);
  const delelteAlertPost = async () => {
    setLoaderActive(true);
    const res = await deletePost(alertPostID);
    if (res) {
      setLoaderActive(false);
      navigate("/alert");
    } else {
      setLoaderActive(false);
      alert("Delete not successfull !!");
    }
  };
  return (
    <div>
      {loaderActive && <Loader />}
      {postHasLoaded && postData ? (
        <div className="flex w-1/2 flex-col gap-8 mx-auto my-10 ">
          <div className="flex justify-between">
            <div className="flex gap-3">
              <span className="bg-green-400 rounded-full w-8 h-8"></span>
              <span className="text-lg">{postData.username}</span>
            </div>

            {user && user.user_id === postData.userID && (
              <div
                onClick={delelteAlertPost}
                className="px-3 py-1 rounded-md bg-red-400 duration-300 hover:bg-red-600 cursor-pointer"
              >
                <DeleteIcon size={30} color="white" />
              </div>
            )}
          </div>
          <div className="w-full">
            <img
              src={postData.imageURL}
              alt="Not Found"
              className="rounded-lg border-4 w-full h-auto border-green-300"
            />
          </div>
          <pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit" }}>
            {postData.caption}
          </pre>
        </div>
      ) : (
        <div className="flex flex-col w-1/2 mx-auto gap-4">
          <div className="flex justify-between">
            <div className="flex gap-4">
              <span className="w-8 h-8 rounded-full bg-gradient-to-r from-slate-400 to-slate-300 animate-pulse"></span>
              <span className="w-14 h-7 rounded-md bg-gradient-to-r from-slate-400 to-slate-300 animate-pulse"></span>
            </div>
            <div className="w-10 h-8 rounded-md bg-gradient-to-r from-slate-400 to-slate-300 animate-pulse"></div>
          </div>
          <div className="w-full h-[20rem] rounded-lg bg-gradient-to-r from-slate-400 to-slate-300 animate-pulse"></div>
          <div className="w-full h-7 rounded-md bg-gradient-to-r from-slate-400 to-slate-300 animate-pulse"></div>
          <div className="w-full h-7 rounded-md bg-gradient-to-r from-slate-400 to-slate-300 animate-pulse"></div>
          <div className="w-3/5 h-7 rounded-md bg-gradient-to-r from-slate-400 to-slate-300 animate-pulse"></div>
        </div>
      )}
    </div>
  );
}

export default AlertPostDetails;
