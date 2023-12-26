import React from "react";

function Button({ disabled, title, onclick }) {
  return (
    <button
      onClick={onclick}
      disabled={disabled}
      className="group disabled:bg-opacity-50 active:disabled:scale-100 disabled:hover:text-white active:scale-90 outline-none relative border-2 border-green-400 overflow-hidden text-white bg-green-400 px-6 py-3 rounded-lg text-lg font-medium w-1/4 duration-300 hover:text-green-400"
    >
      <div className="z-0 group-disabled:group-hover:scale-0 absolute scale-0 group-hover:scale-150 duration-500 -top-1/4 left-0 w-full aspect-square h-auto rounded-full bg-white"></div>
      <p className="z-10 relative">{title}</p>
    </button>
  );
}

export default Button;
