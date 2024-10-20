import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import UserContext from "../context/UserContext/UserContext";
import { FaUser } from 'react-icons/fa';

import logo from "./../images/logo.png";
import { showErrorToast, showSuccessToast } from "../toast/customToasts";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
    <header className="bg-gray-100 shadow-md fixed z-50 w-full">
      <div className="container mx-auto px-5 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="QuickBuy"
            className="w-12 h-12 object-cover rounded-full"
          />
          <span className="ml-3 text-md md:text-xl font-medium text-gray-800">QuickBlog</span>
        </Link>

        {/* Menu for large screens */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="hover:text-gray-900">Home</Link>
          <a href="#products" className="hover:text-gray-900">Blogs</a>
          {user && (
            <Link to="/product/create" className="hover:text-gray-900">
              Create Blog
            </Link>
          )}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {!user ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 bg-emerald-600 text-white rounded transition-transform transform hover:scale-105 hover:shadow-lg"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-emerald-600 text-white rounded transition-transform transform hover:scale-105 hover:shadow-lg"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <h1 className="mr-3 font-medium text-md  text-gray-800">
                Welcome, {user.name}
              </h1>
              <button
                onClick={makeLogout}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-600 hover:text-white transition"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile menu button with user name on the left */}
        <div className="mobile_view flex">
          {user && (
            <h1 className="mr-3 font-medium text-sm  sm:text-md text-gray-800 flex items-center justify-center gap-3" >
             <FaUser size={15} />  {user.name}
            </h1>
          )}
          <button
            onClick={toggleMenu}
            className="text-gray-800 text-2xl focus:outline-none z-30"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <nav
        className={`fixed top-0 right-0 h-full w-full bg-gray-100 z-10 flex flex-col items-center justify-center transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <ul className="flex flex-col items-center space-y-4">
          <Link
            to="/"
            className="text-lg  hover:text-gray-900"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <a
            href="#products"
            className="text-lg  hover:text-gray-900"
            onClick={toggleMenu}
          >
            Blogs
          </a>
          {user && (
            <Link
              to="/product/create"
              className="text-lg  hover:text-gray-900"
              onClick={toggleMenu}
            >
              Create Blog
            </Link>
          )}
          {!user ? (
            <>
              <Link
                to="/login"
                className="px-4  bg-green-500 text-white rounded transition-transform transform hover:scale-105 hover:shadow-lg"
                onClick={toggleMenu}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 bg-green-500 text-white rounded transition-transform transform hover:scale-105 hover:shadow-lg"
                onClick={toggleMenu}
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={(e) => {
                toggleMenu();
                makeLogout(e);
              }}
              className="px-4 py-0 bg-gray-300 text-gray-800 rounded hover:bg-gray-600 hover:text-white transition"
            >
              Logout
            </button>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;