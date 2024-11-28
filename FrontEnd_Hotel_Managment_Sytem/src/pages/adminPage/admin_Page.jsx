import {Link, Route,Routes } from "react-router-dom";
import NotFound from "../Others/notFound";

function AdminPage() {
        return (
            <>
            <div className="bg-white w-full h-screen flex flex-col items-center">
            <div className="bg-[#B17457] w-full h-20 flex justify-between items-center px-6 shadow-md">
                <h1 className="text-2xl font-serif text-white tracking-wide">
                     <Link to="/admin/rooms">Rooms</Link>
                     <Link to="/admin/Booking">Booking</Link>
                     <Link to="/admin/Catagories">Catagories</Link>
                </h1>
            </div> 
            <Routes path="/*">
                <Route path="/Booking" element={<h1>Booking Page</h1>} />
                <Route path="/rooms" element={<h1>Rooms</h1>} />
                <Route path="/Catagories" element={<h1>Catagories</h1>} />
                
            </Routes>
            </div>
            </>
        );
    }
    export default AdminPage;