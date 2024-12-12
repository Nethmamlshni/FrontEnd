import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../../Components/Header_Part/header";

export default function AdminRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    roomNumber: "",
    type: "",
    price: "",
    isAvailable: "available",
    features:  [],
    description:"",
  });
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = () => {
    setLoading(true);
    axios
      .get(import.meta.env.VITE_API_URL + "api/hotelRoom", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setRooms(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching rooms:", err);
        setLoading(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditMode) {
      axios
        .put(
          `${import.meta.env.VITE_API_URL}api/hotelRoom/${encodeURIComponent(form.roomNumber)}`,
          form,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(() => {
          alert("Room updated successfully!");
          fetchRooms();
          resetForm();
        })
        .catch((err) => console.error("Error updating room:", err));
    } else {
      axios
        .post(`${import.meta.env.VITE_API_URL}api/hotelRoom`, form, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => {
          alert("Room added successfully!");
          fetchRooms();
          resetForm();
        })
        .catch((err) => console.error("Error adding room:", err));
    }
  };

  const resetForm = () => {
    setForm({
      roomNumber: "",
      type: "",
      price: "",
      isAvailable: "available",
      features:  [],
      description:"",
    });
    setIsEditMode(false);
  };

  const handleEdit = (room) => {
    setForm(room);
    setIsEditMode(true); // Switch to edit mode
  };

  const handleDelete = (roomNumber) => {
    if (window.confirm(`Are you sure you want to delete the room '${roomNumber}'?`)) {
      axios
        .delete(`${import.meta.env.VITE_API_URL}api/hotelRoom/${encodeURIComponent(roomNumber)}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => {
          alert("Room deleted successfully!");
          fetchRooms();
        })
        .catch((err) => {
          console.error("Error deleting room:", err.response ? err.response.data : err.message);
          alert("An error occurred while deleting the room. Please try again later.");
        });
    }
  };
  

  if (loading) {
    return <div>Loading rooms...</div>;
  }

  return (
    <>
    
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Room Management</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          {isEditMode ? "Edit Room" : "Add Room"}
        </h2>
        <input
          type="text"
          placeholder="Room Number"
          value={form.roomNumber}
          onChange={(e) => setForm({ ...form, roomNumber: e.target.value })}
          required
          className="w-full mb-4 p-2 border rounded"
          disabled={isEditMode}
        />
        <input 
          type="text"
          placeholder="Type"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          required
          className="w-full mb-4 p-2 border rounded"
        />
         <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
          className="w-full mb-4 p-2 border rounded"
        />
        <input 
          type="text"
          placeholder="Availability"
          value={form.isAvailable}
          onChange={(e) => setForm({ ...form, isAvailable: e.target.value })}
          required
          className="w-full mb-4 p-2 border rounded"
        />
         <input
          type="text"
          placeholder="Features (comma-separated)"
          value={form.features.join(",")}
          onChange={(e) => setForm({ ...form, features: e.target.value.split(",") })}
          className="w-full mb-4 p-2 border rounded"
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
          className="w-full mb-4 p-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          {isEditMode ? "Update Room" : "Add Room"}
        </button>
      </form>

      {/* Room List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {rooms.map((room) => (
          <div key={room.roomNumber} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Room {room.roomNumber}</h3>
            <p>{room.description}</p>
            <p className="font-semibold text-gray-700">Price: ${room.price}</p>
            <p className="font-semibold text-gray-700">Availability: {room.isAvailable}</p>
            <p>Features: {room.features.join(", ")}</p>
            <button
              onClick={() => handleEdit(room)}
              className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(room.roomNumber)}
              className="mt-4 ml-2 bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
