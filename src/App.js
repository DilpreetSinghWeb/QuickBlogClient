import React, { useContext, useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom"; // Import Navigate for redirection
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axios from "axios";
import UserContext from "./context/UserContext/UserContext";
import NewPassword from "./pages/newPassword";
import CreateProduct from "./pages/CreateProduct";
import SingleProduct from "./pages/SingleProduct";
import SingleProductEdit from "./pages/SingleProductEdit";
import Navbar from "./components/Navbar";
import "./index.css";
import { BASE_URL } from "./config";
import { ThreeDots } from "react-loader-spinner";

const App = () => {
  const { setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setIsLoading(true);
      axios
        .get(`${BASE_URL}/user/verify`, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          setUser(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [setUser]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ThreeDots type="ThreeDots" color="#10B981" height={80} width={80} />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/updatepassword" element={<NewPassword />} />
        <Route path="/product/create" element={<CreateProduct />} />
        <Route path="/product/singleproduct/edit/:id" element={<SingleProductEdit />} />
        <Route path="/product/singleproduct/:id" element={<SingleProduct />} />
        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
