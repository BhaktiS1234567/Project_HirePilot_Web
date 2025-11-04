import { createContext, useState, useContext } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const { user } = useAuth(); // logged-in user from AuthContext
  const [profile, setProfile] = useState(null);

  const fetchProfile = async () => {
    if (!user || !user.id) {
      console.warn("⚠️ No user.id found in AuthContext:", user);
      return;
    }

    try {
      console.log("🌐 Fetching profile for user ID:", user.id);
      const res = await axios.get(`http://localhost:8080/admin/profile/${user.id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log("✅ Profile fetched:", res.data);
      setProfile(res.data);
    } catch (err) {
      console.error("❌ Error fetching profile:", err);
    }
  };

  const updateProfile = async (updatedData) => {
    if (!user || !user.id) return;

    try {
      const res = await axios.put(
        `http://localhost:8080/admin/profile/${user.id}`,
        {
          user: {
            name: updatedData.name,
            email: updatedData.email,
          },
          role: updatedData.role,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log("✅ Profile updated:", res.data);
      setProfile(res.data);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("❌ Error updating profile:", err);
    }
  };

  return (
    <ProfileContext.Provider value={{ profile, fetchProfile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
