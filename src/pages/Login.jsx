import React, { useState } from "react";
import Button from "../components/Button";
import { capitalizeWord } from "../utils/helper";
import { useLocation } from "react-router-dom";
import Toast from "../components/Toast";
import Loader from "../components/Loader";
import { signup } from "../services/Firebase";
import { useFirebase } from "../context/FirebaseContext";

export default function Login() {
  const firebase = useFirebase();
  if (firebase.user) {
    console.log(firebase.user);
  }
  const location = useLocation();
  const signUpFirst = location.state && location.state.signUpFirst;
  const [activeForm, setActiveForm] = useState(
    signUpFirst ? "signup" : "login"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({
    isActive: false,
    message: null,
    status: null,
  });
  const [signUpFormData, setSignUpFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
  });

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const showTost = (message, status) => {
    setToast({ message: message, status: status, isActive: true });
    setTimeout(() => {
      setToast({ message: null, status: null, isActive: false });
    }, 3000);
  };
  const resetForm = () => {
    setSignUpFormData({ username: "", fullname: "", email: "", password: "" });
    setLoginFormData({ email: "", password: "" });
  };
  const onSignupDataChange = (e) => {
    setSignUpFormData({ ...signUpFormData, [e.target.name]: e.target.value });
  };
  const onLoginDataChange = (e) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };
  const handleLogin = () => {
    console.log(loginFormData);
  };
  const handleSignup = async () => {
    setIsLoading(true);
    try {
      const result = await signup(signUpFormData);
      if (result) {
        showTost("Signup Successfull ✅", "success");
        resetForm();
      }
    } catch (err) {
      console.log(err);
      showTost("Something Went Wrong !!", "error");
    }
    setIsLoading(false);
  };

  return (
    <div className="relative w-full min-w-min h-[100vh] py-10 ">
      {isLoading && <Loader />}
      {toast.isActive && (
        <Toast message={toast.message} status={toast.status} />
      )}
      <div
        className={`absolute w-32 duration-700 h-32 rounded-full bg-gradient-to-r from-green-500 to-green-300  ${
          activeForm === "login"
            ? "top-0 right-[18rem]"
            : "-top-4 right-[16rem]"
        }`}
      ></div>
      <div
        className={`absolute w-20 duration-700 h-20 rounded-full bg-gradient-to-r from-green-300 to-green-100 ${
          activeForm === "login"
            ? "top-1/2 left-[17rem]"
            : "top-2/3 left-[13rem]"
        }`}
      ></div>
      <div
        className={`absolute w-12 duration-700 h-12 rounded-full bg-gradient-to-r from-green-400 to-green-200 ${
          activeForm === "login" ? "top-10 left-[21rem]" : "top-8 left-[20rem]"
        }`}
      ></div>
      <div
        className={`w-2/5 min-w-[20rem] authForm duration-300 flex flex-col relative pt-[6rem] items-center gap-10 mx-auto aspect-square h-auto rounded-full before:content-[''] before:absolute before:w-full before:h-auto before:aspect-square before:bg-green-300 before:rounded-full before:top-0 before:-z-10 before:duration-300 ${
          activeForm === "signup" && "before:scale-125"
        }`}
      >
        <h1 className="text-4xl font-bold text-white text-center">
          {capitalizeWord(activeForm)}
        </h1>
        {activeForm === "login" ? (
          <div className="w-3/5 flex flex-col items-center gap-3">
            <div className="w-full">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your Email"
                className="px-6 w-full py-3 rounded-md outline-none border-none bg-white text-slate-700 placeholder:text-green-300"
                value={loginFormData.email}
                onChange={onLoginDataChange}
              />
            </div>
            <div className="w-full">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter the password"
                className="px-6 w-full py-3 rounded-md outline-none border-none bg-white text-slate-700 placeholder:text-green-300"
                value={loginFormData.password}
                onChange={onLoginDataChange}
              />
            </div>
          </div>
        ) : (
          <div className="w-3/5 flex flex-col items-center gap-3">
            <div className="w-full">
              <input
                type="text"
                name="fullname"
                id="fullname"
                placeholder="Enter your Full Name"
                className="px-6 w-full py-3 rounded-md outline-none border-none bg-white text-slate-700 placeholder:text-green-300"
                value={signUpFormData.fullname}
                onChange={onSignupDataChange}
              />
            </div>
            <div className="w-full">
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter a username"
                className="px-6 w-full py-3 rounded-md outline-none border-none bg-white text-slate-700 placeholder:text-green-300"
                value={signUpFormData.username}
                onChange={onSignupDataChange}
              />
            </div>
            <div className="w-full">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your Email"
                className="px-6 w-full py-3 rounded-md outline-none border-none bg-white text-slate-700 placeholder:text-green-300"
                value={signUpFormData.email}
                onChange={onSignupDataChange}
              />
            </div>
            <div className="w-full">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter the password"
                className="px-6 w-full py-3 rounded-md outline-none border-none bg-white text-slate-700 placeholder:text-green-300"
                value={signUpFormData.password}
                onChange={onSignupDataChange}
              />
            </div>
          </div>
        )}
        <div className="w-full flex flex-col gap-2 items-center">
          <Button
            title={capitalizeWord(activeForm)}
            className={"!w-1/2"}
            onclick={activeForm === "login" ? handleLogin : handleSignup}
          />
          {activeForm === "login" ? (
            <p className="w-1/2 text-center text-sm">
              Not a member yet?{" "}
              <span
                onClick={() => setActiveForm("signup")}
                className="underline text-blue-900 cursor-pointer"
              >
                Sign up
              </span>{" "}
              and get started
            </p>
          ) : (
            <p className="w-1/2 text-center text-sm">
              Already a member?{" "}
              <span
                onClick={() => setActiveForm("login")}
                className="underline text-blue-900 cursor-pointer"
              >
                Log In
              </span>{" "}
              and continue
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
