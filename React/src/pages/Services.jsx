import { useEffect, useState } from "react";
import API from "../utils/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Rooms.css";
import { useNavigate } from "react-router-dom";


export default function Services(){

const [services,setServices]=useState([]);

const [loading,setLoading]=useState(true);

const navigate=useNavigate();



useEffect(()=>{

getServices();

},[]);



const getServices=async()=>{

try{

const res=await API.get("/services");

setServices(res.data);


}

catch(err){

console.log(err);

}

finally{

setLoading(false);

}

};



return(

<div className="rooms-page">


<Navbar />


<section className="rooms-header">

<p>
رعاية صحية متكاملة
</p>

<h1>
خدماتنا الطبية
</h1>

</section>



{
loading &&

<p className="rooms-message">
Loading...
</p>

}




<section className="rooms-grid">


{
services.map(service=>(


<div className="room-card" key={service.id}>


<img

src={service.imageUrl}

alt={service.name}

/>



<div className="room-overlay"></div>



<div className="room-content">


<h2>

{service.name}

</h2>


<p>

{service.description}

</p>



</div>



<button

className="details-btn"

onClick={()=>navigate("/booking")}

>

احجز موعد

</button>



</div>



))

}



</section>



<Footer />

</div>


)

}