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
        <h2>🛒 Your Cart</h2>
      </header>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <img src="/assets/images/empty-cart.png" alt="Empty Cart" />
          <p>Your cart is empty!</p>
          <button className="shop-btn" onClick={() => navigate("/")}>
            🛍️ Start Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {/* {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-image" />
                <div className="cart-info">
                  <h3>{item.name}</h3>
                  <p>₹{item.price}</p>

                  <div className="cart-actions">
                    <button className="qty-btn" onClick={() => decreaseQuantity(item)}>-</button>
                    <span className="qty-number">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => increaseQuantity(item)}>+</button>

                    <button className="delete-btn" onClick={() => removeItem(item)}>🗑️</button>
                  </div>
                </div>

              </div>
            ))} */}


{cart.map((item, index) => (
  <div key={index} className="cart-item">
    <img src={item.image} alt={item.name} className="cart-image" />
    <div className="cart-info">
      <h3>{item.name}</h3>
      <p><strong>Price:</strong> ₹{item.price}</p> {/* ✅ Updated Price */}

      {/* ✅ Show selected extras */}
      {item.extras && item.extras.length > 0 && (
        <p className="extras"><strong>Extras:</strong> {item.extras.join(", ")}</p>
      )}
    </div>

    <div className="cart-actions">
      <button className="qty-btn" onClick={() => decreaseQuantity(item)}>-</button>
      <span className="qty-number">{item.quantity}</span>
      <button className="qty-btn" onClick={() => increaseQuantity(item)}>+</button>
      <button className="delete-btn" onClick={() => removeItem(item)}>❌</button>
    </div>
  </div>
))}

          </div>

          <div className="cart-summary">
            <p>Total Price: <span>₹{totalPrice.toFixed(2)}</span></p>
          </div>

          <div className="cart-buttons">
            <button className="clear-btn" onClick={clearCart} disabled={cart.length === 0}>
              🗑️ Clear Cart
            </button>
            <button className="checkout-btn" onClick={() => navigate("/order-summary")} disabled={cart.length === 0}>
              💳 Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartScreen;
