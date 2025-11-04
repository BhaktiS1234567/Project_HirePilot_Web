package com.erp.HirePilot.CandidateDashboard.profile.repo;


import com.erp.HirePilot.CandidateDashboard.profile.entity.Experience;
import com.erp.HirePilot.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExperienceRepo extends JpaRepository<Experience, Long> {
    List<Experience> findByUser(User user);
}
