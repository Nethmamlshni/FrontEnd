import UserData from "../User_Part/userData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle menu visibility

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="w-full h-20 flex justify-between items-center px-6 shadow-md bg-gray-800">
      <h1 className="text-3xl font-bold font-serif text-white tracking-wide">
        Hotel Sara
      </h1>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex text-white py-4 px-6 space-x-6">
        <Link to="/" className="hover:text-[#A35D3B] transition-all">
          Home
        </Link>
        <Link to="/userDetails" className="hover:text-[#A35D3B] transition-all">
          User
        </Link>
        <Link to="/rooms" className="hover:text-[#A35D3B] transition-all">
          Room
        </Link>
        <Link to="/feedback" className="hover:text-[#A35D3B] transition-all">
          Feedback
        </Link>
        <Link to="/gallery" className="hover:text-[#A35D3B] transition-all">
          Gallery
        </Link>
        <Link to="/catagories" className="hover:text-[#A35D3B] transition-all">
          Categories
        </Link>
        <Link to="/login" className="hover:text-[#A35D3B] transition-all">
          Login
        </Link>
      </nav>

      {/* Mobile Navigation Toggle Icon */}
      <div className="flex md:hidden items-center text-white">
        {menuOpen ? (
          <FaTimes size={24} onClick={toggleMenu} className="cursor-pointer" />
        ) : (
          <FaBars size={24} onClick={toggleMenu} className="cursor-pointer" />
        )}
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="absolute top-20 left-0 w-full bg-gray-800 text-white flex flex-col items-center space-y-4 py-6 z-50 md:hidden">
          <Link
            to="/"
            onClick={toggleMenu}
            className="hover:text-[#A35D3B] transition-all"
          >
            Home
          </Link>
          <Link 
            to="/userDetails"
            onClick={toggleMenu}
            className="hover:text-[#A35D3B] transition-all"
          >
            User
          </Link>

          <Link
            to="/rooms"
            onClick={toggleMenu}
            className="hover:text-[#A35D3B] transition-all"
          >
            Room
          </Link>
          <Link
            to="/feedback"
            onClick={toggleMenu}
            className="hover:text-[#A35D3B] transition-all"
          >
            Feedback
          </Link>
          <Link
            to="/gallery"
            onClick={toggleMenu}
            className="hover:text-[#A35D3B] transition-all"
          >
            Gallery
          </Link>
          <Link
            to="/catagories"
            onClick={toggleMenu}
            className="hover:text-[#A35D3B] transition-all"
          >
            Categories
          </Link>
          <Link
            to="/login"
            onClick={toggleMenu}
            className="hover:text-[#A35D3B] transition-all"
          >
            Login
          </Link>
        </div>
      )}

      <div className="hidden md:flex items-center space-x-4">
        <UserData />
      </div>
    </div>
  );
}

export default Header;
