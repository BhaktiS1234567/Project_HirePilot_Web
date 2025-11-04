package com.erp.HirePilot.admindashboard.settings.manageaccount.controller;


import com.erp.HirePilot.admindashboard.settings.manageaccount.dto.AdminAccountResponse;
import com.erp.HirePilot.admindashboard.settings.manageaccount.service.AdminAccountService;
import com.erp.HirePilot.admindashboard.settings.sitesetting.dto.AdminAccountRequest;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/setting/manage-account")
@RequiredArgsConstructor
public class AdminAccountController {

    private final AdminAccountService service;

    @GetMapping
    public ResponseEntity<List<AdminAccountResponse>> getAdmins(@RequestHeader("X-User-Id") Long userId) {
        return ResponseEntity.ok(service.getAllAdmins(userId));
    }

    @PostMapping("/add")
    public ResponseEntity<AdminAccountResponse> addAdmin(
            @RequestHeader("X-User-Id") Long userId,
            @RequestBody AdminAccountRequest request) {
        return ResponseEntity.ok(service.addAdmin(request, userId));
    }

    @DeleteMapping("/delete/{adminId}")
    public ResponseEntity<Void> deleteAdmin(@PathVariable Long adminId) {
        service.deleteAdmin(adminId);
        return ResponseEntity.noContent().build();
    }
}
