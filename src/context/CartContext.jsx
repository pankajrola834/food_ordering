import React, { createContext, useState } from "react";


export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const addItem = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((existingItem) => existingItem.name === item.name);
  
      if (existingItem) {
        return [...prevCart]; // ✅ Ensures new array is returned (React detects state change)
      }
  
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };
  
  const removeItem = (item) => {
    setCart((prevCart) => prevCart.filter((existingItem) => existingItem.name !== item.name));
  };

  const increaseQuantity = (item) => {
    setCart((prevCart) => {
      console.log("Before update:", prevCart);
      const updatedCart = prevCart.map((existingItem) => {
        if (existingItem.name === item.name) {
          console.log("Updating item:", existingItem.name, "Current Quantity:", existingItem.quantity);
          return { ...existingItem, quantity: existingItem.quantity + 1 };
        }
        return existingItem;
      });
      console.log("After update:", updatedCart);
      return updatedCart;
    });
  };
  
  

  const decreaseQuantity = (item) => {
    setCart((prevCart) =>
      prevCart.map((existingItem) =>
        existingItem.name === item.name && existingItem.quantity > 1
          ? { ...existingItem, quantity: existingItem.quantity - 1 }
          : existingItem
      )
    );
  };
  

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, increaseQuantity, decreaseQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
