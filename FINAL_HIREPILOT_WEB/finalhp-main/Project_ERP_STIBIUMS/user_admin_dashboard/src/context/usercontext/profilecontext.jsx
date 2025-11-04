import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({
    basicDetails: null,
    education: [],
    experience: [],
    projects: [],
    resumeLink: null,
  });
  const [loading, setLoading] = useState(false);

  const apiBase = "http://localhost:8080/candidate/Candidateprofile";

  // Set user and fetch profile
  const setAuthUser = async (userData) => {
    setUser(userData);
    if (userData?.id) {
      await fetchProfile(userData.id);
    }
  };

  // Fetch full profile
  const fetchProfile = async (userId) => {
    try {
      setLoading(true);
      const res = await axios.get(apiBase, {
        headers: { "X-User-Id": userId },
      });
      setProfile(res.data);
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };
  
  

  // Save basic details
  const saveBasicDetails = async (userId, basicData) => {
    const res = await axios.post(apiBase + "/basic", basicData, {
      headers: { "X-User-Id": userId },
    });
    setProfile((prev) => ({ ...prev, basicDetails: res.data }));
    return res.data;
  };

  // Add education
  const addEducation = async (userId, educationData) => {
    const res = await axios.post(apiBase + "/education", educationData, {
      headers: { "X-User-Id": userId },
    });
    setProfile((prev) => ({
      ...prev,
      education: [...prev.education, res.data],
    }));
    return res.data;
  };

  // Add experience
  const addExperience = async (userId, experienceData) => {
    const res = await axios.post(apiBase + "/experience", experienceData, {
      headers: { "X-User-Id": userId },
    });
    setProfile((prev) => ({
      ...prev,
      experience: [...prev.experience, res.data],
    }));
    return res.data;
  };

  // Add project
  const addProject = async (userId, projectData) => {
    const res = await axios.post(apiBase + "/project", projectData, {
      headers: { "X-User-Id": userId },
    });
    setProfile((prev) => ({
      ...prev,
      projects: [...prev.projects, res.data],
    }));
    return res.data;
  };

  // Save resume
  const saveResume = async (userId, resumeLink) => {
    const res = await axios.post(apiBase + "/resume", `"${resumeLink}"`, {
      headers: { "X-User-Id": userId },
    });
    setProfile((prev) => ({ ...prev, resumeLink: res.data.resumeLink }));
    return res.data;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser: setAuthUser,
        profile,
        setProfile,
        loading,
        saveBasicDetails,
        addEducation,
        addExperience,
        addProject,
        saveResume,
        fetchProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
