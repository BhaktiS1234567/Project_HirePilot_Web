package com.erp.HirePilot.admindashboard.applications.entity;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "applications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;          // Candidate name
    private String jobTitle;      // Job title user applied for
    private String employer;      // Company name / employer
    private String status;        // e.g., "Applied"
}
