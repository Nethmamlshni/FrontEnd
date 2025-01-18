import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    image: "",
    description: "",
    status: "available",
    price: "",
    feacuters: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    setLoading(true);
    axios
      .get(import.meta.env.VITE_API_URL + "/api/category", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setCategories(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setLoading(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const request = isEditMode
      ? axios.put(
          `${import.meta.env.VITE_API_URL}api/category/${encodeURIComponent(form.name)}`,
          form,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        )
      : axios.post(`${import.meta.env.VITE_API_URL}api/category`, form, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

    request
      .then(() => {
        alert(isEditMode ? "Category updated successfully!" : "Category added successfully!");
        fetchCategories();
        resetForm();
      })
      .catch((err) => {
        console.error(
          isEditMode ? "Error updating category:" : "Error adding category:",
          err
        );
      });
  };

  const resetForm = () => {
    setForm({
      name: "",
      image: "",
      description: "",
      status: "available",
      price: "",
      feacuters: "",
    });
    setIsEditMode(false);
    setModalVisible(false); // Hide modal on reset
  };

  const handleEdit = (category) => {
    setForm(category);
    setIsEditMode(true);
    setModalVisible(true); // Open modal for edit
  };

  const handleDelete = (name) => {
    if (window.confirm(`Are you sure you want to delete the category '${name}'?`)) {
      axios
        .delete(`${import.meta.env.VITE_API_URL}api/category/${name}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then(() => {
          alert("Category deleted successfully!");
          fetchCategories();
        })
        .catch((err) => {
          console.error("Error deleting category:", err);
          alert("An error occurred while deleting the category.");
        });
    }
  };

  if (loading) {
    return <div>Loading categories...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Categories</h1>

      {/* Toggle Modal Button */}
      <button
        onClick={() => setModalVisible(true)}
        className="mb-6 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded"
      >
        Add Category
      </button>

      {/* Modal */}
      {modalVisible && (
        <div
          className="fixed top-0 right-0 left-0 z-50 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50"
          aria-hidden="true"
        >
          <div className="relative p-6 bg-white rounded-lg shadow-md w-full max-w-md">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">
                {isEditMode ? "Edit Category" : "Add Category"}
              </h3>
              <button
                onClick={() => resetForm()}
                className="text-gray-500 hover:bg-gray-200 p-2 rounded"
              >
                ✕
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full p-2 border rounded"
                disabled={isEditMode} // Disable editing name in edit mode
              />
              <input
                type="text"
                placeholder="Image URL"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                required
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
                placeholder="Features"
                value={form.feacuters}
                onChange={(e) => setForm({ ...form, feacuters: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                required
                className="w-full p-2 border rounded"
              >
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </select>
              <input
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                required
                className="w-full p-2 border rounded"
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded"
              >
                {isEditMode ? "Update Category" : "Add Category"}
              </button>
              {isEditMode && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="w-full bg-gray-500 text-white py-2 px-4 rounded mt-4"
                >
                  Cancel
                </button>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Categories List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.name} className="p-4 bg-gray-100 rounded shadow">
            <img
              src={category.image}
              alt={category.name}
              className="h-40 w-full object-cover rounded mb-4"
            />
            <h3 className="font-bold text-lg">{category.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{category.description}</p>
            <p className="text-sm text-gray-600 mb-2">
              Features: {category.feacuters}
            </p>
            <p className="text-lg font-semibold mb-4">Price: {category.price}</p>
            <button
              onClick={() => handleEdit(category)}
              className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(category.name)}
              className="bg-red-500 text-white py-1 px-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
