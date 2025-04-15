// import { useState, useContext } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import AuthContext from "../context/AuthContext";
// import { loginUser } from "./api";
// import "./styles.css";

// const Login = () => {
//   const { login } = useContext(AuthContext);
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await loginUser(formData);
//       console.log("API Response:", res);

//       if (!res || !res.data) {
//         throw new Error("Invalid API response");
//       }

//       if (res.data.token) {
//         localStorage.setItem("token", res.data.token);
//         localStorage.setItem("user", JSON.stringify(res.data.user || {}));
//         login(res.data.user, res.data.token); // Update auth context with user info and token
//         alert("Login Successful!");
//         navigate("/home");
//       } else {
//         alert("Invalid Credentials");
//       }
//     } catch (error) {
//       console.error("Login Error:", error);
//       alert(error.response?.data?.msg || "Login failed!");
//     }
//   };

//   return (
//     <div className="form-body">
//       <div className="form-container">
//         {/* Background Video */}
//         <div className="animated-bg">
//           <video autoPlay loop muted className="video-bg">
//             <source src="/assets/background.mp4" type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//         </div>

//         <h1>Login</h1>

//         <form onSubmit={handleSubmit}>
//           <div className="input-container">
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//             <button className="btn" type="submit">
//               Login
//             </button>
//             <p className="switch-link">
//               Don&apos;t have an account? <Link to="/register">Sign Up</Link>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;



import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { loginUser } from "./api";
import "./styles.css";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    console.log("Submitting login:", { email, password });
    try {
      const res = await loginUser({ email, password }); // 💥 FIXED
      
      console.log("API Response:", res);
  
      if (!res || !res.data) {
        throw new Error("Invalid API response");
      }
  
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user || {}));
        login(); // Update auth context
        alert("Login Successful!");
        navigate("/home");
      } else {
        alert("Invalid Credentials");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert(error.response?.data?.msg || "Login failed!");
    }
  };
  
  

  return (
    <div className="form-body">
      <div className="form-container">
        {/* Background Video */}
        <div className="animated-bg">
          <video autoPlay loop muted className="video-bg">
            <source src="/assets/background.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-container">
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
            <button className="btn" type="submit">Login</button>
            <p className="switch-link">
              Don&apos;t have an account? <Link to="/register">Sign Up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

