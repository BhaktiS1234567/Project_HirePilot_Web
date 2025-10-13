import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import transImg from "../assets/transImg.png"; // ✅ Import your logo

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="absolute top-0 left-0 w-full h-[90px] bg-white/20 backdrop-blur-md shadow-md px-8 py-4 flex justify-between items-center z-20">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img
          src={transImg}
          alt="Logo"
          className="h-16 w-70 object-contain" // adjust h-12 for size
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
              className="bg-black text-white font-semibold px-4 py-2 rounded hover:bg-gray-800 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
