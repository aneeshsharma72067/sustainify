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
        <div className="flex flex-col gap-8 mx-auto w-max my-10 ">
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
          <div>
            <img
              src={postData.imageURL}
              alt=""
              className="rounded-lg border-4 w-[30rem] h-auto border-green-300"
            />
          </div>
          <div className="text-left text-xl ">{postData.caption}</div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default AlertPostDetails;
