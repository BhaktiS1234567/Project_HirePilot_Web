import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

export default function AdminProfile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "Admin User",
    email: user?.email || "admin@hirepilot.com",
    role: user?.role || "Super Admin",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // TODO: connect this with backend or context update
    console.log("Updated profile:", formData);
    setIsEditing(false);
  };

  return (
    <div className="backdrop-blur-md bg-white/30 border border-white/40 p-10 rounded-2xl shadow-xl max-w-3xl mx-auto mt-10">
      {/* Title */}
      <h2 className="text-3xl font-bold mb-8 text-center text-black">
        Admin Profile
      </h2>

      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-8 mb-8">
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
            user?.name || "Admin"
          )}`}
          alt="Admin Avatar"
          className="w-28 h-28 rounded-full border-4 border-white/60 shadow-lg mb-4 sm:mb-0"
        />

        <div className="text-center sm:text-left">
          <h3 className="text-2xl font-semibold text-black">
            {formData.name}
          </h3>
          <p className="text-black/80">{formData.email}</p>
          <span className="inline-block mt-2 px-4 py-1 text-sm font-medium bg-amber-100 text-amber-700 rounded-full">
            {formData.role}
          </span>
        </div>
      </div>

      {/* Profile Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-black">
        <div className="bg-white/40 backdrop-blur-md p-4 rounded-lg border border-white/50 shadow-sm">
          <p className="text-sm font-medium text-black/70 mb-1">Name</p>
          <p className="font-semibold">{formData.name}</p>
        </div>

        <div className="bg-white/40 backdrop-blur-md p-4 rounded-lg border border-white/50 shadow-sm">
          <p className="text-sm font-medium text-black/70 mb-1">Email</p>
          <p className="font-semibold">{formData.email}</p>
        </div>

        <div className="bg-white/40 backdrop-blur-md p-4 rounded-lg border border-white/50 shadow-sm">
          <p className="text-sm font-medium text-black/70 mb-1">Role</p>
          <p className="font-semibold">{formData.role}</p>
        </div>

        <div className="bg-white/40 backdrop-blur-md p-4 rounded-lg border border-white/50 shadow-sm">
          <p className="text-sm font-medium text-black/70 mb-1">Joined On</p>
          <p className="font-semibold">{user?.joined || "January 2025"}</p>
        </div>
      </div>

      {/* Edit Profile Button */}
      <div className="mt-10 flex justify-center">
        <button
          onClick={() => setIsEditing(true)}
          className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300"
        >
          View & Edit Profile
        </button>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-[90%] sm:w-[500px] relative">
            <h3 className="text-2xl font-bold text-black mb-6 text-center">
              Edit Profile
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-black font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-black font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-black font-medium mb-1">Role</label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4 mt-8">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md font-medium transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-md font-medium transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
