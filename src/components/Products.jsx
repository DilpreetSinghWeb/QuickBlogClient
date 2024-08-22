import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/product")
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const titleClamp = {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const descriptionClamp = {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 3,
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section id="products" className="text-gray-600 body-font ">
      <div className="container px-5 py-6 mx-auto">
        <div className="text-center">
          <h1 className="inline-block text-white text-xl lg:text-2xl mb-6 px-6 py-4 bg-emerald-500 uppercase tracking-widest font-bold  text-center  rounded-md">
            Products
          </h1>
        </div>
        <div className="flex flex-wrap -m-4">
          {products.map((product) => (
            <div key={product._id} className="p-4 md:w-1/2 lg:w-1/3">
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <img
                  className="lg:h-52 md:h-36 w-full object-cover object-center"
                  src={product.imageUrl}
                  alt={product.title}
                />
                <div className="p-6">
                  <div className="flex items-center justify-between pb-3">
                    <p className="font-medium text-gray-500 text-sm tracking-widest">
                      By {product.author}
                    </p>
                    <h2 className=" text-xs title-font  text-gray-400 mb-1 tracking-wider">
                      Category - {product.category}
                    </h2>
                  </div>
                  <h1
                    className="title-font text-lg font-medium text-gray-900 mb-3"
                    style={titleClamp}
                  >
                    {product.title}
                  </h1>
                  <p
                    className="font-sm leading-relaxed mb-3"
                    style={descriptionClamp}
                  >
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between flex-wrap">
                    <Link to={`/product/singleproduct/${product._id}`}
                      className="text-emerald-700 hover:text-emerald-800 inline-flex items-center "
                      href="#learn-more"
                    >
                      Read More
                      <svg
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                    <p className="text-gray-500 text-xs">
                      {" "}
                      {formatDate(product.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
