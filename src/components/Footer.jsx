import React from 'react';
import {FaLinkedinIn, FaGithub, FaEnvelope } from 'react-icons/fa'; 
import logo from "./../images/logo.png";
import { Link } from 'react-router-dom';

const Footer = () => {
  let iconSize = 20
  const socialIcons = [
    { id: 1, icon: <FaGithub size={iconSize} />, link: 'https://github.com/DilpreetSinghWeb', target: '_blank' },

    { id: 2, icon: <FaLinkedinIn size={iconSize} />, link: 'www.linkedin.com/in/dilpreet-singh65', target: '_blank' },
    { id: 3, icon: <FaEnvelope size={iconSize} />, link: 'mailto:dilpreetweb65@gmail.com' },
  ];
  const phoneNumber = "9877320263";
  const formattedPhoneNumber = "+91-" + phoneNumber;

  return (
    <footer className="bg-gray-100 text-gray-600 body-font px-5 border-t-2 border-gray-200 rounded-tl-3xl rounded-tr-3xl mt-10">
      <div className="container px-5 py-8 mx-auto flex flex-col md:flex-row items-center">
        <a href='/' className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900 mb-4 md:mb-0">
          <img
            className="w-11 h-11 object-cover rounded-full"
            src={logo}
            alt="QuickBlog"
          />
          <span className="ml-3 text-xl ">QuickBlog</span>
        </a>

        <span className="inline-flex sm:ml-auto mt-4 justify-center items-center sm:justify-start space-x-3">
          {socialIcons.map(({ id, icon, link, target }) => (
            <a target={target} key={id} href={link} className="text-gray-500 hover:text-gray-800 transition duration-200">
              {icon}
            </a>
          ))}
          <p className="ml-4 text-gray-500 underline">
            <a href={`tel:${phoneNumber}`} className="hover:text-gray-800 transition duration-200">
              {formattedPhoneNumber}
            </a>
          </p>
        </span>
      </div>
      <div className="text-center py-4 border-t border-gray-200">
        <p className="text-sm text-gray-500">© {new Date().getFullYear()} QuickBlog- <Link to={"https://dilpreetsinghportfolio.onrender.com"}>
          <b> Dilpreet Singh.</b> </Link> All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
