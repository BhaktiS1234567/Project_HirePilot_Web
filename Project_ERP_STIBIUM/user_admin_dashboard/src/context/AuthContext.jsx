import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const navigate = useNavigate();

  // 🟡 SIGN UP — Connect to backend
  const register = async (form) => {
    try {
      const response = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          username: form.username,
          email: form.email,
          password: form.password,
          role: form.role,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Signup failed");

      alert("✅ Registered successfully!");
      navigate("/signin");
    } catch (err) {
      alert("❌ " + err.message);
      console.error("Signup Error:", err);
    }
  };

  // 🟡 SIGN IN — Connect to backend
  const login = async (username, password) => {
    try {
      const response = await fetch("http://localhost:8080/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");

      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.role === "admin") navigate("/dashboard/admin");
      else navigate("/dashboard/user");
    } catch (err) {
      alert("❌ " + err.message);
      console.error("Login Error:", err);
    }
  };

  // 🟡 LOGOUT
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/signin");
  };

  // 🟡 RESET PASSWORD — Forgot password feature
  const resetPassword = async (email, newPassword) => {
    try {
      const response = await fetch("http://localhost:8080/auth/resetPass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Password reset failed");

      alert("✅ Password reset successful!");
      navigate("/signin");
    } catch (err) {
      alert("❌ " + err.message);
      console.error("Reset Password Error:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}
