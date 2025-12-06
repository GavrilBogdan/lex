"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type CartItem = {
  _id: string;
  title: string;
  price: number;
  image?: string;
  quantity: number;
  description?: string;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (_id: string) => void;
  updateQuantity: (_id: string, change: number) => void;
  cartTotal: number;
  cartCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // LOAD FROM LOCAL STORAGE
  useEffect(() => {
    const savedCart = localStorage.getItem("lexCart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // SAVE TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("lexCart", JSON.stringify(cartItems));
  }, [cartItems]);

  // ADD TO CART
  const addToCart = (product: any) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === product._id);

      if (existingItem) {
        return prevItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // REMOVE ITEM
  const removeFromCart = (_id: string) => {
    setCartItems((prev) => prev.filter((item) => item._id !== _id));
  };

  // UPDATE QUANTITY
  const updateQuantity = (_id: string, change: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === _id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  // TOTALS
  const cartTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// CUSTOM HOOK
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
