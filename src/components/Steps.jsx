import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaEdit, FaPenSquare, FaTrash } from 'react-icons/fa';
import LoginImg from "../images/Login.png";
import CreateImg from "../images/Create.png";
import EditImg from "../images/Edit.png";
import DeleteImg from "../images/Delete.png";

const Steps = () => {
  const [selectedStep, setSelectedStep] = useState(0); // 0 for Sign Up, 1 for Create Blog Post, etc.

  const stepsContent = [
    {
      title: "Sign Up / Login",
      description: "Create an account or log in to access your dashboard.",
      icon: <FaUser className="w-5 h-5 mr-3" />,
      image: LoginImg
    },
    {
      title: "Create Blog",
      description: "Share your thoughts and ideas by creating a new blog post.",
      icon: <FaPenSquare className="w-5 h-5 mr-3" />,
      image: CreateImg,
    },
    {
      title: "Edit or Update Posts",
      description: "Make changes to your existing posts to keep your content fresh.",
      icon: <FaEdit className="w-5 h-5 mr-3" />,
      image:EditImg,
    },
    {
      title: "Delete a Blog Post",
      description: "Remove posts that you no longer want to keep on your blog.",
      icon: <FaTrash className="w-5 h-5 mr-3" />,
      image: DeleteImg,
    },
  ];
  

  const handleStepClick = (index) => {
    setSelectedStep(index);
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 mx-auto flex flex-wrap flex-col">
      <div className="text-center">
          <h1 className="inline-block text-white text-md lg:text-2xl mb-[40px] px-6 py-4 bg-emerald-500 uppercase tracking-widest font-bold  text-center  rounded-md">
          Begin Your Blogging Adventure
          </h1>
        </div>
        <div className="flex mx-auto flex-wrap mb-16">
          {stepsContent.map((step, index) => (
            <Link 
              to='/'
              key={index}
              onClick={() => handleStepClick(index)}
              className={`sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none text-sm md:text-md
                ${selectedStep === index ? "bg-gray-100 border-green-500 text-green-500" : "border-gray-200 hover:text-gray-900"} tracking-wider`}
            >
              {step.icon}
              {step.title}
            </Link>
          ))}
        </div>
        <div className="flex flex-col text-center w-full">
          {/* Render the image above the h1 */}
          <img 
            className="m-auto w-full h-full md:w-[500px] md:h-[300px] mb-6 object-cover object-center rounded" 
            alt={stepsContent[selectedStep].title} 
            src={stepsContent[selectedStep].image} 
          />
          <h1 className="text-xl font-medium title-font mb-4 text-gray-900">{stepsContent[selectedStep].title}</h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">{stepsContent[selectedStep].description}</p>
        </div>
      </div>
    </section>
  );
  
};

export default Steps;
