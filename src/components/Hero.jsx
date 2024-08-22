import React from "react";
import "./../styles/tailwind.css";

const Hero = () => {
  return (
    <div className="hero |  h-full px-4 py-[120px] sm:py-[140px] md:py-[180px] lg:py-[246px] text-white">
      <div className="flex items-center justify-center flex-col  gap-8 ">
        <h1 className="text-xl text-center sm:text-3xl tracking-wider ">
          Your One-Stop Online Shop – QuikBuy{" "}
        </h1>
        <button className="text-white bg-emerald-600 border-0 py-2 px-6 focus:outline-none hover:bg-emerald-700 rounded text-md w-52 md:text-lg">
          Explore Collections
        </button>
      </div>
    </div>
  );
};

export default Hero;
