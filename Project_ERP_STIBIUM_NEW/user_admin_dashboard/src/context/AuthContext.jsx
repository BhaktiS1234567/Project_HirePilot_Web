import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const getStoredUser = () => {
    try {
      const stored = localStorage.getItem("user");
      if (!stored || stored === "undefined") return null;
      return JSON.parse(stored);
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  };

  const [user, setUser] = useState(getStoredUser());
  const navigate = useNavigate();

  // 🟡 REGISTER
  const register = async (form) => {
    try {
      const response = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Signup failed");

      alert("✅ " + data.message);
      navigate("/signin");
    } catch (err) {
      alert("❌ " + err.message);
      console.error("Signup Error:", err);
    }
  };

  // 🟡 LOGIN
  const login = async (username, password) => {
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Login failed");

      const loggedUser = {
        username: data.username,
        email: data.email,
        role: data.role,
      };

      setUser(loggedUser);
      localStorage.setItem("user", JSON.stringify(loggedUser));

      if (loggedUser.role === "admin") navigate("/dashboard/admin");
      else navigate("/dashboard/user");

    } catch (err) {
      alert("❌ " + err.message);
      console.error("Login Error:", err);
    }
  };

  // 🟡 RESET PASSWORD
  const resetPassword = async (email, newPassword) => {
    try {
      const response = await fetch("http://localhost:8080/auth/resetPass", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: newPassword }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Password reset failed");

      alert("✅ " + data.message);
      navigate("/signin");
    } catch (err) {
      alert("❌ " + err.message);
      console.error("Reset Password Error:", err);
    }
  };

  // 🟡 LOGOUT
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}
