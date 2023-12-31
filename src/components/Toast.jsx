import React from "react";
import { CloseIcon } from "../assets/Icons";

function Toast({ message, status, onclick }) {
  return (
    <div
      className={`z-40 fixed top-10 left-[40%] px-10 py-3 flex items-center gap-5 rounded-lg border toast ${
        status === "success" ? "success_toast" : "error_toast"
      }`}
    >
      <span>{message}</span>
      <span className="cursor-pointer" onClick={onclick}>
        <CloseIcon
          size={40}
          color={status === "success" ? "#16f053" : "#ff4f42"}
        />
      </span>
    </div>
  );
}

export default Toast;
