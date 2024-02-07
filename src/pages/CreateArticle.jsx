import React, { useState } from "react";
import { DropDownIcon } from "../assets/Icons";
import Button from "../components/Button";
import { useFirebase } from "../context/FirebaseContext";
import Loader from "../components/Loader";
import { categoryList } from "../constants/data";
import Toast from "../components/Toast";
import { addArticle } from "../services/Firebase";
import { Navigate } from "react-router-dom";

export default function CreateArticle() {
  const [isLoading, setIsLoading] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [toast, setToast] = useState({
    isActive: false,
    message: null,
    status: null,
  });
  const { user } = useFirebase();
  const [formData, setFormData] = useState({
    userId: user ? user.user_id : null,
    username: user ? user.username : "Anonymous",
    category: "",
    title: "",
    content: "",
  });
  const onValueChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };
  const showTost = (message, status) => {
    setToast({ message: message, status: status, isActive: true });
    setTimeout(() => {
      setToast({ message: null, status: null, isActive: false });
    }, 3000);
  };
  const [isCategoryListActive, setIsCategoryListActive] = useState(false);

  const showCategoryList = () => {
    setIsCategoryListActive(!isCategoryListActive);
  };
  const resetArticle = () => {
    setFormData({
      userId: user ? user.user_id : null,
      username: user ? user.username : "Anonymous",
      category: "",
      title: "",
      content: "",
    });
  };
  const postArticle = async () => {
    setIsLoading(true);
    if (formData.content.length < 100) {
      return;
    }
    try {
      const result = await addArticle(formData);
      console.log(result);
      resetArticle();
      showTost("Article submitted successfully", "success");
      console.log("data added successfully");
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      showTost("Something Went Wrong !!", "error");
    }
  };

  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div className="">
      {isLoading && <Loader />}
      {toast.isActive && (
        <Toast message={toast.message} status={toast.status} />
      )}
      <div className="flex flex-col w-4/5 mx-auto py-4 gap-3 text-slate-800">
        <h1 className="text-3xl text-center font-bold my-4 text-green-500">
          {" "}
          Create A New Article ✨
        </h1>
        <div className="relative flex flex-col w-full gap-1">
          <div
            className="flex bg-white items-center justify-between text-slate-600 py-3 px-5 rounded-md w-full border border-green-400 cursor-pointer"
            onClick={showCategoryList}
          >
            <span
              className={`text-slate-${
                formData.category ? 800 : 500
              } select-none`}
            >
              {formData.category
                ? formData.category
                : "Select Article Category"}
            </span>
            <span>
              <DropDownIcon size={20} color="#0ceb2d" />
            </span>
          </div>
          {isCategoryListActive && (
            <div className="absolute duration-300 max-h-40 overflow-y-scroll top-14 flex flex-col rounded-md w-full border-4 border-zinc-300">
              {categoryList.map((category) => {
                return (
                  <div
                    className="category_list_item"
                    key={category.id}
                    onClick={() => {
                      onValueChange("category", category.title);
                      setIsCategoryListActive(false);
                    }}
                  >
                    {category.title}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div>
          <input
            type="text"
            className="border text-lg w-full border-green-500 outline-none rounded-lg px-5 py-3 bg-white"
            name="title"
            id="title"
            placeholder="Enter a Title"
            value={formData.title}
            onChange={(e) => {
              onValueChange(e.target.name, e.target.value);
            }}
          />
        </div>
        <div className="w-full">
          <textarea
            placeholder="Enter your article"
            className="border text-lg w-full min-h-[60vh] border-green-500 outline-none rounded-lg p-5 bg-white"
            id="content"
            name="content"
            value={formData.content}
            onChange={(e) => {
              onValueChange(e.target.name, e.target.value);
              if (formData.content.length < 100) {
                setShowWarning(true);
              } else {
                setShowWarning(false);
              }
            }}
            onFocus={() => {
              setIsCategoryListActive(false);
            }}
            onBlur={() => {
              if (formData.content.length < 100) {
                setShowWarning(true);
              } else {
                setShowWarning(false);
              }
            }}
          ></textarea>
        </div>
        {showWarning && (
          <div className="text-base font-medium text-red-500">
            Article content should have more than 100 characters
          </div>
        )}
        <Button
          disabled={
            formData.content.length < 100 ||
            formData.category === "" ||
            formData.title === ""
          }
          title={"Post My Article"}
          onclick={postArticle}
        />
      </div>
    </div>
  );
}
