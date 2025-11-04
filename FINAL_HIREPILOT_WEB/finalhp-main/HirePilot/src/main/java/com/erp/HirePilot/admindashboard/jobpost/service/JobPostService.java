package com.erp.HirePilot.admindashboard.jobpost.service;


import org.springframework.stereotype.Service;

import com.erp.HirePilot.admindashboard.jobpost.dto.JobPostRequestDto;
import com.erp.HirePilot.admindashboard.jobpost.dto.JobPostResponseDto;
import com.erp.HirePilot.admindashboard.jobpost.entity.JobPost;
import com.erp.HirePilot.admindashboard.jobpost.repo.JobPostRepository;

@Service
public class JobPostService {

    private final JobPostRepository jobPostRepository;

    public JobPostService(JobPostRepository jobPostRepository) {
        this.jobPostRepository = jobPostRepository;
    }

    public JobPostResponseDto createJob(JobPostRequestDto dto) {
        JobPost job = new JobPost();
        job.setJobTitle(dto.getJobTitle());
        job.setDescription(dto.getDescription());
        job.setPackageOffered(dto.getPackageOffered());
        job.setJobLocation(dto.getJobLocation());
        job.setEligibilityCriteria(dto.getEligibilityCriteria());

        jobPostRepository.save(job);

        JobPostResponseDto response = new JobPostResponseDto();
        response.setJobTitle(job.getJobTitle());
        response.setDescription(job.getDescription());
        response.setPackageOffered(job.getPackageOffered());
        response.setJobLocation(job.getJobLocation());
        response.setEligibilityCriteria(job.getEligibilityCriteria());

        return response;
    }
}
