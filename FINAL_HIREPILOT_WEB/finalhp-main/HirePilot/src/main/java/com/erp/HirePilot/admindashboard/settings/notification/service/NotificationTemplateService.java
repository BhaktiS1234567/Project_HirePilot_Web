package com.erp.HirePilot.admindashboard.settings.notification.service;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.stereotype.Service;

import com.erp.HirePilot.admindashboard.settings.notification.entity.NotificationTemplate;
import com.erp.HirePilot.admindashboard.settings.notification.repo.NotificationTemplateRepository;

@Service
@RequiredArgsConstructor
public class NotificationTemplateService {

    private final NotificationTemplateRepository repository;

    public NotificationTemplate getTemplate(Long userId, String templateName) {
        return repository.findByUserIdAndTemplateName(userId, templateName)
                .orElse(null);
    }

    public NotificationTemplate saveOrUpdateTemplate(Long userId, NotificationTemplate template) {
        NotificationTemplate existing = repository.findByUserIdAndTemplateName(userId, template.getTemplateName())
                .orElse(null);

        if (existing != null) {
            existing.setSubject(template.getSubject());
            existing.setBody(template.getBody());
            existing.setUpdatedAt(java.time.LocalDateTime.now());
            return repository.save(existing);
        } else {
            template.setUserId(userId);
            return repository.save(template);
        }
    }

    // ✅ Add this method
    public List<NotificationTemplate> getAllTemplatesByUserId(Long userId) {
        return repository.findByUserId(userId);
    }
}

