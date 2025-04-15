import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "./api";
import "./styles.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      alert("User registered successfully!");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.msg || "Registration failed!");
    }
  };

  return (
    <div className="form-body">
    <div className="form-container">
      {/* Video Background */}
      <div className="animated-bg">
      <video autoPlay loop muted className="video-bg">
  <source src="/assets/background.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>
      </div>

      <h1>Sign Up</h1>

      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            />
          <button className="btn" type="submit">Register</button>
          <p className="switch-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
            </div>
    </div>
  );
};

export default Register;