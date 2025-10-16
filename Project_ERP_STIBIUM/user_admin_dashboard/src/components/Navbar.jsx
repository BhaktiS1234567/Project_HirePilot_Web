import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import transImg from "../assets/transImg.png"; // ✅ Import your logo

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="absolute top-0 left-0 w-full h-[90px] bg-transparent shadow-none px-8 py-4 flex justify-between items-center z-20">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img
          src={transImg}
          alt="Logo"
          className="h-16 w-auto object-contain"
        />
      </Link>

      {/* Navigation links */}
      <div className="space-x-8 text-lg">
        {!user && (
          <>
            <Link to="/" className="text-black hover:text-gray-700 transition">
              Home
            </Link>
            <Link to="/signup" className="text-black hover:text-gray-700 transition">
              Register
            </Link>
            <Link to="/signin" className="text-black hover:text-gray-700 transition">
              Login
            </Link>
          </>
        )}

        {user && (
          <>
            <Link to="/profile" className="text-black hover:text-gray-700 transition">
              Profile
            </Link>
            <Link
              to={user.role === "admin" ? "/dashboard/admin" : "/dashboard/user"}
              className="text-black hover:text-gray-700 transition"
            >
              Dashboard
            </Link>
            <button
              onClick={logout}
              className="text-black font-semibold hover:text-gray-700 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
