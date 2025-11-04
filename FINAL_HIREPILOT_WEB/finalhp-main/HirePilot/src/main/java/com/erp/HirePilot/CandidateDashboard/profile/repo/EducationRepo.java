package com.erp.HirePilot.CandidateDashboard.profile.repo;




import com.erp.HirePilot.CandidateDashboard.profile.entity.Education;
import com.erp.HirePilot.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EducationRepo extends JpaRepository<Education, Long> {
    List<Education> findByUser(User user);
}
