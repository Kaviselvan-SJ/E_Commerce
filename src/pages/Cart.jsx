import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { Navbar } from '../components/NavBar'
import { Footer } from '../components/Fotter'

export default function Cart() {
  const { cart, removeFromCart } = useCart();

  if (cart.length === 0) {
  return (
    <>
      <Navbar />
      <div className="p-44 text-center text-xl">
        <p className="mb-6">Your cart is empty.</p>
        <Link
          to="/products"
          className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-base font-medium transition"
        >
          🛍️ Explore Our Products
        </Link>
      </div>
      <Footer />
    </>
  );
}


  return (
    <>
    <Navbar/>
    <div className="p-8 py-24 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">🛒 Your Cart</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cart.map((item) => (
          <div
            key={item._id}
            className=" rounded-2xl shadow-lg overflow-hidden flex flex-col"
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-4 flex flex-col flex-grow justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-1">{item.name}</h3>
                <p className="text-red-600 font-medium text-lg">₹{item.price}</p>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <button
                  className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium"
                  onClick={() => alert(`Ordering ${item.name}...`)}
                >
                  Order Now
                </button>
                <button
                  className="text-sm text-red-500 hover:underline"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove from Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Optional: Checkout All */}
      <div className="mt-10 text-center">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl text-lg font-semibold"
          onClick={() => alert("Proceeding to checkout for all items...")}
        >
          Checkout All
        </button>
      </div>
    </div>
    <Footer/>
    </>
  );
}
