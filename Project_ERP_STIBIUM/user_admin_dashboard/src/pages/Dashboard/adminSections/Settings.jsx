import { useState } from "react";
import {
  Plus,
  Trash2,
  Download,
  Upload,
  Mail,
  Settings as SettingsIcon,
  X,
} from "lucide-react";

export default function Settings() {
  const [admins, setAdmins] = useState([
    { id: 1, name: "Main Admin", email: "admin@hirepilot.com" },
    { id: 2, name: "HR Manager", email: "hr@hirepilot.com" },
  ]);
  const [newAdmin, setNewAdmin] = useState({ name: "", email: "" });
  const [siteSettings, setSiteSettings] = useState({
    logo: "",
    primaryColor: "#f59e0b",
    contactEmail: "support@hirepilot.com",
  });
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [emailTemplate, setEmailTemplate] = useState({
    subject: "Welcome to HirePilot",
    message: "Dear User, Welcome to our platform!",
  });

  // ✅ Add Admin
  const handleAddAdmin = () => {
    if (!newAdmin.name.trim() || !newAdmin.email.trim()) {
      alert("Please fill in both name and email.");
      return;
    }
    setAdmins([...admins, { id: Date.now(), ...newAdmin }]);
    setNewAdmin({ name: "", email: "" });
  };

  // ✅ Remove Admin
  const handleRemoveAdmin = (id) => {
    setAdmins(admins.filter((a) => a.id !== id));
  };

  // ✅ Upload Logo
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const logoUrl = URL.createObjectURL(file);
      setSiteSettings({ ...siteSettings, logo: logoUrl });
    }
  };

  // ✅ Export Data
  const handleExport = () => {
    const data = { admins, siteSettings, emailTemplate };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "backup.json";
    a.click();
    alert("Data exported successfully!");
  };

  // ✅ Import Data
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const imported = JSON.parse(event.target.result);
      setAdmins(imported.admins || []);
      setSiteSettings(imported.siteSettings || {});
      setEmailTemplate(imported.emailTemplate || {});
      alert("Data imported successfully!");
    };
    reader.readAsText(file);
  };

  // ✅ Save Email Template
  const handleSaveTemplate = () => {
    alert("Email template saved successfully!");
    setShowTemplateModal(false);
  };

  return (
    <section className="p-10 backdrop-blur-lg bg-white/30 border border-white/40 rounded-2xl shadow-2xl max-w-6xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-10 text-center text-black flex items-center justify-center gap-2">
        <SettingsIcon size={28} /> Admin Settings
      </h2>

      {/* ===== Admin Accounts ===== */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-black mb-4">
          Manage Admin Accounts
        </h3>

        <div className="overflow-x-auto bg-white/40 rounded-xl border border-white/50 mb-6">
          <table className="min-w-full text-left text-black">
            <thead className="bg-white/50">
              <tr>
                <th className="py-3 px-4 font-semibold">Name</th>
                <th className="py-3 px-4 font-semibold">Email</th>
                <th className="py-3 px-4 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((a) => (
                <tr key={a.id} className="border-t border-white/30 hover:bg-white/30">
                  <td className="py-3 px-4">{a.name}</td>
                  <td className="py-3 px-4">{a.email}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleRemoveAdmin(a.id)}
                      className="p-2 rounded-lg bg-red-100 hover:bg-red-200 transition"
                    >
                      <Trash2 size={18} className="text-red-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Admin */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Admin Name"
            value={newAdmin.name}
            onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
            className="flex-1 px-4 py-2 border border-white/50 rounded-lg bg-white/50 text-black focus:outline-none"
          />
          <input
            type="email"
            placeholder="Admin Email"
            value={newAdmin.email}
            onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
            className="flex-1 px-4 py-2 border border-white/50 rounded-lg bg-white/50 text-black focus:outline-none"
          />
          <button
            onClick={handleAddAdmin}
            className="flex items-center justify-center gap-2 px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg shadow-md transition"
          >
            <Plus size={18} /> Add
          </button>
        </div>
      </div>

      {/* ===== Site Settings ===== */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-black mb-4">Site Settings</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white/40 p-5 rounded-xl border border-white/50">
            <p className="text-black font-medium mb-2">Site Logo</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="w-full px-3 py-2 border border-white/50 rounded-lg bg-white/60 text-black"
            />
            {siteSettings.logo && (
              <img
                src={siteSettings.logo}
                alt="Logo Preview"
                className="w-20 h-20 mt-3 rounded-lg object-contain border border-white/50"
              />
            )}
          </div>

          <div className="bg-white/40 p-5 rounded-xl border border-white/50">
            <p className="text-black font-medium mb-2">Primary Color</p>
            <input
              type="color"
              value={siteSettings.primaryColor}
              onChange={(e) =>
                setSiteSettings({ ...siteSettings, primaryColor: e.target.value })
              }
              className="w-16 h-10 border border-white/50 rounded-md cursor-pointer"
            />
          </div>

          <div className="bg-white/40 p-5 rounded-xl border border-white/50 sm:col-span-2">
            <p className="text-black font-medium mb-2">Contact Email</p>
            <input
              type="email"
              value={siteSettings.contactEmail}
              onChange={(e) =>
                setSiteSettings({ ...siteSettings, contactEmail: e.target.value })
              }
              className="w-full px-4 py-2 border border-white/50 rounded-lg bg-white/60 text-black"
            />
          </div>
        </div>
      </div>

      {/* ===== Notifications & Templates ===== */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-black mb-4">
          Notifications & Email Templates
        </h3>
        <div className="bg-white/40 p-5 rounded-xl border border-white/50 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-black/80 flex items-center gap-2">
            <Mail size={18} /> Manage automated emails and alerts.
          </p>
          <button
            onClick={() => setShowTemplateModal(true)}
            className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold shadow-md transition"
          >
            Edit Templates
          </button>
        </div>
      </div>

      {/* ===== Data Backup & Export ===== */}
      <div>
        <h3 className="text-2xl font-semibold text-black mb-4">
          Data Backup & Export
        </h3>
        <div className="bg-white/40 p-5 rounded-xl border border-white/50 flex flex-wrap justify-between items-center gap-3">
          <p className="text-black/80">
            Download or upload system backups securely.
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition"
            >
              <Download size={18} /> Export
            </button>
            <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md cursor-pointer transition">
              <Upload size={18} /> Import
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      {/* ===== Template Modal ===== */}
      {showTemplateModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-2xl p-8 w-[90%] max-w-md relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
              onClick={() => setShowTemplateModal(false)}
            >
              <X size={22} />
            </button>
            <h3 className="text-2xl font-semibold mb-4 text-black">
              Edit Email Template
            </h3>
            <input
              type="text"
              value={emailTemplate.subject}
              onChange={(e) =>
                setEmailTemplate({ ...emailTemplate, subject: e.target.value })
              }
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Email Subject"
            />
            <textarea
              value={emailTemplate.message}
              onChange={(e) =>
                setEmailTemplate({ ...emailTemplate, message: e.target.value })
              }
              className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Email Message"
            />
            <button
              onClick={handleSaveTemplate}
              className="mt-5 w-full py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg"
            >
              Save Template
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
