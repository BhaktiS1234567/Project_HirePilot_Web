package com.erp.HirePilot.CandidateDashboard.profile.dto;

import java.util.List;

public class ProfileResponse {
    private BasicDetailsRequest basicDetails;
    private List<EducationRequest> education;
    private List<ExperienceRequest> experience;
    private List<ProjectRequest> projects;

    // getters/setters
    public BasicDetailsRequest getBasicDetails() { return basicDetails; }
    public void setBasicDetails(BasicDetailsRequest basicDetails) { this.basicDetails = basicDetails; }
    public List<EducationRequest> getEducation() { return education; }
    public void setEducation(List<EducationRequest> education) { this.education = education; }
    public List<ExperienceRequest> getExperience() { return experience; }
    public void setExperience(List<ExperienceRequest> experience) { this.experience = experience; }
    public List<ProjectRequest> getProjects() { return projects; }
    public void setProjects(List<ProjectRequest> projects) { this.projects = projects; }
}
