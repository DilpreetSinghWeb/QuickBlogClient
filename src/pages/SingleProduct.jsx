import React, { useContext, useEffect, useState } from "react";

import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import UserContext from "../context/UserContext/UserContext";
import { showErrorToast, showSuccessToast } from "../toast/customToasts";
import SpinnerBtn from "../components/SpinnerBtn";
import { formatDate } from "../utils/formatDate";
import Review from "../components/Review";
import { BASE_URL } from "../config";
import { TailSpin } from 'react-loader-spinner';

const SingleProduct = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);



  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL}/product/singleproduct/${id}`
        );

        setProduct({ ...response.data.product });
      } catch (err) {
        showErrorToast("An unexpected error occurred. Please try again.");
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDelete = async (e) => {
    if (!user) {
      navigate("/login");
    }
    e.preventDefault();
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!isConfirmed) {
      return;
    }
    try {
      setIsLoading(true);
      let token = localStorage.getItem("token");
      await axios.delete(`${BASE_URL}/product/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      showSuccessToast("Your product has been deleted successfully.");
      navigate("/");
    } catch (error) {
      showErrorToast("Product Not Found!");
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-6 mx-auto flex flex-col">
          <div className="lg:w-full mx-auto lg:px-10">
            {isLoading ? (
              <div className="mt-20 flex justify-center items-center">
                <TailSpin
        height="80"
        width="80"
        color="#10B981" // Change color as per your design
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        visible={true}
      />
              </div>
            ):(
              <>
              <div className="rounded-lg h:72 lg:h-80 overflow-hidden">
              <img
                alt={product.title}
                className="object-cover object-center h-full w-full"
                src={product.image?.url}
              />
            </div>
            <div className="flex flex-col lg:flex-row mt-5">
              <div className="lg:w-1/3 text-center sm:pr-8 sm:py-8">
                <div className="flex flex-col items-center text-center justify-center">
                  <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">
                    Author - {product.author}
                  </h2>
                  <div className="w-12 h-1 bg-emerald-700 rounded mt-2 mb-4"></div>
                  <p className="text-base">{product.title}</p>
                  {user?.name === product.author ? (
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      <Link
                        to={`/product/singleproduct/edit/${product._id}`}
                        target="_blank"
                        className="text-white bg-emerald-600 border-0 py-2 px-6 focus:outline-none hover:bg-emerald-700 rounded text-md mt-4 flex items-center gap-3 uppercase tracking-widest font-medium"
                      >
                        Edit
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            id="edit"
                            width="18"
                            height="18"
                            fill="white"
                          >
                            <path d="M3.5,24h15A3.51,3.51,0,0,0,22,20.487V12.95a1,1,0,0,0-2,0v7.537A1.508,1.508,0,0,1,18.5,22H3.5A1.508,1.508,0,0,1,2,20.487V5.513A1.508,1.508,0,0,1,3.5,4H11a1,1,0,0,0,0-2H3.5A3.51,3.51,0,0,0,0,5.513V20.487A3.51,3.51,0,0,0,3.5,24Z"></path>
                            <path d="M9.455,10.544l-.789,3.614a1,1,0,0,0,.271.921,1.038,1.038,0,0,0,.92.269l3.606-.791a1,1,0,0,0,.494-.271l9.114-9.114a3,3,0,0,0,0-4.243,3.07,3.07,0,0,0-4.242,0l-9.1,9.123A1,1,0,0,0,9.455,10.544Zm10.788-8.2a1.022,1.022,0,0,1,1.414,0,1.009,1.009,0,0,1,0,1.413l-.707.707L19.536,3.05Zm-8.9,8.914,6.774-6.791,1.4,1.407-6.777,6.793-1.795.394Z"></path>
                          </svg>
                        </span>
                      </Link>
                      <Link
                        onClick={handleDelete}
                        className="text-white bg-red-300 border-0 py-2 px-6 focus:outline-none hover:bg-red-400 rounded text-md mt-4 flex items-center gap-2 uppercase tracking-widest font-medium"
                      >
                        {isLoading ? (
                          <>
                            <SpinnerBtn />
                            <span className="ml-2">Deleting...</span>
                          </>
                        ) : (
                          <>
                            delete
                            <span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                                fill="white"
                                width="22"
                                height="22"
                              >
                                <path d="M24.2,12.193,23.8,24.3a3.988,3.988,0,0,1-4,3.857H12.2a3.988,3.988,0,0,1-4-3.853L7.8,12.193a1,1,0,0,1,2-.066l.4,12.11a2,2,0,0,0,2,1.923h7.6a2,2,0,0,0,2-1.927l.4-12.106a1,1,0,0,1,2,.066Zm1.323-4.029a1,1,0,0,1-1,1H7.478a1,1,0,0,1,0-2h3.1a1.276,1.276,0,0,0,1.273-1.148,2.991,2.991,0,0,1,2.984-2.694h2.33a2.991,2.991,0,0,1,2.984,2.694,1.276,1.276,0,0,0,1.273,1.148h3.1A1,1,0,0,1,25.522,8.164Zm-11.936-1h4.828a3.3,3.3,0,0,1-.255-.944,1,1,0,0,0-.994-.9h-2.33a1,1,0,0,0-.994.9A3.3,3.3,0,0,1,13.586,7.164Zm1.007,15.151V13.8a1,1,0,0,0-2,0v8.519a1,1,0,0,0,2,0Zm4.814,0V13.8a1,1,0,0,0-2,0v8.519a1,1,0,0,0,2,0Z" />
                              </svg>
                            </span>
                          </>
                        )}
                      </Link>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="lg:w-2/3 lg:pl-8 lg:py-8 lg:border-l border-gray-200 lg:border-t-0 border-t mt-4 pt-4 lg:mt-0 text-center lg:text-left">
                <p className="text-sm  text-left tracking-wider capitalize">
                  Category: <b>{product.category}</b>
                </p>
                <p
                  className="leading-relaxed tracking-wide my-4 text-md text-left "
                  dangerouslySetInnerHTML={{ __html: product.description }}
                ></p>
                <div className="flex items-center justify-between flex-wrap  ">
                  <p className="text-xs tracking-wider text-right flex gap-2">
                    Created At:
                    <b>{formatDate(product.createdAt)}</b>
                  </p>
                </div>

                <Review />

                <Link
                  to="/"
                  className="text-emerald-700 inline-flex items-center mt-4"
                >
                  Back To Home
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </div>
              </>
            )}
            
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleProduct;
