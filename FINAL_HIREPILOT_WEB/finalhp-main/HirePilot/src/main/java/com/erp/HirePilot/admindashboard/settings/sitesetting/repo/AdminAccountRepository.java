package com.erp.HirePilot.admindashboard.settings.sitesetting.repo;




import org.springframework.data.jpa.repository.JpaRepository;

import com.erp.HirePilot.admindashboard.settings.sitesetting.entity.AdminAccount;

import java.util.List;

public interface AdminAccountRepository extends JpaRepository<AdminAccount, Long> {
    List<AdminAccount> findByCreatedByUserId(Long userId);
}
