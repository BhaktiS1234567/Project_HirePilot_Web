package com.erp.HirePilot.CandidateDashboard.settings.general.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.erp.HirePilot.CandidateDashboard.profile.entity.CandidateProfile;
import com.erp.HirePilot.CandidateDashboard.settings.general.dto.ApiResponse;
import com.erp.HirePilot.CandidateDashboard.settings.general.dto.UpdateEmailRequest;
import com.erp.HirePilot.CandidateDashboard.settings.general.dto.UpdateMobileRequest;
import com.erp.HirePilot.CandidateDashboard.settings.general.service.CandidateGeneralSettingService;

@RestController
@RequestMapping("/candidate/generalsetting")
public class GeneralSettingsController {

    @Autowired
    private CandidateGeneralSettingService service;

    @PutMapping("/update-email")
    public ResponseEntity<?> updateEmail(
            @RequestBody UpdateEmailRequest req,
            @RequestHeader("X-User-Id") Long userId) {

        CandidateProfile updated = service.updateEmail(userId, req.getEmail());

        if (updated == null) {
            return ResponseEntity
                    .status(404)  // Not Found
                    .body(new ApiResponse("Profile not found. Please create profile first."));
        }

        return ResponseEntity.ok(updated);
    }

    @PutMapping("/update-mobile")
    public ResponseEntity<?> updateMobile(
            @RequestBody UpdateMobileRequest req,
            @RequestHeader("X-User-Id") Long userId) {

        boolean updated = service.updateMobile(userId, req.getMobileNumber());

        if (!updated) {
            return ResponseEntity
                    .status(404)
                    .body(new ApiResponse("Profile not found. Please create profile first."));
        }

        return ResponseEntity.ok(new ApiResponse("Mobile updated successfully"));
    }


}
