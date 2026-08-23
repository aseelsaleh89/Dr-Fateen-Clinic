import { useEffect, useState } from "react";
import API from "../utils/api";
import "./Admin.css";


export default function Schedule(){


const [date,setDate] = useState("");

const [time,setTime] = useState("");

const [appointments,setAppointments] = useState([]);


const [error,setError] = useState("");




// ================= GET APPOINTMENTS =================

const getAppointments = async()=>{


try{


const res = await API.get(
"/Appointments/admin"
);


setAppointments(res.data);


}

catch(err){

console.log(err);

setError("فشل تحميل المواعيد");

}


};





useEffect(()=>{

getAppointments();

},[]);





// ================= ADD =================


const addAppointment = async()=>{


if(!date || !time){

setError("اختر التاريخ والوقت");

return;

}



try{


await API.post(

"/Appointments/create",

{

date:date,

time:time

}

);



setDate("");

setTime("");

setError("");



getAppointments();



}

catch(err){

console.log(err);

setError("فشل إضافة الموعد");

}



};






// ================= DELETE =================


const deleteAppointment = async(id)=>{


try{


await API.delete(

`/Appointments/${id}`

);



getAppointments();


}

catch(err){

console.log(err);

}



};

// ================= MAKE AVAILABLE =================

const makeAvailable = async(id)=>{

try{

await API.put(
`/Appointments/${id}/available`
);


getAppointments();


}

catch(err){

console.log(err);

setError("فشل إعادة فتح الموعد");

}

};




return (


<div className="page-box">



<h2>
إدارة المواعيد
</h2>



{
error &&
<div className="error-box">
{error}
</div>
}




<div className="schedule-form">



<input

type="date"

value={date}

onChange={(e)=>setDate(e.target.value)}

/>




<input

type="time"

value={time}

onChange={(e)=>setTime(e.target.value)}

/>





<button onClick={addAppointment}>

إضافة موعد

</button>



</div>







<table className="admin-table">


<thead>

<tr>

<th>
التاريخ
</th>


<th>
الوقت
</th>


<th>
الحالة
</th>


<th>
إجراء
</th>


</tr>


</thead>



<tbody>


{
appointments.map((item)=>(


<tr key={item.id}>


<td>

{
new Date(item.date)
.toLocaleDateString("ar")
}

</td>



<td>

{item.time}

</td>



<td>


{
item.isAvailable ?

<span className="available">
متاح
</span>

:

<span className="booked">
محجوز
</span>

}


</td>



<td>


{
!item.isAvailable &&

<button

className="available-btn"

onClick={()=>makeAvailable(item.id)}

>

إتاحة

</button>

}



<button

className="delete-btn"

onClick={()=>deleteAppointment(item.id)}

>

حذف

</button>


</td>


</tr>


))
}



</tbody>


</table>






</div>


);


}