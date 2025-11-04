package com.erp.HirePilot.admindashboard.settings.maincontroller;


import com.erp.HirePilot.admindashboard.settings.manageaccount.dto.AdminAccountResponse;
import com.erp.HirePilot.admindashboard.settings.manageaccount.service.AdminAccountService;
import com.erp.HirePilot.admindashboard.settings.sitesetting.entity.AdminSettings;
import com.erp.HirePilot.admindashboard.settings.sitesetting.service.AdminSettingsService;
import com.erp.HirePilot.admindashboard.settings.notification.entity.NotificationTemplate;
import com.erp.HirePilot.admindashboard.settings.notification.service.NotificationTemplateService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/admin/setting")
@RequiredArgsConstructor
public class AdminSettingOverviewController {

    private final AdminAccountService adminAccountService;
    private final AdminSettingsService siteSettingService;
    private final NotificationTemplateService notificationService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAdminSettingsOverview(@RequestHeader("X-User-Id") Long userId) {
        Map<String, Object> overview = new HashMap<>();

        // 1️⃣ Admin Accounts
        List<AdminAccountResponse> admins = adminAccountService.getAllAdmins(userId);
        overview.put("adminAccounts", admins);

        // 2️⃣ Site Settings
        AdminSettings siteSettings = siteSettingService.getByUserId(userId);
        overview.put("siteSettings", siteSettings);

        // 3️⃣ Notification Templates
        List<NotificationTemplate> templates = notificationService.getAllTemplatesByUserId(userId);
        overview.put("notificationTemplates", templates);

        // 4️⃣ Optional: Last backup info (if implemented)
        overview.put("lastBackup", "2025-10-23T10:00:00Z"); // placeholder or from DB

        return ResponseEntity.ok(overview);
    }
}
