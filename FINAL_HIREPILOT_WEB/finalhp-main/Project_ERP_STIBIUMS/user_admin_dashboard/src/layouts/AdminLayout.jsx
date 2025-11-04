import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/transImg.png";
import AdminBgImg from "../assets/AdminBgImg.jpg"; // ✅ Make sure this image exists in /assets/

export default function AdminLayout({ isSidebarOpen = true }) {
  const { user } = useAuth();

  return (
    <div
      className="relative min-h-screen w-screen flex flex-col transition-all duration-300 bg-cover bg-center bg-fixed bg-no-repeat"
      style={{
        backgroundImage: `url(${AdminBgImg})`,
      }}
    >
      {/* 🔹 Slight dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/0 z-0"></div>

      {/* 🔹 Transparent Navbar */}
      <nav className="fixed top-0 left-0 right-0 backdrop-blur-md bg-white/10 shadow-md h-24 flex items-center justify-between px-10 z-30 border-b border-white/20">
        {/* Left: Logo */}
        <div className="flex items-center space-x-3">
          <img src={logo} alt="HirePilot Logo" className="h-16 w-auto object-contain" />
        </div>

        {/* Center: Title */}
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-3xl italic font-extrabold text-black tracking-wide drop-shadow-md">
          
        </h1>

        {/* Right: Admin Info */}
        <div className="flex items-center space-x-5">
          <span className="text-lg text-black font-medium drop-shadow-md">
            {user?.name || "Admin"}
          </span>
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "Admin")}`}
            alt="Admin Avatar"
            className="w-14 h-14 rounded-full border-2 border-white/60 shadow-md"
          />
        </div>
      </nav>

      {/* 🔹 Main Content Area */}
      <main
        className="relative z-10 flex-1 flex items-start justify-start px-12 py-16 transition-all duration-300 text-white"
        style={{
          marginLeft: isSidebarOpen ? "7rem" : "7rem",
          marginTop: "4rem",
        }}
      >
        {/* ✅ Removed border, background, shadow */}
        <div className="w-full max-w-5xl p-10 text-white">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
