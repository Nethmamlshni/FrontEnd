import React, { useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import Header from "../../Components/Header_Part/header";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = searchParams.get("token");
    if (!token) {
      return setError("Invalid or missing token.");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    try {
      const response =  axios.post(
        `${import.meta.env.VITE_API_URL}api/user/resetpassword`,
        { token, password }
      );
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Error resetting password");
    }
  };

  return (
    <>
    <Header/>
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
    </>
  );
}

export default ResetPassword;
