import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";
import { useFirebase } from "../context/FirebaseContext";
import { checkIfUserLoggedIn, logout } from "../services/Firebase";
import Loader from "./Loader";

export default function Navbar() {
  const { user, setUser } = useFirebase();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const logoutHandle = async () => {
    setIsLoading(true);
    try {
      await logout();
      setUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };
  return (
    <div className="flex my-4 items-center justify-between">
      {isLoading && <Loader />}

      <div>
        <NavLink to="/">Sustainify</NavLink>
      </div>
      <div className="flex w-1/2 gap-[4rem] justify-center">
        <NavLink className="navbar__link" to="/">
          Home
        </NavLink>
        <NavLink className="navbar__link" to="/article">
          Articles
        </NavLink>
        <NavLink className="navbar__link" to="/alert">
          EcoAlert
        </NavLink>
        <NavLink className="navbar__link" to="/news">
          EcoNews
        </NavLink>
        <NavLink className="navbar__link" to="/about">
          About
        </NavLink>
      </div>
      {user ? (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <NavLink
              to={`/users/${user.user_id}`}
              className="w-10 h-10 rounded-full bg-green-400"
            ></NavLink>
            <NavLink
              to={`/users/${user.user_id}`}
              className="font-medium text-slate-50 bg-green-300 py-3 px-4 duration-300 hover:bg-teal-400"
            >
              @{user.username}
            </NavLink>
          </div>
          <Button type="logout" onclick={logoutHandle} title={"Logout"} />
        </div>
      ) : (
        <Button type={"link"} location={"/login"} title={"Login"} />
      )}
    </div>
  );
}
