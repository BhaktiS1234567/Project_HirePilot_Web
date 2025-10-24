import { useState } from "react";

export default function JobPost() {
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    package: "",
    location: "",
    eligibility: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Save posted job to localStorage
    const existingJobs = JSON.parse(localStorage.getItem("adminJobs")) || [];
    const newJob = {
      id: Date.now(),
      ...jobData,
      postedDate: new Date().toLocaleDateString(),
      type: "Full Time",
    };

    localStorage.setItem("adminJobs", JSON.stringify([...existingJobs, newJob]));

    alert("✅ Job opening posted successfully!");

    // Reset form
    setJobData({
      title: "",
      description: "",
      package: "",
      location: "",
      eligibility: "",
    });
  };

  return (
    <section className="backdrop-blur-md bg-white/30 border border-white/40 p-8 rounded-2xl shadow-xl max-w-3xl mx-auto mt-10">
      <h2 className="text-3xl font-bold text-black mb-8 text-center">
        Post a New Job Opening
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {[
          { label: "Job Title", name: "title", type: "text", placeholder: "Enter job title" },
          { label: "Package (CTC)", name: "package", type: "text", placeholder: "e.g., ₹6 LPA" },
          { label: "Job Location", name: "location", type: "text", placeholder: "e.g., Pune / Remote" },
        ].map((input) => (
          <div key={input.name}>
            <label className="block text-black font-medium mb-2">{input.label}</label>
            <input
              type={input.type}
              name={input.name}
              value={jobData[input.name]}
              onChange={handleChange}
              placeholder={input.placeholder}
              required
              className="w-full px-4 py-2 rounded-lg border border-white/40 bg-white/60 text-black placeholder-gray-500 focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>
        ))}

        {/* Job Description */}
        <div>
          <label className="block text-black font-medium mb-2">Job Description</label>
          <textarea
            name="description"
            value={jobData.description}
            onChange={handleChange}
            placeholder="Enter job description"
            required
            rows="4"
            className="w-full px-4 py-2 rounded-lg border border-white/40 bg-white/60 text-black placeholder-gray-500 focus:ring-2 focus:ring-amber-500 outline-none"
          ></textarea>
        </div>

        {/* Eligibility */}
        <div>
          <label className="block text-black font-medium mb-2">Eligibility Criteria</label>
          <textarea
            name="eligibility"
            value={jobData.eligibility}
            onChange={handleChange}
            placeholder="e.g., B.E./B.Tech in Computer Science, 0-2 years experience"
            required
            rows="3"
            className="w-full px-4 py-2 rounded-lg border border-white/40 bg-white/60 text-black placeholder-gray-500 focus:ring-2 focus:ring-amber-500 outline-none"
          ></textarea>
        </div>

        {/* Submit */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300"
          >
            Post Job
          </button>
        </div>
      </form>
    </section>
  );
}
