import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { FaBars, FaTimes, FaBookmark, FaBed, FaCommentAlt, FaImage, FaThList } from "react-icons/fa";
import AdminBooking from "./Booking/adminBooking";
import AdminRooms from "./Rooms/adminRooms";
import AdminCategories from "./catagories/adminCatagorie";
import AdminGallerItem from "./gallerItem/AdmingallerItem";
import AdminFeedbackPage from "./feedback/AdminFeedback";

function AdminPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <div className="bg-white w-full h-[100vh] flex flex-col">
        {/* Top Navbar */}
        <div className="bg-gray-800 w-full h-16 flex items-center justify-between px-4 sm:px-8 shadow-md">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <img
              src="Photoes/logo.png"
              alt="Logo"
              className="h-10 w-10 rounded-full shadow-md"
            />
            <h1 className="text-white text-lg font-semibold">Admin Dashboard</h1>
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="sm:hidden">
            {isMenuOpen ? (
              <FaTimes
                className="text-white text-2xl cursor-pointer"
                onClick={toggleMenu}
              />
            ) : (
              <FaBars
                className="text-white text-2xl cursor-pointer"
                onClick={toggleMenu}
              />
            )}
          </div>

          {/* Navigation Links for Desktop */}
          <nav className="hidden sm:flex space-x-6">
            <NavLinks />
          </nav>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="bg-gray-800 text-white sm:hidden flex flex-col p-4 space-y-4">
            <NavLinks onClick={toggleMenu} />
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 bg-[#FAF7F0] p-6 overflow-y-auto">
          <Routes>
            <Route
              path="/Booking"
              element={
                <div className="p-6 bg-gray-50 rounded-lg shadow-md">
                  <AdminBooking />
                </div>
              }
            />
            <Route
              path="/rooms"
              element={
                <div className="p-6 bg-gray-50 rounded-lg shadow-md">
                  <AdminRooms />
                </div>
              }
            />
            <Route
              path="/Catagories"
              element={
                <div className="p-6 bg-gray-50 rounded-lg shadow-md">
                  <AdminCategories />
                </div>
              }
            />
            <Route
              path="/Gallery"
              element={
                <div className="p-6 bg-gray-50 rounded-lg shadow-md">
                  <AdminGallerItem />
                </div>
              }
            />
            <Route
              path="/Feedback"
              element={
                <div className="p-6 bg-gray-50 rounded-lg shadow-md">
                  <AdminFeedbackPage />
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </>
  );
}

const NavLinks = ({ onClick }) => {
  return (
    <>
      <Link
        to="/"
        className="text-white text-lg font-serif hover:text-gray-300 flex items-center space-x-1"
        onClick={onClick}
      >
        <FaBookmark className="text-xl" />
        <span>Home</span>
      </Link>
      <Link
        to="/admin/Booking"
       className="text-white text-lg font-serif hover:text-gray-300 flex items-center space-x-1"
        onClick={onClick}
      >
        <FaBookmark className="text-xl" />
        <span>Booking</span>
      </Link>
      <Link
        to="/admin/rooms"
        className="text-white text-lg font-serif hover:text-gray-300 flex items-center space-x-1"
        onClick={onClick}
      >
        <FaBed className="text-xl" />
        <span>Rooms</span>
      </Link>
      <Link
        to="/admin/Catagories"
        className="text-white text-lg font-serif hover:text-gray-300 flex items-center space-x-1"
        onClick={onClick}
      >
        <FaThList className="text-xl" />
        <span>Categories</span>
      </Link>
      <Link
        to="/admin/Gallery"
        className="text-white text-lg font-serif hover:text-gray-300 flex items-center space-x-1"
        onClick={onClick}
      >
        <FaImage className="text-xl" />
        <span>Gallery</span>
      </Link>
      <Link
        to="/admin/Feedback"
        className="text-white text-lg font-serif hover:text-gray-300 flex items-center space-x-1"
        onClick={onClick}
      >
        <FaCommentAlt className="text-xl" />
        <span>Feedback</span>
      </Link>
    </>
  );
};

export default AdminPage;
