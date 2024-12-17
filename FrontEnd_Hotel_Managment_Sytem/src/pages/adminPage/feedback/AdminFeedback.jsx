import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminFeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}api/feedback`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // Reverse feedbacks to show the newest at the top
        setFeedbacks(res.data.reverse());
      })
      .catch((err) => {
        console.error("Error fetching feedbacks:", err);
      });
  }, []);

  const approveFeedback = (id) => {
    axios
      .put(
        `${import.meta.env.VITE_API_URL}api/feedback/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        alert("Feedback approved!");
        // Update the state by mapping existing feedbacks
        setFeedbacks((prevFeedbacks) => 
          prevFeedbacks.map((feedback) =>
            feedback._id === id ? { ...feedback, approved: true } : feedback
          )
        );
      })
      .catch((err) => {
        console.error("Error approving feedback:", err);
      });
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-10 px-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Admin - Feedback Management
        </h1>
        {feedbacks.length === 0 ? (
          <p className="text-center text-gray-600">No feedback available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {feedbacks.map((feedback) => (
              <div
                key={feedback._id}
                className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
              >
                <p className="text-lg font-semibold text-gray-800 mb-2">
                  {feedback.clientName}
                </p>
                <p className="text-gray-600 mb-4">{feedback.feedbackText}</p>
                {feedback.approved ? (
                  <p className="text-green-600 font-semibold">Status: Approved</p>
                ) : (
                  <button
                    onClick={() => approveFeedback(feedback._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                  >
                    Approve Feedback
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AdminFeedbackPage;
