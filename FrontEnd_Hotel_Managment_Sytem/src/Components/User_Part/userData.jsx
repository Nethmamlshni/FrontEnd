
/*import axios from "axios";
import { useState , useEffect} from "react";

function UserData(Props) {
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem("token");
  const [userFound , setUserFound] = useState(false);

      useEffect(() => {
        if (token) {
          axios
            .get(import.meta.env.VITE_API_URL + "api/user", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              setUserData(res.data.user.name);
      
            })
          }}, []
      );
  
    return (
      <div className="flex absolute right-0  rounded-lg mr-4">
        <img
          className="h-16 w-16 rounded-full border-2 border-[#fbfaf9]"
          src={Props.img}
          alt="User Profile"
        />
        <h1 className="ml-4 text-lg font-semibold text-[#f8f7f6]">{Props.name}</h1>
          <button onClick={() => {localStorage.removeItem("token") ,setUserFound(false);
           }} className=" text-white px-1 py-2 rounded-lg shadow hover:bg-[#0a0a0a] transition duration-300">Logout</button>
      </div>
    );
  }
  
  export default UserData;*/
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
    return <p className="text-white">User</p>;
  }

  return (
    <div className="flex items-center space-x-4">
      <img
        className="text-lg font-semibold text-white h-16 w-16 rounded-full border-2 border-white"
        src={
          userFound && userData?.img
            ? userData.img
            : "FrontEnd_Hotel_Managment_Sytem/Photoes/download.png" // Show default profile photo if user not found
        }
        alt="User Profile"
      />
      <h1 className="text-lg font-semibold text-white">
        {userFound && userData?.name ? userData.name : "User"} {/* Show "User" if not found */}
      </h1>
      {userFound && (
        <button
          onClick={() => {
            localStorage.removeItem("token");
            setUserData(null);
            setUserFound(false);
          }}
          className="ml-4 text-white px-3 py-2 rounded-lg shadow hover:bg-black transition duration-300"
        >
          Logout
        </button>
      )}
    </div>
  );
}

export default UserData;