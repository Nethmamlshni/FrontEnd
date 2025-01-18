
import { useState } from "react";
import axios from "axios";
import Header from "../../Components/Header_Part/header";
import { Link } from "react-router-dom";

function LoginPage() {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    axios
      .post(import.meta.env.VITE_API_URL + "/api/user/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        alert("Login Success");
        // Handle successful login response
        localStorage.setItem("token", res.data.token); // Store token
        const token = localStorage.getItem("token");

        if (res.data.user.type !== "admin") {
          console.log(res.data.user);
            window.location.href = "/";
           // Redirect to admin page
        } else {
          
          window.location.href = "/admin"; // Redirect to home page
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        alert("Login Failed. Please check your credentials."); // Handle login error
      });
  };

  return (
    <>
    <Header/>
    <div
      className="h-screen w-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url('https://www.bestoflanka.com/images/slider/recommended-stays-sri-lanka/stay-on-the-beach-sri-lanka/01.jpg')`, // Replace with your image URL
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div> {/* Dark overlay */}
      <div className="flex items-center justify-center h-full">
        <div className=" backdrop-blur-md max-w-sm w-full p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold text-center mb-6 text-white">
            Login
          </h1>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full bg-white/80"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full bg-white/80"
          />
          <Link to="/forgot-password" className="text-white hover:text-white-500">
    Forgot your password?
  </Link>
          <button
            className="bg-[#B17457] text-white px-6 py-3 rounded-lg w-full hover:bg-[#9a5f42] transition duration-300"
            onClick={handleLogin}
          >
            Login
          </button>
          
        </div>
      </div>
    </div>
    </>
  );
}

export default LoginPage;
