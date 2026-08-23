import { useEffect, useState } from "react";
import API from "../utils/api";


export default function Patients(){


const [patients,setPatients] = useState([]);

const [error,setError] = useState("");




// جلب المرضى من الحجوزات

const getPatients = async()=>{


try{


const res = await API.get(
"/Appointments/admin"
);



// فقط الحجوزات التي فيها مريض

const bookedPatients = res.data
.filter(item => !item.isAvailable)
.map(item=>({

name:item.patientName,

phone:item.phoneNumber

}));


setPatients(bookedPatients);



}

catch(err){

console.log(err);

setError("فشل تحميل المرضى");

}


};





useEffect(()=>{

getPatients();

},[]);






return (


<div className="page-box">


<h2>
المرضى
</h2>



{
error &&
<div className="error-box">
{error}
</div>
}





<div className="patients">


{

patients.map((p,index)=>(


<div 
className="patient-card"
key={index}
>


<h3>

{p.name || "غير معروف"}

</h3>


<p>

📞 {p.phone || "-"}

</p>


</div>


))


}



</div>



</div>


);


}