package com.erp.HirePilot.admindashboard.applications.dto;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobApplicationDeleteRequest {
    private String name;
    private String jobTitle;
    private String employer;
}

