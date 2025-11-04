package com.erp.HirePilot.CandidateDashboard.settings.resetpass.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.erp.HirePilot.CandidateDashboard.settings.resetpass.dto.ResetPasswordRequest;
import com.erp.HirePilot.CandidateDashboard.settings.resetpass.service.ResetPasswordService;

@RestController
@RequestMapping("/candidate/settings")
public class ResetPasswordController {

    @Autowired
    private ResetPasswordService resetPasswordService;

    @PutMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request,
                                           @RequestHeader("X-User-Id") Long userId) {

        String response = resetPasswordService.resetPassword(userId, request);
        return ResponseEntity.ok(Map.of("message", response));
    }
}
