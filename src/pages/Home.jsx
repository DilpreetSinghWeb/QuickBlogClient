import React from "react";
import Hero from "../components/Hero";
import Products from "../components/Products";
import Footer from "../components/Footer";
import Steps from "../components/Steps";

const Home = () => {
  return (
    <div>
      <Hero />
      <Products />
      <Steps />
      <Footer />
    </div>
  );
};

export default Home;
