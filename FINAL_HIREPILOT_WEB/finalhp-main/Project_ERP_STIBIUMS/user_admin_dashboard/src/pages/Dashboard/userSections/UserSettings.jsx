import { useState, useEffect } from "react";
import axios from "axios";
import { Eye, EyeOff, Edit, Check, Save } from "lucide-react";

export default function UserSettings() {
  const [activeTab, setActiveTab] = useState("general");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // === GENERAL SETTINGS STATES ===
  const [email, setEmail] = useState("");
  const [editEmail, setEditEmail] = useState(false);

  // === PASSWORD STATES ===
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Fetch from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.id || localStorage.getItem("userId");
  const token = storedUser?.token || localStorage.getItem("token");

  // ✅ Load email directly from registration/login data
  useEffect(() => {
    if (storedUser?.email) {
      setEmail(storedUser.email);
    } else {
      console.warn("⚠️ No email found in localStorage. Please log in again.");
    }
  }, [storedUser]);

  // === UPDATE EMAIL ===
  const updateEmail = async () => {
    try {
      setLoading(true);
      await axios.put(
        "http://localhost:8080/candidate/generalsetting/update-email",
        { email },
        {
          headers: {
            "x-user-id": userId,
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      setMessage("✅ Email updated successfully!");
      setEditEmail(false);

      // ✅ Update localStorage too
      const updatedUser = { ...storedUser, email };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to update email.");
    } finally {
      setLoading(false);
    }
  };

  // === RESET PASSWORD ===
  const resetPassword = async () => {
    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmNewPassword
    ) {
      setMessage("⚠️ Please fill all password fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.put(
        "http://localhost:8080/candidate/settings/reset-password",
        passwordData,
        {
          headers: {
            "x-user-id": userId,
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      setMessage(res.data.message || "✅ Password updated successfully!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to reset password. Check your old password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white/20 backdrop-blur-md border border-white/30 p-8 rounded-2xl shadow-xl text-black">
      <h2 className="text-4xl font-bold italic text-amber-600 mb-8 text-center drop-shadow-md">
        Account Settings
      </h2>

      {/* === TABS === */}
      <div className="flex border-b border-gray-300 mb-8">
        <button
          onClick={() => setActiveTab("general")}
          className={`flex-1 py-2 font-semibold text-lg transition-all duration-300 ${
            activeTab === "general"
              ? "text-amber-600 border-b-4 border-amber-600"
              : "text-gray-700 hover:text-amber-600"
          }`}
        >
          General
        </button>
        <button
          onClick={() => setActiveTab("password")}
          className={`flex-1 py-2 font-semibold text-lg transition-all duration-300 ${
            activeTab === "password"
              ? "text-amber-600 border-b-4 border-amber-600"
              : "text-gray-700 hover:text-amber-600"
          }`}
        >
          Reset Password
        </button>
      </div>

      {/* === GENERAL SETTINGS TAB === */}
      {activeTab === "general" && (
        <div className="space-y-8">
          {/* === Email === */}
          <div className="bg-white/40 backdrop-blur-md p-5 rounded-xl shadow-sm border border-white/30">
            <p className="text-lg font-semibold text-amber-700 mb-2">
              Primary Email
            </p>
            <div className="flex items-center gap-3">
              {editEmail ? (
                <>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-400 px-3 py-2 rounded-lg text-black bg-white/80"
                  />
                  <button
                    onClick={updateEmail}
                    className="text-green-600 flex items-center gap-1 hover:underline"
                  >
                    <Save className="w-4 h-4" /> Save
                  </button>
                </>
              ) : (
                <>
                  <span className="text-black font-medium">{email}</span>
                  <Check className="text-green-600 w-5 h-5" />
                  <button
                    onClick={() => setEditEmail(true)}
                    className="text-amber-600 flex items-center gap-1 hover:underline"
                  >
                    <Edit className="w-4 h-4" /> Edit
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* === RESET PASSWORD TAB === */}
      {activeTab === "password" && (
        <div className="space-y-6">
          {[
            {
              label: "Current Password",
              key: "currentPassword",
              toggle: setShowPassword,
              show: showPassword,
            },
            {
              label: "New Password",
              key: "newPassword",
              toggle: setShowNewPassword,
              show: showNewPassword,
            },
            {
              label: "Re-enter New Password",
              key: "confirmNewPassword",
              toggle: setShowConfirmPassword,
              show: showConfirmPassword,
            },
          ].map((field, i) => (
            <div
              key={i}
              className="bg-white/40 backdrop-blur-md p-5 rounded-xl border border-white/30 shadow-sm relative"
            >
              <label className="block text-amber-700 mb-2 font-semibold">
                {field.label} *
              </label>
              <input
                type={field.show ? "text" : "password"}
                value={passwordData[field.key]}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    [field.key]: e.target.value,
                  })
                }
                className="w-full border border-gray-400 rounded-lg px-3 py-2 text-black focus:ring-2 focus:ring-amber-400 bg-white/70"
              />
              <button
                type="button"
                onClick={() => field.toggle(!field.show)}
                className="absolute right-5 top-11 text-gray-600 hover:text-amber-600"
              >
                {field.show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          ))}

          <div className="text-center pt-4">
            <button
              onClick={resetPassword}
              className="bg-amber-600 text-white font-medium px-8 py-2 rounded-full hover:bg-amber-700 transition"
              disabled={loading}
            >
              {loading ? "Processing..." : "Reset Password"}
            </button>
          </div>
        </div>
      )}

      {/* === MESSAGE DISPLAY === */}
      {message && (
        <p className="text-center mt-6 text-sm font-medium text-amber-700 bg-white/40 py-2 rounded-lg">
          {message}
        </p>
      )}
    </div>
  );
}
