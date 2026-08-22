import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./About.css";


export default function About() {


  return (


    <div className="about-page">


      <Navbar />



      {/* HERO */}


      <section className="about-hero">


        <h1>
          عيادة د. فاتن أسامة صالح
        </h1>


        <p>

          نقدم رعاية طبية مميزة للأطفال والعائلة
          في بيئة صحية آمنة ومريحة تهتم براحة المريض
          وجودة الخدمة الطبية.

        </p>


      </section>







      {/* ABOUT CONTENT */}



      <section className="about-main">



        <div className="about-image">


          <img

            src="http://localhost:5120/uploads/name.jpg"

            alt="عيادة د. فاتن أسامة صالح"

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


          <p>

            نوفر بيئة مريحة وهادئة تساعد الأطفال
            والعائلات على الشعور بالاطمئنان أثناء الزيارة.

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