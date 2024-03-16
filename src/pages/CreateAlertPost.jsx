/**
 * Represents the CreateAlertPost component.
 * This component allows users to create and submit alert posts.
 *
 * @component
 * @example
 * return <CreateAlertPost />;
 */
import React, { useEffect, useState } from "react";
import { ImageIcon } from "../assets/Icons";
import { addAlertPost } from "../services/Firebase";
import Toast from "../components/Toast";
import Loader from "../components/Loader";
import Button from "../components/Button";
import { useFirebase } from "../context/FirebaseContext";
import { Navigate } from "react-router-dom";

function CreateAlertPost() {
  const { user } = useFirebase();
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [caption, setCaption] = useState("");
  const [toast, setToast] = useState({
    isActive: false,
    message: null,
    status: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    console.log(selectedImage);
    const tempURL = URL.createObjectURL(selectedImage);
    setImageURL(tempURL);
  };
  useEffect(() => {
    console.log(image, caption);
  }, [image]);
  const showTost = (message, status) => {
    setToast({ message: message, status: status, isActive: true });
    setTimeout(() => {
      setToast({ message: null, status: null, isActive: false });
    }, 3000);
  };
  const postSubmitHandle = async () => {
    setIsLoading(true);
    try {
      const result = await addAlertPost(
        user.user_id,
        user.username,
        image,
        caption
      );
      if (result) {
        showTost("Post Added Successfully", "success");
        setCaption("");
        setImage(null);
        setImageURL(null);
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      showTost("Something Went Wrong !!", "error");
      setIsLoading(false);
    }
  };
  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div className="py-5">
      {isLoading && <Loader />}
      {toast.isActive && (
        <Toast message={toast.message} status={toast.status} />
      )}
      <div className="w-3/5 mx-auto flex flex-col gap-10">
        <h1 className="font-bold text-green-400 text-4xl ">Add a Post</h1>
        <div className="flex flex-col w-full gap-5">
          <div className="flex flex-col gap-4 flex-1 text-slate-800">
            <input
              type="file"
              name="alert-image"
              id="alert-image"
              className="hidden"
              onChange={handleFileChange}
              accept=".jpg, .png, .jpeg"
            />

            <label
              htmlFor="alert-image"
              className="flex flex-col py-10 items-center justify-center border-4 border-dashed border-green-500 bg-green-200 rounded-xl cursor-pointer gap-5"
            >
              <div className="flex items-center justify-center">
                {imageURL ? (
                  <img src={imageURL} alt="not-found" className="w-1/2" />
                ) : (
                  <ImageIcon size={130} color="#3ade55" />
                )}
              </div>
              <div className="text-green-500 font-medium text-2xl">
                Select {image && "another"} Image
              </div>
            </label>
            <div className="bg-white px-10 py-4 rounded-lg ">
              <span>{image ? image.name : "No Image Selected"}</span>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-6">
            <textarea
              name="alert-caption"
              id="alert-caption"
              cols="30"
              rows="6"
              className="bg-white w-full border-4 border-green-300 outline-none rounded-lg p-5 resize-none"
              placeholder="Add a Caption, the Location for the image..."
              value={caption}
              onChange={(e) => {
                setCaption(e.target.value);
              }}
            ></textarea>
            <div className="text-center">
              <Button
                title={"Post"}
                disabled={!image || caption === ""}
                onclick={postSubmitHandle}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAlertPost;
