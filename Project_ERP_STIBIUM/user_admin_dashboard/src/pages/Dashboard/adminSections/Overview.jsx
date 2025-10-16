import { useEffect, useState } from "react";

export default function Overview() {
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  // 🟢 Simulate fetching data (replace with backend API later)
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [
      { id: 1, name: "John Doe", role: "Candidate" },
      { id: 2, name: "Jane Smith", role: "Employer" },
    ];

    const mockJobs = [
      { id: 1, title: "Frontend Developer", company: "TechCorp", status: "Active" },
      { id: 2, title: "Backend Developer", company: "InnovateX", status: "Pending" },
      { id: 3, title: "UI Designer", company: "DesignPro", status: "Active" },
    ];

    const mockApplications = [
      { id: 1, applicant: "John Doe", job: "Frontend Developer", status: "Applied" },
      { id: 2, applicant: "Jane Smith", job: "Backend Developer", status: "Shortlisted" },
      { id: 3, applicant: "Mark Taylor", job: "UI Designer", status: "Interviewed" },
    ];

    setUsers(storedUsers);
    setJobs(mockJobs);
    setApplications(mockApplications);
  }, []);

  return (
    <section className="mb-8">
      {/* Title */}
      <h2 className="text-3xl font-bold mb-8 text-black text-center">
        Overview
      </h2>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="backdrop-blur-md bg-white/30 border border-white/40 p-6 rounded-xl shadow-md text-center">
          <h3 className="text-lg font-semibold text-black mb-2">Total Job Posts</h3>
          <p className="text-4xl font-bold text-amber-600">{jobs.length}</p>
        </div>

        <div className="backdrop-blur-md bg-white/30 border border-white/40 p-6 rounded-xl shadow-md text-center">
          <h3 className="text-lg font-semibold text-black mb-2">Total Users</h3>
          <p className="text-4xl font-bold text-amber-600">{users.length}</p>
        </div>

        <div className="backdrop-blur-md bg-white/30 border border-white/40 p-6 rounded-xl shadow-md text-center">
          <h3 className="text-lg font-semibold text-black mb-2">Total Applications</h3>
          <p className="text-4xl font-bold text-amber-600">{applications.length}</p>
        </div>
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Jobs Table */}
        <div className="backdrop-blur-md bg-white/30 border border-white/40 p-6 rounded-xl shadow-md overflow-x-auto">
          <h3 className="text-xl font-semibold mb-4 text-black">Recent Job Posts</h3>
          <table className="min-w-full border-collapse text-left text-black">
            <thead>
              <tr className="border-b border-white/40">
                <th className="py-2 px-3 font-semibold">Job Title</th>
                <th className="py-2 px-3 font-semibold">Company</th>
                <th className="py-2 px-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} className="border-b border-white/20 hover:bg-white/20">
                  <td className="py-2 px-3">{job.title}</td>
                  <td className="py-2 px-3">{job.company}</td>
                  <td className="py-2 px-3">
                    <span
                      className={`px-3 py-1 text-sm rounded-full ${
                        job.status === "Active"
                          ? "bg-green-200 text-green-700"
                          : "bg-yellow-200 text-yellow-700"
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Applications Table */}
        <div className="backdrop-blur-md bg-white/30 border border-white/40 p-6 rounded-xl shadow-md overflow-x-auto">
          <h3 className="text-xl font-semibold mb-4 text-black">Recent Applications</h3>
          <table className="min-w-full border-collapse text-left text-black">
            <thead>
              <tr className="border-b border-white/40">
                <th className="py-2 px-3 font-semibold">Applicant</th>
                <th className="py-2 px-3 font-semibold">Job</th>
                <th className="py-2 px-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} className="border-b border-white/20 hover:bg-white/20">
                  <td className="py-2 px-3">{app.applicant}</td>
                  <td className="py-2 px-3">{app.job}</td>
                  <td className="py-2 px-3">
                    <span
                      className={`px-3 py-1 text-sm rounded-full ${
                        app.status === "Applied"
                          ? "bg-blue-200 text-blue-700"
                          : app.status === "Shortlisted"
                          ? "bg-amber-200 text-amber-700"
                          : "bg-purple-200 text-purple-700"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
