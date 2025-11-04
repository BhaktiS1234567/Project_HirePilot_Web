package com.erp.HirePilot.CandidateDashboard.overview.dto;





public class JobOverviewDto {

    private String jobTitle;
    private Long jobCount;
    private String jobLocation;

    // Constructor used in the query
    public JobOverviewDto(String jobTitle, Long jobCount, String jobLocation) {
        this.jobTitle = jobTitle;
        this.jobCount = jobCount;
        this.jobLocation = jobLocation;
    }

    // Getters and setters
    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public Long getJobCount() {
        return jobCount;
    }

    public void setJobCount(Long jobCount) {
        this.jobCount = jobCount;
    }

    public String getJobLocation() {
        return jobLocation;
    }

    public void setJobLocation(String jobLocation) {
        this.jobLocation = jobLocation;
    }

    @Override
    public String toString() {
        return "JobOverviewDto{" +
                "jobTitle='" + jobTitle + '\'' +
                ", jobCount=" + jobCount +
                ", jobLocation='" + jobLocation + '\'' +
                '}';
    }
}
