package com.erp.HirePilot.CandidateDashboard.profile.dto;

public class EducationRequest {
    private Long id; // optional for updates
    private String collegeName;
    private String degree;
    private String university;
    private String passingYear;
    private String cgpa;

    // getters/setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCollegeName() { return collegeName; }
    public void setCollegeName(String collegeName) { this.collegeName = collegeName; }
    public String getDegree() { return degree; }
    public void setDegree(String degree) { this.degree = degree; }
    public String getUniversity() { return university; }
    public void setUniversity(String university) { this.university = university; }
    public String getPassingYear() { return passingYear; }
    public void setPassingYear(String passingYear) { this.passingYear = passingYear; }
    public String getCgpa() { return cgpa; }
    public void setCgpa(String cgpa) { this.cgpa = cgpa; }
}
