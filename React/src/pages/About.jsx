import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./About.css";

import { useEffect, useRef, useState } from "react";
export default function About() {
  const [showImage, setShowImage] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowImage(true);
        }
      },
      { threshold: 0.1 }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  return (

    <div className="about-page">


      <Navbar />



      {/* HERO */}


      <section className="about-hero">


       <h1 className="title-animation">

  <span>عيادة</span>
  <span>د.</span>
  <span>فاتن</span>
  <span>أسامة</span>
  <span>صالح</span>

</h1>



        <p className="word-animation">

          <span>نقدم</span>
          <span>رعاية</span>
          <span>طبية</span>
          <span>مميزة</span>
          <span>للأطفال</span>
          <span>والعائلة</span>
          <span>في</span>
          <span>بيئة</span>
          <span>صحية</span>
          <span>آمنة</span>
          <span>ومريحة</span>
          <span>تهتم</span>
          <span>براحة</span>
          <span>المريض</span>
          <span>وجودة</span>
          <span>الخدمة</span>
          <span>الطبية</span>

        </p>


      </section>







      {/* ABOUT MAIN */}


      <section className="about-main">



       <div 
className="about-image"
ref={imageRef}
>


  <img

src="http://localhost:5120/uploads/name.jpg"

alt="عيادة د. فاتن أسامة صالح"

className={showImage ? "about-show" : ""}

/>


        </div>





        <div className="about-description">


          <h2>
            عن الدكتورة
          </h2>



          <p>

            عيادة د. فاتن أسامة صالح تهدف إلى تقديم
            رعاية طبية شاملة للأطفال والعائلة، مع
            الاهتمام بالتشخيص الدقيق والمتابعة المستمرة
            في أجواء مريحة وآمنة.

          </p>




          <Link

            to="/booking"

            className="about-btn"

          >

            احجز موعدك

          </Link>



        </div>



      </section>









      {/* CARDS */}



      <section className="about-content">





        <div>


          <h2>
            رؤيتنا
          </h2>



          <p>

            تقديم خدمات طبية ذات جودة عالية مع بناء
            علاقة ثقة واهتمام بين الطبيب والمريض.

          </p>


        </div>







        <div>


          <h2>
            خدماتنا
          </h2>



          <p>

            متابعة الأطفال، الكشف الطبي العام،
            والاستشارات الصحية مع توفير الرعاية
            المناسبة لكل حالة.

          </p>


        </div>








        <div>


          <h2>
            بيئة العيادة
          </h2>




          <p className="word-animation">


            <span>نوفر</span>
            <span>بيئة</span>
            <span>مريحة</span>
            <span>وهادئة</span>
            <span>تساعد</span>
            <span>الأطفال</span>
            <span>والعائلات</span>
            <span>على</span>
            <span>الشعور</span>
            <span>بالاطمئنان</span>


          </p>


        </div>




      </section>









      {/* ACTION */}



      <section className="about-action">


        <Link to="/booking">

          احجز موعدك الآن

        </Link>


      </section>








      <Footer />



    </div>


  );

}