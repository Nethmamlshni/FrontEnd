
import { useState } from "react";
import axios from "axios";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    axios
      .post(import.meta.env.VITE_API_URL + "api/user/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        alert("Login Success");
        // Handle successful login response
        localStorage.setItem("token", res.data.token); // Store token
        const token = localStorage.getItem("token");

        if (res.data.user.type === "admin") {
          window.location.href = "/admin"; // Redirect to admin page
        } else {
          window.location.href = "/"; // Redirect to home page
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        alert("Login Failed. Please check your credentials."); // Handle login error
      });
  };

  return (
    <div className="max-w-sm mx-auto mt-20">
      <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
      />
      <button
        className="bg-[#B17457] text-white px-6 py-3 rounded-lg w-full hover:bg-[#9a5f42] transition duration-300"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
}

export default LoginPage;
