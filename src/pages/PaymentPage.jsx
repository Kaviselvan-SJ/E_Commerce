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

  // Billing details (fake for now)
  const [billing, setBilling] = useState({
    name: "",
    email: "testuser@email.com",
    phone: "",
    address: "",
  });

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
    if (!billing.name || !billing.phone || !billing.address) {
      toast.error("Please fill in all billing details");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/orders/create-order", {
        product,
        quantity,
        userEmail: billing.email,
        billing,
      });

      const { clientSecret } = res.data;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: billing.name,
            email: billing.email,
            phone: billing.phone,
          },
        },
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
    <>
    <Navbar />
    <div className={`min-h-screen flex flex-col pt-20 ${theme === "dark" ? "" : "bg-gray-50"}`}>
      

      <div className="flex-1 flex justify-center px-4 py-12">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Left Section - Billing Form */}
          <div
            className={`rounded-2xl shadow-xl p-8 
            ${theme === "dark" ? "bg-slate-800 text-white" : "bg-white text-slate-900"}`}
          >
            <h2 className="text-xl font-bold mb-6">Billing & Shipping Details</h2>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={billing.name}
                onChange={(e) => setBilling({ ...billing, name: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <input
                type="email"
                value={billing.email}
                disabled
                className="w-full px-4 py-3 border rounded-lg bg-gray-100 dark:bg-slate-700"
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={billing.phone}
                onChange={(e) => setBilling({ ...billing, phone: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <textarea
                placeholder="Shipping Address"
                value={billing.address}
                onChange={(e) => setBilling({ ...billing, address: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          {/* Right Section - Order Summary + Payment */}
          <div
            className={`rounded-2xl shadow-xl p-8 flex flex-col justify-between
            ${theme === "dark" ? "bg-slate-800 text-white" : "bg-white text-slate-900"}`}
          >
            <div>
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              <div className="flex items-center justify-between mb-2">
                <span>{product.name} × {quantity}</span>
                <span className="font-semibold text-red-600">₹{product.price * quantity}</span>
              </div>
              <div className="flex items-center justify-between mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex items-center justify-between font-bold text-lg mt-2 border-t pt-2">
                <span>Total</span>
                <span className="text-red-600">₹{product.price * quantity}</span>
              </div>

              <h3 className="mt-6 mb-3 font-semibold">Card Payment</h3>
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
            </div>

            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg text-white font-semibold transition mt-4"
            >
              {loading ? "Processing..." : "Pay Now"}
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
   </>
  );
}
