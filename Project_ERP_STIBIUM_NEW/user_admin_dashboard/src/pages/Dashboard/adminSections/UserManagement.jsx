export default function UserManagement() {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  return (
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
  );
}
