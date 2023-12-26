import React from "react";
import UserGreet from "../components/UserGreet";

export default function Home() {
  return (
    <div className="flex gap-5 py-10">
      <div className="flex-[0.6]">
        <UserGreet />
        <div></div>
      </div>
      <div className="flex-[0.4]"></div>
    </div>
  );
}
