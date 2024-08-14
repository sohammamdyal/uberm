import React, { useState } from 'react';
import { FaUser, FaCar, FaRoad, FaTachometerAlt, FaDatabase, FaMapMarkedAlt } from 'react-icons/fa';
import { RiContactsFill } from "react-icons/ri";
import { BiSolidPurchaseTagAlt } from "react-icons/bi";
import { IoDocumentAttach } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Logout from './Logout';

const Sidebar = ({ setSelectedPage }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div 
      className={`sidebar bg-gray-800 text-white font-medium min-h-screen p-4 rounded-tr-2xl rounded-br-2xl shadow-lg transition-all duration-300 ease-in-out ${isExpanded ? 'w-56' : 'w-16'}`}
    >
      <div className="flex justify-between items-center mb-6">
        {isExpanded && (
          <h2 className="text-xl font-extrabold text-center text-white">
            <CgProfile className="inline-block mr-2 text-3xl" />
            Admin Panel
          </h2>
        )}
        <button onClick={toggleSidebar} className="focus:outline-none">
          {isExpanded ? <ChevronLeft className="text-white" size={24} /> : <ChevronRight className="text-white" size={24} />}
        </button>
      </div>
      <nav>
        <button 
          className={`flex items-center py-2 px-3 rounded-lg transition-all duration-300 w-full text-left hover:bg-white hover:text-black focus:bg-white focus:text-black focus:outline-none mb-1 text-base ${!isExpanded && 'justify-center'}`}
          onClick={() => setSelectedPage('dashboard')}
        >
          <FaTachometerAlt className="text-lg" />
          {isExpanded && <span className="ml-2">Dashboard</span>}
        </button>
        <button 
          className={`flex items-center py-2 px-3 rounded-lg transition-all duration-300 w-full text-left hover:bg-white hover:text-black focus:bg-white focus:text-black focus:outline-none mb-1 text-base ${!isExpanded && 'justify-center'}`}
          onClick={() => setSelectedPage('user')}
        >
          <FaUser className="text-lg" />
          {isExpanded && <span className="ml-2">User</span>}
        </button>
        <button 
          className={`flex items-center py-2 px-3 rounded-lg transition-all duration-300 w-full text-left hover:bg-white hover:text-black focus:bg-white focus:text-black focus:outline-none mb-1 text-base ${!isExpanded && 'justify-center'}`}
          onClick={() => setSelectedPage('driver')}
        >
          <FaCar className="text-lg" />
          {isExpanded && <span className="ml-2">Driver</span>}
        </button>
        <button 
          className={`flex items-center py-2 px-3 rounded-lg transition-all duration-300 w-full text-left hover:bg-white hover:text-black focus:bg-white focus:text-black focus:outline-none mb-1 text-base ${!isExpanded && 'justify-center'}`}
          onClick={() => setSelectedPage('ride')}
        >
          <FaRoad className="text-lg" />
          {isExpanded && <span className="ml-2">Ride</span>}
        </button>
        <button 
          className={`flex items-center py-2 px-3 rounded-lg transition-all duration-300 w-full text-left hover:bg-white hover:text-black focus:bg-white focus:text-black focus:outline-none mb-1 text-base ${!isExpanded && 'justify-center'}`}
          onClick={() => setSelectedPage('cardata')}
        >
          <FaDatabase className="text-lg" />
          {isExpanded && <span className="ml-2">CarData</span>}
        </button>
        <button 
          className={`flex items-center py-2 px-3 rounded-lg transition-all duration-300 w-full text-left hover:bg-white hover:text-black focus:bg-white focus:text-black focus:outline-none mb-1 text-base ${!isExpanded && 'justify-center'}`}
          onClick={() => setSelectedPage('manual-ride-booking')}
        >
          <BiSolidPurchaseTagAlt className="text-lg" />
          {isExpanded && <span className="ml-2">Manual Ride Booking</span>}
        </button>
        <button 
          className={`flex items-center py-2 px-3 rounded-lg transition-all duration-300 w-full text-left hover:bg-white hover:text-black focus:bg-white focus:text-black focus:outline-none mb-1 text-base ${!isExpanded && 'justify-center'}`}
          onClick={() => setSelectedPage('documents')}
        >
          <IoDocumentAttach className="text-lg" />
          {isExpanded && <span className="ml-2">Add Document</span>}
        </button>
        <button 
          className={`flex items-center py-2 px-3 rounded-lg transition-all duration-300 w-full text-left hover:bg-white hover:text-black focus:bg-white focus:text-black focus:outline-none mb-1 text-base ${!isExpanded && 'justify-center'}`}
          onClick={() => setSelectedPage('viewmap')}
        >
          <FaMapMarkedAlt className="text-lg" />
          {isExpanded && <span className="ml-2">ViewMap</span>}
        </button>
        <button 
          className={`flex items-center py-2 px-3 rounded-lg transition-all duration-300 w-full text-left hover:bg-white hover:text-black focus:bg-white focus:text-black focus:outline-none mb-1 text-base ${!isExpanded && 'justify-center'}`}
          onClick={() => setSelectedPage('contactus')}
        >
          <RiContactsFill className="text-lg" />
          {isExpanded && <span className="ml-2">Manage Contact</span>}
        </button>
        <button 
          className={`flex items-center py-2 px-3 rounded-lg transition-all duration-300 w-full text-left hover:bg-white hover:text-black focus:bg-white focus:text-black focus:outline-none mb-1 text-base ${!isExpanded && 'justify-center'}`}
          onClick={() => setSelectedPage('managefeedback')}
        >
          <RiContactsFill className="text-lg" />
          {isExpanded && <span className="ml-2">Manage Feedback</span>}
        </button>
        <button 
          className={`flex items-center py-2 px-3 rounded-lg transition-all duration-300 w-full text-left hover:bg-white hover:text-black focus:bg-white focus:text-black focus:outline-none mb-1 text-base ${!isExpanded && 'justify-center'}`}
          onClick={() => setSelectedPage('profile')}
        >
          <RiContactsFill className="text-lg" />
          {isExpanded && <span className="ml-2">Profile</span>}
        </button>
        {isExpanded && <Logout />}
      </nav>
    </div>
  );
};

export default Sidebar;
