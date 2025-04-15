// // // import React from "react";
// // // import { useLocation } from "react-router-dom";
// // // import "./PaymentScreen.css";

// // // const PaymentScreen = () => {
// // //   const location = useLocation();
// // //   const totalPrice = location.state?.totalPrice || 0;
// // //   const upiId = "pankajrola834@okaxis"; // Replace with your UPI ID

// // //   // Function to launch UPI payment
// // //   const makePayment = () => {
// // //     const amount = totalPrice.toFixed(2);
// // //     const upiUrl = `upi://pay?pa=${upiId}&pn=Pankaj&mc=0000&tid=1234567890&url=https://example.com&am=${amount}&cu=INR`;

// // //     window.location.href = upiUrl;
// // //   };

// // //   return (
// // //     <div className="payment-container">
// // //       <header className="payment-header">
// // //         <h2>Payment Screen</h2>
// // //       </header>

// // //       <div className="payment-content">
// // //         <p className="total-label">Total Price</p>
// // //         <h3 className="total-price">₹{totalPrice.toFixed(2)}</h3>

// // //         <button className="pay-btn" onClick={makePayment}>
// // //           Pay Now
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default PaymentScreen;



// // import React, { useState } from "react";
// // import { useLocation } from "react-router-dom";
// // import "./PaymentScreen.css";

// // const PaymentScreen = () => {
// //   const location = useLocation();
// //   const totalPrice = location.state?.totalPrice || 0;
// //   const [selectedOption, setSelectedOption] = useState("upi");
// //   const [cardDetails, setCardDetails] = useState({
// //     number: "",
// //     name: "",
// //     expiry: "",
// //     cvv: ""
// //   });
// //   const [upiId, setUpiId] = useState("");
// //   const [selectedBank, setSelectedBank] = useState("");

// //   const handlePayment = () => {
// //     alert(`Payment of ₹${totalPrice.toFixed(2)} initiated via ${selectedOption}`);
// //     // Here you would typically integrate with a payment gateway
// //   };

// //   return (
// //     <div className="payment-container">
// //       <header className="payment-header">
// //         <h2>Complete Your Payment</h2>
// //         <p className="order-summary">Order Total: ₹{totalPrice.toFixed(2)}</p>
// //       </header>

// //       <div className="payment-content">
// //         <div className="payment-options">
// //           <div 
// //             className={`option ${selectedOption === "upi" ? "active" : ""}`}
// //             onClick={() => setSelectedOption("upi")}
// //           >
// //             <div className="option-icon">💳</div>
// //             <span>UPI Payment</span>
// //           </div>
// //           <div 
// //             className={`option ${selectedOption === "card" ? "active" : ""}`}
// //             onClick={() => setSelectedOption("card")}
// //           >
// //             <div className="option-icon">🪪</div>
// //             <span>Credit/Debit Card</span>
// //           </div>
// //           <div 
// //             className={`option ${selectedOption === "netbanking" ? "active" : ""}`}
// //             onClick={() => setSelectedOption("netbanking")}
// //           >
// //             <div className="option-icon">🏦</div>
// //             <span>Net Banking</span>
// //           </div>
// //         </div>

// //         <div className="payment-details">
// //           {selectedOption === "upi" && (
// //             <div className="upi-section">
// //               <h3>Pay via UPI</h3>
// //               <div className="input-group">
// //                 <label>Enter UPI ID</label>
// //                 <input 
// //                   type="text" 
// //                   placeholder="yourname@upi" 
// //                   value={upiId}
// //                   onChange={(e) => setUpiId(e.target.value)}
// //                 />
// //               </div>
// //               <div className="popular-upi-apps">
// //                 <div className="upi-app">Google Pay</div>
// //                 <div className="upi-app">PhonePe</div>
// //                 <div className="upi-app">Paytm</div>
// //                 <div className="upi-app">BHIM</div>
// //               </div>
// //             </div>
// //           )}

// //           {selectedOption === "card" && (
// //             <div className="card-section">
// //               <h3>Card Details</h3>
// //               <div className="input-group">
// //                 <label>Card Number</label>
// //                 <input 
// //                   type="text" 
// //                   placeholder="1234 5678 9012 3456" 
// //                   value={cardDetails.number}
// //                   onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
// //                 />
// //               </div>
// //               <div className="input-group">
// //                 <label>Cardholder Name</label>
// //                 <input 
// //                   type="text" 
// //                   placeholder="Name on card" 
// //                   value={cardDetails.name}
// //                   onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
// //                 />
// //               </div>
// //               <div className="card-row">
// //                 <div className="input-group">
// //                   <label>Expiry Date</label>
// //                   <input 
// //                     type="text" 
// //                     placeholder="MM/YY" 
// //                     value={cardDetails.expiry}
// //                     onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
// //                   />
// //                 </div>
// //                 <div className="input-group">
// //                   <label>CVV</label>
// //                   <input 
// //                     type="password" 
// //                     placeholder="•••" 
// //                     value={cardDetails.cvv}
// //                     onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
// //                   />
// //                 </div>
// //               </div>
// //               <div className="card-brands">
// //                 <div className="card-brand visa">VISA</div>
// //                 <div className="card-brand mastercard">Mastercard</div>
// //                 <div className="card-brand rupay">RuPay</div>
// //                 <div className="card-brand amex">Amex</div>
// //               </div>
// //             </div>
// //           )}

// //           {selectedOption === "netbanking" && (
// //             <div className="netbanking-section">
// //               <h3>Select Your Bank</h3>
// //               <select 
// //                 value={selectedBank} 
// //                 onChange={(e) => setSelectedBank(e.target.value)}
// //                 className="bank-select"
// //               >
// //                 <option value="">-- Select Bank --</option>
// //                 <option value="sbi">State Bank of India</option>
// //                 <option value="hdfc">HDFC Bank</option>
// //                 <option value="icici">ICICI Bank</option>
// //                 <option value="axis">AXIS Bank</option>
// //                 <option value="kotak">Kotak Mahindra Bank</option>
// //               </select>
// //               <div className="bank-logos">
// //                 <div className="bank-logo sbi">SBI</div>
// //                 <div className="bank-logo hdfc">HDFC</div>
// //                 <div className="bank-logo icici">ICICI</div>
// //                 <div className="bank-logo axis">AXIS</div>
// //               </div>
// //             </div>
// //           )}
// //         </div>

// //         <button className="pay-now-btn" onClick={handlePayment}>
// //           Pay ₹{totalPrice.toFixed(2)}
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default PaymentScreen;

// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import "./PaymentScreen.css";

// const PaymentScreen = () => {
//   const location = useLocation();
//   const totalPrice = location.state?.totalPrice || 0;
//   const [selectedOption, setSelectedOption] = useState("upi");
//   const [cardDetails, setCardDetails] = useState({
//     number: "",
//     name: "",
//     expiry: "",
//     cvv: ""
//   });
//   const [vpa, setVpa] = useState("");

//   const handlePayment = () => {
//     // Handle payment based on selected option
//     alert(`Processing ${selectedOption} payment of ₹${totalPrice.toFixed(2)}`);
//   };

//   const handleCardChange = (e) => {
//     const { name, value } = e.target;
//     setCardDetails(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   return (
//     <div className="payment-container">
//       <header className="payment-header">
//         <h2>Complete Your Payment</h2>
//       </header>

//       <div className="payment-content">
//         <div className="amount-section">
//           <p className="total-label">Total Amount</p>
//           <h3 className="total-price">₹{totalPrice.toFixed(2)}</h3>
//         </div>

//         <div className="payment-options">
//           <div 
//             className={`option-card ${selectedOption === "card" ? "active" : ""}`}
//             onClick={() => setSelectedOption("card")}
//           >
//             <div className="option-icon">💳</div>
//             <div className="option-details">
//               <h4>Credit/Debit Card</h4>
//               <p>Pay using Visa, Mastercard, etc.</p>
//             </div>
//           </div>

//           <div 
//             className={`option-card ${selectedOption === "upi" ? "active" : ""}`}
//             onClick={() => setSelectedOption("upi")}
//           >
//             <div className="option-icon">📱</div>
//             <div className="option-details">
//               <h4>UPI Payment</h4>
//               <p>Pay using any UPI app</p>
//             </div>
//           </div>

//           <div 
//             className={`option-card ${selectedOption === "netbanking" ? "active" : ""}`}
//             onClick={() => setSelectedOption("netbanking")}
//           >
//             <div className="option-icon">🏦</div>
//             <div className="option-details">
//               <h4>Net Banking</h4>
//               <p>Pay directly from your bank</p>
//             </div>
//           </div>
//         </div>

//         {/* Card Payment Form */}
//         {selectedOption === "card" && (
//           <div className="payment-form">
//             <div className="form-group">
//               <label>Card Number</label>
//               <input 
//                 type="text" 
//                 name="number"
//                 placeholder="1234 5678 9012 3456" 
//                 value={cardDetails.number}
//                 onChange={handleCardChange}
//               />
//             </div>
//             <div className="form-group">
//               <label>Cardholder Name</label>
//               <input 
//                 type="text" 
//                 name="name"
//                 placeholder="Name on card" 
//                 value={cardDetails.name}
//                 onChange={handleCardChange}
//               />
//             </div>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Expiry Date</label>
//                 <input 
//                   type="text" 
//                   name="expiry"
//                   placeholder="MM/YY" 
//                   value={cardDetails.expiry}
//                   onChange={handleCardChange}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>CVV</label>
//                 <input 
//                   type="text" 
//                   name="cvv"
//                   placeholder="123" 
//                   value={cardDetails.cvv}
//                   onChange={handleCardChange}
//                 />
//               </div>
//             </div>
//           </div>
//         )}

//         {/* UPI Payment Form */}
//         {selectedOption === "upi" && (
//           <div className="payment-form">
//             <div className="form-group">
//               <label>UPI ID</label>
//               <input 
//                 type="text" 
//                 placeholder="yourname@upi" 
//                 value={vpa}
//                 onChange={(e) => setVpa(e.target.value)}
//               />
//             </div>
//             <div className="upi-apps">
//               <p>Pay using:</p>
//               <div className="apps-grid">
//                 <div className="app-icon">📱 Google Pay</div>
//                 <div className="app-icon">📱 PhonePe</div>
//                 <div className="app-icon">📱 Paytm</div>
//                 <div className="app-icon">📱 BHIM</div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Net Banking Form */}
//         {selectedOption === "netbanking" && (
//           <div className="payment-form">
//             <div className="form-group">
//               <label>Select Bank</label>
//               <select>
//                 <option value="">Choose your bank</option>
//                 <option value="sbi">State Bank of India</option>
//                 <option value="hdfc">HDFC Bank</option>
//                 <option value="icici">ICICI Bank</option>
//                 <option value="axis">Axis Bank</option>
//                 <option value="kotak">Kotak Mahindra Bank</option>
//               </select>
//             </div>
//           </div>
//         )}

//         <button className="pay-btn" onClick={handlePayment}>
//           Pay ₹{totalPrice.toFixed(2)}
//         </button>

//         <div className="secure-payment">
//           <span>🔒 Secure Payment</span>
//           <div className="payment-icons">
//             <span>Visa</span>
//             <span>Mastercard</span>
//             <span>Rupay</span>
//             <span>UPI</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentScreen;


import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./PaymentScreen.css";

const PaymentScreen = () => {
  const location = useLocation();
  const totalPrice = location.state?.totalPrice || 0;
  const [selectedOption, setSelectedOption] = useState("upi");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: ""
  });
  const [upiId, setUpiId] = useState("Enter your UPI ID");
  const [selectedBank, setSelectedBank] = useState("");

  const handlePayment = () => {
    if (selectedOption === "cod") {
      alert(`Order confirmed! Pay ₹${totalPrice.toFixed(2)} on delivery`);
      return;
    }
    alert(`Payment of ₹${totalPrice.toFixed(2)} initiated via ${selectedOption}`);
  };

  return (
    <div className="payment-container">
      <header className="payment-header">
        <h2>Complete Your Payment</h2>
        <p className="order-summary">Order Total: ₹{totalPrice.toFixed(2)}</p>
      </header>

      <div className="payment-content">
        <div className="payment-options">
          <div
            className={`option ${selectedOption === "upi" ? "active" : ""}`}
            onClick={() => setSelectedOption("upi")}
          >
            <div className="option-icon">💳</div>
            <span>UPI Payment</span>
          </div>
          <div
            className={`option ${selectedOption === "card" ? "active" : ""}`}
            onClick={() => setSelectedOption("card")}
          >
            <div className="option-icon">🪪</div>
            <span>Credit/Debit Card</span>
          </div>
          <div
            className={`option ${selectedOption === "netbanking" ? "active" : ""}`}
            onClick={() => setSelectedOption("netbanking")}
          >
            <div className="option-icon">🏦</div>
            <span>Net Banking</span>
          </div>
          <div
            className={`option ${selectedOption === "scanner" ? "active" : ""}`}
            onClick={() => setSelectedOption("scanner")}
          >
            <div className="option-icon">📷</div>
            <span>Scan to Pay</span>
          </div>
          <div
            className={`option ${selectedOption === "cod" ? "active" : ""}`}
            onClick={() => setSelectedOption("cod")}
          >
            <div className="option-icon">💰</div>
            <span>Cash on Delivery</span>
          </div>
        </div>

        <div className="payment-details">
          {selectedOption === "upi" && (
            <div className="upi-section">
              <h3>Pay via UPI</h3>
              <div className="input-group">
                <label>UPI ID</label>
                <input
                  type="text"
                />
              </div>
              <button className="cod-confirm-btn" onClick={handlePayment}>
                Pay with UPI
              </button>
              <div className="popular-upi-apps">
                <div className="upi-app">Google Pay</div>
                <div className="upi-app">PhonePe</div>
                <div className="upi-app">Paytm</div>
                <div className="upi-app">BHIM</div>
              </div>
            </div>
          )}

          {selectedOption === "card" && (
            <div className="card-section">
              <h3>Card Details</h3>
              <div className="input-group">
                <label>Card Number</label>
                <input
                  type="number"
                  placeholder="1234 5678 9012 3456"
                  value={cardDetails.number}
                  onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                />
              </div>
              <div className="input-group">
                <label>Cardholder Name</label>
                <input
                  type="text"
                  placeholder="Name on card"
                  value={cardDetails.name}
                  onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                />
              </div>
              <div className="card-row">
                <div className="input-group">
                  <label>Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                  />
                </div>
                <div className="input-group">
                  <label>CVV</label>
                  <input
                    type="password"
                    placeholder="•••"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                  />
                </div>
              </div>
              <div className="card-brands">
                <div className="card-brand visa">VISA</div>
                <div className="card-brand mastercard">Mastercard</div>
                <div className="card-brand rupay">RuPay</div>
                <div className="card-brand amex">Amex</div>
              </div>
              <button className="cod-confirm-btn" onClick={handlePayment}>
                Pay with Card
              </button>
            </div>


          )}

          {selectedOption === "netbanking" && (
            <div className="netbanking-section">
              <h3>Select Your Bank</h3>
              <select
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
                className="bank-select"
              >
                <option value="">-- Select Bank --</option>
                <option value="sbi">State Bank of India</option>
                <option value="hdfc">HDFC Bank</option>
                <option value="icici">ICICI Bank</option>
                <option value="axis">AXIS Bank</option>
                <option value="kotak">Kotak Mahindra Bank</option>
              </select>
              <div className="bank-logos">
                <div className="bank-logo sbi">SBI</div>
                <div className="bank-logo hdfc">HDFC</div>
                <div className="bank-logo icici">ICICI</div>
                <div className="bank-logo axis">AXIS</div>
              </div>
              <button className="cod-confirm-btn" onClick={handlePayment}>
                Pay with Net Banking
              </button>
            </div>
          )}

          {selectedOption === "scanner" && (
            <div className="scanner-section">
              <h3>Scan QR Code to Pay</h3>
              <div className="qr-code-container">
                <div className="qr-code-placeholder">

                  {/* In a real app, this would be your QR code image */}
                  <div className="qr-code">
                    <img src="./assets/images/qr.jpeg" /></div>
                </div>
              </div>
              <p className="scan-instructions">
                Open any UPI app and scan this code to complete your payment
              </p>
              <button className="cod-confirm-btn" onClick={handlePayment}>
                I've Completed Payment
              </button>
            </div>
          )}

          {selectedOption === "cod" && (
            <div className="cod-section">
              <h3>Cash on Delivery</h3>
              <div className="cod-info">
                <p>Pay with cash when your order arrives</p>
                <p>Extra ₹50 delivery charge will be applied</p>
              </div>
              <button className="cod-confirm-btn" onClick={handlePayment}>
                Confirm Order
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentScreen;