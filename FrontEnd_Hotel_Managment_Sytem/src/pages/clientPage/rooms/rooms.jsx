import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../../Components/Header_Part/header";

export default function Rooms() {
  const [rooms, setRooms] = useState([]); // State to store rooms
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch rooms data from the backend
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/api/hotelRoom") // Endpoint for rooms
      .then((res) => {
        setRooms(res.data || []); // Safeguard for undefined
        setLoading(false); // Stop loading
      })
      .catch((err) => {
        console.error("Error fetching rooms:", err.message);
        alert("Failed to load rooms. Please try again later.");
        setLoading(false); // Stop loading even on error
      });
  }, []);


  // Loading state
  if (loading) {
    return <div>Loading rooms...</div>;
  }

  // When no rooms are available
  if (!rooms.length) {
    return <div>No rooms available.</div>;
  }

  // Render room cards
  return (
    <>
      <Header />
      <div className="flex flex-col items-center min-h-screen bg-gray-50 py-12 px-6">
        <h1 className="text-4xl font-bold text-[#4A4947] mb-8">Hotel Rooms</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          {rooms.map((room, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300 ease-in-out"
            >
              {/* Room Image */}
              {room.imageUrl && (
                <img
                  src={room.imageUrl}
                  alt={`Room ${room.roomNumber}`}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-6">
                <h2 className="text-2xl font-semibold text-[#4A4947] mb-2">
                  Room {room.roomNumber} ({room.type})
                </h2>
                <p className="text-gray-600 mb-4">{room.description}</p>
                <p className="text-gray-600"> {room.category}</p>
                <ul className="text-gray-700 mb-4">
                  {room.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
                <div>
                <p className="font-bold text-lg text-[#4A4947]">Price: ${room.price}</p>
                  <p><img src={room.image} alt={room.type} className="h-20 w-full object-cover mt-2" /></p>
                </div>
                <div className="flex justify-between items-center">
                <button
    className={`bg-[#4A4947] hover:bg-[#4A4947] text-white py-2 px-4 rounded-md mt-4 ${
      room.isAvailable === "available" ? "" : "cursor-not-allowed"
    }`}
    onClick={() => {
      if (room.isAvailable==="available") {
        const roomNumber = room.roomNumber; // Replace with your dynamic room number
        window.location.href = `http://localhost:5173/?roomNumber=${roomNumber}`;
      } else {
        alert("This room is not available!");
      }
    }}
    disabled={room.isAvailable==="available" ? false : true}
  >
    Book Now
  </button>
  <span
    className={`px-3 py-1 text-sm rounded-full ${
      room.isAvailable === "available" ? "bg-green-500 text-white" : "bg-red-500 text-white"
    }`}
  >
    {room.isAvailable === "available" ? "Available" : "Unavailable"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
