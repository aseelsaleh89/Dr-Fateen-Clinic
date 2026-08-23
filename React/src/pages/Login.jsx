import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../utils/api";
import "./Auth.css";


export default function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  const handleLogin = async (e) => {

    e.preventDefault();
    setError("");

    try {

      const res = await API.post("/auth/login", form);


      if (!res.data.isSuccess) {

        setError(
          res.data.message || "فشل تسجيل الدخول"
        );

        return;
      }


      localStorage.setItem(
        "token",
        res.data.accessToken
      );


      localStorage.setItem(
        "refreshToken",
        res.data.refreshToken
      );


      localStorage.setItem(
        "userId",
        res.data.userId
      );


      localStorage.setItem(
        "role",
        res.data.role
      );
const userData = {
  id: res.data.userId,
  role: res.data.role
};


localStorage.setItem(
  "user",
  JSON.stringify(userData)
);



const role = userData.role?.toUpperCase();


if(role === "ADMIN")
{
    navigate("/admin");
}
else
{
    navigate("/home");
}

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "حدث خطأ أثناء تسجيل الدخول"
      );

    }

  };



  return (

    <div className="auth-wrapper">


      {/* الجانب الخاص بتسجيل الدخول */}

      <div className="auth-left">


        <div className="auth-content">


          <img
            src="/doctor-logo.png"
            className="doctor-logo"
            alt="عيادة د. فاتن صالح"
          />



          <h1>
            عيادة د. فاتن أسامة صالح
          </h1>



          <div className="auth-top">

            <span>
              مرحباً بكم في العيادة
            </span>


            <Link to="/register">
              إنشاء حساب
            </Link>


          </div>



          {
            error &&
            <div className="error-box">
              {error}
            </div>
          }




          <form onSubmit={handleLogin}>


            <label>
              البريد الإلكتروني
            </label>


            <input

              type="email"

              name="email"

              value={form.email}

              onChange={handleChange}

              required

            />




            <label>
              كلمة المرور
            </label>



            <input

              type="password"

              name="password"

              value={form.password}

              onChange={handleChange}

              required

            />




            <div className="forgot-password">

              <Link to="/forgot-password">

                نسيت كلمة المرور؟

              </Link>


            </div>





            <label className="remember">


              <input
                type="checkbox"
              />


              تذكرني


            </label>





            <button type="submit">

              تسجيل الدخول

            </button>




          </form>



        </div>


      </div>





      {/* صورة العيادة */}


      <div className="auth-right">


        <div className="image-overlay">


       



        </div>



      </div>



    </div>

  );

}