package com.erp.HirePilot.CandidateDashboard.overview.service;

import com.erp.HirePilot.CandidateDashboard.overview.dto.JobOverviewDto;
import com.erp.HirePilot.CandidateDashboard.overview.repo.UserOverviewRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserOverviewService {

    private final UserOverviewRepository repository;

    public UserOverviewService(UserOverviewRepository repository) {
        this.repository = repository;
    }

    public List<JobOverviewDto> getJobOverview() {
        return repository.fetchJobOverview();
    }
}
