import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const navigate = useNavigate();

  // Register User
  const register = (form) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const exists = users.find((u) => u.username === form.username);
    if (exists) return alert("❌ Username already exists!");
    if (form.password !== form.confirmPassword) return alert("❌ Passwords do not match!");

    const newUser = {
      name: form.name,
      username: form.username,
      email: form.email,
      password: form.password,
      role: form.role,
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    alert("✅ Registered successfully!");
    navigate("/signin");
  };

  // Login User
  const login = (username, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const validUser = users.find((u) => u.username === username && u.password === password);

    if (!validUser) return alert("❌ Invalid username or password!");

    setUser(validUser);
    localStorage.setItem("user", JSON.stringify(validUser));

    if (validUser.role === "admin") navigate("/dashboard/admin");
    else navigate("/dashboard/user");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
