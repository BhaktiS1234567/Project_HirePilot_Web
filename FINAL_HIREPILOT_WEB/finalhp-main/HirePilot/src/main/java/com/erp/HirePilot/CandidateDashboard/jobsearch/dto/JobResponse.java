package com.erp.HirePilot.CandidateDashboard.jobsearch.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobResponse {
    private String jobTitle;
    private String description;
    private String location;
    private String eligibilityCriteria;
    private String packageOffered;
    private String status; // ✅ "Applied" or "Not Applied"
   
}
