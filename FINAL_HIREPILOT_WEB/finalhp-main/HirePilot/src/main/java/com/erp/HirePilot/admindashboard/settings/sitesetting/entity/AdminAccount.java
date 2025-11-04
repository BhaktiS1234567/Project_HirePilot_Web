package com.erp.HirePilot.admindashboard.settings.sitesetting.entity;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "admin_accounts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdminAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String adminName;
    private String adminEmail;

    private Long createdByUserId;  // Main Admin User ID

    private LocalDateTime createdAt = LocalDateTime.now();
}
