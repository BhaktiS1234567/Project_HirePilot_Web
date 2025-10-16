import { useState } from "react";

export default function UserProfile() {
  const [education, setEducation] = useState([
    { college: "", degree: "", university: "", year: "", cgpa: "" },
  ]);
  const [experience, setExperience] = useState([
    { company: "", role: "", duration: "" },
  ]);
  const [projects, setProjects] = useState([{ title: "", description: "" }]);
  const [basic, setBasic] = useState({
    fullName: "",
    dob: "",
    gender: "",
    email: "",
    mobile: "",
  });
  const [resume, setResume] = useState(null);

  const handleBasicChange = (e) => {
    const { name, value } = e.target;
    setBasic({ ...basic, [name]: value });
  };

  const handleResumeUpload = (e) => setResume(e.target.files[0]);

  const handleFinalSave = () => {
    console.log({ basic, education, experience, projects, resume });
    alert("All details saved successfully!");
  };

  const handleArrayChange = (index, e, setFunc, arr) => {
    const { name, value } = e.target;
    const updated = [...arr];
    updated[index][name] = value;
    setFunc(updated);
  };

  const addField = (setFunc, arr, template) => setFunc([...arr, template]);
  const deleteField = (index, setFunc, arr) =>
    setFunc(arr.filter((_, i) => i !== index));

  const handleSave = (section) => alert(`${section} details saved successfully!`);
  const handleDelete = (section) => alert(`${section} details deleted!`);

  // 🔹 Card Wrapper Style (Reusable)
  const cardStyle = {
    background: "rgba(255, 255, 255, 0.3)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.4)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
  };

  return (
    <div className="space-y-8">
      {/* ===== Centered Heading ===== */}
      <h1 className="text-4xl font-bold text-amber-600 italic text-center drop-shadow-md mb-10">
        My Profile
      </h1>

      {/* ===== BASIC DETAILS ===== */}
      <div style={cardStyle} className="p-6 rounded-3xl space-y-4">
        <h2 className="text-2xl font-semibold text-black mb-2">Basic Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["fullName", "dob", "gender", "email", "mobile"].map((field) =>
            field === "gender" ? (
              <select
                key={field}
                name="gender"
                value={basic.gender}
                onChange={handleBasicChange}
                className="border border-black/40 bg-white/50 text-black p-2 rounded focus:outline-none focus:border-amber-500 placeholder-black"
              >
                <option value="">Select Gender</option>
                <option>Female</option>
                <option>Male</option>
                <option>Other</option>
              </select>
            ) : (
              <input
                key={field}
                type={field === "dob" ? "date" : field === "email" ? "email" : "text"}
                name={field}
                placeholder={
                  field === "fullName"
                    ? "Full Name"
                    : field.charAt(0).toUpperCase() + field.slice(1)
                }
                value={basic[field]}
                onChange={handleBasicChange}
                className="border border-black/40 bg-white/50 text-black placeholder-black p-2 rounded focus:outline-none focus:border-amber-500"
              />
            )
          )}
        </div>
        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={() => handleSave("Basic Details")}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Save
          </button>
          <button
            onClick={() => handleDelete("Basic Details")}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>

      {/* ===== EDUCATION ===== */}
      <div style={cardStyle} className="p-6 rounded-3xl space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-black">Education Details</h2>
          <button
            onClick={() =>
              addField(setEducation, education, {
                college: "",
                degree: "",
                university: "",
                year: "",
                cgpa: "",
              })
            }
            className="bg-amber-500 text-black px-3 py-1 rounded hover:bg-amber-400"
          >
            + Add
          </button>
        </div>

        {education.map((edu, index) => (
          <div
            key={index}
            className="p-4 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-4 border border-black/30 bg-white/40"
          >
            {["college", "degree", "university", "year", "cgpa"].map((field) => (
              <input
                key={field}
                type="text"
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={edu[field]}
                onChange={(e) => handleArrayChange(index, e, setEducation, education)}
                className="border border-black/40 bg-white/60 text-black placeholder-black p-2 rounded focus:outline-none focus:border-amber-500"
              />
            ))}
            <div className="flex justify-end gap-3 col-span-2">
              <button
                onClick={() => handleSave("Education")}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Save
              </button>
              <button
                onClick={() => deleteField(index, setEducation, education)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ===== EXPERIENCE ===== */}
      <div style={cardStyle} className="p-6 rounded-3xl space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-black">Internship / Experience</h2>
          <button
            onClick={() =>
              addField(setExperience, experience, {
                company: "",
                role: "",
                duration: "",
              })
            }
            className="bg-amber-500 text-black px-3 py-1 rounded hover:bg-amber-400"
          >
            + Add
          </button>
        </div>

        {experience.map((exp, index) => (
          <div
            key={index}
            className="p-4 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-4 border border-black/30 bg-white/40"
          >
            <input
              type="text"
              name="company"
              placeholder="Company Name"
              value={exp.company}
              onChange={(e) => handleArrayChange(index, e, setExperience, experience)}
              className="border border-black/40 bg-white/60 text-black placeholder-black p-2 rounded focus:outline-none focus:border-amber-500"
            />
            <input
              type="text"
              name="role"
              placeholder="Role / Position"
              value={exp.role}
              onChange={(e) => handleArrayChange(index, e, setExperience, experience)}
              className="border border-black/40 bg-white/60 text-black placeholder-black p-2 rounded focus:outline-none focus:border-amber-500"
            />
            <input
              type="text"
              name="duration"
              placeholder="Duration"
              value={exp.duration}
              onChange={(e) => handleArrayChange(index, e, setExperience, experience)}
              className="border border-black/40 bg-white/60 text-black placeholder-black p-2 rounded col-span-2 focus:outline-none focus:border-amber-500"
            />
            <div className="flex justify-end gap-3 col-span-2">
              <button
                onClick={() => handleSave("Experience")}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Save
              </button>
              <button
                onClick={() => deleteField(index, setExperience, experience)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ===== PROJECTS ===== */}
      <div style={cardStyle} className="p-6 rounded-3xl space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-black">Projects</h2>
          <button
            onClick={() =>
              addField(setProjects, projects, { title: "", description: "" })
            }
            className="bg-amber-500 text-black px-3 py-1 rounded hover:bg-amber-400"
          >
            + Add
          </button>
        </div>

        {projects.map((proj, index) => (
          <div
            key={index}
            className="p-4 rounded-2xl border border-black/30 bg-white/40 space-y-3"
          >
            <input
              type="text"
              name="title"
              placeholder="Project Title"
              value={proj.title}
              onChange={(e) => handleArrayChange(index, e, setProjects, projects)}
              className="border border-black/40 bg-white/60 text-black placeholder-black p-2 rounded w-full focus:outline-none focus:border-amber-500"
            />
            <textarea
              name="description"
              placeholder="Project Description"
              value={proj.description}
              onChange={(e) => handleArrayChange(index, e, setProjects, projects)}
              className="border border-black/40 bg-white/60 text-black placeholder-black p-2 rounded w-full h-24 focus:outline-none focus:border-amber-500"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => handleSave("Project")}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Save
              </button>
              <button
                onClick={() => deleteField(index, setProjects, projects)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ===== RESUME UPLOAD ===== */}
      <div style={cardStyle} className="p-6 rounded-3xl space-y-4">
        <h2 className="text-2xl font-semibold text-black">Upload Resume</h2>
        <div className="flex items-center gap-4">
          <input
            type="file"
            accept=".pdf"
            onChange={handleResumeUpload}
            className="border border-black/40 bg-white/60 text-black p-2 rounded focus:outline-none focus:border-amber-500"
          />
          {resume && <p className="text-green-700 font-medium">{resume.name}</p>}
        </div>
        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={() => handleSave("Resume")}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Save
          </button>
          <button
            onClick={() => handleDelete("Resume")}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>

      {/* ===== FINAL SAVE ===== */}
      <div className="flex justify-center mt-10">
        <button
          onClick={handleFinalSave}
          className="bg-amber-500 text-black px-8 py-3 rounded-lg font-semibold hover:bg-amber-400 shadow-md"
        >
          Save All Details
        </button>
      </div>
    </div>
  );
}
