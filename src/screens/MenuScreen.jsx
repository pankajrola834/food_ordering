import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./MenuScreen.css";

const MenuScreen = () => {
  const [menuData, setMenuData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedItem, setSelectedItem] = useState(null);
  const { cart, addItem } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/menu_data.json") // ✅ Fetching data from JSON
      .then((res) => res.json())
      .then((data) => {
        setMenuData(data);
      })
      .catch((err) => console.error("Error loading menu data:", err));
  }, []);

  // Function to render star rating ⭐⭐⭐⭐☆
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating); // Full stars count
    const hasHalfStar = rating % 1 !== 0; // If the rating has a decimal

    for (let i = 0; i < fullStars; i++) {
      stars.push("★");
    }
    if (hasHalfStar) {
      stars.push("⯪"); // Half star emoji
    }
    return stars.join(" ");
  };

  // ✅ Get items based on selected category
  let displayedItems = [];
  if (selectedCategory === "All Categories") {
    Object.values(menuData).forEach((items) => {
      displayedItems = [...displayedItems, ...items];
    });
  } else {
    displayedItems = menuData[selectedCategory] || [];
  }

  return (
    <div className="menu-container">
      <header className="menu-header">
        <h2>Home Screen</h2>
        <div className="cart-icon" onClick={() => navigate("/cart")}>
          🛒 <span className="cart-count">{cart.length}</span>
        </div>
      </header>

      {Object.keys(menuData).length === 0 ? (
        <div className="loading">
          <img src="/assets/images/loading.gif" alt="Loading..." />
        </div>
      ) : (
        <>
          {/* Category List */}
          <div className="category-list">
            {/* ✅ "All Categories" Button */}
            <div
              className={`category-item ${selectedCategory === "All Categories" ? "active" : ""}`}
              onClick={() => setSelectedCategory("All Categories")}
            >
              <img
                  src={`/assets/images/All Categories.png`}
                  alt='All Categories'
                  onError={(e) => (e.target.src = "/assets/images/default.png")}
                />
              <span>All Categories</span>
            </div>

            {Object.keys(menuData).map((category) => (
              <div
                key={category}
                className={`category-item ${selectedCategory === category ? "active" : ""}`}
                onClick={() => setSelectedCategory(category)}
              >
                <img
                  src={`/assets/images/${category}.png`}
                  alt={category}
                  onError={(e) => (e.target.src = "/assets/images/default.png")}
                />
                <span>{category}</span>
              </div>
            ))}
          </div>

          {/* Menu Items */}
          <div className="menu-items">
            {displayedItems.map((item, index) => (
              <div key={index} className="menu-card">
                <img
                  src={item.image}
                  alt={item.name}
                  className="menu-image"
                  onError={(e) => (e.target.src = "/assets/images/default-food.png")}
                  onClick={() => setSelectedItem(item)} // ✅ Opens popup
                />
                <h4>{item.name}</h4>
                <p>{item.description}</p>
                <h4>₹{item.price}</h4>

                {/* Display Rating at Bottom Right */}
                <div className="rating">
                  {item.rating ? renderStars(parseFloat(item.rating)) : "No rating"}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Popup Modal */}
      {selectedItem && (
        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={() => setSelectedItem(null)}>❌</span>
            <img src={selectedItem.image} alt={selectedItem.name} className="modal-image" />
            <h3>{selectedItem.name}</h3>
            <p>{selectedItem.description}</p>
            <h4>₹{selectedItem.price}</h4>

            {/* Display Rating in Popup */}
            <div className="rating">
              {selectedItem.rating ? renderStars(parseFloat(selectedItem.rating)) : "No rating"}
            </div>

            <button onClick={() => addItem(selectedItem)}>Add to Cart</button>

            <button className="customize-btn" onClick={() => navigate(`/customize`, { state: { item: selectedItem } })}>
              Customize
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuScreen;
