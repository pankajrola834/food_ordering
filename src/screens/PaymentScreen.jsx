import React from "react";
import { useLocation } from "react-router-dom";
import "./PaymentScreen.css";

const PaymentScreen = () => {
  const location = useLocation();
  const totalPrice = location.state?.totalPrice || 0;
  const upiId = "pankajrola834@okaxis"; // Replace with your UPI ID

  // Function to launch UPI payment
  const makePayment = () => {
    const amount = totalPrice.toFixed(2);
    const upiUrl = `upi://pay?pa=${upiId}&pn=Pankaj&mc=0000&tid=1234567890&url=https://example.com&am=${amount}&cu=INR`;

    window.location.href = upiUrl;
  };

  return (
    <div className="payment-container">
      <header className="payment-header">
        <h2>Payment Screen</h2>
      </header>

      <div className="payment-content">
        <p className="total-label">Total Price</p>
        <h3 className="total-price">₹{totalPrice.toFixed(2)}</h3>

        <button className="pay-btn" onClick={makePayment}>
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default PaymentScreen;
