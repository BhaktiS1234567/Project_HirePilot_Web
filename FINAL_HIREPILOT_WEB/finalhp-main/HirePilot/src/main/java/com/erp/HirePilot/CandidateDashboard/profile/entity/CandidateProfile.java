package com.erp.HirePilot.CandidateDashboard.profile.entity;


import com.erp.HirePilot.entity.User;

import jakarta.persistence.*;

@Entity
@Table(name = "candidate_profile")
public class CandidateProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;
    private String dob;      // consider LocalDate for stronger typing
    private String gender;
    private String email;
    private String mobile;
    private String resumeLink;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    private User user;

    // getters/setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getDob() { return dob; }
    public void setDob(String dob) { this.dob = dob; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getMobile() { return mobile; }
    public void setMobile(String mobile) { this.mobile = mobile; }

    public String getResumeLink() { return resumeLink; }
    public void setResumeLink(String resumeLink) { this.resumeLink = resumeLink; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
