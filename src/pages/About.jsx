import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "/public/images/logo.png";

export default function About() {
  return (
    <>
      <div className="w-3/5 mx-auto my-10 flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl text-slate-800 font-bold">
            About Sustainify
          </h1>
          <p className="text-lg">
            Welcome to Sustainify, your platform for environmental advocacy,
            community action, and positive change. At Sustainify, we believe in
            the power of collective action to address pressing environmental
            issues, from climate change to cleanliness in our communities.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl text-slate-800 font-bold">Our Mission</h1>
          <p className="text-lg">
            Our mission at Sustainify is simple: to empower individuals and
            communities to make a difference in the world around them. We
            provide a space where users can come together to share ideas,
            inspire change, and take action for a more sustainable future.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl text-slate-800 font-bold">
            About the Developers
          </h1>
          <p className="text-lg">
            Hey there, I'm{" "}
            <NavLink
              to={"https://aneesh-dev.netlify.app"}
              target="_blank"
              className="text-green-500 font-semibold"
            >
              Aneesh
            </NavLink>
            , a web and app developer from India, coming from pretty humble
            beginnings. So, I've always been into web development, and one day,
            I thought, "Hey, wouldn't it be cool to have a place where folks can
            share their ideas about what's up with our environment and how we
            can make it better?" So, I rolled up my sleeves and spent some
            quality time crafting this web app. It was actually my personal
            project, but deep down, I hope it could grow into something big,
            like an official platform for spreading awareness about our
            environment. I'm all about using tech to do some good in the world.
            And if this little project can help spark some conversations and
            actions towards a greener, healthier planet, well, that's what it's
            all about, right?
          </p>
        </div>
        <br />
        <hr className="h-[2px] w-full bg-slate-400" />
        <div className="w-full flex items-center justify-center">
          <img src={Logo} alt="Not Found" className="w-1/3" />
        </div>
        <p className="text-center">© 2024 Sustainify. All rights reserved.</p>
      </div>
    </>
  );
}
