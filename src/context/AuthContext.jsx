// import { createContext, useState, useEffect } from "react";

// // Create Auth Context
// const AuthContext = createContext();

// // Auth Provider Component
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem("token") || null);

//   useEffect(() => {
//     if (token) {
//       fetchUser();
//     }
//   }, [token]);

//   // Fetch user details from backend
//   const fetchUser = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/user", {
//         headers: { Authorization: token },
//       });
//       const data = await res.json();
//       if (data.success) setUser(data.user);
//     } catch (err) {
//       console.error("Error fetching user:", err);
//       logout();
//     }
//   };

//   // Login Function
//   const login = async (email, password) => {
//     try {
//       const res = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await res.json();
//       if (data.success) {
//         setToken(data.token);
//         localStorage.setItem("token", data.token);
//         fetchUser();
//       }
//       return data;
//     } catch (err) {
//       console.error("Login Error:", err);
//     }
//   };

//   // Signup Function
//   const signup = async (name, email, password) => {
//     try {
//       const res = await fetch("http://localhost:5000/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, password }),
//       });
//       return await res.json();
//     } catch (err) {
//       console.error("Signup Error:", err);
//     }
//   };

//   // Logout Function
//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem("token");
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, signup, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;


// import { createContext, useState, useEffect } from "react";

// // Create Auth Context
// const AuthContext = createContext();

// // Auth Provider Component
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem("token") || null);
//   const [loading, setLoading] = useState(true); // optional loading state

//   const isAuthenticated = !!user;

//   // Auto-fetch user if token exists (on app start)
//   useEffect(() => {
//     const initializeAuth = async () => {
//       if (token) {
//         await fetchUser(token);
//       }
//       setLoading(false);
//     };
//     initializeAuth();
//   }, [token]);

//   // Fetch user details from backend
//   const fetchUser = async (authToken) => {
//     try {
//       const res = await fetch("http://localhost:5000/api/user", {
//         headers: { Authorization: authToken },
//       });
//       const data = await res.json();
//       if (data.success) {
//         setUser(data.user);
//       } else {
//         logout(); // token might be invalid
//       }
//     } catch (err) {
//       console.error("❌ Error fetching user:", err);
//       logout();
//     }
//   };

//   // Login Function
//   const login = async (email, password) => {
//     try {
//       const res = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await res.json();

//       if (data.success && data.token) {
//         setToken(data.token);
//         localStorage.setItem("token", data.token);
//         await fetchUser(data.token);
//       }

//       return data;
//     } catch (err) {
//       console.error("❌ Login Error:", err);
//       return { success: false, message: "Something went wrong!" };
//     }
//   };

//   // Signup Function
//   const signup = async (name, email, password) => {
//     try {
//       const res = await fetch("http://localhost:5000/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, password }),
//       });
//       return await res.json();
//     } catch (err) {
//       console.error("❌ Signup Error:", err);
//       return { success: false, message: "Signup failed." };
//     }
//   };

//   // Logout Function
//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem("token");
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         token,
//         isAuthenticated,
//         loading,
//         login,
//         signup,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;


import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Initialize user from localStorage if available
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (token) {
          await fetchUser();
        }
      } catch (err) {
        console.error("Auth initialization error:", err);
        setError("Failed to initialize authentication");
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [token]);

  // Fetch user from backend
  const fetchUser = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/user", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const contentType = res.headers.get("content-type");
      if (!contentType?.includes("application/json")) {
        throw new Error("Expected JSON response");
      }

      const data = await res.json();
      
      if (data.success) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        throw new Error(data.message || "Failed to fetch user");
      }
    } catch (err) {
      console.error("User fetch error:", err.message);
      logout();
      throw err;
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      
      if (!data.success) {
        throw new Error(data.message || "Login failed");
      }

      setToken(data.token);
      localStorage.setItem("token", data.token);
      await fetchUser();
      
      return { success: true, user: data.user };
    } catch (err) {
      console.error("Login error:", err.message);
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Signup function
  const signup = async (name, email, password) => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      
      if (!data.success) {
        throw new Error(data.message || "Registration failed");
      }

      // Auto-login after signup
      if (data.token) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        await fetchUser();
      }
      
      return { success: true, user: data.user };
    } catch (err) {
      console.error("Signup error:", err.message);
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    setError(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // Check authentication status
  const isAuthenticated = !!user && !!token;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        login,
        signup,
        logout,
        isAuthenticated,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;