import { useEffect, useState } from "react";
import {
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  Ban,
  RotateCcw,
  Search,
  X,
} from "lucide-react";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // applied on Enter
  const [filterRole, setFilterRole] = useState("All");

  // Mock backend data (replace with API)
  useEffect(() => {
    const mockUsers = [
      { id: 1, name: "John Doe", email: "john@example.com", role: "Candidate", status: "Active" },
      { id: 2, name: "Jane Smith", email: "jane@company.com", role: "Employer", status: "Pending" },
      { id: 3, name: "Alex Johnson", email: "alex@example.com", role: "Employer", status: "Active" },
      { id: 4, name: "Maria Lee", email: "maria@example.com", role: "Candidate", status: "Suspended" },
    ];
    setUsers(mockUsers);
  }, []);

  // Apply search + filters
  const filteredUsers = users.filter(
    (user) =>
      (filterRole === "All" || user.role === filterRole) &&
      (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Handlers
  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchQuery(search.trim());
    }
  };

  const clearSearch = () => {
    setSearch("");
    setSearchQuery("");
  };

  const handleApprove = (id) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: "Active" } : u))
    );
  };
  const handleReject = (id) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: "Rejected" } : u))
    );
  };
  const handleSuspend = (id) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: "Suspended" } : u))
    );
  };
  const handleActivate = (id) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: "Active" } : u))
    );
  };
  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };
  const handleEdit = (id) => {
    alert(`Editing user ID: ${id}`);
  };

  return (
    <section className="backdrop-blur-lg bg-white/30 border border-white/40 p-8 rounded-2xl shadow-2xl mb-10">
      <h2 className="text-3xl font-bold mb-8 text-black text-center">
        User Management
      </h2>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <div className="relative w-full sm:w-1/2">
          <Search className="absolute left-3 top-2.5 text-black/50" size={20} />
          <input
            type="text"
            placeholder="Press Enter to search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            className="w-full pl-10 pr-10 py-2 border border-white/50 rounded-lg bg-white/50 text-black placeholder-black/60 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          {search && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-2.5 text-black/60 hover:text-black"
              title="Clear search"
            >
              <X size={18} />
            </button>
          )}
        </div>

        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="px-4 py-2 border border-white/50 rounded-lg bg-white/50 text-black focus:outline-none"
        >
          <option value="All">All Roles</option>
          <option value="Candidate">Candidates</option>
          <option value="Employer">Employers</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto rounded-xl border border-white/30">
        <table className="min-w-full border-collapse text-left text-black">
          <thead className="bg-white/40 backdrop-blur-md">
            <tr className="border-b border-white/30">
              <th className="py-3 px-4 font-semibold">Name</th>
              <th className="py-3 px-4 font-semibold">Email</th>
              <th className="py-3 px-4 font-semibold">Role</th>
              <th className="py-3 px-4 font-semibold">Status</th>
              <th className="py-3 px-4 font-semibold text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-white/20 hover:bg-white/20 transition-all"
                >
                  <td className="py-3 px-4 font-medium">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">{user.role}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 text-sm rounded-full font-medium ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : user.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : user.status === "Suspended"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  {/* Actions Column */}
                  <td className="py-3 px-4 text-center">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {user.role === "Employer" && user.status === "Pending" && (
                        <>
                          <button
                            onClick={() => handleApprove(user.id)}
                            className="p-2 rounded-lg bg-green-100 hover:bg-green-200 transition"
                            title="Approve"
                          >
                            <CheckCircle className="text-green-600" size={18} />
                          </button>
                          <button
                            onClick={() => handleReject(user.id)}
                            className="p-2 rounded-lg bg-red-100 hover:bg-red-200 transition"
                            title="Reject"
                          >
                            <XCircle className="text-red-600" size={18} />
                          </button>
                        </>
                      )}

                      <button
                        onClick={() => handleEdit(user.id)}
                        className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition"
                        title="Edit"
                      >
                        <Edit className="text-blue-600" size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-2 rounded-lg bg-red-100 hover:bg-red-200 transition"
                        title="Delete"
                      >
                        <Trash2 className="text-red-600" size={18} />
                      </button>

                      {user.status === "Active" ? (
                        <button
                          onClick={() => handleSuspend(user.id)}
                          className="p-2 rounded-lg bg-yellow-100 hover:bg-yellow-200 transition"
                          title="Suspend"
                        >
                          <Ban className="text-yellow-600" size={18} />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleActivate(user.id)}
                          className="p-2 rounded-lg bg-green-100 hover:bg-green-200 transition"
                          title="Activate"
                        >
                          <RotateCcw className="text-green-600" size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="py-4 text-center text-black/70 italic"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
