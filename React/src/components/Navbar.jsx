import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { FaCalendarCheck } from "react-icons/fa";

export default function Navbar() {

  const location = useLocation();


  const isHome =
    location.pathname === "/home" ||
    location.pathname === "/";



  return (

    <nav className={`navbar ${isHome ? "navbar-light" : "navbar-dark"}`}>



      <Link 
        to="/home" 
        className="navbar-logo"
      >

       <Link 
 to="/home" 
 className="navbar-logo"
>

<img 
 src="/doctor-logo.png"
 alt="عيادة د. فاتن صالح"
/>

</Link>

      </Link>





      <div className="navbar-links">


        <Link to="/home">
          الرئيسية
        </Link>



        <Link to="/about">
          عن الدكتورة
        </Link>



        <Link to="/services">
          الخدمات
        </Link>



        <Link to="/login">
          تسجيل الدخول
        </Link>



        <Link to="/register">
          إنشاء حساب
        </Link>



      </div>





      <Link 
        to="/booking" 
        className="contact-btn"
      >

     <FaCalendarCheck />
{" "}
احجز موعد

      </Link>



    </nav>

  );

}