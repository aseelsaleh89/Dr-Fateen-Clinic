import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Home.css";
import {
  FaBaby,
  FaUserMd,
  FaCalendarCheck,
  FaStethoscope,
  FaPhoneAlt,
  FaMapMarkerAlt
} from "react-icons/fa";

export default function Home() {


  const images = {

    hero: "http://localhost:5120/uploads/clinic.jpg",

    clinicName: "http://localhost:5120/uploads/name.jpg",

  };



  return (

    <div className="home-wrapper">


      <Navbar />



      {/* HERO */}

      <section
        className="hero-section"
        style={{
          backgroundImage: `
          linear-gradient(
          rgba(8,43,85,.45),
          rgba(8,43,85,.45)
          ),
          url(${images.hero})
          `
        }}
      >


        <div className="hero-content">

<div className="hero-text">


<h1>
  رعاية صحية مميزة
  <br/>
  <span>
    لطفلك وعائلتك
  </span>
</h1>


<h2>
  عيادة د. فاتن أسامة صالح
</h2>


<p>
  طبيبة عامة وأطفال ورعاية دوامل
  <br/>
  نهتم بصحة أطفالكم في بيئة آمنة ومريحة
</p>


</div>


          <div className="hero-buttons">


            <Link 
              to="/booking"
              className="main-btn"
            >
              احجز موعدك الآن
            </Link>



            <Link 
              to="/about"
              className="outline-btn"
            >
              تعرف على العيادة
            </Link>


          </div>


        </div>


      </section>







      {/* ABOUT */}


<section className="about-section">


  <div className="about-image">

    <img
      src={images.clinicName}
      alt="Clinic"
      className="hero-image"
    />

  </div>



  <div className="about-text">


    <h2>
      عن عيادة د. فاتن أسامة صالح
    </h2>



    <p>
      عيادة متخصصة في تقديم خدمات الطب العام
      وطب الأطفال، مع الاهتمام براحة المريض
      وتوفير بيئة صحية مناسبة للأطفال والعائلة.
    </p>



    <Link
      to="/about"
      className="main-btn"
    >
      المزيد
    </Link>


  </div>


</section>





      {/* SERVICES */}



      <section className="services-section">


        <h2>
          خدماتنا الطبية
        </h2>



        <div className="services-grid">


        <div className="service-card">

  <div className="service-icon">
    <FaBaby />
  </div>

  <h3>
    طب الأطفال
  </h3>

  <p>
    متابعة صحة الأطفال والنمو والأمراض الشائعة.
  </p>

</div>



          <div className="service-card">

          <div className="service-icon">
  <FaUserMd />
</div>

            <h3>
              الطب العام
            </h3>

            <p>
              الكشف والمتابعة للحالات الصحية العامة.
            </p>

          </div>





          <div className="service-card">

           <div className="service-icon">
  <FaCalendarCheck />
</div>

            <h3>
              حجز المواعيد
            </h3>

            <p>
              احجز موعدك بسهولة عبر الموقع.
            </p>

          </div>



        </div>


      </section>







      {/* BOOKING */}


      <section className="booking-section">


        <h2>
          احجز موعدك الطبي الآن
        </h2>


        <p>
          اختر الوقت المناسب واحصل على موعدك بسهولة.
        </p>



        <Link
          to="/booking"
          className="main-btn"
        >
          بدء الحجز
        </Link>


      </section>







      {/* CONTACT */}


      <section className="contact-section">


        <h2>
          تواصل معنا
        </h2>

<p>
  <FaMapMarkerAlt />
  {" "}
  مزارع النوباني  - الشارع الرئيسي - قرب مسجد عمر الفاروق
</p>


<p>
  <FaPhoneAlt />
  {" "}
  0597372114
</p>


      </section>





      <Footer />


    </div>

  );

}