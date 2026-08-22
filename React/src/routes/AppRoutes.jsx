import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ConfirmEmail from "../pages/ConfirmEmail";
import Services from "../pages/Services";
import Booking from "../pages/Booking";

import MyBookings from "../pages/MyBookings";
import AdminDashboard from "../pages/AdminDashboard";

import ProtectedRoute from "./ProtectedRoute";

import About from "../pages/About";

import BookingSuccess from "../pages/BookingSuccess";

import PaymentPage from "../pages/PaymentPage";

import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";



export default function AppRoutes() {


  return (


    <BrowserRouter>


      <Routes>



        <Route 
          path="/" 
          element={<Navigate to="/home" />} 
        />



        {/* Main */}

        <Route 
          path="/home" 
          element={<Home />} 
        />



        <Route 
          path="/about" 
          element={<About />} 
        />



        {/* Medical Services */}

        <Route 
          path="/services" 
          element={<Services />} 
        />



        {/* Appointment Booking */}

        <Route 
          path="/booking" 
          element={<Booking />} 
        />



        <Route 
          path="/booking-success" 
          element={<BookingSuccess />} 
        />



        {/* Authentication */}


        <Route 
          path="/login" 
          element={<Login />} 
        />



        <Route 
          path="/register" 
          element={<Register />} 
        />



        <Route 
          path="/forgot-password" 
          element={<ForgotPassword />} 
        />



        <Route 
          path="/reset-password" 
          element={<ResetPassword />} 
        />




        {/* Patient Area */}


        <Route

          path="/my-bookings"

          element={

            <ProtectedRoute>

              <MyBookings />

            </ProtectedRoute>

          }

        />





        {/* Doctor/Admin Area */}


        <Route

          path="/admin-dashboard"

          element={

            <ProtectedRoute>

              <AdminDashboard />

            </ProtectedRoute>

          }

        />
<Route 
  path="/confirm-email" 
  element={<ConfirmEmail/>}
/>




        <Route

          path="/payment"

          element={<PaymentPage />}

        />



      </Routes>



    </BrowserRouter>

  );

}