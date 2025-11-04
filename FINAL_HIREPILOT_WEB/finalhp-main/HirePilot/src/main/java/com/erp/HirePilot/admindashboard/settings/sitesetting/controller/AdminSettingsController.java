package com.erp.HirePilot.admindashboard.settings.sitesetting.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.erp.HirePilot.admindashboard.settings.sitesetting.dto.AdminSettingsRequest;
import com.erp.HirePilot.admindashboard.settings.sitesetting.dto.AdminSettingsResponse;
import com.erp.HirePilot.admindashboard.settings.sitesetting.entity.AdminSettings;
import com.erp.HirePilot.admindashboard.settings.sitesetting.service.AdminSettingsService;

@RestController
@RequestMapping("/admin/setting/site")
public class AdminSettingsController {

    @Autowired
    private AdminSettingsService service;

    @GetMapping
    public ResponseEntity<?> getSettings(@RequestHeader("X-User-Id") Long userId) {
        AdminSettings settings = service.getByUserId(userId);
        return ResponseEntity.ok(settings);
    }

    @PostMapping
    public ResponseEntity<?> saveSettings(
            @RequestHeader("X-User-Id") Long userId,
            @RequestBody AdminSettingsRequest request) {
        AdminSettings saved = service.saveOrUpdate(userId, request);
        return ResponseEntity.ok(saved);
    }
}
