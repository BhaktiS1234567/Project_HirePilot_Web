package com.erp.HirePilot.CandidateDashboard.profile.service;



import com.erp.HirePilot.entity.User;
import com.erp.HirePilot.repo.UserRepo;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class ProfileHelper {

    private final UserRepo userRepo;

    public ProfileHelper(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    /**
     * Try to get user from SecurityContextHolder (username principal),
     * caller may pass fallbackUserId (from header) if required.
     */
    public User getCurrentUser(Long fallbackUserId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && auth.getPrincipal() instanceof String) {
            String username = (String) auth.getPrincipal();
            Optional<User> userOptional = userRepo.findByUsername(username);
            if (userOptional.isPresent()) return userOptional.get();
        }

        if (fallbackUserId != null) {
            Optional<User> userOptional = userRepo.findById(fallbackUserId);
            if (userOptional.isPresent()) return userOptional.get();
        }
        throw new RuntimeException("User not authenticated/found");
    }
}
