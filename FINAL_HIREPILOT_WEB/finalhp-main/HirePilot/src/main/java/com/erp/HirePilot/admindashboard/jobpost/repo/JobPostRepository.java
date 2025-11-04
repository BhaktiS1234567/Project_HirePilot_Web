package com.erp.HirePilot.admindashboard.jobpost.repo;



import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.erp.HirePilot.admindashboard.jobpost.entity.JobPost;


public interface JobPostRepository extends JpaRepository<JobPost, Long> {

	Optional<JobPost> findByJobTitleIgnoreCase(String jobTitle);
}
