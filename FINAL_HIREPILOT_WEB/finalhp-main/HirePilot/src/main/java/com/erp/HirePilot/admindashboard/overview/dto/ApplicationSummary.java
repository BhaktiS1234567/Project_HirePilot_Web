package com.erp.HirePilot.admindashboard.overview.dto;



import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApplicationSummary {
    private String name;
    private String jobTitle;
    private String status;
}

