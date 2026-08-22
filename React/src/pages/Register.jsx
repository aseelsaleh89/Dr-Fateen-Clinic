import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../utils/api";
import "./Auth.css";


export default function Register() {

  const navigate = useNavigate();


  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });


  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");



  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };





  const handleRegister = async (e) => {

    e.preventDefault();

    setError("");

    setSuccess("");



    try {


      const res = await API.post(
        "/auth/register",
        form
      );



      setSuccess(
        res.data.message ||
        "تم إنشاء الحساب بنجاح"
      );



      setTimeout(() => {

        navigate("/login");

      }, 1500);



    }


    catch(err){


      console.log(
        "REGISTER ERROR DATA:",
        err.response?.data
      );



      const data = err.response?.data;



      if(data?.errors){


        setError(

          Array.isArray(data.errors)

          ? data.errors.join(" | ")

          : Object.values(data.errors)
              .flat()
              .join(" | ")

        );


      }

      else{


        setError(
          data?.message ||
          "فشل إنشاء الحساب"
        );


      }


    }


  };





  return (


    <div className="auth-wrapper">


      {/* قسم التسجيل */}


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
    إنشاء حساب مريض جديد
  </span>

  <Link to="/login">
    تسجيل الدخول
  </Link>

</div>










          {
            error &&

            <div className="error-box">

              {error}

            </div>

          }




          {
            success &&

            <div className="success-box">

              {success}

            </div>

          }





          <form onSubmit={handleRegister}>



            <label>
              الاسم الكامل
            </label>


            <input

              type="text"

              name="fullName"

              value={form.fullName}

              onChange={handleChange}

              required

            />






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







            <button type="submit">

              إنشاء الحساب

            </button>




          </form>



        </div>



      </div>






      {/* صورة العيادة */}


      <div className="auth-right">


   



      </div>





    </div>


  );

}