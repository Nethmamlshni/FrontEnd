import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AdminRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    roomNumber: "",
    type: "single",
    price: "",
    isAvailable: "available",
    features: [],
    description: "",
    image: "",
    category: "laxury",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // Modal state

  useEffect(() => {
    fetchRooms();
  }, []);
  const fetchRooms = () => {
    setLoading(true);
    axios
      .get(import.meta.env.VITE_API_URL + "api/hotelRoom", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
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
    console.log(form);
    e.preventDefault();
    const request = isEditMode
      ? axios.put(
          `${import.meta.env.VITE_API_URL}api/hotelRoom/${encodeURIComponent(
            form.roomNumber
          )}`,
          form,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        )
      : axios.post(`${import.meta.env.VITE_API_URL}api/hotelRoom`, form, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

    request
      .then(() => {
        alert(isEditMode ? "Room updated successfully!" : "Room added successfully!");
        fetchRooms();
        resetForm();
      })
      .catch((err) => console.error(isEditMode ? "Error updating room:" : "Error adding room:", err));
  };

  const resetForm = () => {
    setForm({
      roomNumber: "",
      type: "single",
      price: "",
      isAvailable: "available",
      features: [],
      description: "",
      image: "",
      category: "laxury",
    });
    setIsEditMode(false);
    setModalVisible(false); // Hide modal
  };

  const handleEdit = (room) => {
    setForm(room);
    setIsEditMode(true);
    setModalVisible(true); // Open modal for editing
  };

  const handleDelete = (roomNumber) => {
    if (window.confirm(`Are you sure you want to delete the room '${roomNumber}'?`)) {
      axios
        .delete(`${import.meta.env.VITE_API_URL}api/hotelRoom/${encodeURIComponent(roomNumber)}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then(() => {
          alert("Room deleted successfully!");
          fetchRooms();
        })
        .catch((err) => {
          console.error("Error deleting room:", err);
          alert("An error occurred while deleting the room.");
        });
    }
  };

  if (loading) {
    return <div>Loading rooms...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Room Management</h1>

      {/* Add Room Button */}
      <button
        onClick={() => setModalVisible(true)}
        className="mb-6 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded"
      >
        Add Room
      </button>

      {/* Modal */}
      {modalVisible && (
        <div
          className="fixed top-0 left-0 right-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50"
          aria-hidden="true"
        >
          <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">
                {isEditMode ? "Edit Room" : "Add Room"}
              </h3>
              <button
                onClick={() => resetForm()}
                className="text-gray-500 hover:bg-gray-200 p-2 rounded"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Room Number"
                value={form.roomNumber}
                onChange={(e) => setForm({ ...form, roomNumber: e.target.value })}
                required
                className="w-full p-2 border rounded"
                disabled={isEditMode}
              />
              <select 
                 value={form.type} 
                 onChange={(e) => setForm({ ...form, type: e.target.value })} 
                 required 
                 className="w-full p-2 border rounded"
                 >
                <option value="single">Single</option>
                <option value="double">Double</option>
                <option value="six">Suite</option>
              </select>
              <input
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                required
                className="w-full p-2 border rounded"
              />
              <select
                value={form.isAvailable}
                onChange={(e) => setForm({ ...form, isAvailable: e.target.value })}
                required
                className="w-full p-2 border rounded"
              >
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </select>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                required
                className="w-full p-2 border rounded"
              >
                <option value="standard">Laxury</option>
                <option value="luxury">Standard</option>
                <option value="suite">Simple</option>
              </select>
              <input
                type="text"
                placeholder="Features (comma-separated)"
                value={form.features.join(",")}
                onChange={(e) => setForm({ ...form, features: e.target.value.split(",") })}
                className="w-full p-2 border rounded"
              />
              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                required
                className="w-full p-2 border rounded"
              />
             
              <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded">
                {isEditMode ? "Update Room" : "Add Room"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Room List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div key={room.roomNumber} className="p-4 bg-white rounded-lg shadow">
            <h3 className="text-lg font-bold">Room {room.roomNumber}</h3>
            <p>{room.description}</p>
            <p>Price: ${room.price}</p>
            <p>Category: {room.category}</p>
            <p>Type: {room.type}</p>
            <p>Availability: {room.isAvailable}</p>
            <p>Features: {room.features.join(", ")}</p>
            <p>Image: <img src={room.image} alt={room.type} className="h-20 w-full object-cover mt-2" /></p>
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
  );
}
