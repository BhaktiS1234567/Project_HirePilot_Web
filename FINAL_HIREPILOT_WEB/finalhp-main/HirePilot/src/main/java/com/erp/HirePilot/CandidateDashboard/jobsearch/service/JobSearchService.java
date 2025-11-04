package com.erp.HirePilot.CandidateDashboard.jobsearch.service;





import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.erp.HirePilot.CandidateDashboard.jobsearch.dto.JobResponse;
import com.erp.HirePilot.CandidateDashboard.jobsearch.dto.JobSearchRequest;
import com.erp.HirePilot.CandidateDashboard.jobsearch.repo.JobSearchtRepository;
import com.erp.HirePilot.admindashboard.applications.dto.JobApplicationRequest;
import com.erp.HirePilot.admindashboard.applications.dto.JobApplicationResponse;
import com.erp.HirePilot.admindashboard.applications.entity.JobApplication;
import com.erp.HirePilot.admindashboard.applications.repo.JobApplicationRepository;
import com.erp.HirePilot.admindashboard.jobpost.entity.JobPost;
import com.erp.HirePilot.admindashboard.jobpost.repo.JobPostRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JobSearchService {

    private final JobSearchtRepository jobPostRepository;
    private final JobApplicationRepository jobApplicationRepository;
    private final JobPostRepository jobPostMainRepo;

    /**
     * 🔍 Search jobs by language & location and mark as "Applied" or "Not Applied"
     */
    public List<JobResponse> searchJobs(JobSearchRequest req) {

        List<JobPost> jobs = jobPostRepository.searchJobs(req.getLanguage(), req.getLocation());

        return jobs.stream()
                .map(job -> {
                    boolean alreadyApplied = jobApplicationRepository
                            .existsByNameIgnoreCaseAndJobTitleIgnoreCase(req.getCandidateName(), job.getJobTitle());

                    String status = alreadyApplied ? "Applied" : "Not Applied";

                    return JobResponse.builder()
                            .jobTitle(job.getJobTitle())
                            .description(job.getDescription())
                            .location(job.getJobLocation())
                            .eligibilityCriteria(job.getEligibilityCriteria())
                            .packageOffered(job.getPackageOffered())
                            .status(status)
                            .build();
                })
                .collect(Collectors.toList());
    }

    /**
     * 📝 Apply for a job (takes employer from frontend, with fallback extraction)
     */
    @Transactional
    public JobApplicationResponse applyForJob(JobApplicationRequest request) {

        // ✅ Step 1: Find job post by title
        Optional<JobPost> jobOpt = jobPostMainRepo.findByJobTitleIgnoreCase(request.getJobTitle());
        if (jobOpt.isEmpty()) {
            return JobApplicationResponse.builder()
                    .name(request.getName())
                    .jobTitle(request.getJobTitle())
                    .status("Failed")
                    .message("Job post not found for title: " + request.getJobTitle())
                    .build();
        }

        JobPost job = jobOpt.get();

        // ✅ Step 2: Determine employer — prefer frontend value, else extract from description
        String employerName = (request.getEmployer() != null && !request.getEmployer().isBlank()
                && !request.getEmployer().equalsIgnoreCase("Unknown Employer"))
                ? request.getEmployer()
                : extractCompanyNameFromDescription(job.getDescription());

        // ✅ Step 3: Check if already applied
        boolean alreadyApplied = jobApplicationRepository
                .existsByNameIgnoreCaseAndJobTitleIgnoreCase(request.getName(), request.getJobTitle());

        if (alreadyApplied) {
            return JobApplicationResponse.builder()
                    .name(request.getName())
                    .jobTitle(request.getJobTitle())
                    .employer(employerName)
                    .status("Already Applied")
                    .message("You have already applied for this job.")
                    .build();
        }

        // ✅ Step 4: Save new application
        JobApplication application = JobApplication.builder()
                .name(request.getName())
                .jobTitle(request.getJobTitle())
                .employer(employerName)
                .status("Applied")
                .build();

        jobApplicationRepository.save(application);

        // ✅ Step 5: Return response
        return JobApplicationResponse.builder()
                .name(application.getName())
                .jobTitle(application.getJobTitle())
                .employer(application.getEmployer())
                .status(application.getStatus())
                .message("Application submitted successfully!")
                .build();
    }

    /**
     * 🔎 Extract company name only from description using regex
     * Example: "Company: TCS" → "TCS"
     */
    private String extractCompanyNameFromDescription(String description) {
        if (description == null || description.isBlank()) {
            return "Unknown Employer";
        }

        Pattern pattern = Pattern.compile("(?:Company|Employer)\\s*[:\\-]\\s*([A-Za-z0-9&.,\\s]+)",
                Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(description);

        if (matcher.find()) {
            return matcher.group(1).trim();
        }

        return "Unknown Employer";
    }
}
