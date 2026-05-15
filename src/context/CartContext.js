"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("tesla_cart");
      if (saved) setCartItems(JSON.parse(saved));
    } catch {}
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem("tesla_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (i) => i.slug === item.slug && i.color === item.color
      );
      if (existing) {
        return prev.map((i) =>
          i.slug === item.slug && i.color === item.color
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (slug, color) => {
    setCartItems((prev) =>
      prev.filter((i) => !(i.slug === slug && i.color === color))
    );
  };

  const updateQuantity = (slug, color, quantity) => {
    if (quantity < 1) {
      removeFromCart(slug, color);
      return;
    }
    setCartItems((prev) =>
      prev.map((i) =>
        i.slug === slug && i.color === color ? { ...i, quantity } : i
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  const cartTotal = cartItems.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartOpen,
        setCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}