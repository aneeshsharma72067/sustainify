import React from "react";
import { useLocation } from "react-router-dom";

function Link({ path, title }) {
  const location = useLocation();
  const isActive = location.pathname === path;
  const className = `navbar__link ${isActive && "active__navbar__link"}`;
  return (
    <a href={path} className={className}>
      {title}
    </a>
  );
}

export default function Navbar() {
  return (
    <div className="flex my-4 items-center justify-between">
      <div>
        <a href="/">Sustainify</a>
      </div>
      <div className="flex w-1/2 gap-[4rem] justify-center">
        <Link title={"Home"} path={"/"} />
        <Link title={"Create"} path={"/create"} />
        <Link title={"EcoAlert"} path={"/alert"} />
        <Link title={"EcoNews"} path={"/news"} />
        <Link title={"About"} path={"/about"} />
      </div>
      <div>
        <a
          href="/login"
          className="text-white px-5 py-2 rounded-md font-bold bg-green-500 duration-300 border-2 border-transparent border-green-500 hover:bg-transparent hover:border-green-500 hover:text-green-500"
        >
          Login
        </a>
      </div>
    </div>
  );
}
