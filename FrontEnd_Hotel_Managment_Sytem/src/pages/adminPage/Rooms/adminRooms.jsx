import React, { useState } from "react";

// Sample data for rooms
const initialRooms = [
  {
    roomNumber: "R001",
    type: "Single",
    price: 100,
    isAvailable: true,
    features: ["Sea View", "Air Conditioning"],
    description: "A cozy room with a sea view.",
  },
  {
    roomNumber: "R002",
    type: "Double",
    price: 150,
    isAvailable: false,
    features: ["Mountain View", "WiFi"],
    description: "A spacious room with a mountain view.",
  },
  {
    roomNumber: "R003",
    type: "Suite",
    price: 250,
    isAvailable: true,
    features: ["Private Pool", "WiFi", "Sea View"],
    description: "A luxurious suite with a private pool.",
  },
  {
    roomNumber: "R004",
    type: "Single",
    price: 120,
    isAvailable: true,
    features: ["Garden View", "Air Conditioning"],
    description: "A single room with a garden view.",
  },
  {
    roomNumber: "R005",
    type: "Double",
    price: 180,
    isAvailable: false,
    features: ["City View", "Balcony"],
    description: "A double room with a city view and balcony.",
  },
  {
    roomNumber: "R006",
    type: "Double",
    price: 200,
    isAvailable: true,
    features: ["City View", "Balcony"],
    description: "A double room with a city view and balcony.",
  },
  {
    roomNumber: "R007",
    type: "Single",
    price: 130,
    isAvailable: true,
    features: ["Mountain View", "WiFi"],
    description: "A single room with a mountain view.",
  },
];

function AdminRooms() {
  const [rooms, setRooms] = useState(initialRooms);
  const [showModal, setShowModal] = useState(false);
  const [newRoom, setNewRoom] = useState({
    roomNumber: "",
    type: "",
    price: "",
    isAvailable: true,
    features: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRoom({ ...newRoom, [name]: value });
  };

  const handleAddRoom = () => {
    const updatedRoom = {
      ...newRoom,
      features: newRoom.features.split(",").map((f) => f.trim()), // Split features by commas
    };
    setRooms([...rooms, updatedRoom]);
    setShowModal(false);
    setNewRoom({
      roomNumber: "",
      type: "",
      price: "",
      isAvailable: true,
      features: "",
      description: "",
    });
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-semibold text-center text-gray-800 mb-8">
        Manage Hotel Rooms
      </h1>
      <div className="flex justify-end mb-6">
        <button
          onClick={handleOpenModal}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          + Add New Room
        </button>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Room List</h2>

        {/* Apply overflow-auto here to allow scrolling */}
        <div className="overflow-auto max-h-[500px] space-y-8">
          {rooms.map((room) => (
            <div
              key={room.roomNumber}
              className="bg-white shadow-lg rounded-lg p-6 space-y-4 hover:shadow-xl transition duration-300"
            >
              <h3 className="text-xl font-bold text-gray-900">
                {room.roomNumber} - {room.type}
              </h3>
              <p className="text-lg text-gray-600">
                <span className="font-semibold">Price:</span> ${room.price}
              </p>
              <p className="text-lg text-gray-600">
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={`${
                    room.isAvailable ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {room.isAvailable ? "Available" : "Not Available"}
                </span>
              </p>
              <p className="text-lg text-gray-600">
                <span className="font-semibold">Features:</span>{" "}
                {room.features.join(", ")}
              </p>
              <p className="text-lg text-gray-600">
                <span className="font-semibold">Description:</span>{" "}
                {room.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Adding New Room */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-xl font-bold mb-4">Add New Room</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Room Number</label>
              <input
                type="text"
                name="roomNumber"
                value={newRoom.roomNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Type</label>
              <select
                name="type"
                value={newRoom.type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="">Select Type</option>
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Suite">Suite</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Price</label>
              <input
                type="number"
                name="price"
                value={newRoom.price}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Availability</label>
              <select
                name="isAvailable"
                value={newRoom.isAvailable}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              >
                <option value={true}>Available</option>
                <option value={false}>Not Available</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Features (comma separated)</label>
              <input
                type="text"
                name="features"
                value={newRoom.features}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                name="description"
                value={newRoom.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleCloseModal}
                className="bg-gray-300 px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleAddRoom}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add Room
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminRooms;
