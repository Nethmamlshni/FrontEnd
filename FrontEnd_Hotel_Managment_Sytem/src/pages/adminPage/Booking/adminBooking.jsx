import Header from "../../../Components/Header_Part/header";
import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminBooking() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch bookings from localStorage
    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(storedBookings);
  }, []);
  const total = (index)=>{
    const booking = bookings[index];
    const category = booking.category;
    const newDate = new Date(booking.checkOutDate) - new Date(booking.checkInDate);
    const days = newDate / (1000 * 60 * 60 * 24);
    const roomType = booking.roomType;
   if (category === "luxury") {
      if (roomType === "single") {
        return 1000*days;
      } else if (roomType === "double") {
        return 2000*days;
      } else if (roomType === "suite") {
        return 3000*days;
      }
   } else if (category === "deluxe") {
      if (roomType === "single") {
        return 1500*days;
      } else if (roomType === "double") {
        return 3000*days;
      } else if (roomType === "suite") {
        return 4000*days;
      }
   } else if (category === "standard") {
      if (roomType === "single") {
        return 1000*days;
      } else if (roomType === "double") {
        return 2000*days;
      } else if (roomType === "suite") {
        return 3000*days;
      }
   }
   
  }
   
  const handleDelete = (index) => {
    const updatedBookings = [...bookings];
    updatedBookings.splice(index, 1);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    setBookings(updatedBookings);
  };
  const handleConfirm = async (index) => {
    const booking = bookings[index];
  
    // Update booking status locally
    booking.status = "Confirmed";
  
    // Send the updated booking to the backend
    try {
      const response = await fetch(VITE_API_URL + "api/bookings", {
        method: "POST", // or "PUT" if updating an existing booking
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
      });
  
      if (response.ok) {
        const data = await response.json();
        alert("Booking confirmed and saved to database!");
  
        // Update the local state to reflect the change
        const updatedBookings = [...bookings];
        updatedBookings[index] = data.booking; // Assuming the API returns the updated booking
        setBookings(updatedBookings);
      } else {
        const error = await response.json();
        alert(`Error confirming booking: ${error.message}`);
      }
    } catch (error) {
      console.error("Error confirming booking:", error);
      alert("An error occurred while confirming the booking.");
    }
  };
  
  return (
    <>
  
    <div className="flex flex-col items-center h-full w-full px-6">
      <h1 className="text-4xl font-bold text-[#4A4947] mb-8">
        Booking Details
      </h1>
      <div className="overflow-x-auto w-full">
        <table className="table-auto w-full bg-white shadow-md rounded-lg">
          <thead className="bg-[#161046] text-white">
            <tr>
              <th className="px-4 py-2 text-left">Room Number</th>
              <th className="px-4 py-2 text-left">Check-In Date</th>
              <th className="px-4 py-2 text-left">Check-Out Date</th>
              <th className="px-4 py-2 text-left">RoomType</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Created At</th>
              <th className="px-4 py-2 text-left">Notes</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Confirm</th>
              <th className="px-4 py-2 text-left">Delete</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index}>
                <td className="px-4 py-2">{booking.roomNumber}</td>
                <td className="px-4 py-2">
                  {new Date(booking.checkInDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  {new Date(booking.checkOutDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">{booking.roomType}</td>
                <td className="px-4 py-2">{booking.category}</td>
                <td className="px-4 py-2">{booking.status}</td>
                <td className="px-4 py-2">
                  {new Date(booking.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">{booking.notes || "N/A"}</td>
                <td className="px-4 py-2">{total(index)}</td>
                <td>
                  <button
                     className="bg-[#4A4947] text-white px-4 py-2 rounded-lg hover:bg-[#B17457]"
                     onClick={() => handleConfirm(index)} // Pass the `itemId` or identifier to confirm
                   >
                   Confirm
                 </button>
                </td>
                <td><button 
                onClick={() => handleDelete(index)} className="bg-[#4A4947] text-white px-4 py-2 rounded-lg hover:bg-[#B17457]">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}

export default AdminBooking;

