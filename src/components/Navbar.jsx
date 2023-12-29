import React from "react";
import { NavLink } from "react-router-dom";
import Button from "./Button";

export default function Navbar() {
  return (
    <div className="flex my-4 items-center justify-between">
      <div>
        <a href="/">Sustainify</a>
      </div>
      <div className="flex w-1/2 gap-[4rem] justify-center">
        <NavLink className="navbar__link" to="/">
          Home
        </NavLink>
        <NavLink className="navbar__link" to="/create">
          Create
        </NavLink>
        <NavLink className="navbar__link" to="/alert/posts">
          EcoAlert
        </NavLink>
        <NavLink className="navbar__link" to="/news">
          EcoNews
        </NavLink>
        <NavLink className="navbar__link" to="/about">
          About
        </NavLink>
      </div>
      <Button type={"link"} location={"/login"} title={"Login"} />
    </div>
  );
}
