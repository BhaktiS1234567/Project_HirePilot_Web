package com.erp.HirePilot.CandidateDashboard.profile.repo;



import com.erp.HirePilot.CandidateDashboard.profile.entity.CandidateProfile;
import com.erp.HirePilot.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CandidateProfileRepo extends JpaRepository<CandidateProfile, Long> {
    Optional<CandidateProfile> findByUser(User user);
    Optional<CandidateProfile> findByUserId(Integer userId); 
}
