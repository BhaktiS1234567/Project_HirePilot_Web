package com.erp.HirePilot.CandidateDashboard.jobsearch.dto;



public class JobSearchRequest {
    private String language;   // SQL or Java etc.
    private String location;
    private String candidateName; // Mumbai, Pune, etc.

    // Getters & Setters
    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

	public String getCandidateName() {
		return candidateName;
	}

	public void setCandidateName(String candidateName) {
		this.candidateName = candidateName;
	}
}
