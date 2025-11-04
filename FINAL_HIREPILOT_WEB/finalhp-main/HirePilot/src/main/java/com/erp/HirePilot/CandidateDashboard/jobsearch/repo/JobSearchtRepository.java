package com.erp.HirePilot.CandidateDashboard.jobsearch.repo;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.erp.HirePilot.admindashboard.jobpost.entity.JobPost;

import java.util.List;

public interface JobSearchtRepository extends JpaRepository<JobPost, Long> {

    @Query("SELECT j FROM JobPost j " +
           "WHERE (LOWER(j.jobTitle) LIKE LOWER(CONCAT('%', :language, '%')) " +
           "OR LOWER(j.description) LIKE LOWER(CONCAT('%', :language, '%'))) " +
           "AND LOWER(j.jobLocation) LIKE LOWER(CONCAT('%', :location, '%'))")
    List<JobPost> searchJobs(@Param("language") String language, 
                             @Param("location") String location);
    
   
}
