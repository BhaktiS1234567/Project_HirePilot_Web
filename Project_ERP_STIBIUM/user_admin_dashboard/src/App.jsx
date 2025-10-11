import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import UserDashboard from "./pages/Dashboard/UserDashboard";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar";

export default function App() {
  const location = useLocation();

  // check if we are on dashboard pages to show sidebar
  const isDashboardRoute =
    location.pathname.startsWith("/dashboard/admin") ||
    location.pathname.startsWith("/dashboard/user");

  return (
    <div className="flex min-h-screen">
      {/* Sidebar visible only on dashboard routes */}
      {isDashboardRoute && <Sidebar />}

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* ✅ Navbar will NOT be shown on dashboard routes */}
        {!isDashboardRoute && <Navbar />}

        {/* Routes */}
        <main className="flex-1 p-4 bg-gray-50">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            
            

            {/* Admin Dashboard */}
            <Route
              path="/dashboard/admin"
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* User Dashboard */}
            <Route
              path="/dashboard/user"
              element={
                <ProtectedRoute role="user">
                  <UserDashboard />
                </ProtectedRoute>
              }
            />

            {/* Profile Page */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}
