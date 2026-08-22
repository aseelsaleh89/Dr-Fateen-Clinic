import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHotel();
  }, [id]);

  const loadHotel = async () => {
    try {
      const res = await API.get(`/hotels/${id}`);
      setHotel(res.data);
    } catch (err) {
      console.log("HOTEL DETAILS ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  if (!hotel)
    return <h2 style={{ textAlign: "center" }}>Hotel not found</h2>;

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
        <img
          src={hotel.imageUrl}
          alt={hotel.name}
          style={{
            width: "100%",
            maxHeight: "500px",
            objectFit: "cover",
            borderRadius: "20px",
          }}
        />

        <h1>{hotel.name}</h1>

        <p>
          <strong>City:</strong> {hotel.city}
        </p>

        <p>
          <strong>Address:</strong> {hotel.address}
        </p>

        <p>{hotel.description}</p>

        <button
          onClick={() => navigate(`/hotels/${hotel.id}/booking`)}
          style={{
            padding: "12px 30px",
            background: "#b98c4a",
            color: "#fff",
            border: "none",
            borderRadius: "20px",
            cursor: "pointer",
          }}
        >
          Book Rooms
        </button>
      </div>

      <Footer />
    </>
  );
}