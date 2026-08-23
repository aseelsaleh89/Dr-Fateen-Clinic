import { useEffect, useState } from "react";
import API from "../utils/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Booking.css";


export default function Booking() {


  const [appointments, setAppointments] = useState([]);

  const [selected, setSelected] = useState(null);



  useEffect(() => {

    getAppointments();

  }, []);



const getAppointments = async () => {

  try {

    const res = await API.get("/appointments/available");

    console.log("Appointments:", res.data);

    setAppointments(res.data);

  }
  catch(err){

    console.log("Error:", err);

  }

};




const confirmBooking = async () => {

  if (!selected) {

    alert("اختر موعد");

    return;

  }


  try {

    await API.post(
      "/appointments/book",
      {
        appointmentId: selected.id
      }
    );


    alert("تم حجز الموعد بنجاح");


    getAppointments();

    setSelected(null);


  } catch (err) {

    console.log("BOOK ERROR:", err.response?.data || err);

    alert("حدث خطأ أثناء الحجز");

  }

};




  return (

    <div className="booking-page">


      <Navbar />



      <div className="booking-header">


        <h1>
          احجز موعدك الطبي
        </h1>


        <p>
          اختر الوقت المناسب لك
        </p>


      </div>





      <div className="appointments-grid">



        {
          appointments.map((item) => (


            <div

              key={item.id}

              className={
                `appointment-card ${
                  selected?.id === item.id
                    ? "selected"
                    : ""
                }`
              }


              onClick={() => setSelected(item)}

            >



              <div className="appointment-info">


                <h2>

                  {
                    new Date(item.date)
                    .toLocaleDateString("ar-EG")
                  }

                </h2>



              <p>
  {item.time}
</p>



                <p>

                  {
                    item.isAvailable
                    ?
                    "متاح"
                    :
                    "محجوز"
                  }

                </p>




                <button type="button">


                  {
                    selected?.id === item.id
                    ?
                    "تم الاختيار"
                    :
                    "اختيار الموعد"
                  }


                </button>



              </div>



            </div>


          ))
        }




      </div>





      <div className="booking-actions">


        <button
          onClick={confirmBooking}
        >

          تأكيد الحجز

        </button>



      </div>





      <Footer />



    </div>

  );

}