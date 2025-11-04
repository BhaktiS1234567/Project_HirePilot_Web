package com.erp.HirePilot.CandidateDashboard.profile.entity;



import com.erp.HirePilot.entity.User;

import jakarta.persistence.*;

@Entity
@Table(name = "education")
public class Education {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String collegeName;
    private String degree;
    private String university;
    private String passingYear;
    private String cgpa;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // getters/setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCollegeName() { return collegeName; }
    public void setCollegeName(String collegeName) { this.collegeName = collegeName; }

    public String getDegree() { return degree; }
    public void setDegree(String degree) { this.degree = degree; }

    public String getUniversity() { return university; }
    public void setUniversity(String university) { this.university = university; }

    public String getPassingYear() { return passingYear; }
    public void setPassingYear(String passingYear) { this.passingYear = passingYear; }

    public String getCgpa() { return cgpa; }
    public void setCgpa(String cgpa) { this.cgpa = cgpa; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
