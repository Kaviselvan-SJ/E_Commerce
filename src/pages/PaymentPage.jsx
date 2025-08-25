import { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Footer } from "../components/Fotter";
import { Navbar } from "../components/NavBar";

export default function PaymentPage() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { product, quantity = 1 } = state || {};

  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handlePayment = async () => {
    if (!stripe || !elements) return;
    if (!product) {
      toast.error("No product found for checkout");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/orders/create-order", {
        product,
        quantity,
        userEmail: "testuser@email.com",
      });

      const { clientSecret } = res.data;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        toast.success("Payment Successful! Order placed.");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      toast.error("Payment failed!");
    }
    setLoading(false);
  };

  if (!product) {
    return <div className="text-center p-10">No product selected for checkout.</div>;
  }

  return (
    <div className={`min-h-screen flex flex-col ${theme === "dark" ? "bg-slate-900" : "bg-white"}`}>
      <Navbar />

      {/* Centered checkout card but NOT overlaying navbar */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div
          className={`w-full max-w-md rounded-2xl shadow-2xl p-8 
          ${theme === "dark" ? "bg-slate-800 text-white" : "bg-white text-slate-900"}`}
        >
          <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
            Secure Checkout
          </h2>

          <p className="text-lg font-semibold text-center mb-1">{product.name}</p>
          <p className="text-center mb-1">
            Price: <span className="text-red-600 font-semibold">₹{product.price}</span>
          </p>
          <p className="text-center mb-4">Quantity: {quantity}</p>

          <div className="mb-4 border rounded-lg p-3">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: theme === "dark" ? "#fff" : "#000",
                    "::placeholder": { color: theme === "dark" ? "#94a3b8" : "#6b7280" },
                  },
                  invalid: { color: "#e11d48" },
                },
              }}
            />
          </div>

          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg text-white font-semibold transition"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </div>
      </div>
    </div>
  );
}
