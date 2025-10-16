import { useState } from "react";

export default function UserApplications() {
  const [activeTab, setActiveTab] = useState("active");

  const activeApplications = [
    {
      title: "Frontend Developer",
      jobId: "12345",
      date: "Oct 10, 2025",
      location: "IN",
      status: "Under Review",
    },
  ];

  const archivedApplications = [
    {
      title: "Backend Engineer",
      jobId: "98765",
      date: "Aug 20, 2025",
      location: "IN",
      status: "Rejected",
    },
  ];

  const handleWithdraw = (jobId) => {
    console.log(`Withdraw clicked for Job ID: ${jobId}`);
  };

  const statusSteps = [
    "Submitted",
    "Under Review",
    "Interview",
    "Selected",
    "Rejected",
  ];

  const getStatusStep = (status) => {
    switch (status) {
      case "Submitted":
        return 0;
      case "Under Review":
        return 1;
      case "Interview":
        return 2;
      case "Selected":
        return 3;
      case "Rejected":
        return 4;
      default:
        return 0;
    }
  };

  const renderProgress = (status) => {
    const currentStep = getStatusStep(status);
    return (
      <div className="mt-4">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          {statusSteps.map((s, i) => (
            <span
              key={i}
              className={`${
                i <= currentStep ? "text-amber-600 font-semibold" : "text-gray-400"
              }`}
            >
              {s}
            </span>
          ))}
        </div>
        <div className="relative w-full h-2 bg-gray-200 rounded-full">
          <div
            className="absolute h-2 bg-amber-500 rounded-full transition-all duration-700"
            style={{
              width: `${(currentStep / (statusSteps.length - 1)) * 100}%`,
            }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto text-black px-6 py-10">
      {/* ==== PAGE TITLE ==== */}
      <h2 className="text-4xl font-bold italic text-amber-600 mb-10 text-center drop-shadow-md">
        My Applications
      </h2>

      {/* ==== TABS ==== */}
      <div className="flex justify-center space-x-10 mb-10">
        <button
          onClick={() => setActiveTab("active")}
          className={`px-4 py-2 text-lg font-semibold rounded-full transition-all duration-300 ${
            activeTab === "active"
              ? "bg-amber-600 text-white shadow-md"
              : "bg-white/50 text-black hover:bg-amber-100"
          }`}
        >
          Active ({activeApplications.length})
        </button>
        <button
          onClick={() => setActiveTab("archived")}
          className={`px-4 py-2 text-lg font-semibold rounded-full transition-all duration-300 ${
            activeTab === "archived"
              ? "bg-amber-600 text-white shadow-md"
              : "bg-white/50 text-black hover:bg-amber-100"
          }`}
        >
          Archived ({archivedApplications.length})
        </button>
      </div>

      {/* ==== APPLICATION LIST ==== */}
      <section className="space-y-8">
        {activeTab === "active"
          ? activeApplications.length === 0
            ? (
              <p className="text-center text-gray-700 text-lg">
                No active applications.
              </p>
            )
            : activeApplications.map((app, index) => (
                <div
                  key={index}
                  className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                    <h3 className="text-2xl font-semibold text-amber-700">
                      {app.title}
                    </h3>
                    <p className="text-sm text-gray-700 mt-2 md:mt-0">
                      Applied on <span className="font-medium">{app.date}</span>
                    </p>
                  </div>

                  <div className="text-gray-800 mb-2">
                    <p>
                      <span className="font-semibold text-amber-700">Job ID:</span>{" "}
                      {app.jobId}
                    </p>
                    <p>
                      <span className="font-semibold text-amber-700">Location:</span>{" "}
                      {app.location}
                    </p>
                  </div>

                  {/* Progress Line */}
                  {renderProgress(app.status)}

                  <div className="flex justify-end mt-6">
                    <button
                      onClick={() => handleWithdraw(app.jobId)}
                      className="text-red-600 font-medium hover:underline"
                    >
                      Withdraw
                    </button>
                  </div>
                </div>
              ))
          : archivedApplications.length === 0
          ? (
              <p className="text-center text-gray-700 text-lg">
                No archived applications.
              </p>
            )
          : archivedApplications.map((app, index) => (
              <div
                key={index}
                className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <h3 className="text-2xl font-semibold text-amber-700">
                    {app.title}
                  </h3>
                  <p className="text-sm text-gray-700 mt-2 md:mt-0">
                    Applied on <span className="font-medium">{app.date}</span>
                  </p>
                </div>

                <div className="text-gray-800 mb-2">
                  <p>
                    <span className="font-semibold text-amber-700">Job ID:</span>{" "}
                    {app.jobId}
                  </p>
                  <p>
                    <span className="font-semibold text-amber-700">Location:</span>{" "}
                    {app.location}
                  </p>
                </div>

                {/* Progress Line */}
                {renderProgress(app.status)}

                <div className="flex justify-end mt-6">
                  <button
                    onClick={() => handleWithdraw(app.jobId)}
                    className="text-red-600 font-medium hover:underline"
                  >
                    Withdraw
                  </button>
                </div>
              </div>
            ))}
      </section>
    </div>
  );
}
