package com.erp.HirePilot.admindashboard.profile.repo;





import com.erp.HirePilot.admindashboard.profile.entity.AdminProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AdminProfileRepo extends JpaRepository<AdminProfile, Long> {
    Optional<AdminProfile> findByUserId(Long userId);
}
