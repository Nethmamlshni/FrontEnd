import React, { useState } from "react";

const initialFeedback = [
  {
    name: "John Doe",
    message: "The stay was amazing, will definitely return!",
  },
  {
    name: "Jane Smith",
    message: "Very comfortable and luxurious experience.",
  },
];

function AdminFeedback() {
  const [feedbackList, setFeedbackList] = useState(initialFeedback);
  const [showModal, setShowModal] = useState(false);
  const [newFeedback, setNewFeedback] = useState({ name: "", message: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFeedback({ ...newFeedback, [name]: value });
  };

  const handleAddFeedback = (e) => {
    e.preventDefault();
    setFeedbackList([...feedbackList, newFeedback]);
    setShowModal(false);
    setNewFeedback({ name: "", message: "" });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-[#4A4947] mb-8">
        Guest Feedback Management
      </h1>
      <button
        className="bg-[#B17457] text-white px-6 py-3 rounded-lg mb-6 mx-auto block hover:bg-[#9a5f42] transition duration-300"
        onClick={() => setShowModal(true)}
      >
        + Add Feedback
      </button>

      {/* Feedback Display */}
      <div className="space-y-8">
        {feedbackList.map((feedback, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
            <h3 className="font-semibold text-xl text-[#B17457]">{feedback.name}</h3>
            <p className="text-sm text-gray-600 mt-2">{feedback.message}</p>
          </div>
        ))}
      </div>

      {/* Add Feedback Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add New Feedback</h2>
            <form onSubmit={handleAddFeedback}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newFeedback.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B17457]"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  value={newFeedback.message}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B17457]"
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-300 px-4 py-2 rounded-lg mr-2"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="bg-[#B17457] text-white px-4 py-2 rounded-lg">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminFeedback;
