package com.erp.HirePilot.CandidateDashboard.profile.dto;

public class ProjectRequest {
    private Long id;
    private String projectTitle;
    private String description;

    // getters/setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getProjectTitle() { return projectTitle; }
    public void setProjectTitle(String projectTitle) { this.projectTitle = projectTitle; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
