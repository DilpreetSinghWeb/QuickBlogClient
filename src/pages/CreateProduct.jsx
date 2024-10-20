import React, { useContext, useEffect, useState } from "react";

import UserContext from "../context/UserContext/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../toast/customToasts";
import SpinnerBtn from "../components/SpinnerBtn";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { BASE_URL } from "../config";

const CreateProduct = () => {
  const { user } = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } 
    if (user && user.name) {
      setAuthor(user.name);
    }
  }, [user, navigate]);

  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const isConfirmed = window.confirm(
        "Are you sure you want to submit the Blog?"
      );
      if (!isConfirmed) {
        return;
      }
      setIsLoading(true);
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("title", title);
      formData.append("author", author);
      formData.append("category", category);
      formData.append("description", description);

      

      await axios.post(`${BASE_URL}/product/create`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/");
      showSuccessToast("Product Created Successfully");
    } catch (error) {
      showErrorToast(error.response.data.message);
    }
  };
  return (
    <div>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-8 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-1 text-gray-900">
              Display Your Own Blog
            </h1>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-wrap -m-2">
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
                      placeholder="Category Of Blog"
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
                      Image*
                    </label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      onChange={handleImageChange}
                      className="w-full  bg-opacity-50 rounded  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      accept="image/*"
                      required
                    />
                  </div>
                </div>

                {imagePreview && (
                  <div className="p-2 w-full">
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Selected Preview"
                        className="w-60 h-auto object-cover mt-2"
                      />
                    </div>
                  </div>
                )}

                <div className="p-2 w-full">
                  <div className="relative">
                    <label
                      htmlFor="description"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Description*
                    </label>
                    
                    <ReactQuill
                      theme="snow"
                      value={description}
                      onChange={setDescription}
                      className=" bg-opacity-50 rounded   focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-48 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out mb-10"
                      placeholder="Description Here!"
                      required
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <button
                    type="submit"
                    className="flex mx-auto text-white bg-emerald-600 border-0 py-2 px-8 focus:outline-none hover:bg-emerald-700 rounded text-lg"
                  >
                    {isLoading ? (
                      <>
                        <SpinnerBtn />
                        <span className="ml-2">Creating Blog...</span>
                      </>
                    ) : (
                      "Create Blog"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreateProduct;
