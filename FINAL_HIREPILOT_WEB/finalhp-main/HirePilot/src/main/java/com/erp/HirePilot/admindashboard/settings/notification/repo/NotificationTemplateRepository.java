package com.erp.HirePilot.admindashboard.settings.notification.repo;


import org.springframework.data.jpa.repository.JpaRepository;

import com.erp.HirePilot.admindashboard.settings.notification.entity.NotificationTemplate;

import java.util.List;
import java.util.Optional;

public interface NotificationTemplateRepository extends JpaRepository<NotificationTemplate, Long> {
    Optional<NotificationTemplate> findByUserIdAndTemplateName(Long userId, String templateName);
  
    List<NotificationTemplate> findByUserId(Long userId); 
}
