import { 
  BrowserRouter, 
  Routes, 
  Route, 
  Navigate 
} from "react-router-dom";


// Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ConfirmEmail from "../pages/ConfirmEmail";
import Services from "../pages/Services";
import Booking from "../pages/Booking";
import MyBookings from "../pages/MyBookings";
import About from "../pages/About";
import BookingSuccess from "../pages/BookingSuccess";
import PaymentPage from "../pages/PaymentPage";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";


// Patient Protection
import ProtectedRoute from "./ProtectedRoute";


// Admin
import AdminRoute from "./AdminRoute";

import AdminLayout from "../admin/AdminLayout";
import Dashboard from "../admin/Dashboard";
import Appointments from "../admin/Appointments";
import Schedule from "../admin/Schedule";
import Patients from "../admin/Patients";
import AdminProfile from "../admin/AdminProfile";



export default function AppRoutes() {


return (

<BrowserRouter>


<Routes>



{/* Redirect */}

<Route

path="/"

element={
<Navigate to="/home"/>
}

/>



{/* ================= MAIN ================= */}


<Route

path="/home"

element={<Home/>}

/>



<Route

path="/about"

element={<About/>}

/>



<Route

path="/services"

element={<Services/>}

/>



<Route

path="/booking"

element={<Booking/>}

/>



<Route

path="/booking-success"

element={<BookingSuccess/>}

/>



{/* ================= AUTH ================= */}



<Route

path="/login"

element={<Login/>}

/>



<Route

path="/register"

element={<Register/>}

/>



<Route

path="/confirm-email"

element={<ConfirmEmail/>}

/>



<Route

path="/forgot-password"

element={<ForgotPassword/>}

/>



<Route

path="/reset-password"

element={<ResetPassword/>}

/>





{/* ================= PATIENT ================= */}



<Route

path="/my-bookings"

element={

<ProtectedRoute>

<MyBookings/>

</ProtectedRoute>

}

/>





{/* ================= PAYMENT ================= */}



<Route

path="/payment"

element={<PaymentPage/>}

/>







{/* ================= ADMIN PANEL ================= */}



<Route


path="/admin"


element={

<AdminRoute>

<AdminLayout/>

</AdminRoute>

}


>


<Route

index

element={<Dashboard/>}

/>



<Route

path="appointments"

element={<Appointments/>}

/>



<Route

path="schedule"

element={<Schedule/>}

/>



<Route

path="patients"

element={<Patients/>}

/>



<Route

path="profile"

element={<AdminProfile/>}

/>



</Route>





</Routes>


</BrowserRouter>


);


}