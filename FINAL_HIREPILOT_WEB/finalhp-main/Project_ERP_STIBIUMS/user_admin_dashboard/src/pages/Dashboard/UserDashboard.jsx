import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/transImg.png";
import UserLayout from "../../layouts/UserLayout";

export default function UserDashboard({ isSidebarOpen = true }) {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen transition-all duration-300">
      {/* 🟢 Fully Transparent Navbar (no blur, no background) */}
      <nav className="fixed top-0 left-0 right-0 h-24 flex items-center justify-between px-10 z-30 border-b border-white/20">
        <div className="flex items-center space-x-3">
          <img
            src={logo}
            alt="HirePilot Logo"
            className="h-16 w-auto object-contain drop-shadow-lg"
          />
        </div>

        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-3xl font-semibold text-amber-400 tracking-wide drop-shadow-md">
        User Dashboard
        </h1>

        <div className="flex items-center space-x-5">
          <span className="text-lg text-white font-medium drop-shadow-md">
            {user?.name || "Candidate"}
          </span>
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              user?.name || "Candidate"
            )}`}
            alt="User Avatar"
            className="w-14 h-14 rounded-full border-2 border-white/50 shadow-md"
          />
        </div>
      </nav>

      {/* Main content area */}
      <main
        className="flex-1 transition-all duration-300"
        style={{
          marginLeft: isSidebarOpen ? "16rem" : "5rem",
          marginTop: "6rem",
        }}
      >
        <UserLayout>
          <Outlet />
        </UserLayout>
      </main>
    </div>
  );
}
