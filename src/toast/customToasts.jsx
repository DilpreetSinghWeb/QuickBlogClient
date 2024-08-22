// src/toast/customToasts.js
import { Flip, toast } from 'react-toastify';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';


export const showSuccessToast = (message) => {
  toast.success(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    progressStyle: { background: "#047857" },
    transition: Flip,
    icon: <FaCheckCircle style={{ color: "#047857" }} />,
  });
};


export const showErrorToast = (message) => {
  toast.error(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    progressStyle: { background: "#dc2626" },
    transition: Flip,
    icon: <FaExclamationCircle style={{ color: "#dc2626" }} />,
  });
};
