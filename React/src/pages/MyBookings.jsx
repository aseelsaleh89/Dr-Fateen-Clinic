import { useEffect, useState } from "react";
import API from "../utils/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./MyBookings.css";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const userId = localStorage.getItem("userId");

      const res = await API.get(`/bookings/user/${userId}`);

      setBookings(res.data);
    } catch (err) {
      console.log("BOOKINGS ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <>
        <Navbar />
        <h2 style={{ textAlign: "center", marginTop: "120px" }}>
          Loading bookings...
        </h2>
      </>
    );

  return (
    <div className="my-bookings-page">
      <Navbar />

      <h1 className="my-bookings-title">My Bookings</h1>

      {bookings.length === 0 ? (
        <p style={{ textAlign: "center" }}>No bookings found.</p>
      ) : (
        <div className="bookings-table-wrapper">
          <table className="bookings-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Room</th>
                <th>Hotel</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Total Price</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking.id}>
                  <td>{index + 1}</td>
                  <td>{booking.roomType || "Room"}</td>
                  <td>{booking.hotelName || "Hotelio"}</td>
                  <td>{booking.checkInDate?.split("T")[0]}</td>
                  <td>{booking.checkOutDate?.split("T")[0]}</td>
                  <td>${booking.totalPrice || 0}</td>
                  <td>
                    <span className="status-badge">
                      {booking.status || "Confirmed"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Footer />
    </div>
  );
}