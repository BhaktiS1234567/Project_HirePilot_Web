import { useState, useContext, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext"; // ✅ correct import path

export default function UserJobSearch() {
  const { user } = useAuth(); // ✅ logged-in user info
  const [search, setSearch] = useState({ keyword: "", location: "" });
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [applying, setApplying] = useState(null);

  // 🔍 SEARCH JOBS
  const handleSearch = async () => {
    if (!search.keyword && !search.location) {
     
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/candidate/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: search.keyword,
          location: search.location,
          candidateName: user?.name || "", // ✅ include candidate name
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch job data");
      const data = await response.json();

      // ✅ Normalize data
      const normalized = data.map((job) => ({
        ...job,
        status: job.status || "Not Applied",
      }));

      setJobs(normalized);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      alert("⚠️ Failed to fetch jobs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // 🟢 APPLY FOR JOB
  const handleApply = async (job) => {
    if (!user || !user.name) {
      alert("⚠️ Please login to apply for jobs.");
      return;
    }

    if (!job || !job.jobTitle) {
      alert("Invalid job details. Please try again.");
      return;
    }

    setApplying(job.jobTitle);

    try {
      // ✅ Extract company name if available
      let extractedEmployer = "Unknown Employer";
      if (job.description) {
        const match = job.description.match(
          /(?:Company|Employer)\s*[-:]\s*([A-Za-z0-9\s&.]+)/i
        );
        if (match && match[1]) {
          extractedEmployer = match[1].trim();
        }
      }

      const employerName = job.employer || extractedEmployer;

      const response = await fetch("http://localhost:8080/candidate/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.name,
          jobTitle: job.jobTitle,
          employer: employerName,
        }),
      });

      if (!response.ok) throw new Error("Failed to apply for job");
      const data = await response.json();

      console.log("✅ Job applied:", data);

      // ✅ Update status locally
      setJobs((prevJobs) =>
        prevJobs.map((j) =>
          j.jobTitle === job.jobTitle
            ? { ...j, status: data.status || "Applied", employer: employerName }
            : j
        )
      );

      alert(`✅ Successfully applied for ${job.jobTitle} at ${employerName}!`);
    } catch (error) {
      console.error("Error applying for job:", error);
      alert("⚠️ Failed to apply for job. Please try again later.");
    } finally {
      setApplying(null);
    }
  };

  // Optional: Auto-load jobs on mount
  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="space-y-10">
      <h2 className="text-4xl font-bold italic text-amber-600 text-center drop-shadow-md mb-8">
        Find Your Dream Job
      </h2>

      {/* ===== SEARCH BAR ===== */}
      <div className="backdrop-blur-md bg-white/30 border border-white/40 shadow-xl rounded-2xl p-6 max-w-5xl mx-auto flex flex-col md:flex-row gap-4 items-center">
        <input
          type="text"
          placeholder="Job language or skill (e.g. Java)"
          value={search.keyword}
          onChange={(e) => setSearch({ ...search, keyword: e.target.value })}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="w-full md:w-1/2 border border-white/50 bg-white/50 text-black placeholder-black p-3 rounded-lg focus:outline-none focus:border-amber-500"
        />
        <input
          type="text"
          placeholder="Location (e.g. Pune)"
          value={search.location}
          onChange={(e) => setSearch({ ...search, location: e.target.value })}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="w-full md:w-1/2 border border-white/50 bg-white/50 text-black placeholder-black p-3 rounded-lg focus:outline-none focus:border-amber-500"
        />
        <button
          onClick={handleSearch}
          className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* ===== JOB LISTINGS ===== */}
      <h3 className="text-3xl font-semibold text-amber-600 text-center mb-6">
        Available Job Openings
      </h3>

      {loading ? (
        <p className="text-center text-gray-600">Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p className="text-center text-black text-lg">No job openings found.</p>
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="backdrop-blur-md bg-white/40 border border-white/40 rounded-2xl shadow-lg p-5 hover:shadow-xl transition"
            >
              <h4 className="text-xl font-bold text-black mb-2">
                {job.jobTitle || "Untitled Job"}
              </h4>
              <p className="text-sm text-black">
                <span className="font-medium">Employer:</span>{" "}
                {job.employer || "Not specified"}
              </p>
              <p className="text-sm text-black">
                <span className="font-medium">Location:</span>{" "}
                {job.location || "Not specified"}
              </p>
              <p className="text-sm text-black">
                <span className="font-medium">Package:</span>{" "}
                {job.packageOffered || "N/A"}
              </p>
              <p className="text-sm text-black mb-2">
                <span className="font-medium">Eligibility:</span>{" "}
                {job.eligibilityCriteria || "N/A"}
              </p>
              <p className="text-sm text-gray-700 line-clamp-3 mb-3">
                {job.description || "No description available"}
              </p>

              {job.status === "Applied" ? (
                <button
                  disabled
                  className="bg-gray-400 text-white px-4 py-2 rounded-md text-sm cursor-not-allowed"
                >
                  ✅ Applied
                </button>
              ) : (
                <button
                  onClick={() => handleApply(job)}
                  disabled={applying === job.jobTitle}
                  className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 transition disabled:opacity-50"
                >
                  {applying === job.jobTitle ? "Applying..." : "Apply"}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
