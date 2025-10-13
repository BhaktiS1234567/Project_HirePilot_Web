import { useAuth } from "../../../context/AuthContext";

export default function AdminProfile() {
  const { user } = useAuth();

  return (
    <div className="bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-amber-600">Admin Profile</h2>

      <div className="flex items-center space-x-6 mb-6">
        <img
          src={`https://ui-avatars.com/api/?name=${user?.name || "Admin"}`}
          alt="Admin Avatar"
          className="w-24 h-24 rounded-full border border-gray-300 shadow-sm"
        />
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{user?.name || "Admin User"}</h3>
          <p className="text-gray-600">{user?.email || "admin@hirepilot.com"}</p>
          <span className="inline-block mt-2 px-3 py-1 text-sm bg-amber-100 text-amber-700 rounded-full">
            {user?.role || "Administrator"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg border">
          <p className="text-gray-600 text-sm mb-1">Username</p>
          <p className="text-gray-800 font-medium">{user?.username || "admin123"}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border">
          <p className="text-gray-600 text-sm mb-1">Email</p>
          <p className="text-gray-800 font-medium">{user?.email || "admin@hirepilot.com"}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border">
          <p className="text-gray-600 text-sm mb-1">Role</p>
          <p className="text-gray-800 font-medium">{user?.role || "Admin"}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border">
          <p className="text-gray-600 text-sm mb-1">Joined On</p>
          <p className="text-gray-800 font-medium">
            {user?.joined || "January 2025"}
          </p>
        </div>
      </div>
    </div>
  );
}
