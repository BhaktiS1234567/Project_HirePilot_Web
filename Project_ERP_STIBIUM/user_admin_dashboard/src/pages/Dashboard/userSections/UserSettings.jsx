import { useState } from "react";
import { Eye, EyeOff, Edit, Check } from "lucide-react";

export default function UserSettings() {
  const [activeTab, setActiveTab] = useState("general");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="max-w-4xl mx-auto bg-white/20 backdrop-blur-md border border-white/30 p-8 rounded-2xl shadow-xl text-black">
      <h2 className="text-4xl font-bold italic text-amber-600 mb-8 text-center drop-shadow-md">
        Account Settings
      </h2>

      {/* Tabs */}
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

      {/* === GENERAL SETTINGS === */}
      {activeTab === "general" && (
        <div className="space-y-8">
          {/* Phone Number */}
          <div className="bg-white/40 backdrop-blur-md p-5 rounded-xl shadow-sm border border-white/30">
            <p className="text-lg font-semibold text-amber-700 mb-2">
              Phone Number
            </p>
            <div className="flex items-center gap-3">
              <span className="text-black font-medium">+91 8767928180</span>
              <Check className="text-green-600 w-5 h-5" />
              <button className="text-amber-600 flex items-center gap-1 hover:underline">
                <Edit className="w-4 h-4" /> Edit
              </button>
            </div>
          </div>

          {/* Primary Email */}
          <div className="bg-white/40 backdrop-blur-md p-5 rounded-xl shadow-sm border border-white/30">
            <p className="text-lg font-semibold text-amber-700 mb-2">
              Primary Email
            </p>
            <div className="flex items-center gap-2">
              <span className="text-black font-medium">
                bhaktiss1323@gmail.com
              </span>
              <Check className="text-green-600 w-5 h-5" />
            </div>
          </div>

          {/* Personal Email */}
          <div className="bg-white/40 backdrop-blur-md p-5 rounded-xl shadow-sm border border-white/30">
            <p className="text-lg font-semibold text-amber-700 mb-2">
              Personal Email
            </p>
            <div className="flex items-center gap-3">
              <span className="text-black font-medium">
                bhaktiss1323@gmail.com
              </span>
              <Check className="text-green-600 w-5 h-5" />
              <button className="text-amber-600 flex items-center gap-1 hover:underline">
                <Edit className="w-4 h-4" /> Edit
              </button>
            </div>
            <p className="text-sm text-gray-700 mt-2">
              You can use both your primary and personal email addresses to log in.
            </p>
          </div>

          {/* Language Dropdown */}
          <div className="bg-white/40 backdrop-blur-md p-5 rounded-xl shadow-sm border border-white/30">
            <p className="text-lg font-semibold text-amber-700 mb-2">
              Change Language
            </p>
            <select className="border border-gray-400 rounded-lg px-3 py-2 text-black bg-white/80 focus:ring-2 focus:ring-amber-400">
              <option>English</option>
              <option>Hindi</option>
              <option>Marathi</option>
            </select>
          </div>
        </div>
      )}

      {/* === RESET PASSWORD === */}
      {activeTab === "password" && (
        <div className="space-y-6">
          {[
            {
              label: "Current Password",
              state: showPassword,
              toggle: setShowPassword,
            },
            {
              label: "New Password",
              state: showNewPassword,
              toggle: setShowNewPassword,
            },
            {
              label: "Re-enter New Password",
              state: showConfirmPassword,
              toggle: setShowConfirmPassword,
            },
          ].map((field, idx) => (
            <div
              key={idx}
              className="bg-white/40 backdrop-blur-md p-5 rounded-xl border border-white/30 shadow-sm relative"
            >
              <label className="block text-amber-700 mb-2 font-semibold">
                {field.label} *
              </label>
              <input
                type={field.state ? "text" : "password"}
                className="w-full border border-gray-400 rounded-lg px-3 py-2 text-black focus:ring-2 focus:ring-amber-400 bg-white/70"
              />
              <button
                type="button"
                onClick={() => field.toggle(!field.state)}
                className="absolute right-5 top-11 text-gray-600 hover:text-amber-600"
              >
                {field.state ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          ))}

          <div className="text-center pt-4">
            <button className="bg-amber-600 text-white font-medium px-8 py-2 rounded-full hover:bg-amber-700 transition">
              Reset Password
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
