package com.erp.HirePilot.admindashboard.overview.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.erp.HirePilot.admindashboard.overview.dto.AdminOverviewResponse;
import com.erp.HirePilot.admindashboard.overview.service.AdminOverviewService;

@RestController
@RequestMapping("/admin/overview")
@RequiredArgsConstructor
public class AdminOverviewController {

    private final AdminOverviewService adminOverviewService;

    @GetMapping
    public ResponseEntity<AdminOverviewResponse> getOverview() {
        return ResponseEntity.ok(adminOverviewService.getOverview());
    }
}
