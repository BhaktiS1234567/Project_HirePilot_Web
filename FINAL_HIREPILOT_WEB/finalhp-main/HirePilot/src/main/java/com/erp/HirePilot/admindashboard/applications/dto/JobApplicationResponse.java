package com.erp.HirePilot.admindashboard.applications.dto;

import com.erp.HirePilot.CandidateDashboard.jobsearch.dto.JobResponse.JobResponseBuilder;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobApplicationResponse {
    private String name;
    private String jobTitle;
    private String employer;
    private String status;
    private String message; 
    
}
