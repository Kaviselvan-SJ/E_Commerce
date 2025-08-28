import { Link } from "react-router-dom";
import { Navbar } from "../components/NavBar";
import { Footer } from "../components/Fotter";
import MyOrdersWrapper from "./MyOrders";

export function Profile() {
  const userName = localStorage.getItem("userName");
  const email = localStorage.getItem("email");
  const isGuest = email === "guest@codespace.com";

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto py-20 px-4 space-y-10">
        {!isGuest ? (
          <>
            {/* Profile Info */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-md">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                👤 Profile
              </h2>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                <span className="font-medium">Name:</span> {userName || "Unknown"}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                <span className="font-medium">Email:</span> {email}
              </p>
            </div>

            {/* My Orders Section */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-md">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                📦 My Orders
              </h2>
              <MyOrdersWrapper /> {/* 👈 Orders shown here */}
            </div>
          </>
        ) : (
          <div className="bg-yellow-50 dark:bg-gray-900 border border-yellow-300 dark:border-yellow-600 text-yellow-800 dark:text-yellow-200 rounded-lg p-6 shadow-md">
            <h2 className="text-lg font-semibold mb-2">🚫 Guest Access</h2>
            <p className="text-sm mb-4">
              You’re currently signed in as a guest. Please login or sign up to
              unlock full access.
            </p>
            <div className="flex justify-between">
              <Link
                to="/login"
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded transition"
              >
                Login
              </Link>
              <Link
                to="/"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
