import { Link, Route, Routes } from "react-router-dom";
import AdminBooking from "./Booking/adminBooking";
import { FaBookmark, FaBed, FaCommentAlt, FaImage, FaThList } from "react-icons/fa";
import AdminRooms from "./Rooms/adminRooms";
import AdminCategories from "./catagories/adminCatagorie";
import AdminGallerItem from "./gallerItem/AdmingallerItem";
import AdminFeedbackPage from "./feedback/AdminFeedback";
import HomePage from "../clientPage/homePage";

function AdminPage() {
  return (
    <>
      <div className="bg-white w-full h-[100vh] flex flex-col">
        {/* Top Navbar */}
        <div className="bg-gray-800 w-full h-16 flex items-center justify-between px-8 shadow-md">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <img
              src="Photoes/logo.png"
              alt="Logo"
              className="h-10 w-10 rounded-full shadow-md"
            />
            <h1 className="text-white text-lg font-semibold">Admin Dashboard</h1>
          </div>

          {/* Navigation Links */}
          <nav className="flex space-x-6">
            <Link 
               to="/"
               className="text-white text-lg font-serif hover:text-gray-300 flex items-center space-x-1"
            >
              <FaBookmark/>
              <sapn>Home</sapn>
            </Link>

            <Link
              to="/admin/Booking"
              className="text-white text-lg font-serif hover:text-gray-300 flex items-center space-x-1"
            >
              <FaBookmark />
              <span>Booking</span>
            </Link>
            <Link
              to="/admin/rooms"
              className="text-white text-lg font-serif hover:text-gray-300 flex items-center space-x-1"
            >
              <FaBed />
              <span>Rooms</span>
            </Link>
            <Link
              to="/admin/Catagories"
              className="text-white text-lg font-serif hover:text-gray-300 flex items-center space-x-1"
            >
              <FaThList />
              <span>Categories</span>
            </Link>
            <Link
              to="/admin/Gallery"
              className="text-white text-lg font-serif hover:text-gray-300 flex items-center space-x-1"
            >
              <FaImage />
              <span>Gallery</span>
            </Link>
            <Link
              to="/admin/Feedback"
              className="text-white text-lg font-serif hover:text-gray-300 flex items-center space-x-1"
            >
              <FaCommentAlt />
              <span>Feedback</span>
            </Link>
          </nav>
        </div>

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

export default AdminPage;
