export default function JobManagement() {
  const jobs = [
    { id: 1, title: "Frontend Developer", status: "Active" },
    { id: 2, title: "Backend Developer", status: "Pending" },
  ];

  return (
    <section className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-4">Job Management</h2>
      <ul className="divide-y">
        {jobs.map((job) => (
          <li key={job.id} className="flex justify-between items-center py-2">
            <div>
              <p className="font-medium">{job.title}</p>
              <p className="text-sm text-gray-500">Status: {job.status}</p>
            </div>
            <div className="space-x-2">
              <button className="px-3 py-1 text-sm bg-green-500 text-white rounded-md">Approve</button>
              <button className="px-3 py-1 text-sm bg-yellow-500 text-white rounded-md">Edit</button>
              <button className="px-3 py-1 text-sm bg-red-500 text-white rounded-md">Reject</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
