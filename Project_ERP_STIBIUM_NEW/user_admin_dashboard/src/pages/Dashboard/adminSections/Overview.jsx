export default function Overview() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const jobs = [
    { id: 1, title: "Frontend Developer", status: "Active" },
    { id: 2, title: "Backend Developer", status: "Pending" },
  ];
  const applications = [
    { id: 1, applicant: "John Doe", job: "Frontend Developer", status: "Applied" },
    { id: 2, applicant: "Jane Smith", job: "Backend Developer", status: "Shortlisted" },
  ];

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-gray-600 font-medium">Total Jobs</h3>
          <p className="text-3xl font-bold text-amber-600">{jobs.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-gray-600 font-medium">Total Users</h3>
          <p className="text-3xl font-bold text-amber-600">{users.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-gray-600 font-medium">Applications</h3>
          <p className="text-3xl font-bold text-amber-600">{applications.length}</p>
        </div>
      </div>
    </section>
  );
}
