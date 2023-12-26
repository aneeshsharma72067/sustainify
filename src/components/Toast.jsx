import React from "react";

function Toast({ message, status }) {
  return (
    <div
      className={`z-40 fixed top-10 left-[40%] px-10 py-3 rounded-lg border toast ${
        status === "success" ? "success_toast" : "error_toast"
      }`}
    >
      <span>{message}</span>
    </div>
  );
}

export default Toast;
