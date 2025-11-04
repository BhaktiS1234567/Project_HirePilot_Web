package com.erp.HirePilot.CandidateDashboard.settings.resetpass.service;

import com.erp.HirePilot.CandidateDashboard.settings.resetpass.dto.ResetPasswordRequest;

public interface ResetPasswordService {
    String resetPassword(Long userId, ResetPasswordRequest request);
}
