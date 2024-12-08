import Header from "../../../Components/Header_Part/header";
import React, { useState, useEffect } from "react";

function AdminBooking() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch bookings from localStorage
    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(storedBookings);
  }, []);

  return (
    <>
    <Header/>
    <div className="flex flex-col items-center h-full w-full px-6">
      <h1 className="text-4xl font-bold text-[#4A4947] mb-8">
        Booking Details
      </h1>
      <div className="overflow-x-auto w-full">
        <table className="table-auto w-full bg-white shadow-md rounded-lg">
          <thead className="bg-[#B17457] text-white">
            <tr>
              <th className="px-4 py-2 text-left">Room Number</th>
              <th className="px-4 py-2 text-left">Check-In Date</th>
              <th className="px-4 py-2 text-left">Check-Out Date</th>
              <th className="px-4 py-2 text-left">Total Price</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Created At</th>
              <th className="px-4 py-2 text-left">Notes</th>
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
                <td className="px-4 py-2">${booking.totalPrice}</td>
                <td className="px-4 py-2">{booking.status}</td>
                <td className="px-4 py-2">
                  {new Date(booking.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">{booking.notes || "N/A"}</td>
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

