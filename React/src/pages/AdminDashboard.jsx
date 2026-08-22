import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    hotels: 0,
    rooms: 0,
    bookings: 0,
  });

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "Admin") {
      navigate("/login");
      return;
    }

    loadData();
  }, []);

  const loadData = async () => {
    try {
      const hotels = await API.get("/hotels");
      const rooms = await API.get("/rooms");
      const bookings = await API.get("/bookings");

      setStats({
        hotels: hotels.data.data ? hotels.data.data.length : hotels.data.length,
        rooms: rooms.data.length,
        bookings: bookings.data.length,
      });
    } catch (err) {
      console.log("ADMIN ERROR:", err);
    }
  };

  const cardStyle = {
    background: "#fff",
    padding: "30px",
    borderRadius: "15px",
    textAlign: "center",
  };

  const buttonStyle = {
    padding: "18px",
    borderRadius: "12px",
    border: "none",
    background: "#2c3e50",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          padding: "120px 50px",
          minHeight: "100vh",
          background: "#f6f0e6",
        }}
      >
        <h1>Admin Dashboard</h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "20px",
            marginTop: "40px",
          }}
        >
          <div style={cardStyle}>
            <h2>{stats.hotels}</h2>
            <p>Total Hotels</p>
          </div>

          <div style={cardStyle}>
            <h2>{stats.rooms}</h2>
            <p>Total Rooms</p>
          </div>

          <div style={cardStyle}>
            <h2>{stats.bookings}</h2>
            <p>Total Bookings</p>
          </div>
        </div>

        <h2 style={{ marginTop: "50px" }}>Admin Actions</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "20px",
            marginTop: "25px",
          }}
        >
          <button style={buttonStyle} onClick={() => navigate("/admin/hotels")}>
            Manage Hotels
          </button>

          <button style={buttonStyle} onClick={() => navigate("/admin/rooms")}>
            Manage Rooms
          </button>

          <button style={buttonStyle} onClick={() => navigate("/admin/bookings")}>
            View Bookings
          </button>

          <button style={buttonStyle} onClick={() => navigate("/admin/users")}>
            Manage Users
          </button>

          <button style={buttonStyle} onClick={() => navigate("/admin/reviews")}>
            Manage Reviews
          </button>

          <button
            style={{ ...buttonStyle, background: "#8b0000" }}
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
} 