import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/transImg.png"; // ✅ import your logo

export default function AdminDashboard({ isSidebarOpen = true }) {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 transition-all duration-300">
      {/* Full-width Navbar */}
      <nav
        className="fixed top-0 left-0 right-0 bg-gray-400 shadow-md h-23 flex items-center justify-between px-10 z-30 transition-all duration-300"
      >
        {/* Left: Logo */}
        <div className="flex items-center space-x-3">
          <img
            src={logo}
            alt="HirePilot Logo"
            className="h-16 w-70 w-auto object-contain"
          />
        </div>

        {/* Center: Title */}
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-3xl font-semibold text-amber-600 tracking-wide">
          Admin Dashboard
        </h1>

        {/* Right: User Info */}
        <div className="flex items-center space-x-5">
          <span className="text-lg text-gray-800 font-medium">
            {user?.name || "Admin"}
          </span>
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              user?.name || "Admin"
            )}`}
            alt="Admin Avatar"
            className="w-14 h-14 rounded-full border-2 border-gray-300 shadow-sm"
          />
        </div>
      </nav>

      {/* Main content — now starts below navbar */}
      <main
        className="flex-1 p-8 transition-all duration-300"
        style={{
          marginLeft: isSidebarOpen ? "16rem" : "5rem",
          marginTop: "6rem", // matches navbar height
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}
