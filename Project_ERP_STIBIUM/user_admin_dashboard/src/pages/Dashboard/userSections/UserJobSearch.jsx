import { useState, useEffect } from "react";

export default function UserJobSearch() {
  const [search, setSearch] = useState({ keyword: "", location: "" });
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  // Load jobs posted by admin from localStorage
  useEffect(() => {
    const adminJobs = JSON.parse(localStorage.getItem("adminJobs")) || [];
    setJobs(adminJobs);
    setFilteredJobs(adminJobs);
  }, []);

  const handleSearch = () => {
    if (!search.keyword) return setFilteredJobs(jobs);

    const results = jobs.filter((job) =>
      job.title.toLowerCase().includes(search.keyword.toLowerCase())
    );
    setFilteredJobs(results);
  };

  return (
    <div className="space-y-10">
      <h2 className="text-4xl font-bold italic text-amber-600 text-center drop-shadow-md mb-8">
        Find Your Dream Job
      </h2>

      {/* ===== SEARCH BAR ===== */}
      <div className="backdrop-blur-md bg-white/30 border border-white/40 shadow-xl rounded-2xl p-6 max-w-5xl mx-auto flex flex-col md:flex-row gap-4 items-center">
        <input
          type="text"
          placeholder="Job title or keyword"
          value={search.keyword}
          onChange={(e) => setSearch({ ...search, keyword: e.target.value })}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="w-full md:w-2/3 border border-white/50 bg-white/50 text-black placeholder-black p-3 rounded-lg focus:outline-none focus:border-amber-500"
        />
        <button
          onClick={handleSearch}
          className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition"
        >
          Search
        </button>
      </div>

      {/* ===== JOB LISTINGS ===== */}
      <h3 className="text-3xl font-semibold text-amber-600 text-center mb-6">
        Available Job Openings
      </h3>

      {filteredJobs.length === 0 ? (
        <p className="text-center text-black text-lg">No job openings available yet.</p>
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="backdrop-blur-md bg-white/40 border border-white/40 rounded-2xl shadow-lg p-5 hover:shadow-xl transition"
            >
              <h4 className="text-xl font-bold text-black mb-2">{job.title}</h4>
              <p className="text-sm text-black">
                <span className="font-medium">Location:</span> {job.location}
              </p>
              <p className="text-sm text-black">
                <span className="font-medium">Package:</span> {job.package}
              </p>
              <p className="text-sm text-black mb-2">
                <span className="font-medium">Eligibility:</span> {job.eligibility}
              </p>
              <p className="text-sm text-gray-700 line-clamp-3 mb-3">
                {job.description}
              </p>
              <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 transition">
                Apply
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
