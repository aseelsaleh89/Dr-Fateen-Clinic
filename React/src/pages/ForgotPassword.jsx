import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import "./Auth.css";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const res = await API.post("/auth/forgot-password", {
        email: email,
      });

      if (res.data.isSuccess) {
        setMessage(res.data.message);

        setTimeout(() => {
          navigate("/reset-password", {
            state: { email: email },
          });
        }, 1000);
      } else {
        setError(res.data.message || "Failed to send reset code");
      }

    } catch (err) {
      setError(
        err.response?.data?.message || 
        "Something went wrong"
      );
    }
  };


  return (
    <div className="auth-wrapper">

      <div className="auth-left">
        <div className="auth-content">

          <h1>Hotelio</h1>

          <div className="auth-top">
            <span>Forgot Password</span>
          </div>


          {message && (
            <div className="success-box">
              {message}
            </div>
          )}

          {error && (
            <div className="error-box">
              {error}
            </div>
          )}


          <form onSubmit={handleSubmit}>

            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />


            <button type="submit">
              Send Reset Code
            </button>

          </form>


        </div>
      </div>


      <div className="auth-right">
        <div className="image-card">
          <h2>Recover your account</h2>
          <p>
            We will send a password reset code to your email.
          </p>
        </div>
      </div>


    </div>
  );
}