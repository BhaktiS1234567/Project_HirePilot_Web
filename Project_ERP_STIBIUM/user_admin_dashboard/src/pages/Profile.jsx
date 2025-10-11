import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="p-10 text-center">
      <h2 className="text-3xl font-bold text-amber-600 mb-4">Profile</h2>
      <div className="bg-white p-6 shadow rounded-lg inline-block">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
    </div>
  );
}
