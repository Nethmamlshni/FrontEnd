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
  const [isEditMode, setIsEditMode] = useState(false); // To check whether we're editing
  const [showForm, setShowForm] = useState(false); // Controls the visibility of the form

  // Fetch gallery items on load
  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = () => {
    setLoading(true);
    axios
      .get(import.meta.env.VITE_API_URL + "api/gallery")
      .then((res) => {
        setGalleryItems(res.data.reverse()); // Ensure newest items are shown first
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
          setShowForm(false); // Hide the form after submission
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
        .then((res) => {
          alert("Gallery item added successfully!");
          setGalleryItems((prev) => [res.data, ...prev]); // Prepend the new item
          resetForm();
          setShowForm(false); // Hide the form after submission
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

  const handleEdit = (item) => {
    setForm(item);
    setIsEditMode(true);
    setShowForm(true); // Show form when editing an item
  };

  const handleAddNew = () => {
    resetForm(); // Clear form data before adding new item
    setIsEditMode(false);
    setShowForm(true); // Show form when adding a new item
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
          setGalleryItems((prev) => prev.filter((item) => item.name !== name));
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
  if (!Array.isArray(galleryItems)) {
    return <div>Error loading gallery items. Please try again.</div>;
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Gallery Management</h1>

        {/* Add/Edit Form, only visible when showForm is true */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mb-8"
            style={{ zIndex: 10, position: "relative" }}
          >
            <h2 className="text-2xl font-semibold mb-4">
              {isEditMode ? "Edit Item" : "Add New Item"}
            </h2>
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
        )}

        {/* Add New Item Button */}
        {!showForm && (
          <button
            onClick={handleAddNew}
            className="mb-6 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded"
          >
            Add New Gallery Item
          </button>
        )}

        {/* Gallery Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <div key={item.name} className="bg-white p-6 rounded-lg shadow-md relative">
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
    </>
  );
}
