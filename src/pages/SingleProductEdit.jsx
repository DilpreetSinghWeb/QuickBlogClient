import React, { useContext, useEffect, useState } from "react";

import UserContext from "../context/UserContext/UserContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../toast/customToasts";
import Spinner from "../components/SpinnerBtn";
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';
import { BASE_URL } from "../config";

const SingleProductEdit = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [originalFilename, setOriginalFilename] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/product/singleproduct/${id}`
        );

        const product = response.data.product;

        setTitle(product.title);
        setAuthor(product.author);
        setCategory(product.category);
        setDescription(product.description);

        setImageFile(product.image);
        setOriginalFilename(product.image.originalFilename);
        setImagePreview(product.image.url);
      } catch (err) {
        console.error("Error:", err.message);
        showErrorToast("An unexpected error occurred. Please try again.");
      }
    };
    fetchProduct();
  }, [user,navigate,id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    setImageFile(file);
    setOriginalFilename(file ? file.name : "No file");

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      
      setImagePreview(previewUrl);
    } else {
      setImagePreview(null);
    }
  };

  const handleUpdate = async (e) => {
    try {
      e.preventDefault();
      const isConfirmed = window.confirm(
        "Are you sure you want to submit the Blog?"
      );
      if (!isConfirmed) {
        return;
      }
      setIsLoading(true);
      if (user?.name === author) {
        const token = localStorage.getItem("token");

        const formData = new FormData();
        formData.append("title", title);
        formData.append("author", author);
        formData.append("category", category);
        formData.append("description", description);
        formData.append("image", imageFile);

        await axios.put(
          `${BASE_URL}/product/update/${id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        showSuccessToast("Blog Updated Successfully!");
        navigate("/");
      } else {
        showErrorToast(
          "Only the published author can change this blog details"
        );
        setIsLoading(false);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update the Blog.");
    }
  };

  return (
    <div>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-8 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-1 text-gray-900">
              Edit Your Blog
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
                    placeholder="Category Of Blog"
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    required
                  />
                </div>
              </div>
              <div className="p-2 w-full ">
                <div className="relative">
                  <label
                    htmlFor="image"
                    className=" leading-7 text-sm text-gray-600"
                  >
                    Image*
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleImageChange}
                    className=" hidden"
                    placeholder="Upload Image Here!"
                  />
                  <label
                    className="w-full bg-gray-100  rounded text-base outline-none text-gray-700 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out cursor-pointer ml-4 "
                    htmlFor="image"
                  >
                    {originalFilename ? originalFilename : "Previous File 👇🏻"}
                  </label>

                  {imagePreview && (
                    <div className="mt-4">
                      <img
                        className="w-60 h-auto rounded"
                        src={imagePreview}
                        alt={`Preview of selected file: ${originalFilename}`}
                      />
                    </div>
                  )}
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
                  onClick={handleUpdate}
                  className="flex mx-auto text-white bg-emerald-600 border-0 py-2 px-8 focus:outline-none hover:bg-emerald-700 rounded text-lg"
                >
                  {isLoading ? (
                    <>
                      <Spinner /> {/* Render your spinner component */}
                      <span className="ml-2">Editing Blog...</span>
                    </>
                  ) : (
                    "Edit Blog"
                  )}
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
