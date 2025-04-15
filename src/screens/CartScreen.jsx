// import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { CartContext } from "../context/CartContext";
// import "./CartScreen.css";

// const CartScreen = () => {
//   const { cart, increaseQuantity, decreaseQuantity, removeItem, clearCart } =
//     useContext(CartContext);
//   const navigate = useNavigate();

//   const totalPrice = cart.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   return (
//     <div className="cart-container">
//       <header className="cart-header">
//         <h2>🛒 Your Cart</h2>
//       </header>

//       {cart.length === 0 ? (
//         <div className="empty-cart">
//           <img src="/assets/images/empty-cart.png" alt="Empty Cart" />
//           <p>Your cart is empty!</p>
//           <button className="shop-btn" onClick={() => navigate("/")}>
//             🛍️ Start Shopping
//           </button>
//         </div>
//       ) : (
//         <>
//           <div className="cart-items">

//             {cart.map((item, index) => (
//               <div key={index} className="cart-item">
//                 <img src={item.image} alt={item.name} className="cart-image" />
//                 <div className="cart-info">
//                   <h3>{item.name}</h3>
//                   <p><strong>Price:</strong> ₹{item.price}</p> {/* ✅ Updated Price */}

//                   {/* ✅ Show selected extras */}
//                   {item.extras && item.extras.length > 0 && (
//                     <p className="extras"><strong>Extras:</strong> {item.extras.join(", ")}</p>
//                   )}
//                 </div>

//                 <div className="cart-actions">
//                   <button className="qty-btn" onClick={() => decreaseQuantity(item)}>➖</button>
//                   <span className="qty-number">{item.quantity}</span>
//                   <button className="qty-btn" onClick={() => increaseQuantity(item)}>➕</button>
//                   <button className="delete-btn" onClick={() => removeItem(item)}>🗑️</button>
//                 </div>
//               </div>
//             ))}

//           </div>

//           <div className="cart-summary">
//             <div className="summary-row">
//               <span>Subtotal:</span>
//               <span>₹{totalPrice.toFixed(2)}</span>
//             </div>
//             <div className="summary-row">
//               <span>Delivery Fee:</span>
//               <span>₹{totalPrice > 500 ? 0 : 40}</span>
//             </div>
//             <div className="summary-row total">
//               <span>Total:</span>
//               <span>₹{(totalPrice + (totalPrice > 500 ? 0 : 40)).toFixed(2)}</span>
//             </div>
//           </div>

//           <div className="cart-buttons">
//             <button className="clear-btn" onClick={clearCart} disabled={cart.length === 0}>
//               🗑️ Clear Cart
//             </button>
//             <button className="checkout-btn" onClick={() => navigate("/order-summary")} disabled={cart.length === 0}>
//               💳 Checkout
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default CartScreen;


import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./CartScreen.css";

const CartScreen = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeItem, clearCart } =
    useContext(CartContext);
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <header className="cart-header">
        <div className="header-content">
          <h2>🛒 Your Cart</h2>
        </div>
      </header>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <img src="/assets/images/empty-cart.png" alt="Empty Cart" />
          <h3>Your cart is empty!</h3>
          <button className="shop-btn" onClick={() => navigate("/")}>
            🛍️ Start Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <div className="item-image">
                  <img
                    src={item.image || "/assets/images/default-food.png"}
                    alt={item.name}
                    className="cart-image"
                    onError={(e) => (e.target.src = "/assets/images/default-food.png")}
                  />
                </div>

                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-price">₹{item.price.toFixed(2)}</p>

                  {item.extras && item.extras.length > 0 && (
                    <div className="item-extras">
                      <strong>Extras:</strong>{" "}
                      {item.extras
                        .map(extra =>
                          extra
                            .replace(/_/g, " ")           // Replace underscores with spaces
                            .replace(/\b\w/g, c => c.toUpperCase()) // Capitalize first letter of each word
                        )
                        .join(", ")}
                    </div>
                  )}

                  <div className="item-customization">
                    {item.customizations && (
                      <div className="customization-details">
                        {Object.entries(item.customizations).map(([key, value]) => (
                          <p key={key}> {value}</p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="item-actions">
                  <div className="quantity-control">
                    <button
                      className="qty-btn decrease"
                      onClick={() => decreaseQuantity(item)}
                      aria-label="Decrease quantity"
                    >
                      ➖
                    </button>
                    <span className="qty-number">{item.quantity}</span>
                    <button
                      className="qty-btn increase"
                      onClick={() => increaseQuantity(item)}
                      aria-label="Increase quantity"
                    >
                      ➕
                    </button>
                  </div>
                  <button
                    className="delete-btn"
                    onClick={() => removeItem(item)}
                    aria-label="Remove item"
                  >
                    🗑️Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery Fee:</span>
              <span>₹{totalPrice > 500 ? 0 : 40}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>₹{(totalPrice + (totalPrice > 500 ? 0 : 40)).toFixed(2)}</span>
            </div>
          </div>

          <div className="cart-buttons">
            <button
              className="clear-btn"
              onClick={clearCart}
              disabled={cart.length === 0}
            >
              🗑️ Clear Cart
            </button>
            <button
              className="checkout-btn"
              onClick={() => navigate("/order-summary")}
              disabled={cart.length === 0}
            >
              💳 Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartScreen;