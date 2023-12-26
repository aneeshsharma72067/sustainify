import React from "react";

function UserGreet() {
  return (
    <div className="bg-green-200 rounded-lg p-7 flex flex-col gap-5">
      <div className="font-medium">
        {new Date().toLocaleDateString("en-us", {
          dateStyle: "medium",
        })}
      </div>
      <div className="text-2xl text-center text-slate-800 font-medium w-4/5 mx-auto">
        <span className="text-green-500 text-3xl">“</span>Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Rem ipsam corporis repellendus
        facilis?<span className="text-green-500 text-3xl">”</span>
      </div>
    </div>
  );
}

export default UserGreet;
