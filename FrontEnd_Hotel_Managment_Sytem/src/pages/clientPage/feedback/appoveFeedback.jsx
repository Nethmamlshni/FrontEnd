import React, { useState, useEffect } from "react";
import axios from "axios";

const ClientFeedbackPage = () => {
    const [approvedFeedbacks, setApprovedFeedbacks] = useState([]);

    useEffect(() => {
        axios
        .get(`${import.meta.env.VITE_API_URL}api/feedback/approved`,
 {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure token is retrieved
            },
        })
        .then((res) => {
            setApprovedFeedbacks(res.data);
        })
        .catch((err) => {
            console.error("Error fetching approved feedbacks:", err);
        });
    }, []);
    

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4 flex flex-col items-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Feedback</h1>
          {approvedFeedbacks.length === 0 ? (
            <p className="text-gray-600">No approved feedback available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full max-w-6xl">
              {approvedFeedbacks.map((feedback) => (
                <div
                  key={feedback._id}
                  className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
                >
                  <p className="text-lg font-semibold text-gray-800">{feedback.clientName}</p>
                  <p className="text-gray-600 mt-2">{feedback.feedbackText}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      );
      
};

export default ClientFeedbackPage;
