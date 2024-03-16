/**
 * Button component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} [props.disabled=false] - Determines if the button is disabled.
 * @param {string} props.title - The title of the button.
 * @param {function} props.onclick - The click event handler for the button.
 * @param {string} props.type - The type of the button.
 * @param {string} props.location - The location for the NavLink button.
 * @param {string} props.className - The CSS class name for the button.
 * @returns {JSX.Element} The rendered Button component.
 */
import React from "react";
import { NavLink } from "react-router-dom";

function Button({
  disabled = false,
  title,
  onclick,
  type,
  location,
  className,
}) {
  if (type === "logout") {
    return (
      <button
        onClick={onclick}
        className={`custom_link relative group hover:text-white overflow-hidden border-2 border-green-400 px-6 py-3 ${className}`}
      >
        <div className="z-0 absolute group-hover:translate-x-full duration-500 top-0 -left-full w-full h-full bg-green-400"></div>
        <p className="z-10 relative duration-300">{title}</p>
      </button>
    );
  }
  if (type === "link") {
    return (
      <NavLink
        to={location}
        onClick={onclick}
        className={`custom_link relative group hover:text-white overflow-hidden border-2 border-green-400 px-6 py-3 ${className}`}
      >
        <div className="z-0 absolute group-hover:translate-x-full duration-500 top-0 -left-full w-full h-full bg-green-400"></div>
        <p className="z-10 relative duration-300">{title}</p>
      </NavLink>
    );
  }
  return (
    <button
      onClick={onclick}
      disabled={disabled}
      className={`group disabled:bg-opacity-50 active:disabled:scale-100 disabled:hover:text-white active:scale-90 outline-none relative overflow-hidden text-white bg-green-400 px-6 py-3 rounded-lg text-lg font-medium w-1/4 duration-300 hover:text-green-400 ${className}`}
    >
      <div className="z-0 group-disabled:group-hover:scale-0 absolute scale-0 group-hover:scale-150 duration-500 -top-1/4 left-0 w-full aspect-square h-auto rounded-full bg-white"></div>
      <p className="z-10 relative">{title}</p>
    </button>
  );
}

export default Button;
