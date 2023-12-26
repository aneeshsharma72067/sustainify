import React, { useState } from "react";
import { DropDownIcon } from "../assets/Icons";
import Button from "../components/Button";
import { useFirebase } from "../context/firebase";
import Loader from "../components/Loader";
import { categoryList } from "../constants/data";
import Toast from "../components/Toast";

export default function CreatePost() {
  const [isLoading, setIsLoading] = useState(false);
  const [isToastActive, setIsToastActive] = useState(false);
  const [formData, setFormData] = useState({
    userId: 1,
    username: "john123",
    category: "",
    title: "",
    content: "",
  });
  const onValueChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };
  const showTost = (message) => {
    setIsToastActive(true);
    setTimeout(() => {
      setIsToastActive(false);
    }, 3000);
  };
  const [isCategoryListActive, setIsCategoryListActive] = useState(false);
  const firebase = useFirebase();

  const showCategoryList = () => {
    setIsCategoryListActive(!isCategoryListActive);
  };

  const postArticle = async () => {
    setIsLoading(true);
    if (formData.content.length < 100) {
      return;
    }
    const result = await firebase.addArticle(formData);
    if (result) {
      showTost();
      console.log("data added successfully");
    } else {
      console.log("Error");
    }
    setIsLoading(false);
  };
  return (
    <div className="">
      {isLoading && <Loader />}
      {isToastActive && (
        <Toast message={"Article submitted successfully"} status={"success"} />
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
            <div className="absolute duration-300 max-h-40 overflow-y-scroll top-14 flex flex-col rounded-md w-full border-2 border-green-300">
              {categoryList.map((category) => {
                return (
                  <div
                    className="category_list_item"
                    key={category.id}
                    onClick={() => onValueChange("category", category.title)}
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
            }}
          ></textarea>
        </div>

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
