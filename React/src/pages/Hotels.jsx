import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import "./Hotels.css";

export default function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    API.get("/hotels")
      .then((res) => {
        console.log("HOTELS DATA:", res.data);

        if (Array.isArray(res.data)) {
          setHotels(res.data);
        } else if (Array.isArray(res.data.data)) {
          setHotels(res.data.data);
        } else if (Array.isArray(res.data.hotels)) {
          setHotels(res.data.hotels);
        } else {
          setHotels([]);
        }
      })
      .catch((err) => {
        console.log("HOTELS ERROR:", err);
        setHotels([]);
      });
  }, []);

  const filteredHotels = hotels.filter((hotel) =>
    hotel.name?.toLowerCase().includes(search.toLowerCase()) ||
    hotel.city?.toLowerCase().includes(search.toLowerCase()) ||
    hotel.address?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="hotels-page">
      <Navbar />

      <section className="hotels-header">
        <p>Choose your favorite hotel</p>
        <h1>Our Hotels</h1>
      </section>

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search hotels..."
      />

      <section className="hotels-grid">
        {filteredHotels.map((hotel) => (
          <div className="hotel-card" key={hotel.id}>
            <img
              src={hotel.imageUrl || "https://via.placeholder.com/400x300"}
              alt={hotel.name}
            />

            <div className="hotel-info">
              <h2>{hotel.name}</h2>
              <p>{hotel.city}</p>
              <p>{hotel.description}</p>

              <button onClick={() => navigate(`/hotels/${hotel.id}/booking`)}>
                Book This Hotel
              </button>
            </div>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
}