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

  const handleSubmit = (e) => {
    e.preventDefault();
    register(form);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left section with background image */}
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

      {/* Right section with soft gradient (gray-white tone) */}
<div className="flex flex-col justify-start items-center w-full md:w-1/2 bg-gray-100 px-6 pt-[120px] pb-10">
  <form
  onSubmit={handleSubmit}
  className="backdrop-blur-xl bg-transparent p-6 rounded-2xl w-full max-w-md border border-transparent shadow-none"
>

    <h2 className="text-3xl font-extrabold italic text-center text-gray-800 mb-6">
      Sign Up
    </h2>


          <input
            type="text"
            placeholder="Full Name"
            className="w-full mb-3 p-3 bg-transparent border border-gray-500 rounded-lg placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-400"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            type="text"
            placeholder="Username"
            className="w-full mb-3 p-3 bg-transparent border border-gray-500 rounded-lg placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-400"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full mb-3 p-3 bg-transparent border border-gray-500 rounded-lg placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-400"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-3 p-3 bg-transparent border border-gray-500 rounded-lg placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-400"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full mb-3 p-3 bg-transparent border border-gray-500 rounded-lg placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-400"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
            required
          />

          <select
            className="w-full mb-5 p-3 bg-transparent border border-gray-500 rounded-lg text-gray-700 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-400"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="user" className="text-gray-800">
              User
            </option>
            <option value="admin" className="text-gray-800">
              Admin
            </option>
          </select>

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
            <Link to="/signin" className="text-orange-400 font-medium hover:underline">
              Sign in
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}
