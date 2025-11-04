package com.erp.HirePilot.admindashboard.applications.service;


import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.erp.HirePilot.admindashboard.applications.dto.JobApplicationStatusUpdateRequest;
import com.erp.HirePilot.admindashboard.applications.entity.JobApplication;
import com.erp.HirePilot.admindashboard.applications.repo.JobApplicationRepository;
import com.erp.HirePilot.admindashboard.applications.dto.JobApplicationDeleteRequest;
import com.erp.HirePilot.admindashboard.applications.dto.JobApplicationResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JobApplicationService {

    private final JobApplicationRepository repository;

    // Existing method for applying
    public JobApplicationResponse applyForJob(com.erp.HirePilot.admindashboard.applications.dto.JobApplicationRequest request) {
        JobApplication application = JobApplication.builder()
                .name(request.getName())
                .jobTitle(request.getJobTitle())
                .employer(request.getEmployer())
                .status("Applied")
                .build();

        repository.save(application);

        return JobApplicationResponse.builder()
                .name(application.getName())
                .jobTitle(application.getJobTitle())
                .employer(application.getEmployer())
                .status(application.getStatus())
                .build();
    }

    // ✅ New method: update status by name, jobTitle, and employer
    public String updateApplicationStatus(JobApplicationStatusUpdateRequest req) {
        Optional<JobApplication> optionalApp = repository.findByNameIgnoreCaseAndJobTitleIgnoreCaseAndEmployerIgnoreCase(
                req.getName(), req.getJobTitle(), req.getEmployer());

        if (optionalApp.isPresent()) {
            JobApplication application = optionalApp.get();
            application.setStatus(req.getStatus());
            repository.save(application);
            return "Status updated successfully for " + req.getName() + " (" + req.getJobTitle() + ")";
        } else {
            return "Application not found for name: " + req.getName() +
                   ", job title: " + req.getJobTitle() +
                   ", employer: " + req.getEmployer();
        }
    }
        public String deleteApplication(JobApplicationDeleteRequest request) {
            return repository.findByNameIgnoreCaseAndJobTitleIgnoreCaseAndEmployerIgnoreCase(
                            request.getName(), request.getJobTitle(), request.getEmployer())
                    .map(application -> {
                        repository.delete(application);
                        return "Application deleted for " + request.getName() +
                                " (" + request.getJobTitle() + " - " + request.getEmployer() + ")";
                    })
                    .orElse("No application found for the given name, job title, and employer.");
        }
        
        
        
        public List<JobApplicationResponse> getAllApplications() {
            List<JobApplication> applications = repository.findAll();
            return applications.stream()
                    .map(app -> JobApplicationResponse.builder()
                            .name(app.getName())
                            .jobTitle(app.getJobTitle())
                            .employer(app.getEmployer())
                            .status(app.getStatus())
                            .build())
                    .collect(Collectors.toList());
        }
    }
    

