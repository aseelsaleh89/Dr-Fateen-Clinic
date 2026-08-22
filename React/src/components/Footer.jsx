import "./Footer.css";
import {
  FaPhoneAlt,
  FaMapMarkerAlt
} from "react-icons/fa";

export default function Footer() {

  return (

    <footer className="footer">


      <div>

        <h2>
          عيادة د. فاتن صالح
        </h2>


        <p>
          رعاية طبية مميزة للأطفال والعائلة
          <br />
          صحتكم وراحتكم أولويتنا.
        </p>


      </div>





      <div>

        <h3>
          روابط سريعة
        </h3>


        <a href="/home">
          الرئيسية
        </a>


        <a href="/about">
          عن الدكتورة
        </a>


        <a href="/booking">
          حجز موعد
        </a>


        <a href="/services">
          الخدمات الطبية
        </a>


      </div>







      <div>

        <h3>
          تواصل معنا
        </h3>


     <p>
  <FaMapMarkerAlt />
  {" "}
  مزارع النوباني  - الشارع الرئيسي
  <br />
  قرب مسجد عمر الفاروق
</p>


<p>
  <FaPhoneAlt />
  {" "}
  0597372114
</p>


        <p>
          🕒 أوقات العمل: حسب المواعيد
        </p>


      </div>




    </footer>

  );

}