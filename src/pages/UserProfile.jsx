import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserData } from "../services/Firebase";

function UserProfile() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      const user = await getUserData(id);
      if (user) {
        console.log(user);
        setUserData(user);
      } else {
        console.log("Error fetching user");
      }
    };
    fetchUserData();
    return () => {
      setUserData(null);
    };
  }, []);
  return (
    <div>
      {userData ? (
        <div>
          <div>{userData.username}</div>
          <div>{userData.fullname}</div>
          <div>{userData.email}</div>
          <div>{userData.bio}</div>
          <div>{userData.popularity}</div>
        </div>
      ) : (
        <div className="flex gap-2 flex-col">
          <div className="w-52 h-10 bg-gradient-to-r from-zinc-400 to-slate-50 animate-pulse"></div>
          <div className="w-52 h-10 bg-gradient-to-r from-zinc-400 to-slate-50 animate-pulse"></div>
          <div className="w-52 h-10 bg-gradient-to-r from-zinc-400 to-slate-50 animate-pulse"></div>
          <div className="w-52 h-10 bg-gradient-to-r from-zinc-400 to-slate-50 animate-pulse"></div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
