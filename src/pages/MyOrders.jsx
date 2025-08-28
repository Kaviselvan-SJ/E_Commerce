import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";

export default function MyOrdersWrapper() {
  return (
    <ProtectedRoute>
      <MyOrders />
    </ProtectedRoute>
  );
}

function MyOrders() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;
    axios.get(`http://localhost:5000/api/orders/user/${user.uid}`)
      .then(res => setOrders(res.data || []))
      .catch(console.error);
  }, [user]);

  return (
    <div className="px-4 py-10 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      {orders.length === 0 ? <p>No orders yet.</p> : (
        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o._id} className="border rounded-xl p-6 bg-white shadow">
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">Order: {o._id}</p>
                  <p className="text-sm text-gray-500">Placed on {new Date(o.createdAt).toLocaleString()}</p>
                </div>
                <p className="font-bold">₹{o.totalAmount}</p>
              </div>
              <ul className="mt-3 list-disc ml-6">
                {o.products.map((p, idx) => (
                  <li key={idx} className="flex items-center justify-between">
                    <span>{p.name} × {p.quantity}</span>
                    <div className="flex items-center gap-3">
                      <span>₹{p.price}</span>
                      <button className="text-blue-600 underline">Provide Review</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
