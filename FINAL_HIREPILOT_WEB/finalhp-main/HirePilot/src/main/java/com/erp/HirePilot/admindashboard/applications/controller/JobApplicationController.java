package com.erp.HirePilot.admindashboard.applications.controller;



import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.erp.HirePilot.admindashboard.applications.dto.JobApplicationDeleteRequest;
import com.erp.HirePilot.admindashboard.applications.dto.JobApplicationResponse;
import com.erp.HirePilot.admindashboard.applications.dto.JobApplicationStatusUpdateRequest;
import com.erp.HirePilot.admindashboard.applications.service.JobApplicationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin/applications")
@RequiredArgsConstructor
public class JobApplicationController {

    private final JobApplicationService service;

    // ✅ API to update job application status
    @PutMapping("/update-status")
    public ResponseEntity<String> updateApplicationStatus(@RequestBody JobApplicationStatusUpdateRequest request) {
        String response = service.updateApplicationStatus(request);
        return ResponseEntity.ok(response);
    }
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteApplication(@RequestBody JobApplicationDeleteRequest request) {
        String response = service.deleteApplication(request);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/all")
    public ResponseEntity<List<JobApplicationResponse>> getAllApplications() {
        List<JobApplicationResponse> applications = service.getAllApplications();
        return ResponseEntity.ok(applications);
    }
}
