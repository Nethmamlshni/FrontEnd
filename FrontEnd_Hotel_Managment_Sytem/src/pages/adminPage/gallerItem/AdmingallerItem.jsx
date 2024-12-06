// AdminGalleryItem.js
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    name: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);

  // Fetch gallery items on load
  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = () => {
    setLoading(true);
    axios
      .get(import.meta.env.VITE_API_URL + "api/gallery")
      .then((res) => {
        setGalleryItems(res.data.galleryItems);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching gallery items:", err);
        setLoading(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      // Update gallery item
      axios
        .put(
          `${import.meta.env.VITE_API_URL}api/gallery/${encodeURIComponent(form.name)}`,
          form,
          
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }, 
          }
        )
        .then(() => {
          alert("Gallery item updated successfully!");
          fetchGalleryItems();
          resetForm();
        })
        .catch((err) => {
          console.error("Error updating gallery item:", err);
          alert("An error occurred while updating the gallery item.");
        });
    } else {
      // Add new gallery item
      axios
      .post(`${import.meta.env.VITE_API_URL}api/gallery`, form, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => {
          alert("Gallery item added successfully!");
          fetchGalleryItems();
          resetForm();
        })
        .catch((err) => {
          console.error("Error adding gallery item:", err);
          alert("An error occurred while adding the gallery item.");
        });
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      image: "",
      name: "",
    });
    setIsEditMode(false);
  };

  const handleEdit = (name) => {
    setForm(name);
    setIsEditMode(true);
  };

  const handleDelete = (name) => {
    if (window.confirm(`Are you sure you want to delete the gallery item '${name}'?`)) {
      axios
        .delete(`${import.meta.env.VITE_API_URL}api/gallery/${encodeURIComponent(name)}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => {
          alert("Gallery item deleted successfully!");
          fetchGalleryItems();
        })
        .catch((err) => {
          console.error("Error deleting gallery item:", err);
          alert("An error occurred while deleting the gallery item.");
        });
    }
  };

  if (loading) {
    return <div>Loading gallery items...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Gallery Management</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">{isEditMode ? "Edit Item" : "Add New Item"}</h2>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          className="w-full mb-4 p-2 border rounded"
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
          className="w-full mb-4 p-2 border rounded"
        ></textarea>
        <input
          type="text"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          required
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Name (Unique Identifier)"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="w-full mb-4 p-2 border rounded"
          disabled={isEditMode}
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          {isEditMode ? "Update Item" : "Add Item"}
        </button>
        {isEditMode && (
          <button
            type="button"
            onClick={resetForm}
            className="w-full bg-gray-500 text-white p-2 rounded mt-4"
          >
            Cancel
          </button>
        )}
      </form>

      {/* Gallery Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryItems.map((item) => (
          <div key={item.name} className="bg-white p-6 rounded-lg shadow-md">
            <img
              src={item.image}
              alt={item.title}
              className="h-40 w-full object-cover rounded mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600 mb-4">{item.description}</p>
            <button
              onClick={() => handleEdit(item)}
              className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(item.name)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
