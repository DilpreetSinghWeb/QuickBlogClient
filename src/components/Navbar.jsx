import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext/UserContext";

import logo from "./../images/logo.png";
import { showErrorToast, showSuccessToast } from "../toast/customToasts";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

  const makeLogout = (e) => {
    try {
      e.preventDefault();
      const isConfirmed = window.confirm(
        "Are you sure you want to log out from QuikBuy?"
      );
      if (!isConfirmed) {
        return;
      }
      setUser(null);
      localStorage.removeItem("token");
      showSuccessToast("Logged out successfully");
    } catch (error) {
      showErrorToast("An error occurred while logging out. Please try again.");
    }
  };

  return (
    <div>
      <header className="body-font bg-gray-100">
        <div className="container mx-auto flex flex-wrap px-5 py-6 flex-col md:flex-row items-center">
          <Link
            to="/"
            className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0 cursor-pointer"
          >
            <img
              className="w-11 h-11 object-cover  rounded-full"
              src={logo}
              alt="QuikBuy"
            />
            <span className="ml-3 text-xl">QuikBuy</span>
          </Link>
          <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
            <Link to="/" className="mr-5 hover:text-gray-900 cursor-pointer">
              Home
            </Link>
            <a
              href="#products"
              className="mr-5 hover:text-gray-900 cursor-pointer"
            >
              Products
            </a>
            {user && (
              <Link
                to="/product/create"
                className="mr-5 hover:text-gray-900 cursor-pointer"
              >
                Create Product
              </Link>
            )}
          </nav>
          <div className="lg:w-2/5  lg:justify-end ml-5 lg:ml-0 gap-4 selection flex items-center justify-center ">
            <div className="flex items-center justify-center">
              {!user ? (
                <>
                  <div className="flex gap-4 items-center justify-center ">
                    <Link
                      to="/login"
                      className="flex  items-center bg-gray-300 border-0 py-1 pr-3 pl-3 focus:outline-none hover:bg-gray-600 hover:text-white rounded text-base mt-4 md:mt-0 transition ease-in-out delay-100 tracking-wide "
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="inline-flex items-center bg-gray-300 border-0 py-1 px-3  hover:text-white hover:bg-gray-600 rounded text-base mt-4 md:mt-0 cursor-pointer   tracking-wide focus:outline-none"
                    >
                      Register
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4 ml-1"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <h1 className="mr-3 font-medium text-xl text-gray-800 ">
                    Welcome, {user.name}
                  </h1>
                  <button
                    onClick={makeLogout}
                    className="inline-flex items-center bg-gray-300 border-0 py-1 px-3 focus:outline-none hover:bg-gray-600 hover:text-white rounded text-base mt-4 md:mt-0 transition ease-in-out delay-100 tracking-wide"
                  >
                    Logout
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 ml-1"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
