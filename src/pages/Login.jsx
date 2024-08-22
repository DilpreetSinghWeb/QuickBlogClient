import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext/UserContext";
import { showErrorToast, showSuccessToast } from "../toast/customToasts";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/user/login", { email, password })
      .then((res) => {
        setUser(res.data.user);
        localStorage.setItem("token", res.data.token);
        navigate("/");
        showSuccessToast("login successful");
      })
      .catch((err) => {
        showErrorToast(err.response.data.message);
      });
  };

  return (
    <>
      <Navbar />
      <section className="text-gray-600 body-font relative  ">
        <div className="container lg:w-1/3 md:w-1/2 px-5 flex  mx-auto  sm:flex-nowrap flex-wrap py-8">
          <form
            onSubmit={handleSubmit}
            className=" p-12  border rounded-lg  flex flex-col  w-full  mt-8 md:mt-0"
          >
            <h1 className="text-gray-800 text-4xl mb-4 font-medium title-font text-center tracking-wider">
              Login
            </h1>
            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                autoComplete="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                id="email"
                name="email"
                placeholder="Email!"
                className="w-full bg-transparent rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                required
              />
            </div>
            <div className="relative mb-2">
              <label
                htmlFor="password"
                className="leading-7 text-sm text-gray-600"
              >
                Password
              </label>
              <input
                type={isPasswordVisible ? "text" : "password"}
                value={password}
                autoComplete="current-password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                id="password"
                name="password"
                placeholder="Password!"
                className="w-full bg-transparent rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                required
              />
              <button
                type="button"
                className="absolute top-7 inset-y-0 right-0 flex items-center px-3 text-gray-500"
                onClick={togglePasswordVisibility}
              >
                {isPasswordVisible ? (
                  // Eye open icon (Password visible)
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.158.518-.333 1.023-.542 1.5m-3.92 4.5a9.955 9.955 0 01-5.08 0m-3.92-4.5A9.955 9.955 0 014.042 7.5m15.916 0a9.955 9.955 0 00-5.08 0"
                    />
                  </svg>
                ) : (
                  // Eye closed icon (Password hidden)
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13.875 18.825A10.003 10.003 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.971 9.971 0 011.357-2.568m2.36-2.355A9.961 9.961 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.97 9.97 0 01-2.458 3.992m-2.36 2.355A9.961 9.961 0 0112 19c-1.204 0-2.364-.22-3.453-.629m-1.104-1.874a10.041 10.041 0 01-1.978-2.011m-.604-.989A10.003 10.003 0 013 12c.273-.518.575-1.01.905-1.474m3.738-4.738L5.46 5.46"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3l18 18"
                    />
                  </svg>
                )}
              </button>
            </div>
            <Link
              to="/updatepassword"
              className="text-right mb-2 text-xs cursor-pointer "
            >
              Forget password?
            </Link>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="text-white bg-emerald-600 border-0 py-2 px-6 focus:outline-none hover:bg-emerald-700 rounded text-lg w-1/2 "
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
