import { useEffect, useState } from "react";
import axios from "axios";

export default function UserOverview() {
  const [jobOpenings, setJobOpenings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:8080/candidate/overview");
        setJobOpenings(response.data);
      } catch (err) {
        console.error("❌ Error fetching job openings:", err);
        setError("Failed to load job openings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="space-y-8">
      {/* === PAGE HEADING === */}
      <h1 className="text-4xl font-bold text-amber-600 italic text-center mb-10 drop-shadow-md">
        Current Openings
      </h1>

      <div className="backdrop-blur-md bg-white/30 p-6 rounded-2xl shadow-xl border border-white/40">
        <h2 className="text-2xl font-semibold text-black mb-6">
          Available Positions
        </h2>
        <p className="text-black/70 mb-6">
          Explore the current job openings available on the HirePilot portal.
        </p>

        {/* === LOADING / ERROR STATES === */}
        {loading && (
          <p className="text-center text-black/70">Loading job openings...</p>
        )}
        {error && (
          <p className="text-center text-red-600 font-medium">{error}</p>
        )}

        {/* === JOB TABLE === */}
        {!loading && !error && (
          <table className="w-full table-fixed border-collapse text-sm rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-white/60 text-black">
                <th className="w-1/3 border border-white/40 p-3 text-left">Role</th>
                <th className="w-1/3 border border-white/40 p-3 text-center">Openings</th>
                <th className="w-1/3 border border-white/40 p-3 text-center">Location</th>
              </tr>
            </thead>
            <tbody>
              {jobOpenings.length > 0 ? (
                jobOpenings.map((job, index) => (
                  <tr key={index} className="hover:bg-white/50 transition">
                    <td className="w-1/3 border border-white/40 p-3 text-black font-medium text-left">
                      {job.jobTitle || "N/A"}
                    </td>
                    <td className="w-1/3 border border-white/40 p-3 text-center text-black font-semibold">
                      {job.jobCount || "0"}
                    </td>
                    <td className="w-1/3 border border-white/40 p-3 text-center text-black">
                      {job.jobLocation || "Not specified"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="p-4 text-center text-black/70">
                    No openings available at the moment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
