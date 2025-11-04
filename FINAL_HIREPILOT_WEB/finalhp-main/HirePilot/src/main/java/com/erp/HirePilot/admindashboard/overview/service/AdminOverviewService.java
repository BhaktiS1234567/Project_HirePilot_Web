package com.erp.HirePilot.admindashboard.overview.service;



import com.erp.HirePilot.repo.UserRepo;
import com.erp.HirePilot.admindashboard.applications.repo.JobApplicationRepository;
import com.erp.HirePilot.admindashboard.jobpost.repo.JobPostRepository;
import com.erp.HirePilot.admindashboard.overview.dto.AdminOverviewResponse;
import com.erp.HirePilot.admindashboard.overview.dto.ApplicationSummary;
import com.erp.HirePilot.admindashboard.overview.dto.JobPostSummary;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminOverviewService {

    private final UserRepo userRepository;
    private final JobApplicationRepository jobApplicationRepository;
    private final JobPostRepository jobPostRepository;

    public AdminOverviewResponse getOverview() {
        // ✅ Total counts
        long totalUsers = userRepository.countByRoleIgnoreCase("user");
        long totalApplications = jobApplicationRepository.count();
        long totalJobPosts = jobPostRepository.count();

        // ✅ Applications summary
        List<ApplicationSummary> applications = jobApplicationRepository.findAll().stream()
                .map(app -> new ApplicationSummary(app.getName(), app.getJobTitle(),app.getStatus()))
                .collect(Collectors.toList());

        // ✅ Job posts summary — extract company name only from description
        List<JobPostSummary> jobPosts = jobPostRepository.findAll().stream()
                .map(job -> new JobPostSummary(
                        job.getJobTitle(),
                        extractCompanyNameFromDescription(job.getDescription())
                ))
                .collect(Collectors.toList());

        return AdminOverviewResponse.builder()
                .totalUsers(totalUsers)
                .totalApplications(totalApplications)
                .totalJobPosts(totalJobPosts)
                .applications(applications)
                .jobPosts(jobPosts)
                .build();
    }

    // ✅ Extract company name from the description field only
    private String extractCompanyNameFromDescription(String description) {
        if (description != null && !description.isEmpty()) {
            Pattern pattern = Pattern.compile("(?:Company|Employer)\\s*[-:]\\s*([A-Za-z0-9\\s&.]+)", Pattern.CASE_INSENSITIVE);
            Matcher matcher = pattern.matcher(description);
            if (matcher.find()) {
                return matcher.group(1).trim();
            }
        }
        return "Unknown Employer";
    }
}
