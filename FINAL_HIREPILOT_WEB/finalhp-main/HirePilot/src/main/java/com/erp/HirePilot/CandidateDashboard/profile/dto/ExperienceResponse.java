package com.erp.HirePilot.CandidateDashboard.profile.dto;

public class ExperienceResponse {
    private Long id;
    private String companyName;
    private String role;
    private String duration;
    private Integer userId; // user reference only

    public ExperienceResponse(Long id, String companyName, String role, String duration, Integer userId) {
        this.id = id;
        this.companyName = companyName;
        this.role = role;
        this.duration = duration;
        this.userId = userId;
    }

    // getters
    public Long getId() { return id; }
    public String getCompanyName() { return companyName; }
    public String getRole() { return role; }
    public String getDuration() { return duration; }
    public Integer getUserId() { return userId; }
}
