import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../../Components/Header_Part/header";

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState([]); // State to hold gallery items
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch gallery items from API
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "api/gallery")
      .then((res) => {
        setGalleryItems(res.data || []); // Safeguard for undefined
        setLoading(false); // Stop loading
      })
      .catch((err) => {
        console.error("Error fetching gallery items:", err.message);
        alert("Failed to load gallery items. Please try again later.");
        setLoading(false); // Stop loading even on error
      });
  }, []);

  // Show loading state
  if (loading) {
    return <div>Loading gallery items...</div>;
  }

  // Show fallback if no items are available
  if (!galleryItems.length) {
    return <div>No gallery items available at the moment.</div>;
  }

  // Main render for gallery
  return (
    <>
    <Header/>
    <div className="flex flex-col items-center min-h-screen bg-gray-50 py-12 px-6">
      <h1 className="text-4xl font-bold text-[#4A4947] mb-8">Gallery</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
        {galleryItems.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-56 w-full object-cover rounded-t-lg"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-[#4A4947] mb-2">{item.title}</h2>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <p className="text-sm text-gray-500 font-medium">By: {item.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
