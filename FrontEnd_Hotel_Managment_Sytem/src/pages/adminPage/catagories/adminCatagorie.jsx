import React, { useState } from "react";

const initialCategories = [
  {
    name: "Deluxe Room",
    image: "deluxe-room.jpg",
    description: "Spacious room with premium amenities and sea view.",
    status: "Available",
    price: 250,
    features: ["Sea view", "King-size bed", "Free Wi-Fi"],
  },
  {
    name: "Standard Room",
    image: "standard-room.jpg",
    description: "Comfortable room with essential amenities.",
    status: "Available",
    price: 150,
    features: ["Queen-size bed", "Television", "Free Wi-Fi"],
  },
];

function AdminCategories() {
  const [showModal, setShowModal] = useState(false);

  const handleAddCategory = (e) => {
    e.preventDefault();

    const form = e.target;
    const newCategory = {
      name: form.name.value,
      image: form.image.value,
      description: form.description.value,
      status: form.status.value,
      price: form.price.value,
      features: form.features.value.split(",").map((f) => f.trim()),
    };

    // Assuming you directly update the categories here, or call a function to save the data
    console.log(newCategory);

    setShowModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-[#4A4947] mb-8">
        Room Categories
      </h1>
      <button
        className="bg-[#B17457] text-white px-6 py-3 rounded-lg mb-6 mx-auto block hover:bg-[#9a5f42] transition duration-300"
        onClick={() => setShowModal(true)}
      >
        + Add Room Category
      </button>

      {/* Room Categories Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {initialCategories.map((category, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800">{category.name}</h3>
              <p className="text-sm text-gray-600 mt-2">{category.description}</p>
              <div className="mt-4">
                <span
                  className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                    category.status === "Available"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {category.status}
                </span>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <p className="text-lg font-semibold text-gray-900">${category.price}</p>
                <ul className="space-y-1 text-sm text-gray-600">
                  {category.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <span className="text-green-500">✔</span> {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Category Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add New Room Category</h2>
            <form onSubmit={handleAddCategory}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B17457]"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Image</label>
                <input
                  type="text"
                  name="image"
                  required
                  placeholder="Image URL"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B17457]"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  name="description"
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B17457]"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  name="status"
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B17457]"
                >
                  <option value="Available">Available</option>
                  <option value="Unavailable">Unavailable</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Price</label>
                <input
                  type="number"
                  name="price"
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B17457]"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Features</label>
                <input
                  type="text"
                  name="features"
                  required
                  placeholder="Comma-separated features"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B17457]"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-300 px-4 py-2 rounded-lg mr-2"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#B17457] text-white px-4 py-2 rounded-lg"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCategories;
