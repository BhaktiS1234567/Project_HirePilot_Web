package com.erp.HirePilot.CandidateDashboard.overview.repo;



import com.erp.HirePilot.CandidateDashboard.overview.dto.JobOverviewDto;
import com.erp.HirePilot.admindashboard.jobpost.entity.JobPost;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserOverviewRepository extends JpaRepository<JobPost, Long> {

    @Query("SELECT new com.erp.HirePilot.CandidateDashboard.overview.dto.JobOverviewDto(" +
           "j.jobTitle, COUNT(j), j.jobLocation) " +
           "FROM JobPost j " +
           "GROUP BY j.jobTitle, j.jobLocation")
    List<JobOverviewDto> fetchJobOverview();
}
