import { createContext, useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() =>
    onAuthStateChanged(auth, (fbUser) => {
      setUser(fbUser ? {
        uid: fbUser.uid,
        name: fbUser.displayName || "",
        email: fbUser.email || "",
        photo: fbUser.photoURL || "",
      } : null);
      setAuthReady(true);
    }), []);

  const logout = () => auth.signOut();

  return (
    <AuthContext.Provider value={{ user, authReady, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
