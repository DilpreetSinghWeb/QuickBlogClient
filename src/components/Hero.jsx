import React from "react";
import "./../styles/tailwind.css";

const Hero = () => {
  return (
    <div className="hero |  h-full  py-[180px] sm:py-[180px] md:py-[230px] lg:py-[300px] text-white">
      <div className="flex items-center justify-center flex-col  gap-8 ">
        <h1 className="text-xl text-center sm:text-3xl tracking-wider text-white">
          Write Your Own Blog Efficiently
        </h1>
        <button className="text-white bg-emerald-600 border-0 py-2 px-6 focus:outline-none hover:bg-emerald-700 rounded text-md w-52 md:text-lg" >
         <a href="#products">
         View Blogs </a> 
        </button>
      </div>
    </div>
  );
};

export default Hero;
