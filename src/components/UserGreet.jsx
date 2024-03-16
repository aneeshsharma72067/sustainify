/**
 * Renders a greeting message with the current date and a quote about the Earth.
 * @returns {JSX.Element} The rendered UserGreet component.
 */
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
        <span className="text-green-500 text-3xl">“</span>The Earth does not
        belong to us: we belong to the Earth
        <span className="text-green-500 text-3xl">”</span>
      </div>
    </div>
  );
}

export default UserGreet;
