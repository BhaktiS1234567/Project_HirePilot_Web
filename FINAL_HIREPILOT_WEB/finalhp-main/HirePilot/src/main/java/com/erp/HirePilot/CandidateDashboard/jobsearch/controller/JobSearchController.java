package com.erp.HirePilot.CandidateDashboard.jobsearch.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.erp.HirePilot.CandidateDashboard.jobsearch.dto.JobResponse;
import com.erp.HirePilot.CandidateDashboard.jobsearch.dto.JobSearchRequest;
import com.erp.HirePilot.CandidateDashboard.jobsearch.service.JobSearchService;
import com.erp.HirePilot.admindashboard.applications.dto.JobApplicationRequest;
import com.erp.HirePilot.admindashboard.applications.dto.JobApplicationResponse;
import com.erp.HirePilot.admindashboard.applications.service.JobApplicationService;

import lombok.RequiredArgsConstructor;

import java.util.List;

@RestController
@RequestMapping("/candidate")
@RequiredArgsConstructor 
public class JobSearchController {

	private final JobApplicationService service;

    private final JobSearchService jobSearchService;

    

    @PostMapping("/search")
    public ResponseEntity<List<JobResponse>> searchJobs(@RequestBody JobSearchRequest req) {
        List<JobResponse> response = jobSearchService.searchJobs(req);
        return ResponseEntity.ok(response);
    }
    
    // ✅ API endpoint for applying to a job
    @PostMapping("/apply")
    public ResponseEntity<JobApplicationResponse> applyForJob(@RequestBody JobApplicationRequest request) {
        JobApplicationResponse response = service.applyForJob(request);
        return ResponseEntity.ok(response);
    }

}

