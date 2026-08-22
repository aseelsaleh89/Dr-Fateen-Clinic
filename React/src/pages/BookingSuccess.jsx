import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./BookingSuccess.css";

export default function BookingSuccess() {
  return (
    <div className="booking-success-page">
      <Navbar />

      <div className="success-card">
        <div className="success-icon">✅</div>

        <h1>Booking Confirmed</h1>

        <p>
          Your reservation has been created successfully.
          You can now view your booking details.
        </p>

        <div className="success-actions">
          <Link to="/my-bookings" className="success-btn">
            View My Bookings
          </Link>

          <Link to="/hotels" className="success-btn secondary">
            Back To Hotels
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}