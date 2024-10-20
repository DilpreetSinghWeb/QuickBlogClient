import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import defaultImg from "../images/placeholder_pic.jpg";
import validationCriteria from "../validation/RegisterValidationArray";

import "react-toastify/dist/ReactToastify.css";
import { showErrorToast, showSuccessToast } from "../toast/customToasts";
import SpinnerBtn from "../components/SpinnerBtn";
import { BASE_URL } from "../config";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [photo, setPhoto] = useState(defaultImg);
  const [file, setFile] = useState(null);
  const [isStrong, setIsStrong] = useState({
    hasLength: false,
    hasUppercase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const validatePassword = (password) => {
    const hasLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    setIsStrong({
      hasLength,
      hasUppercase,
      hasNumber,
      hasSpecialChar,
    });
  };
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPhoto(imageUrl);
      setFile(file);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    try {
      if (name === "" || email === "" || password === "") {
        setIsLoading(false);
        showErrorToast("All fields are required!");
        return;
      }
      if (file === null) {
        setIsLoading(false);
        showErrorToast("Please select a photo!");
        return;
      }
      if (
        !isStrong.hasLength ||
        !isStrong.hasUppercase ||
        !isStrong.hasNumber ||
        !isStrong.hasSpecialChar
      ) {
        setIsLoading(false);
        showErrorToast("Password does not meet the strength criteria!");
        return;
      }


      setIsLoading(true);
      await axios.post(`${BASE_URL}/user/userotp`, {
        name,
        email,
        password,

      });

      showSuccessToast("OTP Send Successfully!");
      setIsOtpSent(true);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      showErrorToast(err.response.data.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post(`${BASE_URL}/user/verifyotp`, {
        email,
        otp,
      });

      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("photo", file);

      await axios.post(`${BASE_URL}/user/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/login");
      showSuccessToast("You've successfully registered. You can now log in!");
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      showErrorToast(err.response.data.message);
    }
  };

  return (
    <>
      <section className="text-gray-600 body-font relative  ">
        <div className="container lg:w-1/3 md:w-1/2 px-2 flex  mx-auto  sm:flex-nowrap flex-wrap py-8">
          <form
            onSubmit={handleSubmit}
            className="  flex flex-col   w-full  mt-8 md:mt-0 px-12 py-6 bg-small  border rounded-lg"
          >
            <h1 className="text-gray-800 text-4xl mb-4 font-medium title-font text-center tracking-wider">
              Register
            </h1>

            <div className="relative mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                id="name"
                name="name"
                placeholder="Enter Your Name"
                className="w-full bg-transparent rounded border border-gray-300 focus:border-slate-800  focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                autoComplete="name"
              />
            </div>
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
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                id="email"
                name="email"
                placeholder="Enter Your Email"
                autoComplete="email"
                required
                className="w-full bg-transparent rounded border border-gray-300 focus:border-slate-800 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="password"
                className="leading-7 text-sm text-gray-600"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validatePassword(e.target.value);
                  }}
                  autoComplete="current-password"
                  id="password"
                  name="password"
                  placeholder="Password!"
                  className=" w-full bg-transparent rounded border border-gray-300 focus:border-slate-800 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
                <button
                  type="button"
                  className="absolute  inset-y-0 top-5 right-2 flex items-center px-3 text-gray-500"
                  style={{ bottom: "3.6rem" }}
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

              <ul className="text-xs text-zinc-400 my-4">
                {validationCriteria.map(({ key, check, text }) => (
                  <li key={key} className="flex items-center text-sm my-2">
                    <span>
                      {check(isStrong) ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="15"
                          height="15"
                          viewBox="0 0 128 128"
                          className="fill-green-500"
                        >
                          <path d="M 64 6 C 32 6 6 32 6 64 C 6 96 32 122 64 122 C 96 122 122 96 122 64 C 122 32 96 6 64 6 z M 64 12 C 92.7 12 116 35.3 116 64 C 116 92.7 92.7 116 64 116 C 35.3 116 12 92.7 12 64 C 12 35.3 35.3 12 64 12 z M 85.037109 48.949219 C 84.274609 48.974219 83.500391 49.300391 82.900391 49.900391 L 62 71.599609 L 51.099609 59.900391 C 49.999609 58.700391 48.100391 58.599219 46.900391 59.699219 C 45.700391 60.799219 45.599219 62.700391 46.699219 63.900391 L 59.800781 78 C 60.400781 78.6 61.1 79 62 79 C 62.8 79 63.599219 78.699609 64.199219 78.099609 L 87.199219 54 C 88.299219 52.8 88.299609 50.900781 87.099609 49.800781 C 86.549609 49.200781 85.799609 48.924219 85.037109 48.949219 z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="15"
                          height="15"
                          viewBox="0 0 50 50"
                          className="fill-zinc-400"
                        >
                          <path d="M 25 2 C 12.309534 2 2 12.309534 2 25 C 2 37.690466 12.309534 48 25 48 C 37.690466 48 48 37.690466 48 25 C 48 12.309534 37.690466 2 25 2 z M 25 4 C 36.609534 4 46 13.390466 46 25 C 46 36.609534 36.609534 46 25 46 C 13.390466 46 4 36.609534 4 25 C 4 13.390466 13.390466 4 25 4 z M 32.990234 15.986328 A 1.0001 1.0001 0 0 0 32.292969 16.292969 L 25 23.585938 L 17.707031 16.292969 A 1.0001 1.0001 0 0 0 16.990234 15.990234 A 1.0001 1.0001 0 0 0 16.292969 17.707031 L 23.585938 25 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 25 26.414062 L 32.292969 33.707031 A 1.0001 1.0001 0 1 0 33.707031 32.292969 L 26.414062 25 L 33.707031 17.707031 A 1.0001 1.0001 0 0 0 32.990234 15.986328 z" />
                        </svg>
                      )}
                    </span>
                    <span
                      className={
                        check(isStrong) ? "text-green-500 ml-2" : "ml-2"
                      }
                    >
                      {text}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex gap-4 items-center">
                <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-emerald-600 flex items-center justify-center overflow-hidden">
                  <img src={photo} alt="user" accept=".jpg,.png" />
                </figure>

                <div className="relative w-[130px] h-[50px] ">
                  <input className="hidden" type="file" accept="image/png, image/jpeg, image/jpg, image/gif" name="photo" id="customFile" onChange={handlePhotoChange} required />
                  <label className="absolute top-0 left-0 w-full h-full items-center px-3 py-3 overflow-hidden bg-gray-300 tracking-wide font-semibold rounded cursor-pointer" htmlFor="customFile">Upload Photo</label>
                </div>
              </div>
            </div>

            {!isOtpSent ? (
              <div className="flex items-center justify-center">
                <button
                  onClick={handleOtpSubmit}
                  className="text-white bg-emerald-600 border-0 py-2 px-6 focus:outline-none hover:bg-emerald-700 rounded text-md   "
                >
                  {isLoading ? (
                    <div className="flex gap-3">
                      <span> Getting an Otp... </span>
                      <SpinnerBtn />
                    </div>
                  ) : (
                    "Get an Otp"
                  )}
                </button>
              </div>
            ) : (
              <>
                <div className="relative mb-4">
                  <label
                    htmlFor="otp"
                    className="leading-7 text-sm text-gray-600"
                  >
                    OTP !
                  </label>
                  <div className="flex gap-4">
                    <input
                      type="tel"
                      value={otp}
                      onChange={(e) => {
                        if (
                          /^\d*$/.test(e.target.value) &&
                          e.target.value.length <= 6
                        ) {
                          setOtp(e.target.value);
                        }
                      }}
                      id="otp"
                      name="otp"
                      placeholder="Enter Your OTP!"
                      className="w-full bg-transparent rounded border border-gray-300 focus:border-slate-800  focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      autoComplete="name"
                      maxLength={6}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="text-white bg-emerald-600 border-0 py-2 px-6 focus:outline-none hover:bg-emerald-700 rounded text-lg w-1/2"
                  >
                    {isLoading ? (
                      <SpinnerBtn text="Registering..." />
                    ) : (
                      "Register"
                    )}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
