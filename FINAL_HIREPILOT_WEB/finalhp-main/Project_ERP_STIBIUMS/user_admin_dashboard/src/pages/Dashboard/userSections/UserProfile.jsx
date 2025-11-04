import { useEffect, useState } from "react";
import { useAuth } from "../../../context/usercontext/profilecontext";
import { useNavigate } from "react-router-dom"; // ✅ Added this

export default function UserProfile() {
  const {
    user,
    profile,
    fetchProfile,
    saveBasicDetails,
    addEducation,
    addExperience,
    addProject,
    saveResume,
  } = useAuth();

  const navigate = useNavigate(); // ✅ Added this
  const userId = user?.id || localStorage.getItem("userId");

  const [basic, setBasic] = useState({
    fullName: "",
    dob: "",
    gender: "",
    email: "",
    mobile: "",
    resumeLink: "",
  });
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [projects, setProjects] = useState([]);
  const [resume, setResume] = useState("");

  // ✅ Fetch existing profile data
  useEffect(() => {
    if (userId) fetchProfile(userId);
  }, [userId]);

  // ✅ Populate UI when profile loads
  useEffect(() => {
    if (profile?.basicDetails) setBasic(profile.basicDetails);
    if (profile?.education) setEducation(profile.education);
    if (profile?.experience) setExperience(profile.experience);
    if (profile?.projects) setProjects(profile.projects);
    if (profile?.resumeLink) setResume(profile.resumeLink);
  }, [profile]);

  // === PROFILE COMPLETION LOGIC ===
  const calculateCompletion = () => {
    let total = 5; // basic details fields
    let filled =
      (basic.fullName ? 1 : 0) +
      (basic.dob ? 1 : 0) +
      (basic.gender ? 1 : 0) +
      (basic.email ? 1 : 0) +
      (basic.mobile ? 1 : 0);

    if (education.length > 0) filled++;
    total++;

    if (experience.length > 0) filled++;
    total++;

    if (projects.length > 0) filled++;
    total++;

    if (resume) filled++;
    total++;

    return Math.round((filled / total) * 100);
  };

  const completion = calculateCompletion();
  const canApply = completion >= 80;

  // === HANDLERS ===
  const handleBasicChange = (e) =>
    setBasic({ ...basic, [e.target.name]: e.target.value });

  const handleSaveBasic = async () => {
    await saveBasicDetails(userId, basic);
    alert("✅ Basic details saved!");
  };

  const handleAddEducation = async (edu) => {
    await addEducation(userId, edu);
    alert("✅ Education added!");
  };

  const handleAddExperience = async (exp) => {
    await addExperience(userId, exp);
    alert("✅ Experience added!");
  };

  const handleAddProject = async (proj) => {
    await addProject(userId, proj);
    alert("✅ Project added!");
  };

  const handleResumeSave = async () => {
    if (!resume) return alert("Please enter resume link!");
    await saveResume(userId, resume);
    alert("✅ Resume link saved!");
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

  const cardStyle = {
    background: "rgba(255,255,255,0.3)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.4)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-amber-600 italic text-center drop-shadow-md mb-10">
        My Profile
      </h1>

      {/* === PROFILE COMPLETION === */}
      <div style={cardStyle} className="p-6 rounded-3xl space-y-3">
        <h2 className="text-xl font-semibold text-black">Profile Completion</h2>
        <div className="w-full bg-gray-300 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${
              completion >= 80 ? "bg-amber-500" : "bg-gray-400"
            }`}
            style={{ width: `${completion}%` }}
          ></div>
        </div>
        <p
          className={`text-right text-sm font-semibold ${
            completion >= 80 ? "text-amber-600" : "text-gray-600"
          }`}
        >
          {completion}% completed
        </p>

        <div className="flex justify-end">
          <button
            disabled={!canApply}
            onClick={() => canApply && navigate("/dashboard/user/jobs")} // ✅ Redirect to Job Search
            className={`px-6 py-2 rounded font-semibold ${
              canApply
                ? "bg-amber-600 text-white hover:bg-amber-700"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
          >
            {canApply ? "Apply for Jobs" : "Complete Profile to Apply"}
          </button>
        </div>
      </div>

      {/* BASIC DETAILS */}
      <div style={cardStyle} className="p-6 rounded-3xl space-y-4">
        <h2 className="text-2xl font-semibold text-black mb-2">Basic Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["fullName", "dob", "gender", "email", "mobile", "resumeLink"].map(
            (field) =>
              field === "gender" ? (
                <select
                  key={field}
                  name="gender"
                  value={basic.gender}
                  onChange={handleBasicChange}
                  className="border border-black/40 bg-white/50 text-black p-2 rounded focus:outline-none focus:border-amber-500"
                >
                  <option value="">Select Gender</option>
                  <option>Female</option>
                  <option>Male</option>
                  <option>Other</option>
                </select>
              ) : (
                <input
                  key={field}
                  type={field === "dob" ? "date" : "text"}
                  name={field}
                  placeholder={
                    field === "resumeLink"
                      ? "Resume Link (optional)"
                      : field.charAt(0).toUpperCase() + field.slice(1)
                  }
                  value={basic[field] || ""}
                  onChange={handleBasicChange}
                  className="border border-black/40 bg-white/50 text-black p-2 rounded focus:outline-none focus:border-amber-500"
                />
              )
          )}
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSaveBasic}
            className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700"
          >
            Save
          </button>
        </div>
      </div>

      {/* EDUCATION */}
      <div style={cardStyle} className="p-6 rounded-3xl space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-black">Education</h2>
          <button
            onClick={() =>
              addField(setEducation, education, {
                collegeName: "",
                degree: "",
                university: "",
                passingYear: "",
                cgpa: "",
              })
            }
            className="bg-amber-500 text-black px-3 py-1 rounded hover:bg-amber-400"
          >
            + Add
          </button>
        </div>

        {education.map((edu, i) => (
          <div
            key={i}
            className="p-4 border border-black/30 bg-white/40 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {["collegeName", "degree", "university", "passingYear", "cgpa"].map(
              (field) => (
                <input
                  key={field}
                  name={field}
                  placeholder={field}
                  value={edu[field] || ""}
                  onChange={(e) =>
                    handleArrayChange(i, e, setEducation, education)
                  }
                  className="border border-black/40 bg-white/60 text-black p-2 rounded focus:outline-none focus:border-amber-500"
                />
              )
            )}
            <div className="col-span-2 flex justify-end gap-2">
              <button
                onClick={() => handleAddEducation(edu)}
                className="bg-amber-600 text-white px-3 py-1 rounded hover:bg-amber-700"
              >
                Save
              </button>
              <button
                onClick={() => deleteField(i, setEducation, education)}
                className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* EXPERIENCE */}
      <div style={cardStyle} className="p-6 rounded-3xl space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-black">Experience</h2>
          <button
            onClick={() =>
              addField(setExperience, experience, {
                companyName: "",
                role: "",
                duration: "",
              })
            }
            className="bg-amber-500 text-black px-3 py-1 rounded hover:bg-amber-400"
          >
            + Add
          </button>
        </div>

        {experience.map((exp, i) => (
          <div
            key={i}
            className="p-4 border border-black/30 bg-white/40 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {["companyName", "role", "duration"].map((f) => (
              <input
                key={f}
                name={f}
                placeholder={f}
                value={exp[f] || ""}
                onChange={(e) =>
                  handleArrayChange(i, e, setExperience, experience)
                }
                className="border border-black/40 bg-white/60 text-black p-2 rounded focus:outline-none focus:border-amber-500"
              />
            ))}
            <div className="col-span-2 flex justify-end gap-2">
              <button
                onClick={() => handleAddExperience(exp)}
                className="bg-amber-600 text-white px-3 py-1 rounded hover:bg-amber-700"
              >
                Save
              </button>
              <button
                onClick={() => deleteField(i, setExperience, experience)}
                className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PROJECTS */}
      <div style={cardStyle} className="p-6 rounded-3xl space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-black">Projects</h2>
          <button
            onClick={() =>
              addField(setProjects, projects, {
                projectTitle: "",
                description: "",
              })
            }
            className="bg-amber-500 text-black px-3 py-1 rounded hover:bg-amber-400"
          >
            + Add
          </button>
        </div>

        {projects.map((proj, i) => (
          <div key={i} className="p-4 border border-black/30 bg-white/40 rounded-xl">
            <input
              name="projectTitle"
              placeholder="Project Title"
              value={proj.projectTitle || ""}
              onChange={(e) => handleArrayChange(i, e, setProjects, projects)}
              className="border border-black/40 bg-white/60 text-black p-2 rounded w-full mb-2 focus:outline-none focus:border-amber-500"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={proj.description || ""}
              onChange={(e) => handleArrayChange(i, e, setProjects, projects)}
              className="border border-black/40 bg-white/60 text-black p-2 rounded w-full focus:outline-none focus:border-amber-500"
            />
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={() => handleAddProject(proj)}
                className="bg-amber-600 text-white px-3 py-1 rounded hover:bg-amber-700"
              >
                Save
              </button>
              <button
                onClick={() => deleteField(i, setProjects, projects)}
                className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* RESUME LINK */}
      <div style={cardStyle} className="p-6 rounded-3xl space-y-4">
        <h2 className="text-2xl font-semibold text-black">Resume Link</h2>
        <input
          type="text"
          placeholder="Enter Resume URL"
          value={resume}
          onChange={(e) => setResume(e.target.value)}
          className="border border-black/40 bg-white/60 text-black p-2 rounded w-full focus:outline-none focus:border-amber-500"
        />
        <div className="flex justify-end">
          <button
            onClick={handleResumeSave}
            className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
