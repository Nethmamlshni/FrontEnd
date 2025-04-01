import Header from "../../../Components/Header_Part/header";
import React, { useState, useEffect } from "react";
import axios from "axios";

function UserData() {
  const [userData, setUserData] = useState(null);
  const [userFound, setUserFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false); // Track edit mode
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    type: "",
  });

  const token = localStorage.getItem("token");


  // Fetch user data on mount
  useEffect(() => {
    if (token) {
      fetchUserData();
    } else {
      console.error("No token found. User not logged in.");
      setLoading(false);
    }
  }, [token]);

  // Function to fetch user data
  const fetchUserData = () => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUserData(res.data.user);
        setEditForm(res.data.user); // Pre-fill form with user data
        setUserFound(true);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          alert("Session expired. Please log in again.");
          localStorage.removeItem("token");
          window.location.href = "/login";
        } else {
          console.error("Error fetching user data:", err.response?.data || err);
          alert("Failed to fetch user data. Try again later.");
        }
        setUserFound(false);
        setLoading(false);
      });
  };

  // Function to handle editing user data
  const handleEdit = () => {
    axios
      .put(
        `${import.meta.env.VITE_API_URL}/api/user/${userData.id}`, // Assuming user ID is required
        editForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        alert("User updated successfully!");
        fetchUserData();
        setIsEditMode(false);
      })
      .catch((err) => {
        console.error("Error updating user data:", err);
        alert("An error occurred while updating user data.");
      });
  };

  // Function to delete the user
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`${import.meta.env.VITE_API_URL}/api/user/${userData.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          alert("User deleted successfully!");
          localStorage.removeItem("token");
          setUserData(null);
          setUserFound(false);
        })
        .catch((err) => {
          console.error("Error deleting user:", err.response?.data || err);
          alert("An error occurred while deleting the user.");
        });
    }
  };

  // Display loading message
  if (loading) {
    return <p className="text-white">Loading...</p>;
  }

  return (
    <>
      <Header />
      <div className="flex flex-col items-center min-h-screen py-12 px-6 bg-blue-300">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">User Details</h1>
        {userFound && userData ? (
          isEditMode ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEdit();
              }}
              className="text-gray-800 bg-white p-6 rounded-lg shadow-lg"
            >
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Name:</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Email:</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Type:</label>
                <input
                  type="text"
                  value={editForm.type}
                  onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded shadow mr-2"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditMode(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded shadow"
              >
                Cancel
              </button>
            </form>
          ) : (
            <div className="text-gray-800 bg-white p-6 rounded-lg shadow-lg">
              <p className="mb-4">
                <strong>Name:</strong> {userData.name || "N/A"}
              </p>
              <p className="mb-4">
                <strong>Email:</strong> {userData.email || "N/A"}
              </p>
              <p className="mb-4">
                <strong>Type:</strong> {userData.type || "N/A"}
              </p>
              <button
                onClick={() => setIsEditMode(true)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow mr-2 hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  setUserData(null);
                  setUserFound(false);
                }}
                className="m-2 text-white bg-red-500 px-4 py-2 rounded-lg shadow hover:bg-red-600 transition duration-300"
              >
                Logout
              </button>
            </div>
          )
        ) : (
          <h1 className="text-lg font-semibold text-gray-800">User not found</h1>
        )}
      </div>
    </>
  );
}

export default UserData;
