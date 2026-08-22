import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../utils/api";
import "./Auth.css";


export default function ResetPassword() {

  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: location.state?.email || "",
    resetCode: "",
    newPassword: "",
  });


  const [message, setMessage] = useState("");
  const [error, setError] = useState("");


  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async(e)=>{
    e.preventDefault();

    setMessage("");
    setError("");


    try {

      const res = await API.post(
        "/auth/reset-password",
        form
      );


      if(res.data.isSuccess){

        setMessage(res.data.message);


        setTimeout(()=>{
          navigate("/login");
        },1500);


      }else{

        setError(
          res.data.message || 
          "Password reset failed"
        );

      }


    }catch(err){

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
            <span>Reset Password</span>
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
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />



            <label>Reset Code</label>

            <input
              type="text"
              name="resetCode"
              value={form.resetCode}
              onChange={handleChange}
              placeholder="Enter code"
              required
            />



            <label>New Password</label>

            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              placeholder="New password"
              required
            />



            <button type="submit">
              Reset Password
            </button>


          </form>


        </div>

      </div>



      <div className="auth-right">

        <div className="image-card">

          <h2>Create new password</h2>

          <p>
            Enter the code sent to your email.
          </p>

        </div>

      </div>


    </div>

  );

}