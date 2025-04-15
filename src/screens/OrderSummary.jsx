// import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { CartContext } from "../context/CartContext";
// import AuthContext from "../context/AuthContext";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import "./OrderSummary.css";

// const OrderSummary = () => {
//   const { cart } = useContext(CartContext);
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const discountPercentage = 10;

//   const getPrice = (price) => parseFloat(price) || 0;

//   const subTotal = cart.reduce((sum, item) => sum + getPrice(item.price) * item.quantity, 0);
//   const discount = (subTotal * discountPercentage) / 100;
//   const discountedTotal = subTotal - discount;
//   const tax = discountedTotal * 0.05;
//   const grandTotal = discountedTotal + tax;

//   const handleDownloadInvoice = () => {
//     const doc = new jsPDF();
    
//     // PDF generation code remains the same...
//     doc.save("Custom_Pie_Invoice.pdf");
//   };

//   return (
//     <div className="summary-container">
//       <header className="summary-header">
//         <div className="header-content">
//           <h2>📦 Order Summary</h2>
//           {user?.name && (
//             <div className="user-greeting">👋 Hi, {user.name.split(" ")[0]}</div>
//           )}
//         </div>
//       </header>

//       {cart.length === 0 ? (
//         <div className="empty-summary">
//           <img src="/assets/images/empty-cart.png" alt="Empty order" className="empty-img" />
//           <h3>Your order summary is empty!</h3>
//           <button 
//             className="back-btn" 
//             onClick={() => navigate("/")}
//           >
//             🏠 Back to Home
//           </button>
//         </div>
//       ) : (
//         <>
//           <div className="order-content">
//             <div className="summary-items">
//               {cart.map((item, index) => (
//                 <div key={index} className="summary-item">
//                   <img 
//                     src={item.image || "/assets/images/default-food.png"} 
//                     alt={item.name} 
//                     onError={(e) => (e.target.src = "/assets/images/default-food.png")}
//                   />
//                   <div className="item-details">
//                     <h3>{item.name}</h3>
//                     <p>Quantity: {item.quantity}</p>
//                     {item.extras && item.extras.length > 0 && (
//                       <p className="extras">Extras: {item.extras.join(", ")}</p>
//                     )}
//                     <p className="item-price">₹{(getPrice(item.price) * item.quantity).toFixed(2)}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="summary-section">
//               <div className="summary-details">
//                 <h3>Order Summary</h3>
//                 <div className="price-row">
//                   <span>Subtotal:</span>
//                   <span>₹{subTotal.toFixed(2)}</span>
//                 </div>
//                 <div className="price-row discount">
//                   <span>Discount ({discountPercentage}%):</span>
//                   <span>-₹{discount.toFixed(2)}</span>
//                 </div>
//                 <div className="price-row">
//                   <span>Tax (5%):</span>
//                   <span>₹{tax.toFixed(2)}</span>
//                 </div>
//                 <div className="price-row total">
//                   <span>Grand Total:</span>
//                   <span>₹{grandTotal.toFixed(2)}</span>
//                 </div>
//               </div>

//               <div className="summary-buttons">
//                 <button 
//                   className="download-btn"
//                   onClick={handleDownloadInvoice}
//                 >
//                   📄 Download Invoice
//                 </button>
//                 <button 
//                   className="pay-btn" 
//                   onClick={() => navigate("/payment", { state: { totalPrice: grandTotal } })}
//                 >
//                   💳 Proceed to Payment (₹{grandTotal.toFixed(2)})
//                 </button>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default OrderSummary;

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import AuthContext from "../context/AuthContext";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./OrderSummary.css";

const OrderSummary = () => {
  const { cart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const discountPercentage = 10;

  const getPrice = (price) => parseFloat(price) || 0;

  const subTotal = cart.reduce((sum, item) => sum + getPrice(item.price) * item.quantity, 0);
  const discount = (subTotal * discountPercentage) / 100;
  const discountedTotal = subTotal - discount;
  const tax = discountedTotal * 0.05;
  const grandTotal = discountedTotal + tax;

  const handleDownloadInvoice = () => {
    const doc = new jsPDF();

    // Restaurant Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(25);
    doc.setTextColor(218, 165, 32); // Golden color
    doc.text("Custom Pie Pizzeria", 105, 20, { align: "center" });
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text("123 Pizza Street, Food City, India", 105, 28, { align: "center" });
    doc.text("Phone: +91 98765 43210 | Email: support@custompie.com", 105, 34, { align: "center" });
    
    // Invoice Info
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("INVOICE", 105, 45, { align: "center" });
    
    doc.setFontSize(10);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 15, 55);
    doc.text(`Bill No: #CUSTPIE${Math.floor(Math.random() * 10000)}`, 160, 55);
    
    // User Details
    doc.setFontSize(12);
    doc.text("Customer Details:", 15, 65);
    doc.text(`Name: ${user?.name || "Guest User"}`, 15, 72);
    doc.text(`Email: ${user?.email || "guest@example.com"}`, 15, 79);
    
    // Table Headers
    const tableColumn = [
      { header: "Item", dataKey: "item" },
      { header: "Quantity", dataKey: "quantity" },
      { header: "Unit Price (₹)", dataKey: "price" },
      { header: "Total (₹)", dataKey: "total" }
    ];
    
    const tableRows = cart.map(item => ({
      item: item.name,
      quantity: item.quantity,
      price: getPrice(item.price).toFixed(2),
      total: (getPrice(item.price) * item.quantity).toFixed(2)
    }));

    // Add Table
    doc.autoTable({
      startY: 90,
      columns: tableColumn,
      body: tableRows,
      theme: "grid",
      headStyles: {
        fillColor: [218, 165, 32], // Golden header
        textColor: [0, 0, 0],
        fontStyle: "bold"
      },
      bodyStyles: {
        textColor: [0, 0, 0],
        cellPadding: 5
      },
      alternateRowStyles: {
        fillColor: [255, 255, 255]
      },
      margin: { left: 15, right: 15 },
      styles: {
        fontSize: 10,
        cellPadding: 5,
        overflow: "linebreak",
        halign: "center"
      },
      columnStyles: {
        item: { cellWidth: "auto", halign: "left" },
        quantity: { cellWidth: 20 },
        price: { cellWidth: 30 },
        total: { cellWidth: 30 }
      }
    });

    // Summary
    const finalY = doc.autoTable.previous.finalY + 15;
    
    doc.setFontSize(12);
    doc.text("Order Summary:", 15, finalY);
    
    doc.autoTable({
      startY: finalY + 5,
      body: [
        ["Subtotal:", `₹${subTotal.toFixed(2)}`],
        [`Discount (${discountPercentage}%):`, `-₹${discount.toFixed(2)}`],
        ["Tax (5%):", `₹${tax.toFixed(2)}`],
        ["Grand Total:", `₹${grandTotal.toFixed(2)}`]
      ],
      theme: "plain",
      margin: { left: 15 },
      bodyStyles: {
        textColor: [0, 0, 0],
        fontStyle: "bold",
        fontSize: 11
      },
      columnStyles: {
        0: { cellWidth: 60, halign: "left" },
        1: { cellWidth: 30, halign: "right" }
      }
    });

    // Footer
    const footerY = doc.autoTable.previous.finalY + 15;
    
    // Stamp
    const stampImg = "/assets/images/stamp.png";
    if (stampImg) {
      doc.addImage(stampImg, "PNG", 140, footerY, 50, 30);
    }
    
    // Signature
    doc.setFont("times", "italic");
    doc.text("Authorized Signature", 140, footerY + 40);
    doc.text("Manager - Custom Pie Pizzeria", 140, footerY + 45);
    
    // Print button
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 255);
    doc.textWithLink("Click here to print", 15, footerY + 45, {
      url: "#print"
    });

    // Save PDF
    doc.save(`Invoice_${user?.name || "Guest"}_${new Date().toISOString().slice(0,10)}.pdf`);
  };

  return (
    <div className="summary-container">
      <header className="summary-header">
        <div className="header-content">
          <h2>📦 Order Summary</h2>
          {user?.name && (
            <div className="user-greeting">👋 Hi, {user.name.split(" ")[0]}</div>
          )}
        </div>
      </header>

      {cart.length === 0 ? (
        <div className="empty-summary">
          <p>Your order summary is empty!</p>
          <button onClick={() => navigate("/")}>🏠 Back to Home</button>
        </div>
      ) : (
        <>
          <div className="summary-items">
            {cart.map((item, index) => (
              <div key={index} className="summary-item">
                <img 
                  src={item.image || "/assets/images/default-food.png"} 
                  alt={item.name} 
                  onError={(e) => (e.target.src = "/assets/images/default-food.png")}
                />
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p>Qty: {item.quantity}</p>
                  <p className="item-price">₹{(getPrice(item.price) * item.quantity).toFixed(2)}</p>
                  {item.extras && item.extras.length > 0 && (
                    <p className="item-extras">Extras: {item.extras.join(", ")}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="summary-details">
            <div className="detail-row">
              <span>Subtotal:</span>
              <span>₹{subTotal.toFixed(2)}</span>
            </div>
            <div className="detail-row">
              <span>Discount ({discountPercentage}%):</span>
              <span>-₹{discount.toFixed(2)}</span>
            </div>
            <div className="detail-row">
              <span>Tax (5%):</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="detail-row total">
              <span>Grand Total:</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="summary-buttons">
            <button className="download-btn" onClick={handleDownloadInvoice}>
              ⬇ Download Invoice
            </button>
            <button 
              className="pay-btn" 
              onClick={() => navigate("/payment", { state: { totalPrice: grandTotal} })}
            >
              💳 Proceed to Payment
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderSummary;