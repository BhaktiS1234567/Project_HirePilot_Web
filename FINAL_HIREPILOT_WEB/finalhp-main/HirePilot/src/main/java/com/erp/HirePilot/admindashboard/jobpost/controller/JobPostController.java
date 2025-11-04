package com.erp.HirePilot.admindashboard.jobpost.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.erp.HirePilot.admindashboard.jobpost.dto.JobPostRequestDto;
import com.erp.HirePilot.admindashboard.jobpost.service.JobPostService;


@RestController
@RequestMapping("/admin/job")
@CrossOrigin(origins = "*")
public class JobPostController {

    private final JobPostService jobPostService;

    public JobPostController(JobPostService jobPostService) {
        this.jobPostService = jobPostService;
    }

    @PostMapping("/post")
    public ResponseEntity<?> postJob(@RequestBody JobPostRequestDto dto) {
        return ResponseEntity.ok(jobPostService.createJob(dto));
    }
}
