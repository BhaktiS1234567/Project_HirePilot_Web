import { useState } from "react";

export default function UserJobSearch() {
  const [search, setSearch] = useState({ keyword: "", location: "" });
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchJobs = async () => {
    if (!search.keyword) {
      alert("Please enter a job title or keyword.");
      return;
    }

    setLoading(true);
    setJobs([]);
    setError("");

    const url = `https://jsearch.p.rapidapi.com/search?query=${search.keyword}+in+${search.location || "India"}&page=1&num_pages=1`;

    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "YOUR_API_KEY_HERE", // 🔑 Replace this with your key
        "x-rapidapi-host": "jsearch.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log("API Response:", data);

      if (data?.data?.length > 0) {
        setJobs(data.data);
      } else {
        setError("No jobs found for your search.");
      }
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError("Failed to fetch jobs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* ===== HEADING ===== */}
      <h2 className="text-4xl font-bold italic text-amber-600 text-center drop-shadow-md mb-8">
        Find Your Dream Job
      </h2>

      {/* ===== SEARCH BAR CARD ===== */}
      <div className="backdrop-blur-md bg-white/30 border border-white/40 shadow-xl rounded-2xl p-6 max-w-5xl mx-auto flex flex-col md:flex-row gap-4 items-center">
        <input
          type="text"
          placeholder="Job title or keywords"
          value={search.keyword}
          onChange={(e) => setSearch({ ...search, keyword: e.target.value })}
          className="w-full md:w-1/2 border border-white/50 bg-white/50 text-black placeholder-black p-3 rounded-lg focus:outline-none focus:border-amber-500"
        />
        <input
          type="text"
          placeholder="Location (optional)"
          value={search.location}
          onChange={(e) => setSearch({ ...search, location: e.target.value })}
          className="w-full md:w-1/3 border border-white/50 bg-white/50 text-black placeholder-black p-3 rounded-lg focus:outline-none focus:border-amber-500"
        />
        <button
          onClick={fetchJobs}
          className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* ===== RESULTS TITLE ===== */}
      <h3 className="text-3xl font-semibold text-amber-600 text-center mb-6">
        Latest Job Listings
      </h3>

      {loading && (
        <p className="text-center text-black text-lg">Loading jobs...</p>
      )}
      {error && <p className="text-center text-red-600">{error}</p>}

      {/* ===== JOB CARDS ===== */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="backdrop-blur-md bg-white/40 border border-white/40 rounded-2xl shadow-lg p-5 hover:shadow-xl transition"
          >
            <h4 className="text-lg font-semibold text-black mb-2">
              {job.job_title}
            </h4>
            <p className="text-black text-sm">
              <span className="font-medium">Company:</span>{" "}
              {job.employer_name || "Not specified"}
            </p>
            <p className="text-black text-sm">
              <span className="font-medium">Location:</span>{" "}
              {job.job_city || "—"}, {job.job_country || ""}
            </p>
            <p className="text-black text-sm mb-3 line-clamp-2">
              <span className="font-medium">Description:</span>{" "}
              {job.job_description
                ? job.job_description.slice(0, 120)
                : "No description available"}
              ...
            </p>
            <a
              href={job.job_apply_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 transition"
            >
              Apply Now
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
