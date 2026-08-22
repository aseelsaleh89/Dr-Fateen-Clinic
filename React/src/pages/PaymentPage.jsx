import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import API from "../utils/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./PaymentPage.css";

const stripePromise = loadStripe(
  "pk_test_51TZxBZ2XGiScYhgnZyiGRg05c20xj3X0uWyp2EJik9RxV2UEQePiqHrvAlfPsBvbjjfoQvKGhB0OTxHOnpro2lGP00TmKsfhwt"
);

function CheckoutForm({ bookingId, totalPrice }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handlePay = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const result = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (result.error) {
      alert(result.error.message);
      return;
    }

    await API.post(`/payments/confirm/${bookingId}`);

    navigate("/booking-success");
  };

  return (
    <form onSubmit={handlePay} className="payment-card">
      <h1>Complete Payment</h1>
      <p>Total Price: ${totalPrice}</p>

      <PaymentElement />

      <button type="submit" disabled={!stripe}>
        Pay Now
      </button>
    </form>
  );
}

export default function PaymentPage() {
  const location = useLocation();

  const { clientSecret, bookingId, totalPrice } = location.state || {};

  if (!clientSecret) {
    return (
      <div>
        <Navbar />
        <h2 style={{ textAlign: "center", marginTop: "140px" }}>
          No payment found
        </h2>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <Navbar />

      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm bookingId={bookingId} totalPrice={totalPrice} />
      </Elements>

      <Footer />
    </div>
  );
}