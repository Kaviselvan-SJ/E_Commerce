import { useContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase";
import { AuthContext } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const loc = useLocation();
  const backTo = loc.state?.from?.pathname || "/";

  useEffect(() => {
    if (user) {
      navigate(backTo, { replace: true });
    }
  }, [user, backTo, navigate]);

  const onEmailSubmit = async () => {
  try {
    let result;
    if (mode === "signup") {
      result = await createUserWithEmailAndPassword(auth, email, password);

      // update displayName if name was provided
      if (name) {
        await updateProfile(result.user, { displayName: name });
      }
    } else {
      result = await signInWithEmailAndPassword(auth, email, password);
    }

    // ✅ Save details in localStorage
    localStorage.setItem("userName", result.user.displayName || name || "Unknown");
    localStorage.setItem("email", result.user.email);

    navigate(backTo, { replace: true });
  } catch (e) {
    alert(e.message);
  }
};

const onGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);

    // ✅ Save Google login details
    localStorage.setItem("userName", result.user.displayName || "Unknown");
    localStorage.setItem("email", result.user.email);

    navigate(backTo, { replace: true });
  } catch (e) {
    alert(e.message);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 via-white to-red-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-500 text-white text-center py-6">
          <h2 className="text-2xl font-bold">
            {mode === "login" ? "Welcome Back 👋" : "Create an Account"}
          </h2>
          <p className="text-sm opacity-90">
            {mode === "login" ? "Login to continue shopping" : "Sign up to get started"}
          </p>
        </div>

        {/* Form */}
        <div className="p-8">
          {mode === "signup" && (
            <div className="relative mb-4">
              <input
                type="text"
                className="peer w-full border-b-2 border-gray-300 focus:border-red-500 outline-none py-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name "
              />
              
            </div>
          )}

          <div className="relative mb-4">
            <input
              type="email"
              className="peer w-full border-b-2 border-gray-300 focus:border-red-500 outline-none py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
            />
            
          </div>

          <div className="relative mb-6">
            <input
              type="password"
              className="peer w-full border-b-2 border-gray-300 focus:border-red-500 outline-none py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            
          </div>

          <button
            onClick={onEmailSubmit}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold shadow-md transition"
          >
            {mode === "login" ? "Login" : "Sign Up"}
          </button>

          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="mx-2 text-gray-400 text-sm">or</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>

          <button
            onClick={onGoogle}
            className="w-full flex items-center justify-center border rounded-lg py-3 hover:bg-gray-50 transition"
          >
            <FcGoogle className="text-xl mr-2" />
            Continue with Google
          </button>

          <div className="mt-6 text-center text-sm text-gray-600">
            {mode === "login" ? (
              <>
                New here?{" "}
                <button
                  className="text-red-600 font-medium hover:underline"
                  onClick={() => setMode("signup")}
                >
                  Create an account
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  className="text-red-600 font-medium hover:underline"
                  onClick={() => setMode("login")}
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
