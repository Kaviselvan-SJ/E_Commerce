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

export default function Login() {
  const [mode, setMode] = useState("login"); // 'login' | 'signup'
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const loc = useLocation();
  const backTo = loc.state?.from?.pathname || "/";

  // 🔥 redirect safely inside useEffect
  useEffect(() => {
    if (user) {
      navigate(backTo, { replace: true });
    }
  }, [user, backTo, navigate]);

  const onEmailSubmit = async () => {
    try {
      if (mode === "signup") {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        if (name) await updateProfile(user, { displayName: name });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate(backTo, { replace: true });
    } catch (e) {
      alert(e.message);
    }
  };

  const onGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate(backTo, { replace: true });
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-6">
          {mode === "login" ? "Login" : "Create Account"}
        </h2>

        {mode === "signup" && (
          <input
            className="w-full border rounded-lg p-3 mb-3"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <input
          className="w-full border rounded-lg p-3 mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full border rounded-lg p-3 mb-4"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={onEmailSubmit}
          className="w-full bg-red-600 text-white py-3 rounded-lg"
        >
          {mode === "login" ? "Login" : "Sign Up"}
        </button>

        <div className="text-center my-4 text-sm text-gray-500">or</div>

        <button
          onClick={onGoogle}
          className="w-full border py-3 rounded-lg"
        >
          Continue with Google
        </button>

        <div className="mt-4 text-sm">
          {mode === "login" ? (
            <>
              New here?{" "}
              <button
                className="text-red-600 underline"
                onClick={() => setMode("signup")}
              >
                Create an account
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                className="text-red-600 underline"
                onClick={() => setMode("login")}
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
