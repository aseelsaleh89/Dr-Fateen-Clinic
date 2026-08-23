import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Home.css";

import { useEffect, useRef, useState } from "react";

import {
  FaBaby,
  FaUserMd,
  FaCalendarCheck,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaHeart,
  FaStethoscope,
  FaHospital
} from "react-icons/fa";



export default function Home() {


const images = {

  hero:
  "http://localhost:5120/uploads/clinic.jpg",

  clinicName:
  "http://localhost:5120/uploads/name.jpg",

  booking:
  "http://localhost:5120/uploads/booking.jpg"

};





/* ================= IMAGE ANIMATION ================= */


const imageRef = useRef(null);

const bookingImageRef = useRef(null);



const [showImage,setShowImage] = useState(false);

const [showBookingImage,setShowBookingImage] = useState(false);






useEffect(()=>{


const aboutObserver = new IntersectionObserver(


(entries)=>{


entries.forEach(entry=>{


if(entry.isIntersecting){

setShowImage(true);

}


});


},


{
threshold:0.3
}


);





const bookingObserver = new IntersectionObserver(


(entries)=>{


entries.forEach(entry=>{


if(entry.isIntersecting){

setShowBookingImage(true);

}


});


},


{
threshold:0.3
}


);







if(imageRef.current){

aboutObserver.observe(imageRef.current);

}





if(bookingImageRef.current){

bookingObserver.observe(bookingImageRef.current);

}







return ()=>{


if(imageRef.current){

aboutObserver.unobserve(imageRef.current);

}



if(bookingImageRef.current){

bookingObserver.unobserve(bookingImageRef.current);

}



};



},[]);





return (

<div className="home-wrapper">


<Navbar />




{/* HERO */}

<section
className="hero-section"
style={{
backgroundImage:`
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


<div 
className="about-image"
ref={imageRef}
>

<img

src={images.clinicName}

alt="Clinic"

className={showImage ? "about-show" : ""}

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
<FaBaby/>
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
<FaUserMd/>
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
<FaCalendarCheck/>
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

{/* WHY CHOOSE US */}

<section className="why-section">


<h2>
  لماذا تختار عيادتنا؟
</h2>


<div className="why-grid">



<div className="why-card">

<div className="why-icon">
<FaHeart />
</div>


<h3>
رعاية واهتمام
</h3>


<p>
نهتم براحة المريض ونقدم رعاية صحية مميزة للأطفال والعائلة.
</p>


</div>




<div className="why-card">

<div className="why-icon">
<FaStethoscope />
</div>


<h3>
متابعة طبية
</h3>


<p>
متابعة مستمرة وتشخيص دقيق للحالات الصحية المختلفة.
</p>


</div>




<div className="why-card">

<div className="why-icon">
<FaHospital />
</div>


<h3>
بيئة آمنة
</h3>


<p>
عيادة مجهزة في بيئة صحية ومريحة تناسب الأطفال والعائلة.
</p>


</div>



</div>


</section>





{/* BOOKING */}


<section className="booking-wrapper">



<div className="booking-image-box">


<img

ref={bookingImageRef}

src={images.booking}

alt="حجز موعد طبي"

className={showBookingImage ? "booking-show" : ""}

/>


</div>






<div className="booking-text-box">


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


</div>



</section>









{/* CONTACT */}


<section className="contact-section">



<h2>
تواصل معنا
</h2>



<p className="contact-subtitle">

يسعدنا تواصلكم معنا لحجز المواعيد
والاستفسار عن خدمات العيادة

</p>




<div className="contact-box">



<div className="contact-item">


<FaMapMarkerAlt/>


<div>

<h3>
العنوان
</h3>


<p>
مزارع النوباني - الشارع الرئيسي
<br/>
قرب مسجد عمر الفاروق
</p>


</div>


</div>





<div className="contact-item">


<FaPhoneAlt/>


<div>

<h3>
الهاتف
</h3>


<p>
0597372114
</p>


</div>


</div>




</div>



</section>





<Footer/>


</div>

  );

}