import { Outlet } from "react-router-dom";

export default function AdminLayout({ isSidebarOpen = true }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 transition-all duration-300">
      {/* Navbar */}
      <nav
        className="fixed top-0 right-0 bg-gray-400 shadow-md h-20 flex items-center justify-center px-8 z-30 transition-all duration-300"
        style={{
          left: isSidebarOpen ? "16rem" : "5rem",
          width: isSidebarOpen ? "calc(100% - 16rem)" : "calc(100% - 5rem)",
        }}
      >
        <h1 className="text-2xl font-semibold text-amber-600">
          Admin Dashboard
        </h1>
      </nav>

      {/* Main content — truly centered */}
      <main
        className="flex items-center justify-center w-full h-screen transition-all duration-300"
        style={{
          paddingLeft: isSidebarOpen ? "16rem" : "5rem", // space for sidebar
          paddingTop: "5rem", // below navbar
        }}
      >
        <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg p-10 text-center">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
