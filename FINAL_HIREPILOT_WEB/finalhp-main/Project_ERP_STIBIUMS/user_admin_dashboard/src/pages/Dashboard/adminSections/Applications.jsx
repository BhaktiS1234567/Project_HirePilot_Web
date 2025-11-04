import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import axios from "axios";

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [filterJob, setFilterJob] = useState("All");
  const [filterEmployer, setFilterEmployer] = useState("All");
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all applications from backend
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get("http://localhost:8080/admin/applications/all");
        setApplications(res.data);
      } catch (err) {
        console.error("Error fetching applications:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  // ✅ Update application status
  const handleStatusChange = async (app, newStatus) => {
    try {
      const res = await axios.put("http://localhost:8080/admin/applications/update-status", {
        name: app.name,
        jobTitle: app.jobTitle,
        employer: app.employer,
        status: newStatus,
      });

      alert(res.data); // e.g. "Status updated successfully for Neha Jadhav (Java Developer)"

      // Update local state instantly
      setApplications((prev) =>
        prev.map((a) =>
          a.name === app.name && a.jobTitle === app.jobTitle && a.employer === app.employer
            ? { ...a, status: newStatus }
            : a
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status!");
    }
  };

  // ✅ Delete application
  const handleDelete = async (app) => {
    try {
      const res = await axios.delete("http://localhost:8080/admin/applications/delete", {
        data: {
          name: app.name,
          jobTitle: app.jobTitle,
          employer: app.employer,
        },
      });

      alert(res.data); // "Application deleted for Neha Jadhav (Java Developer - TCS)"
      setApplications((prev) =>
        prev.filter(
          (a) =>
            a.name !== app.name ||
            a.jobTitle !== app.jobTitle ||
            a.employer !== app.employer
        )
      );
    } catch (err) {
      console.error("Error deleting application:", err);
      alert("Failed to delete application!");
    }
  };

  // ✅ Filter applications by job title and employer
  const filteredApplications = applications.filter(
    (app) =>
      (filterJob === "All" || app.jobTitle === filterJob) &&
      (filterEmployer === "All" || app.employer === filterEmployer)
  );

  // ✅ Dropdown filter values
  const jobTitles = ["All", ...new Set(applications.map((a) => a.jobTitle))];
  const employers = ["All", ...new Set(applications.map((a) => a.employer))];

  if (loading) {
    return (
      <div className="text-center py-10 text-lg text-gray-600">
        Loading applications...
      </div>
    );
  }

  return (
    <section className="backdrop-blur-lg bg-white/30 border border-white/40 p-8 rounded-2xl shadow-2xl mb-10">
      <h2 className="text-3xl font-bold mb-8 text-black text-center">
        Applications Management
      </h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <select
          value={filterJob}
          onChange={(e) => setFilterJob(e.target.value)}
          className="px-4 py-2 border border-white/50 rounded-lg bg-white/50 text-black focus:outline-none"
        >
          {jobTitles.map((job, i) => (
            <option key={i} value={job}>
              {job}
            </option>
          ))}
        </select>

        <select
          value={filterEmployer}
          onChange={(e) => setFilterEmployer(e.target.value)}
          className="px-4 py-2 border border-white/50 rounded-lg bg-white/50 text-black focus:outline-none"
        >
          {employers.map((emp, i) => (
            <option key={i} value={emp}>
              {emp}
            </option>
          ))}
        </select>
      </div>

      {/* Applications Table */}
      <div className="overflow-x-auto rounded-xl border border-white/30">
        <table className="min-w-full border-collapse text-left text-black">
          <thead className="bg-white/40 backdrop-blur-md">
            <tr className="border-b border-white/30">
              <th className="py-3 px-4 font-semibold">Applicant</th>
              <th className="py-3 px-4 font-semibold">Job Title</th>
              <th className="py-3 px-4 font-semibold">Employer</th>
              <th className="py-3 px-4 font-semibold">Status</th>
              <th className="py-3 px-4 font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.length > 0 ? (
              filteredApplications.map((app, index) => (
                <tr
                  key={index}
                  className="border-b border-white/20 hover:bg-white/20 transition-all"
                >
                  <td className="py-3 px-4 font-medium">{app.name}</td>
                  <td className="py-3 px-4">{app.jobTitle}</td>
                  <td className="py-3 px-4">{app.employer}</td>
                  <td className="py-3 px-4">
                    <select
                      value={app.status}
                      onChange={(e) =>
                        handleStatusChange(app, e.target.value)
                      }
                      className={`px-3 py-1 rounded-full text-sm font-medium focus:outline-none ${
                        app.status === "Applied"
                          ? "bg-blue-100 text-blue-700"
                          : app.status === "Shortlisted"
                          ? "bg-yellow-100 text-yellow-700"
                          : app.status === "Accepted" ||
                            app.status === "Hired"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      <option value="Applied">Applied</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleDelete(app)}
                      className="p-2 rounded-lg bg-red-100 hover:bg-red-200 transition"
                      title="Delete Application"
                    >
                      <Trash2 className="text-red-600" size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="py-4 text-center text-black/70 italic"
                >
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
