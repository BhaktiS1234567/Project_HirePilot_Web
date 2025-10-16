export default function UserOverview() {
  const jobOpenings = [
    { role: "Frontend Developer", department: "Engineering", openings: 5, location: "Pune" },
    { role: "Backend Developer", department: "Engineering", openings: 3, location: "Mumbai" },
    { role: "UI/UX Designer", department: "Design", openings: 2, location: "Remote" },
    { role: "QA Tester", department: "Quality Assurance", openings: 4, location: "Pune" },
    { role: "Project Manager", department: "Management", openings: 1, location: "Bangalore" },
  ];

  return (
    <div className="space-y-8">
      {/* === PAGE HEADING === */}
      <h1 className="text-4xl font-bold text-amber-600 italic text-center mb-10 drop-shadow-md">
        Current Openings
      </h1>

      {/* === OPENINGS TABLE === */}
      <div className="backdrop-blur-md bg-white/30 p-6 rounded-2xl shadow-xl border border-white/40">
        <h2 className="text-2xl font-semibold text-black mb-6">
          Available Positions
        </h2>
        <p className="text-black/70 mb-6">
          Explore the current job openings available on the HirePilot portal.
        </p>

        <table className="w-full border-collapse text-sm rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-white/60 text-black">
              <th className="border border-white/40 p-3 text-left">Role</th>
              <th className="border border-white/40 p-3 text-left">Department</th>
              <th className="border border-white/40 p-3 text-center">Openings</th>
              <th className="border border-white/40 p-3 text-center">Location</th>
            </tr>
          </thead>
          <tbody>
            {jobOpenings.map((job, index) => (
              <tr key={index} className="hover:bg-white/50 transition">
                <td className="border border-white/40 p-3 text-black font-medium">
                  {job.role}
                </td>
                <td className="border border-white/40 p-3 text-black">
                  {job.department}
                </td>
                <td className="border border-white/40 p-3 text-center text-black font-semibold">
                  {job.openings}
                </td>
                <td className="border border-white/40 p-3 text-center text-black">
                  {job.location}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
