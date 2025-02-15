import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./OrderSummary.css";

const OrderSummary = () => {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const discountPercentage = 10;

  // ✅ Convert price to number safely
  const getPrice = (price) => parseFloat(price) || 0;

  // ✅ Calculate Invoice Amounts
  const subTotal = cart.reduce((sum, item) => sum + getPrice(item.price) * item.quantity, 0);
  const discount = (subTotal * discountPercentage) / 100;
  const discountedTotal = subTotal - discount;
  const tax = discountedTotal * 0.05; // 5% tax
  const grandTotal = discountedTotal + tax;

  // ✅ Function to Generate & Download PDF Invoice
  const handleDownloadInvoice = () => {
    const doc = new jsPDF();

    // ✅ Header - Restaurant Details
    doc.setFont("helvetica", "bold");
    doc.setFontSize(25);
    doc.text("Custom Pie Pizzeria", 60, 15);
    doc.setFontSize(10);
    doc.text("123 Pizza Street, Food City, India", 65, 22);
    doc.text("Phone: +91 98765 43210 | Email: support@custompie.com", 55, 28);
    doc.text("--------------------------------------------------------------------------------------------", 50, 32);

    // ✅ Invoice Title & Date
    doc.setFontSize(16);
    doc.text("INVOICE", 90, 40);
    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 10, 50);
    doc.text("Bill No: #CUSTPIE" + Math.floor(Math.random() * 10000), 140, 50);

    // ✅ Table Headers
    const tableColumn = ["Item", "Quantity", "Price", "Total"];
    const tableRows = [];

    // ✅ Populate Table Rows
    cart.forEach((item) => {
      let price = parseFloat(item.price); // ✅ Ensure it's a number
      if (isNaN(price)) price = 0; // ✅ Prevent NaN values

      let total = price * item.quantity;

      // ✅ Remove unwanted characters like superscripts
      const cleanPrice = `₹${price.toFixed(2).replace(/[^\d.₹]/g, "")}`;
      const cleanTotal = `₹${total.toFixed(2).replace(/[^\d.₹]/g, "")}`;

      const itemData = [item.name, item.quantity, cleanPrice, cleanTotal];
      tableRows.push(itemData);
    });



    // ✅ Add Table to PDF
    doc.autoTable({
      startY: 60,
      head: [tableColumn],
      body: tableRows,
      theme: "grid",
      headStyles: { fillColor: [0, 150, 136] },
      margin: { left: 10, right: 10 },
    });

    // ✅ Summary Breakdown
    let finalY = doc.autoTable.previous.finalY + 10;
    doc.setFontSize(12);
    doc.text(`Subtotal: ₹${subTotal.toFixed(2)}`, 10, finalY);
    doc.text(`Discount (${discountPercentage}%): -₹${discount.toFixed(2)}`, 10, finalY + 10);
    doc.text(`Tax (5%): ₹${tax.toFixed(2)}`, 10, finalY + 20);

    doc.setFontSize(14);
    doc.text(`Grand Total: ₹${grandTotal.toFixed(2)}`, 10, finalY + 30);
    doc.text("-------------------------------------------------", 10, finalY + 35);

    // ✅ Fake Billing Stamp - Use direct image URL
    const stampImg = "/assets/images/stamp.png"; // Ensure this path is correct
    doc.addImage(stampImg, "PNG", 140, finalY, 50, 30);

    // ✅ Authorized Signature
    doc.setFontSize(12);
    doc.text("Authorized Signature", 140, finalY + 40);
    doc.setFont("times", "italic");  // ✅ Use 'times' for cursive effect
    doc.text("Manager - Custom Pie Pizzeria", 140, finalY + 50);


    // ✅ Save PDF File
    doc.save("Custom_Pie_Invoice.pdf");
  };

  return (
    <div className="summary-container">
      <header className="summary-header">
        <h2>📦 Order Summary</h2>
      </header>

      {cart.length === 0 ? (
        <div className="empty-summary">
          <p>Your order summary is empty!</p>
          <button onClick={() => navigate("/")}>🏠 Back to Home</button>
        </div>
      ) : (
        <>
          {/* ✅ Order Items List */}
          <div className="summary-items">
            {cart.map((item, index) => (
              <div key={index} className="summary-item">
                <img src={item.image} alt={item.name} />
                <h3>{item.name} (x{item.quantity})</h3>
                <p className="item-price">₹{(getPrice(item.price) * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          {/* ✅ Bill Summary */}
          <div className="summary-details">
            <p>Subtotal: <span>₹{subTotal.toFixed(2)}</span></p>
            <p>Discount ({discountPercentage}%): <span>-₹{discount.toFixed(2)}</span></p>
            <p>Tax (5%): <span>₹{tax.toFixed(2)}</span></p>
            <p className="total-price">Grand Total: <span>₹{grandTotal.toFixed(2)}</span></p>
          </div>

          {/* ✅ Action Buttons */}
          <div className="summary-buttons">
            <button className="download-btn" onClick={handleDownloadInvoice}>⬇ Download Invoice</button>
            <button className="pay-btn" onClick={() => navigate("/payment", { state: { totalPrice: grandTotal } })}>
              💳 Proceed to Payment
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderSummary;
