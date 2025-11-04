package com.erp.HirePilot.CandidateDashboard.myapplication.service;



import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.erp.HirePilot.CandidateDashboard.myapplication.dto.UserApplicationResponse;
import com.erp.HirePilot.admindashboard.applications.entity.JobApplication;
import com.erp.HirePilot.admindashboard.applications.repo.JobApplicationRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserApplicationService {

	private final JobApplicationRepository repository;

    // ✅ Get all applications for a user by name (case-insensitive)
    public List<UserApplicationResponse> getApplicationsByUserName(String name) {
        List<JobApplication> applications = repository.findByNameIgnoreCase(name);

        return applications.stream()
                .map(app -> UserApplicationResponse.builder()
                        .name(app.getName())
                        .jobTitle(app.getJobTitle())
                        .employer(app.getEmployer())
                        .status(app.getStatus())
                        .build())
                .collect(Collectors.toList());
    }
}
