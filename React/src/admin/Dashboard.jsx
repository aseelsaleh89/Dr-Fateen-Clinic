import {
 FaCalendarCheck,
 FaUsers,
 FaClock,
 FaCheckCircle
} from "react-icons/fa";

import { useEffect, useState } from "react";
import API from "../utils/api";


export default function Dashboard(){


const [stats,setStats] = useState({

appointments:0,
patients:0,
today:0,
completed:0

});





const getStats = async()=>{


try{


const res = await API.get(
"/Appointments/admin"
);



const data = res.data;



// كل الحجوزات
const totalAppointments = data.length;



// المرضى المحجوزين
const patients = data.filter(
item=>!item.isAvailable
);



// تاريخ اليوم
const today = new Date()
.toISOString()
.split("T")[0];



const todayAppointments =
data.filter(item=>

item.date.startsWith(today)

).length;






setStats({

appointments:totalAppointments,

patients:patients.length,

today:todayAppointments,

completed:patients.length

});



}

catch(err){

console.log(err);

}



};





useEffect(()=>{

getStats();

},[]);






return (

<div className="dashboard">



<div className="stat-card">

<FaCalendarCheck/>

<h3>
الحجوزات
</h3>

<p>
{stats.appointments}
</p>

</div>





<div className="stat-card">

<FaUsers/>

<h3>
المرضى
</h3>

<p>
{stats.patients}
</p>

</div>





<div className="stat-card">

<FaClock/>

<h3>
مواعيد اليوم
</h3>

<p>
{stats.today}
</p>

</div>





<div className="stat-card">

<FaCheckCircle/>

<h3>
المكتملة
</h3>

<p>
{stats.completed}
</p>

</div>



</div>

);

}