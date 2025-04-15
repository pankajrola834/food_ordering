import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import AuthContext from "../context/AuthContext";
import "./MenuScreen.css";

const MenuScreen = () => {
  const [menuData, setMenuData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { cart, addItem } = useContext(CartContext);
  const { user, token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const isAuthenticated = !!token || !!localStorage.getItem("token");
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    setDisplayName(user?.name || storedUser?.name || "");
  }, [user]);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch("/menu_data.json");
        const data = await response.json();
        setMenuData(data);
      } catch (err) {
        console.error("Error loading menu data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  const renderStars = (rating) => {
    if (!rating) return "No rating";
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) stars.push("★");
    if (hasHalfStar) stars.push("½");

    return stars.join(" ");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    if (logout) logout();
    navigate("/login");
  };

  // Handle cart navigation with auth check
  const handleCartNavigation = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/cart" } });
    } else {
      navigate("/cart");
    }
  };

  // Handle add to cart with auth check
  const handleAddToCart = (item) => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/menu" } });
    } else {
      addItem(item);
      setSelectedItem(null);
    }
  };

  // Handle customization with auth check
  const handleCustomize = (item) => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/customize", item } });
    } else {
      setSelectedItem(null);
      navigate("/customize", { state: { item } });
    }
  };

  const displayedItems = 
    selectedCategory === "All Categories"
      ? Object.values(menuData).flat()
      : menuData[selectedCategory] || [];

  return (
    <div className="menu-container">
      {/* Header */}
      <header className="menu-header">
        <div className="header-content">
          <div className="logo-container">
            <div className="logo">🍕 Custom Pie</div>
            <div className="tagline">Artisanal Pizzas Made Fresh</div>
          </div>
          
          {displayName && (
            <div className="user-greeting">
              <span className="welcome">Welcome back,</span>
              <span className="name">
                {displayName.split(" ")[0]}
                <span className="user-icon">👋</span>
              </span>
            </div>
          )}
          
          <div className="header-actions">
            <div className="cart-icon-container" onClick={handleCartNavigation}>
              <div className="cart-icon">
                <span className="cart-icon-symbol">🛒</span>
                {cart.length > 0 && (
                  <span className="cart-count">{cart.length}</span>
                )}
              </div>
              <span className="cart-text">Cart</span>
            </div>
            
            {isAuthenticated ? (
              <button className="logout-btn" onClick={handleLogout}>
                <span className="btn-icon">🔓</span>
                <span className="btn-text">Logout</span>
              </button>
            ) : (
              <button className="login-btn" onClick={() => navigate("/login")}>
                <span className="btn-icon">🔑</span>
                <span className="btn-text">Login</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Loading State */}
      {isLoading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading our delicious menu...</p>
        </div>
      ) : (
        <>
          {/* Category Navigation */}
          <nav className="category-nav">
            <div className="category-scroll">
              <div
                className={`category-item ${selectedCategory === "All Categories" ? "active" : ""}`}
                onClick={() => setSelectedCategory("All Categories")}
              >
                <div className="category-icon">🥗</div>
                <span>All</span>
              </div>
              
              {Object.keys(menuData).map((category) => (
                <div
                  key={category}
                  className={`category-item ${selectedCategory === category ? "active" : ""}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  <div className="category-icon">
                    {category === "Pizza" ? "🍕" : 
                     category === "Pasta" ? "🍝" :
                     category === "Burgers" ? "🍔" :
                     category === "Hotdogs" ? "🌮" :
                     category === "Fries" ? "🍟" :
                     category === "Chinese" ? "🍝" :
                     category === "South Indian" ? "🥘" :
                     category === "Beverages" ? "🍹" :
                     category === "Salad" ? "🥗" :
                     category === "Desserts" ? "🍰" : "🍴"}
                  </div>
                  <span>{category}</span>
                </div>
              ))}
            </div>
          </nav>

          {/* Menu Items */}
          <main className="menu-grid">
            {displayedItems.length > 0 ? (
              displayedItems.map((item, index) => (
                <article 
                  key={index} 
                  className="menu-card"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="card-image-container">
                    <img
                      src={item?.image || "/assets/images/default-food.png"}
                      alt={item?.name}
                      className="menu-image"
                      onError={(e) => (e.target.src = "/assets/images/default-food.png")}
                    />
                    {item.isPopular && (
                      <div className="popular-badge">🔥 Popular</div>
                    )}
                  </div>
                  
                  <div className="card-content">
                    <h3 className="item-name">{item?.name}</h3>
                    <p className="item-desc">{item?.description || "Delicious item"}</p>
                    
                    <div className="item-footer">
                      <span className="item-price">₹{item?.price?.toFixed(2) || "N/A"}</span>
                      <span className="item-rating">
                        {item?.rating ? renderStars(item.rating) : "No rating"}
                      </span>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="empty-state">
                <p>No items found in this category</p>
              </div>
            )}
          </main>
        </>
      )}

      {/* Item Modal */}
      {selectedItem && (
        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button 
              className="close-btn" 
              onClick={() => setSelectedItem(null)}
              aria-label="Close"
            >
              &times;
            </button>
            
            <div className="modal-image-container">
              <img
                src={selectedItem?.image || "/assets/images/default-food.png"}
                alt={selectedItem?.name}
                className="modal-image"
                onError={(e) => (e.target.src = "/assets/images/default-food.png")}
              />
            </div>
            
            <div className="modal-content">
              <h3>{selectedItem?.name}</h3>
              <p>{selectedItem?.description || "No description available"}</p>
              
              <div className="modal-details">
                <div className="detail-row">
                  <span>Price:</span>
                  <span>₹{selectedItem?.price?.toFixed(2) || "N/A"}</span>
                </div>
                <div className="detail-row">
                  <span>Rating:</span>
                  <span>
                    {selectedItem?.rating ? renderStars(selectedItem.rating) : "No rating"}
                  </span>
                </div>
              </div>
              
              <div className="modal-actions">
                <button 
                  className="add-to-cart"
                  onClick={() => handleAddToCart(selectedItem)}
                >
                  Add to Cart
                </button>
                <button
                  className="customize-btn"
                  onClick={() => handleCustomize(selectedItem)}
                >
                  Customize
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuScreen;