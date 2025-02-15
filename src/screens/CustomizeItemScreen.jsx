import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext"; // ✅ Import Cart Context
import "./CustomizeItemScreen.css";

const CustomizeItemScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addItem } = useContext(CartContext); // ✅ Use Cart Context
  const item = location.state?.item || {};

  const [customizations, setCustomizations] = useState({
    extraCheese: false,
    extraSpicy: false,
    extraToppings: false,
    glutenFreeCrust: false,
    doubleSauce: false,
    noOnions: false,
    extraOlives: false,
    stuffedCrust: false,
  });

  const basePrice = parseFloat(item.price || 0);
  const prices = {
    extraCheese: 20,
    extraSpicy: 10,
    extraToppings: 30,
    glutenFreeCrust: 40,
    doubleSauce: 15,
    noOnions: 5,
    extraOlives: 25,
    stuffedCrust: 50,
  };

  const totalPrice = basePrice + Object.keys(customizations).reduce(
    (sum, key) => sum + (customizations[key] ? prices[key] : 0),
    0
  );

  const handleToggle = (key) => {
    setCustomizations({ ...customizations, [key]: !customizations[key] });
  };

  const handleSave = () => {
    const selectedExtras = Object.keys(customizations).filter((key) => customizations[key]);

    // ✅ Create updated item with new price
    const updatedItem = {
      ...item,
      price: Number(totalPrice.toFixed(2)), // ✅ Ensure price is a number
      extras: selectedExtras, // ✅ Store selected extras
    };

    addItem(updatedItem); // ✅ Add updated item to cart
    navigate("/"); // ✅ Redirect to Home Screen
  };

  return (
    <div className="customize-container">
      <header className="customize-header">
        <h2>Customize {item.name}</h2>
      </header>

      <div className="customize-options">
        {Object.keys(customizations).map((key) => (
          <label key={key} className="customize-item">
            <input type="checkbox" checked={customizations[key]} onChange={() => handleToggle(key)} />
            {key.replace(/([A-Z])/g, " $1").trim()} (+₹{prices[key]})
          </label>
        ))}
      </div>

      <div className="customize-price">
        <p>Total Price: <span>₹{totalPrice.toFixed(2)}</span></p>
      </div>

      {/* ✅ New "Add to Cart" Button */}
      <button className="save-btn" onClick={handleSave}>
        Save & Add to cart
      </button>
    </div>
  );
};

export default CustomizeItemScreen;
