import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

// ✅ Export useCart at the top, ensures Vite HMR works well
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  const isInCart = (id) => {
    return cart.some((item) => item._id === id);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, isInCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
