package com.erp.HirePilot.CandidateDashboard.profile.dto;

public class ExperienceRequest {
    private Long id;
    private String companyName;
    private String role;
    private String duration;

    // getters/setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }
}
