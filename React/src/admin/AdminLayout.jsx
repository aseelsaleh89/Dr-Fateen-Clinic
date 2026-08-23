import { Outlet, NavLink, useNavigate } from "react-router-dom";

import {
  FaHome,
  FaCalendarCheck,
  FaClock,
  FaUsers,
  FaUserMd,
  FaSignOutAlt
} from "react-icons/fa";

import "./Admin.css";


export default function AdminLayout(){

const navigate = useNavigate();


return (

<div className="admin-layout">


<aside className="admin-sidebar">


<div className="admin-logo">


<img
src="/doctor-logo.png"
alt="logo"
/>


<h2>
عيادة د. فاتن
</h2>


</div>



<nav>


<NavLink 
to="/admin"
end
>

<FaHome/>

الرئيسية

</NavLink>


<NavLink to="/admin/appointments">

<FaCalendarCheck/>

الحجوزات

</NavLink>



<NavLink to="/admin/schedule">

<FaClock/>

المواعيد

</NavLink>



<NavLink to="/admin/patients">

<FaUsers/>

المرضى

</NavLink>



<NavLink to="/admin/profile">

<FaUserMd/>

الملف الشخصي

</NavLink>


</nav>



<button
className="logout"

onClick={()=>{

localStorage.removeItem("user");

navigate("/login");

}}

>

<FaSignOutAlt/>

تسجيل خروج

</button>


</aside>





<main className="admin-content">


<header className="admin-header">

<h1>
لوحة تحكم العيادة
</h1>

</header>



<Outlet/>


</main>


</div>

);

}