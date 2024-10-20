import React, { useContext, useEffect } from "react";
import {  Route, Routes } from "react-router-dom";
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
import "./index.css"
import { BASE_URL } from "./config";


const App = () => {
  const {setUser} = useContext(UserContext);

  useEffect(()=>{
    let token = localStorage.getItem('token');
    if(token){
      axios
      .get(`${BASE_URL}/user/verify`, {headers:{Authorization: `Bearer ${token}`}})
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }
    
  },[setUser])

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home  />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/updatepassword" element={<NewPassword />} />

        {/* Create product */}
        <Route path="/product/create" element={<CreateProduct />} />

        
        <Route path="/product/singleproduct/edit/:id" element={<SingleProductEdit />} />


        <Route path="/product/singleproduct/:id" element={<SingleProduct />} />

        
      </Routes>
    </div>
  );
};

export default App;
