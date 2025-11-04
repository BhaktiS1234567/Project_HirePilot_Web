import { useEffect, useState } from "react";
import axios from "axios";
import { Users, Briefcase, FileText } from "lucide-react";

export default function Overview() {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.id || localStorage.getItem("userId");
  const token = storedUser?.token || localStorage.getItem("token");

  // 🧠 Extract company name from description text
  const extractCompanyName = (description = "") => {
    if (!description) return "Unknown Employer";

    // Find pattern like "Company: TechNova Solutions Pvt. Ltd."
    const match = description.match(/Company:\s*([^\n\r]+)/i);
    if (match && match[1]) {
      // Clean up unwanted characters (., extra spaces, etc.)
      return match[1].trim().replace(/[.,;]+$/, "");
    }

    return "Unknown Employer";
  };

  // 🟢 Fetch Admin Overview Data
  useEffect(() => {
    const fetchOverview = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:8080/admin/overview", {
          headers: { "x-user-id": userId, Authorization: `Bearer ${token}` },
        });

        const data = res.data;

        // Extract company name from description (frontend-only logic)
        if (data.jobPosts && data.jobPosts.length > 0) {
          data.jobPosts = data.jobPosts.map((job) => ({
            ...job,
            companyName:
              job.companyName && job.companyName !== "Unknown Employer"
                ? job.companyName
                : extractCompanyName(job.description || ""),
          }));
        }

        setOverview(data);
      } catch (err) {
        console.error("❌ Error fetching overview:", err);
        setError("Failed to load overview data");
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, [userId, token]);

  if (loading) return <p className="text-center text-gray-700">Loading overview...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;
  if (!overview) return null;

  return (
    <section className="mb-10">
      <h2 className="text-3xl font-bold mb-8 text-black text-center">
        Overview
      </h2>

      {/* ===== Stats Cards ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="backdrop-blur-md bg-white/30 border border-white/40 p-6 rounded-xl shadow-md text-center">
          <Users className="mx-auto mb-2 text-amber-600" size={30} />
          <h3 className="text-lg font-semibold text-black mb-1">Total Users</h3>
          <p className="text-4xl font-bold text-amber-600">{overview.totalUsers}</p>
        </div>

        <div className="backdrop-blur-md bg-white/30 border border-white/40 p-6 rounded-xl shadow-md text-center">
          <Briefcase className="mx-auto mb-2 text-amber-600" size={30} />
          <h3 className="text-lg font-semibold text-black mb-1">Total Job Posts</h3>
          <p className="text-4xl font-bold text-amber-600">{overview.totalJobPosts}</p>
        </div>

        <div className="backdrop-blur-md bg-white/30 border border-white/40 p-6 rounded-xl shadow-md text-center">
          <FileText className="mx-auto mb-2 text-amber-600" size={30} />
          <h3 className="text-lg font-semibold text-black mb-1">Total Applications</h3>
          <p className="text-4xl font-bold text-amber-600">{overview.totalApplications}</p>
        </div>
      </div>

      {/* ===== Recent Tables ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Job Posts Table */}
        <div className="backdrop-blur-md bg-white/30 border border-white/40 p-6 rounded-xl shadow-md overflow-x-auto">
          <h3 className="text-xl font-semibold mb-4 text-black">Recent Job Posts</h3>
          <table className="min-w-full border-collapse text-left text-black">
            <thead>
              <tr className="border-b border-white/40">
                <th className="py-2 px-3 font-semibold">Job Title</th>
                <th className="py-2 px-3 font-semibold">Company</th>
              </tr>
            </thead>
            <tbody>
              {overview.jobPosts?.length > 0 ? (
                overview.jobPosts.map((job, idx) => (
                  <tr key={idx} className="border-b border-white/20 hover:bg-white/20">
                    <td className="py-2 px-3">{job.jobTitle}</td>
                    <td className="py-2 px-3">{job.companyName}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="py-3 text-center text-gray-600">
                    No job posts available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Applications Table */}
        <div className="backdrop-blur-md bg-white/30 border border-white/40 p-6 rounded-xl shadow-md overflow-x-auto">
          <h3 className="text-xl font-semibold mb-4 text-black">Recent Applications</h3>
          <table className="min-w-full border-collapse text-left text-black">
            <thead>
              <tr className="border-b border-white/40">
                <th className="py-2 px-3 font-semibold">Applicant</th>
                <th className="py-2 px-3 font-semibold">Job Title</th>
                <th className="py-2 px-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {overview.applications?.length > 0 ? (
                overview.applications.map((app, idx) => (
                  <tr key={idx} className="border-b border-white/20 hover:bg-white/20">
                    <td className="py-2 px-3">{app.name}</td>
                    <td className="py-2 px-3">{app.jobTitle}</td>
                    <td className="py-2 px-3">{app.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="py-3 text-center text-gray-600">
                    No applications yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
