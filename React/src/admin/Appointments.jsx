import { useEffect, useState } from "react";
import API from "../utils/api";


export default function Appointments(){


const [appointments,setAppointments] = useState([]);

const [error,setError] = useState("");




// جلب الحجوزات

const getAppointments = async()=>{

try{

const res = await API.get(
"/Appointments/admin"
);


setAppointments(res.data);


}

catch(err){

console.log(err);

setError("فشل تحميل الحجوزات");

}


};



useEffect(()=>{

getAppointments();

},[]);





return (

<div className="page-box">


<h2>
الحجوزات
</h2>



{
error &&
<div className="error-box">
{error}
</div>
}




<table className="admin-table">


<thead>

<tr>

<th>
المريض
</th>


<th>
الهاتف
</th>


<th>
التاريخ
</th>


<th>
الوقت
</th>


<th>
السبب
</th>


<th>
الحالة
</th>


</tr>

</thead>




<tbody>


{

appointments
.filter(item=>!item.isAvailable)
.map((item)=>(


<tr key={item.id}>


<td>

{
item.patientName || "غير معروف"
}

</td>



<td>

{
item.phoneNumber || "-"
}

</td>



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
item.reason || "-"
}

</td>



<td>


<span className="status">

محجوز

</span>


</td>



</tr>


))

}



</tbody>



</table>



</div>

);


}