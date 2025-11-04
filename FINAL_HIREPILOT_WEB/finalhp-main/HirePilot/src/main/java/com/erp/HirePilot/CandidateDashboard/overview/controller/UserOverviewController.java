package com.erp.HirePilot.CandidateDashboard.overview.controller;





import com.erp.HirePilot.CandidateDashboard.overview.dto.JobOverviewDto;
import com.erp.HirePilot.CandidateDashboard.overview.service.UserOverviewService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserOverviewController {

    private final UserOverviewService service;

    public UserOverviewController(UserOverviewService service) {
        this.service = service;
    }

    @GetMapping("/candidate/overview")
    public List<JobOverviewDto> getJobOverview() {
        return service.getJobOverview();
    }
}

