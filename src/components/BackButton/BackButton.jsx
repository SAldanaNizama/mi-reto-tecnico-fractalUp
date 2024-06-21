// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useNavigate } from 'react-router-dom';

function BackButton() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <button
      onClick={handleGoBack}
      className="flex items-center px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
    >
      <svg
        className="w-4 h-4 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 19l-7-7 7-7"
        ></path>
      </svg>
      Back
    </button>
  );
}

export default BackButton;
