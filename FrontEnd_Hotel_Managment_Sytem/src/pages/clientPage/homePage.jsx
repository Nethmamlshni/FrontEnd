import Header from "../../Components/Header_Part/header";
import React, { useState, useEffect } from "react";
import { Link,BrowserRouter, Routes, Route } from "react-router-dom";
import Catagories from "./Catagories/catagories";
import Rooms from "./rooms/rooms";
import GalleryPage from "./gallery/gallerypage";
import FeedbackPages from "./feedback/feedbackPage";
function HomePage() {

  <BrowserRouter>
  <Routes path="/*">
      <Route path="/catagories" element={<Catagories />} />
      <Route path="/rooms" element={<Rooms />} />   
      <Route path="/gallery" element={<GalleryPage />} /> 
      <Route path="/feedback" element={<FeedbackPages />} />    
    </Routes>
  </BrowserRouter>
  const [roomNumbers, setRoomNumber] = useState("");

  useEffect(() => {
    // Get the query parameter from the URL
    const params = new URLSearchParams(window.location.search);
    const room = params.get("roomNumber");
    if (room) {
      setRoomNumber(room);

    }
  }, []);


  const [booking, setBooking] = useState({
    checkInDate: "",
    checkOutDate: "",
    roomType: "luxury",
    roomNumber:"",
    notes: "",
  });

  const handleChange = (e) => {
    setBooking({
      ...booking,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!booking.checkInDate || !booking.checkOutDate) {
      alert("Please fill in all the required fields!");
      return;
    }

    const newBooking = {
      roomNumber: booking.roomNumber||roomNumbers,
      checkInDate: booking.checkInDate,
      checkOutDate: booking.checkOutDate,
      totalPrice: booking.roomType === "luxury" ? 500 : booking.roomType === "deluxe" ? 300 : 100,
      status: "Pending",
      createdAt: new Date().toISOString(),
      notes: booking.notes || "N/A",
    };

    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    bookings.push(newBooking);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    setBooking({ checkInDate: "", checkOutDate: "", roomType: "luxury",roomNumber:"", notes: "" });
    alert("Booking added successfully!");
  };

  return (
    <>
      {/* Booking Section */}
      <div
        className="h-screen w-screen bg-cover bg-center relative bg-slate-500"
        style={{
          backgroundImage: "url('https://cdn.prod.website-files.com/66f278307a717e3092522530/67206d03310cb0bd1be82de9_67206b280b7b2b4223a3e0b3_Cabana_C.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}>
           {/* Navigation Bar */}
           
     
    <Header className="backdrop-blur-md absolute top-0 left-0 right-0"/>
        <div className="backdrop-blur-md h-auto p-8 m-20 rounded-3xl flex flex-col items-center space-y-6 shadow-lg">
          <h2 className="text-[#fdfdfc] text-2xl font-bold">B O O K N O W !</h2>
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <input
              type="date"
              name="checkInDate"
              value={booking.checkInDate}
              onChange={handleChange}
              className="px-4 py-2 rounded-lg border border-[#151514] bg-[#F4F0E8] text-[#4A4947] focus:outline-none focus:ring-2 focus:ring-[#A35D3B]"
            />
            <input
              type="date"
              name="checkOutDate"
              value={booking.checkOutDate}
              onChange={handleChange}
              className="px-4 py-2 rounded-lg border border-[#0f0f0e] bg-[#F4F0E8] text-[#4A4947] focus:outline-none focus:ring-2 focus:ring-[#A35D3B]"
            />
            <select
              name="roomType"
              value={booking.roomType}
              onChange={handleChange}
              className="px-4 py-2 rounded-lg border border-[#111110] bg-[#F4F0E8] text-[#4A4947] focus:outline-none focus:ring-2 focus:ring-[#A35D3B]"
            >
              <option value="luxury">Luxury</option>
              <option value="deluxe">Deluxe</option>
              <option value="simple">Simple</option>
            </select>
            <input
              type="text"
              name="roomNumber"
              value={roomNumbers||booking.roomNumber}
              placeholder="Room Number"
              onChange={handleChange}
              className="px-4 py-2 rounded-lg border border-[#151514] bg-[#F4F0E8] text-[#4A4947] focus:outline-none focus:ring-2 focus:ring-[#A35D3B]"
            />
            <input
              type="text"
              name="notes"
              value={booking.notes}
              placeholder="Notes (optional)"
              onChange={handleChange}
              className="px-4 py-2 rounded-lg border border-[#151514] bg-[#F4F0E8] text-[#4A4947] focus:outline-none focus:ring-2 focus:ring-[#A35D3B]"
            />
          </div>
          <input
            type="button"
            value="Submit"
            onClick={handleSubmit}
            className="px-6 py-2 bg-[#1d231f] text-white rounded-lg hover:bg-[#A35D3B] transition-all cursor-pointer"
          />
        </div>
      </div>
    </>
  );
}

export default HomePage;

