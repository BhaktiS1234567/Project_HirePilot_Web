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
import AdminProfile from "./pages/Dashboard/adminSections/AdminProfile";


// 🧩 Import admin section components
import Overview from "./pages/Dashboard/adminSections/Overview";
import UserManagement from "./pages/Dashboard/adminSections/UserManagement";
import JobManagement from "./pages/Dashboard/adminSections/JobManagement";
import Applications from "./pages/Dashboard/adminSections/Applications";
import Reports from "./pages/Dashboard/adminSections/Reports";
import Settings from "./pages/Dashboard/adminSections/Settings";

export default function App() {
  const location = useLocation();

  // show sidebar only on dashboard routes
  const isDashboardRoute =
    location.pathname.startsWith("/dashboard/admin") ||
    location.pathname.startsWith("/dashboard/user");

  return (
    <div className="flex min-h-screen">
      {/* Sidebar visible only on dashboard pages */}
      {isDashboardRoute && <Sidebar />}

      <div className="flex-1 flex flex-col">
        {/* Hide navbar inside dashboards */}
        {!isDashboardRoute && <Navbar />}

        <main className="flex-1 p-4 bg-gray-50">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />

            {/* ✅ Admin Dashboard - Nested Routes */}
            <Route
              path="/dashboard/admin"
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            >
              <Route path="profile" element={<AdminProfile />} />

              <Route index element={<Overview />} />
              <Route path="overview" element={<Overview />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="jobs" element={<JobManagement />} />
              <Route path="applications" element={<Applications />} />
              <Route path="reports" element={<Reports />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* ✅ User Dashboard */}
            <Route
              path="/dashboard/user"
              element={
                <ProtectedRoute role="user">
                  <UserDashboard />
                </ProtectedRoute>
              }
            />

            {/* ✅ Profile */}
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
