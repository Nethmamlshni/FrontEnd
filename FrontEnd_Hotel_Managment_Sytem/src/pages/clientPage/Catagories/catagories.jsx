import axios from "axios";
import React, { useEffect, useState } from "react";
export default function Categories() {
  const [categories, setCategories] = useState([]); // Default to empty array
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "api/category")
      .then((res) => {
        setCategories(res.data || []); // Safeguard for undefined
        setLoading(false); // Stop loading
      })
      .catch((err) => {
        console.error("Error fetching categories:", err.message);
        alert("Failed to load categories. Please try again later.");
        setLoading(false); // Stop loading even on error
      });
  }, []);

  if (loading) {
    return <div>Loading categories...</div>;
  }

  if (!categories.length) {
    return <div>No categories available.</div>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 py-12 px-6">
      <h1 className="text-4xl font-bold text-[#4A4947] mb-8">Room Categories</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            <img
              src={category.image}
              alt={category.name}
              className="h-56 w-full object-cover rounded-t-lg"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-[#4A4947] mb-2">{category.name}</h2>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <div className="flex justify-between items-center">
                <p className="font-bold text-lg text-[#4A4947]">Price: ${category.price}</p>
                <span
                  className={`px-3 py-1 text-sm rounded-full ${
                    category.status === "available"
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {category.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}