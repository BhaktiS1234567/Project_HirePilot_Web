import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import bgImage from "../assets/img.jpg";

export default function SignUp() {
  const { register } = useAuth();
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const [error, setError] = useState("");
  const [showPasswordChecklist, setShowPasswordChecklist] = useState(false);

  const validations = {
    length: form.password.length >= 8,
    number: /[0-9]/.test(form.password),
    lowercase: /[a-z]/.test(form.password),
    uppercase: /[A-Z]/.test(form.password),
    special: /[!@#$%^&*]/.test(form.password),
  };

  const isPasswordStrong = Object.values(validations).every(Boolean);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (
      name === "confirmPassword" ||
      (name === "password" && form.confirmPassword)
    ) {
      if (value !== (name === "password" ? form.confirmPassword : form.password)) {
        setError("Sorry, passwords don't match");
      } else {
        setError("");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isPasswordStrong) {
      alert("Please create a stronger password following the rules.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Sorry, passwords don't match");
      return;
    }

    register(form);
  };

  const ruleItem = (condition, text) => (
    <li
      className={`flex items-center space-x-2 text-sm ${
        condition ? "text-green-600" : "text-red-500"
      }`}
    >
      <span>{condition ? "✅" : "❌"}</span>
      <span>{text}</span>
    </li>
  );

  return (
    <div className="flex min-h-screen">
      {/* Left image section */}
      <div
        className="hidden md:flex w-1/2 h-screen flex-col justify-center items-center text-center relative"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative z-10 text-white px-10">
          <h1 className="text-5xl font-extrabold mb-6 drop-shadow-md">
            Welcome to our community
          </h1>
          <p className="text-lg max-w-md mx-auto text-gray-200">
            Join us and experience a powerful platform for users and admins alike.
          </p>
        </div>
      </div>

      {/* Right section (Form) */}
      <div className="flex flex-col justify-start items-center w-full md:w-1/2 bg-gray-100 px-6 pt-[120px] pb-10">
        <form
          onSubmit={handleSubmit}
          className="backdrop-blur-xl bg-transparent p-6 rounded-2xl w-full max-w-md border border-transparent shadow-none"
        >
          <h2 className="text-3xl font-extrabold italic text-center text-gray-800 mb-6">
            Sign Up
          </h2>

          {/* Full Name */}
          <input
            type="text"
            placeholder="Full Name"
            className="w-full mb-3 p-3 bg-transparent border border-gray-500 rounded-lg placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-400"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            onFocus={() => setShowPasswordChecklist(false)}
          />

          {/* Username */}
          <input
            type="text"
            placeholder="Username"
            className="w-full mb-3 p-3 bg-transparent border border-gray-500 rounded-lg placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-400"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
            onFocus={() => setShowPasswordChecklist(false)}
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-3 p-3 bg-transparent border border-gray-500 rounded-lg placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-400"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            onFocus={() => setShowPasswordChecklist(false)}
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={`w-full mb-3 p-3 bg-transparent border ${
              !isPasswordStrong && showPasswordChecklist
                ? "border-red-500"
                : "border-gray-500"
            } rounded-lg placeholder-gray-500 focus:outline-none focus:ring-1 ${
              !isPasswordStrong && showPasswordChecklist
                ? "focus:ring-red-500"
                : "focus:ring-gray-400"
            }`}
            value={form.password}
            onChange={handlePasswordChange}
            onClick={() => setShowPasswordChecklist(true)} // show on click
            onDoubleClick={() => setShowPasswordChecklist(false)} // hide on double click
            onBlur={() =>
              setTimeout(() => setShowPasswordChecklist(false), 150)
            } // small delay so click outside hides it
            required
          />

          {/* Password checklist as dropdown message */}
          {showPasswordChecklist && (
            <div className="mb-4 bg-white p-3 rounded-lg border text-sm shadow-lg absolute w-[90%] max-w-md z-20">
              <p className="font-semibold mb-1 text-gray-700">
                Password must contain:
              </p>
              <ul>
                {ruleItem(validations.length, "At least 8 characters")}
                {ruleItem(validations.number, "At least 1 number (0–9)")}
                {ruleItem(validations.lowercase, "At least 1 lowercase letter (a–z)")}
                {ruleItem(validations.uppercase, "At least 1 uppercase letter (A–Z)")}
                {ruleItem(validations.special, "At least 1 special character (!@#$%^&*)")}
              </ul>
            </div>
          )}

          {/* Confirm Password */}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className={`w-full mb-3 p-3 bg-transparent border ${
              error ? "border-red-500" : "border-gray-500"
            } rounded-lg placeholder-gray-500 focus:outline-none focus:ring-1 ${
              error ? "focus:ring-red-500" : "focus:ring-gray-400"
            }`}
            value={form.confirmPassword}
            onChange={handlePasswordChange}
            onFocus={() => setShowPasswordChecklist(false)}
            required
          />
          {error && (
            <p className="text-red-600 text-sm font-medium bg-red-100 px-3 py-2 rounded-md mb-3">
              {error}
            </p>
          )}

          {/* Role */}
          <select
            className="w-full mb-5 p-3 bg-transparent border border-gray-500 rounded-lg text-gray-700 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-400"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            onFocus={() => setShowPasswordChecklist(false)}
          >
            <option value="USER" className="text-gray-800">
              User
            </option>
            <option value="ADMIN" className="text-gray-800">
              Admin
            </option>
          </select>

          {/* Register Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-[200px] bg-gradient-to-r from-orange-500 to-amber-400 hover:bg-gray-800 text-white px-8 py-2.5 rounded-lg font-semibold transition-all"
            >
              Register
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-orange-400 font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
