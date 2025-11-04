package com.erp.HirePilot.admindashboard.overview.dto;



import java.util.List;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminOverviewResponse {
    private long totalUsers;
    private long totalApplications;
    private long totalJobPosts;
    private List<ApplicationSummary> applications;
    private List<JobPostSummary> jobPosts;
}
