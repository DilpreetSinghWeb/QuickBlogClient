import React, {  useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import UserContext from "../context/UserContext/UserContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../toast/customToasts";

const SingleProductEdit = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

//   console.log(user?.name)
//   console.log(author);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        
        const response = await axios.get(
          `http://localhost:8000/product/singleproduct/${id}`
        );

        const product = response.data.product;

        setTitle(product.title);
        setAuthor(product.author );
        setCategory(product.category);
        setImageUrl(product.imageUrl);
        setDescription(product.description);
      } catch (err) {
        console.error("Error:", err.message);
        showErrorToast("An unexpected error occurred. Please try again.")
      }
    };
    fetchProduct();
  },[id]);



  const handleUpdate = async (e) => {
    try {
      e.preventDefault();
      const isConfirmed = window.confirm(
        "Are you sure you want to submit the product?"
      );
      if (!isConfirmed) {
        return;
      }
        if(user?.name === author){
            const token = localStorage.getItem("token");
            const response = await axios.put(
              `http://localhost:8000/product/update/${id}`,
              {
                title,
                author,
                category,
                imageUrl,
                description,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            console.log(response);

            showSuccessToast("Product Updated Successfully!");
            navigate("/");
        }
        else{
            showErrorToast("Only the published author can change this product details");
        }
     
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update the product.");
    }
  };
  return (
    <div>
      <Navbar />
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-8 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-1 text-gray-900">
              Edit Your Product
            </h1>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="title"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Title*
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    placeholder="Enter The Title!"
                    required
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="author"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Author(Default User)
                  </label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    value={author}
                    readOnly
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="category"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Category*
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={category}
                    placeholder="Category Of Product"
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    required
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="imageUrl"
                    className="leading-7 text-sm text-gray-600"
                  >
                    ImageUrl*
                  </label>
                  <input
                    type="text"
                    id="imageUrl"
                    name="imageUrl"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    placeholder="ImageUrl Here!"
                    required
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="description"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Description*
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-48 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    placeholder="Description Here!"
                  ></textarea>
                </div>
              </div>
              <div className="p-2 w-full">
                <button
                  type="submit"
                    onClick={handleUpdate}
                  className="flex mx-auto text-white bg-emerald-600 border-0 py-2 px-8 focus:outline-none hover:bg-emerald-700 rounded text-lg"
                >
                  Edit Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SingleProductEdit;
