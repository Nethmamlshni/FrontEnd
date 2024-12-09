import { Link, Route, Routes } from "react-router-dom";
import AdminBooking from "./Booking/adminBooking"; 
 import { FaBookmark, FaBed, FaCommentAlt, FaImage, FaThList }  from "react-icons/fa";
import AdminRooms from "./Rooms/adminRooms";
import AdminCategories from "./catagories/adminCatagorie";
import AdminGallerItem from "./gallerItem/AdmingallerItem";
import AdminFeedbackPage from "./feedback/AdminFeedback";
import Header from "../../Components/Header_Part/header";

function AdminPage() {
  return (
    <>
      <div className="bg-white w-full h-[100vh] flex overflow-scroll ">
        {/* Sidebar */}
        <div className="bg-[#B17457] w-[20%] h-[100vh] flex flex-col items-center px-6 shadow-md">
          {/* Logo Section */}
          <div className="py-4">
            <img src="Photoes/logo.png" alt="Logo" className="h-20 w-20 rounded-full shadow-md" />
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-6 mt-8">
  {/* Booking */}
  <div className="flex items-center  space-x-2">
    <FaBookmark className="text-white text-lg" />
    <Link to="/admin/Booking" className="text-white text-lg font-serif hover:text-gray-300">
      Booking
    </Link>
  </div>

  {/* Rooms */}
  <div className="flex items-center space-x-2">
    <FaBed className="text-white text-lg" />
    <Link to="/admin/rooms" className="text-white text-lg font-serif hover:text-gray-300">
      Rooms
    </Link>
  </div>

  {/* Categories */}
  <div className="flex items-center  space-x-2 ">
    <FaThList className="text-white text-lg" />
    <Link to="/admin/Catagories" className="text-white text-lg font-serif hover:text-gray-300">
      Categories
    </Link>
  </div>

  {/* Gallery */}
  <div className="flex items-center space-x-2">
    <FaImage className="text-white text-lg" />
    <Link to="/admin/Gallery" className="text-white text-lg font-serif hover:text-gray-300">
      Gallery
    </Link>  
  </div>

  {/* Feedback */}
  <div className="flex items-center space-x-2">
    <FaCommentAlt className="text-white text-lg" />
    <Link to="/admin/Feedback" className="text-white text-lg font-serif hover:text-gray-300">
      Feedback
    </Link>
  </div>
</nav>
</div>
{/* Main Content Area */}
<div className="flex items-start justify-center w-full min-h-screen bg-[#FAF7F0] overflow-y-auto">
  <div className="w-[90%] lg:w-[100%]  sm:px-6 lg:px-8 bg-white shadow-lg rounded-lg">
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

      </div>
    </>
  );
}

export default AdminPage;
