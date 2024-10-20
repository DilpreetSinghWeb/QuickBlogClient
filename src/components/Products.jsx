import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { stripHtml } from "../utils/stripHtml";
import { formatDate } from "../utils/formatDate";
import { BASE_URL } from "../config";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); 
  const [currentPage, setCurrentPage] = useState(1); // current page
  const itemsPerPage = 3; // Number of items per page

  useEffect(() => {
    axios
      .get(`${BASE_URL}/product`)
      .then((res) => {
        setProducts(res.data.products);
        const uniqueCategories = [
          ...new Set(res.data.products.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
      })
      .catch((err) => {
        console.error(err);
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

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  // Sort products by createdAt date (or any other criterion you want)
  const sortedProducts = filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Calculate pagination
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Pagination button click handler
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section id="products" className="text-gray-600 body-font pt-16">
      <div className="container px-5 py-6 mx-auto">
        <div className="text-center">
          <h1 className="inline-block text-white text-xl lg:text-2xl mb-6 px-6 py-4 bg-emerald-500 uppercase tracking-widest font-bold text-center rounded-md">
            Blogs
          </h1>
        </div>

        {/* Category Select Dropdown */}
        <div className="mb-6">
          <select
            className="border rounded-md py-2 px-4 text-gray-600 capitalize cursor-pointer"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap -m-4 p-2">
          {currentProducts.map((product) => (
            <div key={product._id} className="w-full p-4 md:w-1/2 lg:w-1/3">
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <div className="h-40 lg:h-56 md:h-36">
                  <img
                    className="h-full w-full object-cover object-center"
                    src={product.image?.url}
                    alt={product.title}
                  />
                </div>
                <div className="px-6 py-3">
                  <div className="flex items-center justify-between py-3">
                    <p className="font-medium text-gray-500 text-xs tracking-widest">
                      By {product.author}
                    </p>
                    <h2 className="text-xs font-normal underline text-gray-400 tracking-wider">
                      {product.category}
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
                    {stripHtml(product.description)}
                  </p>
                  <div className="flex items-center justify-between flex-wrap">
                    <Link
                      to={`/product/singleproduct/${product._id}`}
                      className="text-emerald-700 hover:text-emerald-800 inline-flex items-center"
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
                      {formatDate(product.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-6">
          <nav aria-label="Page navigation">
            <ul className="inline-flex items-center space-x-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index} className="list-none mx-1">
                  <button
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-4 flex gap-4 py-2 text-sm font-semibold transition duration-300 ease-in-out ${
                      currentPage === index + 1
                        ? "bg-emerald-500 text-white shadow-lg"
                        : "bg-white text-gray-600 hover:bg-gray-100"
                    } border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-400`}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default Products;
