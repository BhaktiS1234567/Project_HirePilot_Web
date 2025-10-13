import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function UserDashboard() {
  const { user } = useAuth();
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const [search, setSearch] = useState("");

  const filtered = users.filter(
    (u) =>
      u.username.toLowerCase().includes(search.toLowerCase()) && u.username !== user.username
  );

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-amber-600 mb-6">User Dashboard</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-2">My Profile</h2>
        <p><b>Name:</b> {user.name}</p>
        <p><b>Username:</b> {user.username}</p>
        <p><b>Email:</b> {user.email}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Search Other Users</h2>
        <input
          type="text"
          placeholder="Search by username..."
          className="w-full p-2 mb-4 border rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <ul className="divide-y">
          {filtered.map((u, i) => (
            <li key={i} className="py-2 flex justify-between">
              <span>{u.username}</span>
              <span className="text-gray-500">{u.role}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
