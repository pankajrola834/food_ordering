import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import MenuScreen from "./screens/MenuScreen";
import Login from "./auth/Login";
import Register from "./auth/Register";
import CartScreen from "./screens/CartScreen";
import CustomizeItemScreen from "./screens/CustomizeItemScreen";
import OrderSummary from "./screens/OrderSummary";
import PaymentScreen from "./screens/PaymentScreen";
import "./App.css";

function App() {
  return (
    
    <CartProvider>
      <Router>
        {/* <ToastContainer /> ✅ Ensure ToastContainer is here */}
        <Routes>
          <Route path="/" element={<MenuScreen />} />
          <Route path="/home" element={<MenuScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/customize" element={<CustomizeItemScreen />} />
          <Route path="/order-summary" element={<OrderSummary />} />
          <Route path="/payment" element={<PaymentScreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
