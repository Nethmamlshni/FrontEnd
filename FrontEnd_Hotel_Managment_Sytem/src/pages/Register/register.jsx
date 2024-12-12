import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../../Components/Header_Part/header";


export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null); // State for Image
  const [type, setType] = useState("user"); // State for Type (default to "user")
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState(null); // For error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}api/user`,
        {
          name: name,
          email: email,
          password: password,
          image: image,
          type: type,
        },
        {
        headers: {
          "Content-Type": "application/json", 
        }
        }
      );
      
      alert("Registration successful");
      setName("");
      setEmail("");
      setPassword("");
      setImage(null);
      setType("user");
    } catch (error) {
      console.error("Error registering:", error);
      setError(
        error.res?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12 px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Register for an account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                  </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                  Upload Image
                </label>
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  className="mt-1 block w-full"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                  Account Type
                </label>
                <select
                  id="type"
                  name="type"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white text-gray-700 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            {error && (
              <div className="text-red-500 text-sm mt-2">{error}</div>
            )} 
           <div className="flex justify-between items-center mt-4">
  <Link to="/login" className="text-indigo-600 hover:text-indigo-500">
    Already have an account? Login
  </Link>
  
</div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                  loading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
                }`}
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </div>
          </form>

        </div>
      </div>
    </>
  );
}
