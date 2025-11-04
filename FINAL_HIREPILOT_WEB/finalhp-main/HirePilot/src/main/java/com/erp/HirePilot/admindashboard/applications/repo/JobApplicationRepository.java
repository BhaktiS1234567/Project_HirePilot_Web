package com.erp.HirePilot.admindashboard.applications.repo;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.erp.HirePilot.admindashboard.applications.entity.JobApplication;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
	  Optional<JobApplication> findByNameIgnoreCaseAndJobTitleIgnoreCaseAndEmployerIgnoreCase(String name, String jobTitle, String employer);
	  List<JobApplication> findByNameIgnoreCase(String name);
	  boolean existsByNameIgnoreCaseAndJobTitleIgnoreCase(String name, String jobTitle);
}
