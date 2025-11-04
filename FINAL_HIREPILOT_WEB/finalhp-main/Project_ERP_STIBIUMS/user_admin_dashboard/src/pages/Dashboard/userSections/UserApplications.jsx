import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";

export default function UserApplications() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("active");
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Map backend statuses to UI statuses
  const mapStatus = (status) => {
    switch (status) {
      case "Applied":
        return "Submitted";
      case "Accepted":
        return "Selected";
      case "Rejected":
        return "Rejected";
      default:
        return "Submitted";
    }
  };

  // 🎯 Fetch user’s job applications
  const fetchApplications = async () => {
    if (!user?.name) return;
    setLoading(true);
    try {
      const encodedName = encodeURIComponent(user.name);
      const response = await fetch(
        `http://localhost:8080/candidate/applications/${encodedName}`
      );
      if (!response.ok) throw new Error("Failed to fetch applications");
      const data = await response.json();

      const formatted = data.map((app) => ({
        title: app.jobTitle || "Untitled Job",
        employer: app.employer || "Unknown",
        status: mapStatus(app.status),
        date: app.date || new Date().toLocaleDateString(),
        location: app.location || "IN",
      }));

      // ✅ Automatically archive rejected applications
      const autoProcessed = formatted.map((app) => ({
        ...app,
        status:
          app.status === "Rejected" ? "Archived" : app.status,
      }));

      setApplications(autoProcessed);
    } catch (err) {
      console.error("Error fetching applications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
    const interval = setInterval(fetchApplications, 20000); // auto-refresh every 10s
    return () => clearInterval(interval);
  }, [user]);

  // 🗑️ Withdraw (future backend logic)
  const handleWithdraw = (jobTitle) => {
    alert(`🗑️ Withdraw request sent for ${jobTitle}`);
  };





  // 🟡 Status stages for progress
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
        return 1;
      case "Under Review":
        return 2;
      case "Interview":
        return 3;
      case "Selected":
        return 4;
      case "Rejected":
        return 5;
      default:
        return 1;
    }
  };

  // ✨ Horizontal progress bar
  const renderProgress = (status) => {
    const currentStep = getStatusStep(status);
    const percentage = ((currentStep - 1) / (statusSteps.length - 1)) * 100;

    return (
      <div className="mt-6">
        <div className="flex justify-between text-xs text-gray-700 mb-2">
          {statusSteps.map((s, i) => (
            <span
              key={i}
              className={`${
                i < currentStep
                  ? "text-amber-600 font-semibold"
                  : "text-gray-400"
              }`}
            >
              {s}
            </span>
          ))}
        </div>

        <div className="relative w-full h-3 rounded-full bg-gray-200 overflow-hidden shadow-inner">
          <div
            className="absolute h-3 bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-700 ease-in-out"
            style={{
              width: `${percentage}%`,
              boxShadow: "0 0 10px rgba(255,193,7,0.7)",
            }}
          ></div>
        </div>
      </div>
    );
  };

  // 🔹 Auto separation logic
  const activeApplications = applications.filter(
    (app) => app.status !== "Archived"
  );

  const archivedApplications = applications.filter(
    (app) => app.status === "Archived"
  );

  return (
    <div className="max-w-6xl mx-auto text-black px-6 py-10">
      <h2 className="text-4xl font-bold italic text-amber-600 mb-10 text-center drop-shadow-md">
        My Applications
      </h2>

      {/* ==== Tabs ==== */}
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
          Rejected ({archivedApplications.length})
        </button>
      </div>

      {/* ==== Applications ==== */}
      {loading ? (
        <p className="text-center text-gray-600">Loading applications...</p>
      ) : (
        <section className="space-y-8">
          {(activeTab === "active"
            ? activeApplications
            : archivedApplications
          ).length === 0 ? (
            <p className="text-center text-gray-700 text-lg">
              No {activeTab === "active" ? "active" : "archived"} applications.
            </p>
          ) : (
            (activeTab === "active"
              ? activeApplications
              : archivedApplications
            ).map((app, index) => (
              <div
                key={index}
                className="bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <h3 className="text-2xl font-semibold text-amber-700">
                    {app.title}
                  </h3>
                  <p className="text-sm text-gray-700 mt-2 md:mt-0">
                    Applied on <span className="font-medium">{app.date}</span>
                  </p>
                </div>

                <div className="text-gray-800 mb-4">
                  <p>
                    <span className="font-semibold text-amber-700">Company:</span>{" "}
                    {app.employer}
                  </p>
                  <p>
                    <span className="font-semibold text-amber-700">Location:</span>{" "}
                    {app.location}
                  </p>
                  <p>
                    <span className="font-semibold text-amber-700">Status:</span>{" "}
                    {app.status === "Archived" ? "Rejected" : app.status}
                  </p>
                </div>

                {/* Smooth Progress Bar */}
                {renderProgress(app.status === "Archived" ? "Rejected" : app.status)}

                {/* Action Buttons */}
                {activeTab === "active" ? (
                  <div className="flex justify-end gap-6 mt-6">
                    <button
                      onClick={() => handleWithdraw(app.title)}
                      className="text-red-600 font-medium hover:underline"
                    >
                      Withdraw
                    </button>
                    
                  </div>
                ) : (
                  <div className="flex justify-end mt-6">
                    
                  </div>
                )}
              </div>
            ))
          )}
        </section>
      )}
    </div>
  );
}
