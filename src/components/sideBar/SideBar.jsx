// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '/logoplaneta.png';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative flex">
      <div className={`fixed top-0 left-0 h-screen bg-gray-800 text-white transition-transform duration-300 z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:w-64`}>
        <div className="flex items-center justify-between p-4 md:hidden">
          <Link to="/" className="flex items-center">
            <img src={Logo} alt="Logo" className="h-12 w-auto" />
          </Link>
          <button
            className="text-white focus:outline-none"
            onClick={toggleSidebar}
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
        <div className="hidden md:block p-4">
          <Link to="/" className="flex items-center justify-center">
            <img src={Logo} alt="Logo" className="h-16 w-auto" />
          </Link>
        </div>
        <ul>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/" className="w-full flex items-center justify-center">
              Countries Explorer
            </Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/Games" className="w-full flex items-center justify-center">
              Game
            </Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/about" className="w-full flex items-center justify-center">
              About
            </Link>
          </li>
        </ul>
      </div>
      <div className="md:hidden">
        <button
          className={`fixed top-4 left-4 text-white bg-gray-800 p-2 rounded-md focus:outline-none transition-opacity duration-300 z-50 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          onClick={toggleSidebar}
        >
          ☰
        </button>
      </div>
    </div>
  );
}


export default Sidebar;