
import React, { useState, useEffect } from "react";
import axios from "axios";
function UserData() {
  const [userData, setUserData] = useState(null); // Stores user data
  const [userFound, setUserFound] = useState(false); // Tracks if user is found
  const [loading, setLoading] = useState(true); // Tracks loading state
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios
        .get(`${import.meta.env.VITE_API_URL}api/user`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include "Bearer" in header
          },
        })
        .then((res) => {
          setUserData(res.data.user);
          setUserFound(true); // User data found
          setLoading(false); // Loading complete
        })
        .catch((err) => {
          console.error("Error fetching user data:", err.response?.data || err);
          setUserFound(false); // User data not found
          setLoading(false); // Loading complete
        });
    } else {
      console.error("No token found. User not logged in.");
      setLoading(false); // Loading complete if no token
    }
  }, [token]);

  if (loading) {
    return <p className="text-white">Loading...</p>; // Show a loading message
  }

 
    if (!userFound) {
      return (
        <div className="flex flex-col items-center">
          <img
            src="/Photoes/download.png" // Replace with the actual path to your default profile picture
            alt="Default Profile"
            className="w-20 h-20 rounded-full border-2 border-white cursor-pointer " // Example styling for a circular image
            onClick={() => {
              window.location.href = "/login"; // Redirect to login page
            }}
          />
          </div>
      );
    }
    


  return (
    <div className="flex items-center space-x-4">
      <img
        className=" h-16 w-16 rounded-full  cursor-pointer"
        src={
          userFound && userData?.img
            ? userData.img
            : "/Photoes/download.png" // Show default profile photo if user not found
        }
        alt="User Profile"
        onClick={() => {
          window.location.href = "/UserDetails "; // Redirect to login page
        }}
      />
    </div>
  );
}

export default UserData;