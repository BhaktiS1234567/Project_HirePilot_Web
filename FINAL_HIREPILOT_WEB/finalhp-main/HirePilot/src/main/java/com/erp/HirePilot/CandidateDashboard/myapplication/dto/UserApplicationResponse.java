package com.erp.HirePilot.CandidateDashboard.myapplication.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserApplicationResponse {
    private String name;
    private String jobTitle;
    private String employer;
    private String status;
}

