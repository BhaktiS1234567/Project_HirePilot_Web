package com.erp.HirePilot.admindashboard.settings.sitesetting.repo;




import org.springframework.data.jpa.repository.JpaRepository;

import com.erp.HirePilot.admindashboard.settings.sitesetting.entity.AdminSettings;

public interface AdminSettingsRepository extends JpaRepository<AdminSettings, Long> {
    AdminSettings findByUserId(Long userId);
}
