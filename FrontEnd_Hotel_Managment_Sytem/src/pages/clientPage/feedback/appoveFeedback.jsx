import React, { useState, useEffect } from "react";
import axios from "axios";


const ClientFeedbackPage = () => {
    const [approvedFeedbacks, setApprovedFeedbacks] = useState([]);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}api/feedback`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                // Filter only approved feedback
                setApprovedFeedbacks(res.data.filter((feedback) => feedback.approved));
                console.log(res.data);
            })
            .catch((err) => {
                console.error("Error fetching feedbacks:", err);
            });
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4 flex flex-col items-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Approved Feedback</h1>
            {approvedFeedbacks.length === 0 ? (
                <p className="text-gray-600">No approved feedback available.</p>
            ) : (
                <ul className="w-full max-w-4xl space-y-4">
                    {approvedFeedbacks.map((feedback) => (
                        <li
                            key={feedback._id}
                            className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
                        >
                            <p className="text-lg font-semibold text-gray-800">{feedback.clientName}</p>
                            <p className="text-gray-600 mt-2">{feedback.feedbackText}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ClientFeedbackPage;
