package com.erp.HirePilot.admindashboard.profile.dto;

import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminProfileRequestDto {
    private String name;
    private String adminRole;
    private LocalDate joiningDate;
}
