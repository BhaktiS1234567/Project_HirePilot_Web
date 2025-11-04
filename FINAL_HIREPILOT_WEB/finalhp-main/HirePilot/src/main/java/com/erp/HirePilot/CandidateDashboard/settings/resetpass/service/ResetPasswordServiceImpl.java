package com.erp.HirePilot.CandidateDashboard.settings.resetpass.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.erp.HirePilot.CandidateDashboard.settings.resetpass.dto.ResetPasswordRequest;
import com.erp.HirePilot.entity.User;
import com.erp.HirePilot.repo.UserRepo;


@Service
public class ResetPasswordServiceImpl implements ResetPasswordService {

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public String resetPassword(Long userId, ResetPasswordRequest request) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Check current password
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            return "Current password is incorrect!";
        }

        // Check new password and confirm
        if (!request.getNewPassword().equals(request.getConfirmNewPassword())) {
            return "New password & confirm password do not match!";
        }

        // Update password
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        return "Password reset successfully!";
    }
}
