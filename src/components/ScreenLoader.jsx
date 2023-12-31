import React, { useEffect } from "react";
import { useFirebase } from "../context/FirebaseContext";

function ScreenLoader() {
  const { screenIsLoading } = useFirebase();
  useEffect(() => {
    if (screenIsLoading) {
      if (!document.body.classList.contains("isLoading")) {
        document.body.classList.add("isLoading");
      }
    } else {
      document.body.classList.remove("isLoading");
    }
    return () => {
      document.body.classList.remove("isLoading");
    };
  }, []);
  return (
    <div
      id="screen-loader"
      className="fixed top-0 left-0 w-full h-full bg-slate-200 z-50 flex items-center justify-center overflow-hidden"
    >
      <div className="loader">
        <div className="loader-square"></div>
        <div className="loader-square"></div>
        <div className="loader-square"></div>
        <div className="loader-square"></div>
        <div className="loader-square"></div>
        <div className="loader-square"></div>
        <div className="loader-square"></div>
      </div>
    </div>
  );
}

export default ScreenLoader;
