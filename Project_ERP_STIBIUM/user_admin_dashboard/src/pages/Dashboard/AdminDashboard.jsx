export default function AdminDashboard() {
  return (
    <section className="p-8 text-black">
      {/* 🔹 Page Title */}
      <h1 className="text-3xl font-bold text-amber-600 mb-6">
        Welcome to HirePilot Admin Dashboard
      </h1>

      {/* 🔹 Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Total Jobs */}
        <div className="bg-white/70 border border-white/30 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Total Jobs Posted
          </h2>
          <p className="text-3xl font-bold text-amber-600">24</p>
        </div>

        {/* Applications Received */}
        <div className="bg-white/70 border border-white/30 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Applications Received
          </h2>
          <p className="text-3xl font-bold text-amber-600">143</p>
        </div>

        {/* Active Employers */}
        <div className="bg-white/70 border border-white/30 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Active Employers
          </h2>
          <p className="text-3xl font-bold text-amber-600">8</p>
        </div>
      </div>

      {/* 🔹 Recent Job Posts Section */}
      <div className="bg-white/80 border border-white/30 p-8 rounded-2xl shadow-lg mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Recent Job Openings
        </h2>
        <ul className="divide-y divide-gray-300">
          <li className="py-3 flex justify-between items-center">
            <span className="font-medium">Frontend Developer</span>
            <span className="text-sm text-gray-600">Active</span>
          </li>
          <li className="py-3 flex justify-between items-center">
            <span className="font-medium">Backend Engineer</span>
            <span className="text-sm text-gray-600">Active</span>
          </li>
          <li className="py-3 flex justify-between items-center">
            <span className="font-medium">UI/UX Designer</span>
            <span className="text-sm text-gray-600">Closed</span>
          </li>
        </ul>
      </div>

      {/* 🔹 Applications Overview Section */}
      <div className="bg-white/80 border border-white/30 p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Latest Applications
        </h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="py-2 text-gray-700">Candidate</th>
              <th className="py-2 text-gray-700">Job Title</th>
              <th className="py-2 text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200">
              <td className="py-2">Bhakti Shinde</td>
              <td className="py-2">Frontend Developer</td>
              <td className="py-2 text-amber-600 font-semibold">Under Review</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-2">Amit Patil</td>
              <td className="py-2">Backend Developer</td>
              <td className="py-2 text-green-600 font-semibold">Approved</td>
            </tr>
            <tr>
              <td className="py-2">Sneha Kulkarni</td>
              <td className="py-2">UI/UX Designer</td>
              <td className="py-2 text-red-600 font-semibold">Rejected</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
