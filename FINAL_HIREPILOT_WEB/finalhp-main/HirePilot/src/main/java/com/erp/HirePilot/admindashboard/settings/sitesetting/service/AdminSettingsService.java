package com.erp.HirePilot.admindashboard.settings.sitesetting.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.erp.HirePilot.admindashboard.settings.sitesetting.dto.AdminSettingsRequest;
import com.erp.HirePilot.admindashboard.settings.sitesetting.entity.AdminSettings;
import com.erp.HirePilot.admindashboard.settings.sitesetting.repo.AdminSettingsRepository;

@Service
public class AdminSettingsService {

    @Autowired
    private AdminSettingsRepository repository;

    public AdminSettings getByUserId(Long userId) {
        return repository.findByUserId(userId);
    }

    public AdminSettings saveOrUpdate(Long userId, AdminSettingsRequest request) {
        AdminSettings settings = repository.findByUserId(userId);

        if (settings == null) {
            settings = new AdminSettings();
            settings.setUserId(userId);
        }

        settings.setSiteLogo(request.getSiteLogo());
        settings.setPrimaryColor(request.getPrimaryColor());
        settings.setContactEmail(request.getContactEmail());

        settings.setUpdatedAt(java.time.LocalDateTime.now());
        return repository.save(settings);
    }
}
