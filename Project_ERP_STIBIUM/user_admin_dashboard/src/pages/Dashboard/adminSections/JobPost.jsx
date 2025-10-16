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
    console.log("Job Posted:", jobData);
    alert("Job opening posted successfully!");
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
        {/* Job Title */}
        <div>
          <label className="block text-black font-medium mb-2">
            Job Title
          </label>
          <input
            type="text"
            name="title"
            value={jobData.title}
            onChange={handleChange}
            placeholder="Enter job title"
            required
            className="w-full px-4 py-2 rounded-lg border border-white/40 bg-white/60 text-black placeholder-gray-500 focus:ring-2 focus:ring-amber-500 outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-black font-medium mb-2">
            Job Description
          </label>
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

        {/* Package */}
        <div>
          <label className="block text-black font-medium mb-2">
            Package (CTC)
          </label>
          <input
            type="text"
            name="package"
            value={jobData.package}
            onChange={handleChange}
            placeholder="e.g., ₹6 LPA"
            required
            className="w-full px-4 py-2 rounded-lg border border-white/40 bg-white/60 text-black placeholder-gray-500 focus:ring-2 focus:ring-amber-500 outline-none"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-black font-medium mb-2">
            Job Location
          </label>
          <input
            type="text"
            name="location"
            value={jobData.location}
            onChange={handleChange}
            placeholder="e.g., Pune / Remote"
            required
            className="w-full px-4 py-2 rounded-lg border border-white/40 bg-white/60 text-black placeholder-gray-500 focus:ring-2 focus:ring-amber-500 outline-none"
          />
        </div>

        {/* Eligibility Criteria */}
        <div>
          <label className="block text-black font-medium mb-2">
            Eligibility Criteria
          </label>
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

        {/* Submit Button */}
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
