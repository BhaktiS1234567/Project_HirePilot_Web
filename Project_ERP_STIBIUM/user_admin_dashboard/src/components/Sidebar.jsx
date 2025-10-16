import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LogOut,
  User,
  Menu,
  Users,
  Briefcase,
  FileText,
  Settings,
  Home,
} from "lucide-react";

export default function Sidebar({ onToggle }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  // Notify parent (AdminDashboard) about sidebar width
  useEffect(() => {
    if (onToggle) onToggle(isOpen);
  }, [isOpen, onToggle]);

  // Define sidebar links based on role
  const links =
    user?.role === "ADMIN"
      ? [
          { name: "Admin Profile", path: "/dashboard/admin/profile", icon: User },
          { name: "Overview", path: "/dashboard/admin/Overview", icon: Home },
          { name: "User Management", path: "/dashboard/admin/users", icon: Users },
          { name: "Job Post", path: "/dashboard/admin/jobs", icon: Briefcase },
          { name: "Applications", path: "/dashboard/admin/applications", icon: FileText },
          { name: "Settings", path: "/dashboard/admin/settings", icon: Settings },
        ]
      : [
          { name: "Profile", path: "/dashboard/user/profile", icon: User },
          { name: "Overview", path: "/dashboard/user/overview", icon: Home },
          { name: "Job Search", path: "/dashboard/user/jobs", icon: Briefcase },
          { name: "My Applications", path: "/dashboard/user/applications", icon: FileText },
          { name: "Settings", path: "/dashboard/user/settings", icon: Settings },
        ];

  return (
    <aside
      className={`bg-gray-400 backdrop-blur-md text-black-500 flex flex-col justify-between shadow-xl transition-all duration-300
      ${isOpen ? "w-70" : "w-10"} h-screen sticky top-0`}
    >
      {/* Logo Section */}
      <div className="relative flex flex-col items-center px-5 py-6 border-b border-gray-300">
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mt-10 p-16 rounded-md text-gray-600 hover:text-gray-900"
        >
          <Menu size={22} />
        </button>

        {/* Dashboard Heading */}
        {isOpen && (
          <h2 className="mt-0 text-lg font-extrabold text-gray-800 text-center">
            {user?.role === "ADMIN" ? "Admin Dashboard" : "User Dashboard"}
          </h2>
        )}
      </div>

      {/* Navigation Links */}
      <nav
        className={`flex-1 px-3 py-6 space-y-2 ${
          user?.role === "ADMIN" ? "" : "overflow-y-auto"
        }`}
      >
        {links.map(({ name, path, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all ${
              location.pathname === path
                ? "bg-amber-500 text-white"
                : "hover:bg-gray-300 text-gray-700"
            }`}
          >
            <Icon size={20} className="mr-3" />
            {isOpen && <span>{name}</span>}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-300">
        <button
          onClick={logout}
          className="flex items-center w-full px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-gray-300"
        >
          <LogOut size={18} className="mr-3" />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
