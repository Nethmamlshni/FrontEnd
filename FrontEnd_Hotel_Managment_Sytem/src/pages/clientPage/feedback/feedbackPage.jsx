import React, { useState, useEffect } from "react";
import axios from "axios";
import ClientFeedbackPage from "./appoveFeedback";
import Header from "../../../Components/Header_Part/header";

const ClientFeedbackPages = () => {
    const [feedback, setFeedback] = useState("");
    const [userData, setUserData] = useState(null);
      const [userFound, setUserFound] = useState(false);
      const [loading, setLoading] = useState(true);
      

   const token = localStorage.getItem("token");
   
     useEffect(() => {
       if (token) {
         fetchUserData();
       } else {
         console.error("No token found. User not logged in.");
         setLoading(false);
       }
     }, [token]);
   
    const fetchUserData = () => {
        setLoading(true);
        axios
          .get(`${import.meta.env.VITE_API_URL}/api/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setUserData(res.data.user);
            setUserFound(true);
            setLoading(false);
          })
          .catch((err) => {
            console.error("Error fetching user data:", err.response?.data || err);
            setUserFound(false);
            setLoading(false);
          });
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(`${import.meta.env.VITE_API_URL}/api/feedback`, { name: userData.name, feedbackText: feedback })
            .then(() => {
                alert("Feedback submitted successfully!");
                setFeedback("");
            })
            .catch((err) => {
                alert("Error submitting feedback.");
            });
    };
    if (loading) {
        return <p className="text-white">Loading...</p>;
      }

      if (!userFound) {
        alert("User not found. Please log in again.");
      }    

    return (
        <>
        <Header/>
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Submit Your Feedback</h1>
            <form
                className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg space-y-4"
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    placeholder="Your Name"
                    value={userData.name}
                    onChange={(e) => setName()}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                    placeholder="Your Feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                ></textarea>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-semibold rounded-lg px-4 py-2 hover:bg-blue-600 transition duration-300"
                >
                    Submit Feedback
                </button>
            </form>
            <div className="mt-10 w-full max-w-4xl">
                <ClientFeedbackPage />
            </div>
        </div>
        </>
    );
};

export default ClientFeedbackPages;