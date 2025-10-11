import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function AdminDashboard({ isSidebarOpen = true }) {
  const { user } = useAuth();

  // Mock data (replace later with real API/localStorage data)
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const jobs = [
    { id: 1, title: "Frontend Developer", status: "Active" },
    { id: 2, title: "Backend Developer", status: "Pending" },
  ];
  const applications = [
    { id: 1, applicant: "John Doe", job: "Frontend Developer", status: "Applied" },
    { id: 2, applicant: "Jane Smith", job: "Backend Developer", status: "Shortlisted" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 transition-all duration-300">
      {/* Navbar */}
      <nav
        className="fixed top-0 right-0 bg-gray-400 shadow-md h-20 flex items-center justify-between px-8 z-30 transition-all duration-300"
        style={{
          left: isSidebarOpen ? "16rem" : "5rem",
          width: isSidebarOpen ? "calc(100% - 16rem)" : "calc(100% - 5rem)",
        }}
      >
        <h1 className="text-2xl font-semibold text-amber-600">Admin Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-700 font-medium">{user?.name}</span>
          <img
            src="https://ui-avatars.com/api/?name=Admin"
            alt="Admin Avatar"
            className="w-12 h-12 rounded-full border border-gray-300"
          />
        </div>
      </nav>

      {/* Main Content */}
      <main
        className="flex-1 p-8 transition-all duration-300"
        style={{ marginLeft: isSidebarOpen ? "16rem" : "5rem", marginTop: "5rem" }}
      >
        {/* 🏠 Overview Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-gray-600 font-medium">Total Jobs</h3>
              <p className="text-3xl font-bold text-amber-600">{jobs.length}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-gray-600 font-medium">Total Users</h3>
              <p className="text-3xl font-bold text-amber-600">{users.length}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-gray-600 font-medium">Applications</h3>
              <p className="text-3xl font-bold text-amber-600">{applications.length}</p>
            </div>
          </div>
        </section>

        {/* 👥 User Management */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">User Management</h2>
          <ul className="divide-y">
            {users.map((u, i) => (
              <li key={i} className="flex justify-between items-center py-2">
                <div>
                  <p className="font-medium">{u.username}</p>
                  <p className="text-sm text-gray-500">{u.role}</p>
                </div>
                <div className="space-x-2">
                  <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md">Edit</button>
                  <button className="px-3 py-1 text-sm bg-red-500 text-white rounded-md">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* 💼 Job Management */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Job Management</h2>
          <ul className="divide-y">
            {jobs.map((job) => (
              <li key={job.id} className="flex justify-between items-center py-2">
                <div>
                  <p className="font-medium">{job.title}</p>
                  <p className="text-sm text-gray-500">Status: {job.status}</p>
                </div>
                <div className="space-x-2">
                  <button className="px-3 py-1 text-sm bg-green-500 text-white rounded-md">Approve</button>
                  <button className="px-3 py-1 text-sm bg-yellow-500 text-white rounded-md">Edit</button>
                  <button className="px-3 py-1 text-sm bg-red-500 text-white rounded-md">Reject</button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* 📝 Applications */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Applications</h2>
          <ul className="divide-y">
            {applications.map((app) => (
              <li key={app.id} className="flex justify-between items-center py-2">
                <div>
                  <p className="font-medium">{app.applicant}</p>
                  <p className="text-sm text-gray-500">{app.job}</p>
                </div>
                <select
                  className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                  defaultValue={app.status}
                >
                  <option>Applied</option>
                  <option>Shortlisted</option>
                  <option>Hired</option>
                  <option>Rejected</option>
                </select>
              </li>
            ))}
          </ul>
        </section>

        {/* 📊 Reports & Insights */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Reports & Insights</h2>
          <p className="text-gray-600">
            Coming soon: Analytics charts showing job posting trends, top roles, and most active companies/candidates.
          </p>
        </section>

        {/* ⚙️ Settings */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Settings</h2>
          <p className="text-gray-600">Manage admin accounts and update site settings here.</p>
          <div className="mt-4 space-x-2">
            <button className="px-4 py-2 bg-amber-500 text-white rounded-md">Add Admin</button>
            <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">Site Settings</button>
          </div>
        </section>
      </main>
    </div>
  );
}
