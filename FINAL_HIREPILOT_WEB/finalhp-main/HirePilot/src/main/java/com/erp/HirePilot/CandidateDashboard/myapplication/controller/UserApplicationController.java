package com.erp.HirePilot.CandidateDashboard.myapplication.controller;


import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.erp.HirePilot.CandidateDashboard.myapplication.dto.UserApplicationResponse;
import com.erp.HirePilot.CandidateDashboard.myapplication.service.UserApplicationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/candidate/applications")
@RequiredArgsConstructor
public class UserApplicationController {

    private final UserApplicationService service;

    // ✅ Get all applications for a specific user by name
    @GetMapping("/{name}")
    public ResponseEntity<List<UserApplicationResponse>> getUserApplications(@PathVariable String name) {
        List<UserApplicationResponse> applications = service.getApplicationsByUserName(name);
        return ResponseEntity.ok(applications);
    }
}
