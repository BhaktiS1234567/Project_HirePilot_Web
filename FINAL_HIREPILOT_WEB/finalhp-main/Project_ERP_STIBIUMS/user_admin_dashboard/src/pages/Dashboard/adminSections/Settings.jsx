import { useState, useEffect } from "react";
import axios from "axios";
import {
  Plus,
  Trash2,
  Download,
  Upload,
  Mail,
  Settings as SettingsIcon,
  X,
} from "lucide-react";

export default function AdminSettings() {
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({ adminName: "", adminEmail: "" });
  const [siteSettings, setSiteSettings] = useState({
    siteLogo: "",
    primaryColor: "#f59e0b",
    contactEmail: "",
  });
  const [templates, setTemplates] = useState([]);
  const [newTemplate, setNewTemplate] = useState({
    templateName: "",
    subject: "",
    body: "",
  });
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.id || localStorage.getItem("userId");
  const token = storedUser?.token || localStorage.getItem("token");

  // =========================
  // ✅ Fetch All Admin Settings
  // =========================
  useEffect(() => {
    const fetchAllSettings = async () => {
      try {
        setLoading(true);

        // Fetch Admin Accounts
        const adminRes = await axios.get(
          "http://localhost:8080/admin/setting/manage-account",
          { headers: { "x-user-id": userId, Authorization: `Bearer ${token}` } }
        );
        setAdmins(adminRes.data);

        // Fetch Site Settings
        const siteRes = await axios.get(
          "http://localhost:8080/admin/setting/site",
          { headers: { "x-user-id": userId, Authorization: `Bearer ${token}` } }
        );
        setSiteSettings(siteRes.data);

        // Fetch Notification Templates
        const templateRes = await axios.get(
          "http://localhost:8080/admin/setting/notification",
          { headers: { "x-user-id": userId, Authorization: `Bearer ${token}` } }
        );
        setTemplates(templateRes.data || []);
      } catch (err) {
        console.error("⚠️ Error fetching settings:", err);
        setMessage("❌ Failed to load settings.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllSettings();
  }, [userId, token]);

  // =========================
  // ✅ Add Admin
  // =========================
  const handleAddAdmin = async () => {
    if (!newAdmin.adminName || !newAdmin.adminEmail) {
      alert("Please fill all admin details.");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:8080/admin/setting/manage-account/add",
        newAdmin,
        { headers: { "x-user-id": userId, Authorization: `Bearer ${token}` } }
      );
      setAdmins((prev) => [...prev, res.data]);
      setNewAdmin({ adminName: "", adminEmail: "" });
      setMessage("✅ Admin added successfully!");
    } catch (err) {
      console.error("❌ Add Admin Error:", err);
      setMessage("❌ Failed to add admin.");
    }
  };

  // ✅ Delete Admin
  const handleRemoveAdmin = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8080/admin/setting/manage-account/delete/${id}`,
        { headers: { "x-user-id": userId, Authorization: `Bearer ${token}` } }
      );
      setAdmins((prev) => prev.filter((a) => a.id !== id));
      setMessage("✅ Admin removed!");
    } catch (err) {
      console.error("❌ Delete Admin Error:", err);
      setMessage("❌ Failed to delete admin.");
    }
  };

  // ✅ Save Site Settings
  const handleSaveSiteSettings = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/admin/setting/site",
        siteSettings,
        { headers: { "x-user-id": userId, Authorization: `Bearer ${token}` } }
      );
      setSiteSettings(res.data);
      setMessage("✅ Site settings updated successfully!");
    } catch (err) {
      console.error("❌ Update Site Settings Error:", err);
      setMessage("❌ Failed to update site settings.");
    }
  };

  // ✅ Upload Logo
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const logoUrl = URL.createObjectURL(file);
      setSiteSettings({ ...siteSettings, siteLogo: logoUrl });
    }
  };

  // ✅ Save Email Template (Notification)
  const handleSaveTemplate = async () => {
    if (!newTemplate.templateName || !newTemplate.subject || !newTemplate.body) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8080/admin/setting/notification/edit",
        {
          ...newTemplate,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        { headers: { "x-user-id": userId, Authorization: `Bearer ${token}` } }
      );
      setTemplates((prev) => [...prev, res.data]);
      setNewTemplate({ templateName: "", subject: "", body: "" });
      setShowTemplateModal(false);
      setMessage("✅ Notification template saved!");
    } catch (err) {
      console.error("❌ Save Template Error:", err);
      setMessage("❌ Failed to save template.");
    }
  };

  // ✅ Export Settings
  // ✅ Export (Data Backup via Backend)
const handleExport = async () => {
  try {
    setMessage("⏳ Exporting data...");

    const res = await axios.get(
      "http://localhost:8080/admin/setting/backup/export",
      {
        headers: {
          "x-user-id": userId,
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // ✅ The backend returns a message or file content
    if (res.data.message) {
      // Download as JSON file for now
      const blob = new Blob([JSON.stringify(res.data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "hirepilot_data_backup.json";
      a.click();
      setMessage("✅ Data backup exported successfully!");
    } else {
      setMessage("⚠️ No export data found from backend.");
    }
  } catch (err) {
    console.error("❌ Export Backup Error:", err);
    setMessage("❌ Failed to export backup.");
  }
};




  // =========================
  // ✅ UI Rendering
  // =========================
  return (
    <section className="p-10 backdrop-blur-lg bg-white/30 border border-white/40 rounded-2xl shadow-2xl max-w-6xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-10 text-center text-black flex items-center justify-center gap-2">
        <SettingsIcon size={28} /> Admin Settings
      </h2>

      {loading ? (
        <p className="text-center text-gray-700">Loading settings...</p>
      ) : (
        <>
          {/* ===== Admin Accounts ===== */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-black mb-4">
              Manage Admin Accounts
            </h3>
            <table className="min-w-full text-left text-black bg-white/40 rounded-lg overflow-hidden mb-4">
              <thead className="bg-white/50">
                <tr>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((a) => (
                  <tr key={a.id} className="border-t border-white/40">
                    <td className="py-3 px-4">{a.adminName}</td>
                    <td className="py-3 px-4">{a.adminEmail}</td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleRemoveAdmin(a.id)}
                        className="p-2 bg-red-100 hover:bg-red-200 rounded-lg"
                      >
                        <Trash2 size={18} className="text-red-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Admin Name"
                value={newAdmin.adminName}
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, adminName: e.target.value })
                }
                className="flex-1 px-4 py-2 border rounded-lg bg-white/50 text-black"
              />
              <input
                type="email"
                placeholder="Admin Email"
                value={newAdmin.adminEmail}
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, adminEmail: e.target.value })
                }
                className="flex-1 px-4 py-2 border rounded-lg bg-white/50 text-black"
              />
              <button
                onClick={handleAddAdmin}
                className="flex items-center justify-center gap-2 px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg"
              >
                <Plus size={18} /> Add
              </button>
            </div>
          </div>

          {/* ===== Site Settings ===== */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-black mb-4">
              Site Settings
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white/40 p-5 rounded-xl border">
                <p className="text-black font-medium mb-2">Site Logo</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="w-full px-3 py-2 border rounded-lg bg-white/60 text-black"
                />
                {siteSettings.siteLogo && (
                  <img
                    src={siteSettings.siteLogo}
                    alt="Logo Preview"
                    className="w-20 h-20 mt-3 rounded-lg object-contain border"
                  />
                )}
              </div>

             

              <div className="bg-white/40 p-5 rounded-xl border sm:col-span-2">
                <p className="text-black font-medium mb-2">Contact Email</p>
                <input
                  type="email"
                  value={siteSettings.contactEmail}
                  onChange={(e) =>
                    setSiteSettings({
                      ...siteSettings,
                      contactEmail: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border rounded-lg bg-white/60 text-black"
                />
              </div>
            </div>

            <div className="text-center mt-6">
              <button
                onClick={handleSaveSiteSettings}
                className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold"
              >
                Save Settings
              </button>
            </div>
          </div>

          {/* ===== Notifications & Templates ===== */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-black mb-4">
              Notifications & Email Templates
            </h3>
            <div className="bg-white/40 p-5 rounded-xl border flex flex-col gap-3">
              {templates.length > 0 ? (
                templates.map((t) => (
                  <div
                    key={t.id}
                    className="p-4 bg-white/60 rounded-lg border flex flex-col gap-1"
                  >
                    <h4 className="font-semibold text-black">
                      {t.templateName}
                    </h4>
                    <p className="text-sm text-gray-700">
                      <strong>Subject:</strong> {t.subject}
                    </p>
                    <p className="text-sm text-gray-600 whitespace-pre-line">
                      {t.body}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-700">No templates found.</p>
              )}
              <button
                onClick={() => setShowTemplateModal(true)}
                className="mt-3 px-5 py-2 bg-gray-400 hover:bg-white text-black rounded-lg font-semibold"
              >
                <Mail className="inline mr-2" /> Add New Template
              </button>
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
                  Create Email Template
                </h3>
                <input
                  type="text"
                  placeholder="Template Name"
                  value={newTemplate.templateName}
                  onChange={(e) =>
                    setNewTemplate({
                      ...newTemplate,
                      templateName: e.target.value,
                    })
                  }
                  className="text-black w-full mb-3 px-4 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Subject"
                  value={newTemplate.subject}
                  onChange={(e) =>
                    setNewTemplate({
                      ...newTemplate,
                      subject: e.target.value,
                    })
                  }
                  className="text-black w-full mb-3 px-4 py-2 border rounded-lg"
                />
                <textarea
                  placeholder="Email Body"
                  value={newTemplate.body}
                  onChange={(e) =>
                    setNewTemplate({ ...newTemplate, body: e.target.value })
                  }
                  className="text-black w-full h-32 px-4 py-2 border rounded-lg"
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

          {/* ===== Backup Section ===== */}
          <div className="mt-10 flex justify-between bg-white/40 p-5 rounded-xl border items-center flex-wrap gap-3">
            <div>
              <p className="text-black font-medium">Backup & Import Data</p>
              <p className="text-gray-700 text-sm">
                Download all admin settings.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleExport}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2"
              >
                <Download size={18} /> Export
              </button>
              
            </div>
          </div>

          {/* ===== Message ===== */}
          {message && (
            <p className="text-center mt-6 text-sm font-medium text-amber-700 bg-white/40 py-2 rounded-lg">
              {message}
            </p>
          )}
        </>
      )}
    </section>
  );
}
