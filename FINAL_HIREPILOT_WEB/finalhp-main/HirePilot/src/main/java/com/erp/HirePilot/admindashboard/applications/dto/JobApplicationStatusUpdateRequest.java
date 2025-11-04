package com.erp.HirePilot.admindashboard.applications.dto;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobApplicationStatusUpdateRequest {
    private String name;
    private String jobTitle;
    private String employer;
    private String status; // new status e.g. "Accepted"
}
