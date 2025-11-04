package com.erp.HirePilot.admindashboard.settings.notification.controller;


import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.erp.HirePilot.admindashboard.settings.notification.entity.NotificationTemplate;
import com.erp.HirePilot.admindashboard.settings.notification.service.NotificationTemplateService;

@RestController
@RequestMapping("/admin/setting/notification")
@RequiredArgsConstructor
public class NotificationTemplateController {

    private final NotificationTemplateService service;

    @PostMapping("/edit")
    public ResponseEntity<NotificationTemplate> editTemplate(
            @RequestHeader("X-User-Id") Long userId,
            @RequestBody NotificationTemplate template) {
        return ResponseEntity.ok(service.saveOrUpdateTemplate(userId, template));
    }

    @GetMapping
    public ResponseEntity<List<NotificationTemplate>> getAllTemplates(@RequestHeader("X-User-Id") Long userId) {
        return ResponseEntity.ok(service.getAllTemplatesByUserId(userId));
    }
}
