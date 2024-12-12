import React, { useState } from "react";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  
  const handleSubmit = async () => {
    try {
      const response =  axios.post('/api/user/forgotpassword', {
        email: setEmail, // Email provided by the user
      });
      console.log(response.data.message);
    } catch (error) {
      console.error('Error:', error.response.data.message);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-md w-full space-y-6">
        <h2 className="text-center text-2xl font-bold">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>
          {message && <p className="text-green-600">{message}</p>}
          {error && <p className="text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
