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
    <div className="w-3/5 mx-auto">
      {userData ? (
        <div className="flex gap-10 w-full my-10">
          <div className="flex-[0.4]">
            <div className="aspect-square bg-green-400 rounded-full w-4/5 max-w-[15rem] h-auto"></div>
          </div>
          <div className="flex-[0.6] flex flex-col gap-5 text-2xl py-5">
            <div>{userData.username}</div>
          </div>
        </div>
      ) : (
        <div className="flex gap-2 flex-col">
          <div className="w-full h-40 bg-gradient-to-r from-zinc-400 to-slate-50 animate-pulse"></div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
