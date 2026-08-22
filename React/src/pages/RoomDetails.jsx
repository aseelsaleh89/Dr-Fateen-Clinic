import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RoomDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [loadingBooking, setLoadingBooking] = useState(false);

  useEffect(() => {
    API.get(`/rooms/${id}`).then((res) => setRoom(res.data));
  }, [id]);

  const handleBookNow = async () => {
    if (!checkInDate || !checkOutDate) {
      alert("Please select check-in and check-out dates");
      return;
    }

    if (new Date(checkOutDate) <= new Date(checkInDate)) {
      alert("Check-out date must be after check-in date");
      return;
    }

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      setLoadingBooking(true);

      const res = await API.post("/payments/create-booking-payment", {
        roomId: room.id,
        userId,
        checkInDate,
        checkOutDate,
      });

      navigate("/payment", {
        state: {
          clientSecret: res.data.clientSecret,
          bookingId: res.data.bookingId,
          totalPrice: res.data.totalPrice,
        },
      });
    } catch (err) {
      console.log("BOOKING PAYMENT ERROR:", err);
      alert(err.response?.data || "Booking failed");
    } finally {
      setLoadingBooking(false);
    }
  };

  if (!room) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <div style={styles.page}>
      <Navbar />

      <h1 style={styles.title}>{room.roomType}</h1>

      <div style={styles.imagesWrapper}>
        <img src={room.imageUrl} alt={room.roomType} style={styles.sideImage} />
        <img src={room.imageUrl} alt={room.roomType} style={styles.mainImage} />
        <img src={room.imageUrl} alt={room.roomType} style={styles.sideImage} />
      </div>

      <div style={styles.info}>
        <span>20 m²</span>
        <span>|</span>
        <span>1-{room.capacity} guests</span>
        <span>|</span>
        <span>1 queen bed</span>
      </div>

      <p style={styles.description}>
        Enjoy a comfortable stay in our beautiful {room.roomType}. This room is
        designed for relaxation, comfort, and a memorable hotel experience.
      </p>

      <div style={styles.detailsBox}>
        <p>Hotel: {room.hotelName}</p>
        <p>Price: ${room.pricePerNight} / night</p>
        <p>Status: {room.isAvailable ? "Available" : "Not Available"}</p>
      </div>

      <div style={styles.dateBox}>
        <input
          type="date"
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
          style={styles.input}
        />

        <input
          type="date"
          value={checkOutDate}
          onChange={(e) => setCheckOutDate(e.target.value)}
          style={styles.input}
        />
      </div>

      <button
        style={{
          ...styles.button,
          opacity: loadingBooking ? 0.7 : 1,
          cursor: loadingBooking ? "not-allowed" : "pointer",
        }}
        onClick={handleBookNow}
        disabled={loadingBooking}
      >
        {loadingBooking ? "Preparing Payment..." : "Book & Pay Now"}
      </button>

      <Footer />
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: "#f6f0e6",
    minHeight: "100vh",
    padding: "120px 70px 50px",
    textAlign: "center",
    fontFamily: "'Poppins', sans-serif",
    color: "#3d352c",
    position: "relative",
  },

  title: {
    fontFamily: "'Georgia', serif",
    fontSize: "80px",
    letterSpacing: "3px",
    color: "#b98c4a",
    margin: "0 0 30px",
    textTransform: "uppercase",
  },

  imagesWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "60px",
    marginBottom: "35px",
  },

  mainImage: {
    width: "535px",
    height: "470px",
    objectFit: "cover",
  },

  sideImage: {
    width: "215px",
    height: "310px",
    objectFit: "cover",
  },

  info: {
    display: "flex",
    justifyContent: "center",
    gap: "14px",
    fontSize: "27px",
    marginBottom: "25px",
  },

  description: {
    maxWidth: "850px",
    margin: "0 auto 25px",
    fontSize: "18px",
    lineHeight: "1.7",
  },

  detailsBox: {
    fontSize: "18px",
    lineHeight: "1.8",
    marginBottom: "25px",
  },

  dateBox: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginBottom: "20px",
  },

  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },

  button: {
    backgroundColor: "#b98c4a",
    color: "white",
    border: "none",
    padding: "14px 45px",
    fontSize: "18px",
    borderRadius: "30px",
  },
};