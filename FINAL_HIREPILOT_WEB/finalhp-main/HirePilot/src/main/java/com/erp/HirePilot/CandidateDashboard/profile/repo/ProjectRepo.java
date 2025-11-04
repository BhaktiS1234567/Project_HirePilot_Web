package com.erp.HirePilot.CandidateDashboard.profile.repo;


import com.erp.HirePilot.CandidateDashboard.profile.entity.Project;
import com.erp.HirePilot.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepo extends JpaRepository<Project, Long> {
    List<Project> findByUser(User user);
}
